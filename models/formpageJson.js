/**
 * Created by Xicheng on 2015/9/10.
 */

var page = {
    block: [
        {
            'blockTitle': "ACTOR",
            'blockDescription': "A good film should have a good actor",
            'btn': [
                {
                    'name': "Jackie Chen",
                    'number': 1
                },
                {
                    'name': "Wu mengda",
                    'number': 2
                },
                {
                    'name': "Zhou runfa",
                    'number': 3
                }
            ]
        }, {
            'blockTitle': "ACTRESS",
            'blockDescription': "A good film should have a beautiful actress",
            'btn': [
                {
                    'name': "yuchun lee",
                    'number': 1
                },
                {
                    'name': "ru hua",
                    'number': 2
                },
                {
                    'name': "QQ",
                    'number': 3
                }
            ]
        }
    ]
};

page.getTestData = function () {
    return page;
};

module.exports = page;