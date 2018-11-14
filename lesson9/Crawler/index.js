const app = require("express")()
const request = require('request');
const cheerio = require('cheerio');
let searchQiyi = function (name) {
    let url = `http://so.iqiyi.com/so/q_${encodeURIComponent(name)}?source=input&sr=309914729852`;
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(body);
            let url_arr = $('.list_item'),
                all_list = [],
                movies_obj = []
            
            url_arr.each(function (index, item) {
                let title = $(this).find('.result_title a').attr('title');
                let img = $(this).find('.figure img').attr('src');
                img?img = img.substring(2, img.length):0; // 去除url前面的//
                if ($(this).find('.info_play_btn').length > 0) { //拿到单个电影
                    let url = $(this).find('.info_play_btn').attr('href');
                    movies_obj = {
                        title: title,
                        img: img,
                        url: url,
                        type: 'single'
                    }
                    all_list.push(movies_obj);
                }
            })
            console.log(all_list)
        }
    })
}

searchQiyi("变形金刚") //搜索变形金刚 电影名称、图片、播放链接

app.listen("8080", () => {
    console.log("locahost:8080")
})