<?php
namespace WebBundle\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use WebBundle\Entity\Category;
use WebBundle\Entity\Project;
use Doctrine\ORM\Repository;
use WebBundle\Entity\Orders;
use Symfony\Component\HttpFoundation\Request;
use WebBundle\Entity\User;
use WebBundle\Entity\Broad;
use Symfony\Component\HttpFoundation\RedirectResponse;
class DefaultController extends Controller
{
    /**
     * @Route("/",name="homepage")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $code=$request->query->get('code');
        $type=$request->query->get('state');
        if(!$code){
            return new Response("请从微信授权信息访问");
        }
        //微信APPID与SECRET
        $appid="wx12055908113a9256";
        $secret="b8ea284057d1f4e9f159833343a87ecc";
        $url="https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appid."&secret=".$secret."&code=".$code."&grant_type=authorization_code";
        $curl=curl_init();
        curl_setopt($curl,CURLOPT_URL,$url);
        curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
        $data=curl_exec($curl);
        curl_close($curl);
        $json=json_decode($data,true);
        if(!$json['access_token']){
            return new Response("授权失败，请重新打开页面，或联系客服");
        }
        $access_token=$json['access_token'];
        $openid=$json['openid'];
        $refresh_token=$json['refresh_token'];
        $url="https://api.weixin.qq.com/sns/userinfo?access_token=".$access_token."&openid=".$openid."&lang=zh_CN";
        $curl=curl_init();
        curl_setopt($curl,CURLOPT_URL,$url);
        curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
        $data=curl_exec($curl);
        curl_close($curl);
        $json=json_decode($data,true);
/*
        $json=array('openid'=>"oD-S-s-NcxmIe5v8Q-Ia_h79xXOQ",
                    'nickname'=>"浅叶随风",
                    'sex'=>"1",
                    'province'=>"湖南",
                    'city'=>"郴州",
                    'country'=>"中国",
                    'headimgurl'=>"http://wx.qlogo.cn/mmopen/ajNVdqHZLLC6VtzvFb0FbVg4Kty0twG0n66Hh8yNN3EFvQJ320Aib4ibHfXZIHYQbdDHWFKQCEw4IqsejzibUYdlw/0",
                    'refresh_token'=>"OezXcEiiBSKSxW0eoylIeEITRsI7MES-tospPaTyHo4Dha61-GmRqzzJL09GgXXk_x0tmoMfDIxutQqfeEB4TxmRbjGUzbmTr6EZnobXFC7cQlv2Ltp9F_Rkziz-2-cymqYhh5m9rATQ3gCgcjDhaA",
                    'access_token'=>"001"
            );
        $access_token=$json['access_token'];
        $openid=$json['openid'];
        $refresh_token=$json['refresh_token'];
        $type=1;
*/
        $em=$this->getDoctrine()->getManager();
        $user=$this->getDoctrine()->getRepository('WebBundle:User')->findOneBy(array('openid'=>$json['openid']));
        if(!$user){
            $user=new User();
            $user->setOpenid($json['openid'])
                ->setNickname($json['nickname'])
                ->setSex($json['sex'])
                ->setProvince($json['province'])
                ->setCity($json['city'])
                ->setCountry($json['country'])
                ->setHeadimgurl($json['headimgurl'])
                ->setRefreshToken($refresh_token);
            $em->persist($user);
            $em->flush();
        }else{
            $user->setNickname($json['nickname'])
                ->setSex($json['sex'])
                ->setProvince($json['province'])
                ->setCity($json['city'])
                ->setCountry($json['country'])
                ->setHeadimgurl($json['headimgurl'])
                ->setRefreshToken($refresh_token);
            $em->persist($user);
            $em->flush();
        }
        $categorys=$this->getDoctrine()->getRepository('WebBundle:Category')->findBy(array('broad'=>$type));
        $projects=$this->getDoctrine()->getRepository('WebBundle:Project')->findAll();
        return array('categorys'=>$categorys,'projects'=>$projects,'openid'=>$json['openid']);
    }
    /**
     * @Route("/check_from",name="check_from")
     */
    public function checkFromAction(Request $request){
        $data=$request->request->get('HideBoxForPost');
        $username=$request->get('username');
        $userphone=$request->get('userphone');
        $useremail=$request->get('useremail');
        $remark=$request->get('remark');
        $openid=$request->get('openid');
        $projectid=explode(",",$data);
        $order=new Orders();
        $cost=0;
        $project=new Project();
        for($i=0;$i<count($projectid);++$i){
            $project=$this->getDoctrine()->getRepository('WebBundle:Project')->findOneBy(array('id'=>"$projectid[$i]"));
            $order->addProject($project);
            $cost=$cost+($project->getCost());
        }
        $category=$project->getCategory();
        $broad=$category->getBroad();
        $cost=$cost+($broad->getCost());
        $user=$this->getDoctrine()->getRepository('WebBundle:User')->findOneBy(array('openid'=>$openid));
        $user->setName($username)
            ->setPhone($userphone)
            ->setEmail($useremail);
        $order->setUser($user)
            ->setCost($cost)
            ->setCtTime(new \DateTime('now'))
            ->setRemark($remark)
            ->setState(1);
        $em=$this->getDoctrine()->getManager();
        $em->persist($order);
        $em->persist($user);
        $em->flush();
        return new Response("下单成功，我们将会尽快联系您");
    }
    /**
     * @Route("/add_broad")
     */
    public function addBroadAction(){
        $em=$this->getDoctrine()->getManager();
        $broad1=new Broad();
        $broad1->setName("宣传片/广告片/创意影视")->setCost(2000);
        $category1=new Category();
        $category1->setName("画质")
            ->setClass("Radio")
            ->setRemark("含摄影师，预计拍摄时长为3天")
            ->setBroad($broad1);
        $project1=new Project();
        $project2=new Project();
        $project3=new Project();
        $project4=new Project();
        $project1->setName("EX-1")->setCost(3000)->setCategory($category1);
        $project2->setName("5D Mark II")->setCost(4500)->setCategory($category1);
        $project3->setName("C300或FS700")->setCost(6000)->setCategory($category1);
        $project4->setName("无需拍摄")->setCost(0)->setCategory($category1);
        $category2=new Category();
        $category2->setName("时长")
            ->setClass("Radio")
            ->setBroad($broad1);
        $project5=new Project();
        $project6=new Project();
        $project7=new Project();
        $project8=new Project();
        $project5->setName("1分钟")->setCost(1600)->setCategory($category2);
        $project6->setName("3分钟")->setCost(2300)->setCategory($category2);
        $project7->setName("5分钟")->setCost(3500)->setCategory($category2);
        $project8->setName("8至10分钟")->setCost(5800)->setCategory($category2);
        $category3=new Category();
        $category3->setName("音频")
            ->setRemark("多选或不选（导演自选）")
            ->setClass("checkbox")
            ->setBroad($broad1);
        $project9=new Project();
        $project10=new Project();
        $project9->setName("旁边/画外音")
            ->setCost(500)->setCategory($category3);
        $project10->setName("定制音乐")->setCost(1000)->setCategory($category3);
        $category4=new Category();
        $category4->setName("包装")
            ->setClass("Radio")
            ->setBroad($broad1);
        $project11=new Project();
        $project12=new Project();
        $project11->setName("字幕/人名/转场")->setCost(200)->setCategory($category4);
        $project12->setName("特效包装")->setCost(500)->setCategory($category4);
        $category5=new Category();
        $category5->setName("特效制作")
            ->setClass("Radio")
            ->setBroad($broad1);
        $project13=new Project();
        $project14=new Project();
        $project13->setName("是")->setCost(1500)->setCategory($category5);
        $project14->setName("否")->setCost(0)->setCategory($category5);
        $category6=new Category();
        $category6->setName("调色")
            ->setClass("Radio")
            ->setBroad($broad1);
        $project15=new Project();
        $project16=new Project();
        $project15->setName("是")->setCost(800)->setCategory($category6);
        $project16->setName("否")->setCost(0)->setCategory($category6);
        $category7=new Category();
        $category7->setName("定制内容")
            ->setClass("checkbox")
            ->setBroad($broad1);
        $project17=new Project();
        $project18=new Project();
        $project17->setName("航拍")->setCost(2000)->setCategory($category7);
        $project18->setName("摇臂")->setCost(2000)->setCategory($category7);
        $broad1->setRemarktip("请备注拍摄的时间地点及其他特殊要求");
        $em->persist($broad1);
        $em->persist($category1);
        $em->persist($category2);
        $em->persist($category3);
        $em->persist($category4);
        $em->persist($category5);
        $em->persist($category6);
        $em->persist($category7);
        $em->persist($project1);
        $em->persist($project2);
        $em->persist($project3);
        $em->persist($project4);
        $em->persist($project5);
        $em->persist($project6);
        $em->persist($project7);
        $em->persist($project8);
        $em->persist($project9);
        $em->persist($project10);
        $em->persist($project11);
        $em->persist($project12);
        $em->persist($project13);
        $em->persist($project14);
        $em->persist($project15);
        $em->persist($project16);
        $em->persist($project17);
        $em->persist($project18);
        $em->flush();
        return new Response("OK");
    }
}
