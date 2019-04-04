let express = require('express');
let router = express.Router();
let request = require('request');
let cheerio = require('cheerio');
/* GET home page. */
router.get('/fetch/flipkart/mobile', (error, res, body) => {
  const options = {
    url: 'https://www.flipkart.com/search?q=mobile%20phones&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off',
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body);
      var item = [];
      $("._3O0U0u ").each((i, el) => {
        h1 = $(el).find("a").attr('href');
        im1 = $(el).find("._1Nyybr").attr("src");
        s1 = $(el).find(".rIHMVr").text();
        n1 = $(el).find("._3wU53n").text();
        r1 = $(el).find(".hGSR34").text();
        rv1 = $(el).find("._38sUEc").text();
        mem = $(el).find(".vFw0gD .tVe95H:first-child").text();
        wa1 = $(el).find(".vFw0gD .tVe95H:last-child").text();
        disp = $(el).find(".vFw0gD .tVe95H:nth-child(2)").text();
        camera = $(el).find(".vFw0gD .tVe95H:nth-child(3)").text();
        battery1 = $(el).find(".vFw0gD .tVe95H:nth-child(4)").text();
        processor = $(el).find(".vFw0gD .tVe95H:nth-child(5)").text();
        sim = $(el).find(".vFw0gD .tVe95H:nth-child(6)").text();
        censor = $(el).find(".vFw0gD .tVe95H:nth-child(7)").text();
        price = $(el).find("._2GcJzG").text();
        sp = $(el).find("._1vC4OE ").text();
        discount = $(el).find(".VGWI6T span").text();
        obj = {
          title: n1,
          href: h1,
          image: im1,
          display: disp,
          warranty: wa1,
          status: s1,
          rating: r1,
          review: rv1,
          memory: mem,
          price: sp,
          discount: discount,
          old_price: price,
          sim: sim,
          battery: battery1,
          camera: camera
        }
        item.push(obj);
      });
      res.json({
        "item": item
      });
    }
  }
  request(options, callback);
});

module.exports = router;