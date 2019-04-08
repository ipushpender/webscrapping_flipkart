let express = require('express');
let router = express.Router();
let request = require('request');
let cheerio = require('cheerio');
let Mobile = require('../models/mobile');
let Tshirt = require('../models/tshirt');
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
      let data = [];
      $("._3O0U0u ").each((i, el) => {
        obj = {
          title: $(el).find("._3wU53n").text(),
          href: $(el).find("a").attr('href'),
          image: $(el).find("._1Nyybr").attr("src"),
          display: $(el).find(".vFw0gD .tVe95H:nth-child(2)").text(),
          warranty: $(el).find(".vFw0gD .tVe95H:last-child").text(),
          status: $(el).find(".rIHMVr").text(),
          rating: $(el).find(".hGSR34").text(),
          review: $(el).find("._38sUEc").text(),
          memory: $(el).find(".vFw0gD .tVe95H:first-child").text(),
          sim: $(el).find(".vFw0gD .tVe95H:nth-child(6)").text(),
          battery: $(el).find(".vFw0gD .tVe95H:nth-child(4)").text(),
          camera: $(el).find(".vFw0gD .tVe95H:nth-child(3)").text(),
          processor: $(el).find(".vFw0gD .tVe95H:nth-child(5)").text(),
          price: $(el).find("._1vC4OE ").text(),
          discount: $(el).find(".VGWI6T span").text(),
          old_price: $(el).find("._2GcJzG").text()
        }
        data.push(obj);
      });
      Mobile.insertMany(data).then((data) => {
        res.status(201).json({
          success: true,
          message: "Success!!",
          data: data
        });
      }).catch((err) => {
        res.status(500).json({
          success: false,
          message: "Error",
          Error: err
        });
      });
    }
  }
  request(options, callback);
});

router.get('/fetch/snapdeal/tshirt', (error, res, body) => {
  const options = {
    url: 'https://www.snapdeal.com/search?keyword=t%20shirt&santizedKeyword=t+shirt&catId=0&categoryId=0&suggested=true&vertical=p&noOfResults=20&searchState=&clickSrc=suggested&lastKeyword=&prodCatId=&changeBackToAll=true&foundInAll=false&categoryIdSearched=&cityPageUrl=&categoryUrl=&url=&utmContent=&dealDetail=&sort=rlvncy',
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body);
      let data = [];
      let obj = {};
      $(".js-tuple").each((i, el) => {
        obj = {
          max_price: $(el).find('.product-desc-price').text(),
          price: $(el).find('.product-price').text(),
          product_discount: $(el).find(".product-discount span").text(),
          title: $(el).find(".product-title").text(),
          rating_count: $(el).find(".product-rating-count").text(),
          product_image: $(el).find(".compareImg").val(),
          link: $(el).find(".dp-widget-link ").attr('href')
        }
        data.push(obj);
      });
      Tshirt.insertMany(data).then((data) => {
        res.status(201).json({
          success: true,
          message: "Success!!",
          data: data
        });
      }).catch((err) => {
        res.status(500).json({
          success: false,
          message: "Error",
          Error: err
        });
      });
    }
  }
  request(options, callback);
});


module.exports = router;