let rp = require("request-promise-native");
let express = require('express');
let router = express.Router();
let request = require('request');
let cheerio = require('cheerio');
let Mobile = require('../models/mobile');
let Tshirt = require('../models/tshirt');
let MobileFull = require('../models/mobile_full');
/* GET home page. */
router.get('/fetch/flipkart/mobile', (req, res, next) => {
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

router.get('/fetch/snapdeal/tshirt', (req, res, next) => {
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

router.get('/fetch/flipkart/mobile/full', (req, res, next) => {
  const options = {
    url: 'https://www.flipkart.com/search?q=mobile%20phones&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off',
    headers: {
      'User-Agent': 'request'
    }
  };
  let data_array = [];
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body);
      $("._3O0U0u").each(async (i, el) => {
        href = $(el).find("a").attr('href');
        href = 'https://www.flipkart.com' + href;
        data_array.push(href);
      });
      fetchInfo(data_array, [], function (data) {
        MobileFull.insertMany(data).then((data) => {
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
      })
    }
  });
});

function fetchInfo(data, final_resp, callback) {
  if (data.length) {
    let options = data.splice(0, 1)[0]
    request(options, function (error, response, body) {
      let obj = {};
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(body);
        obj = {
          title: $(" ._9E25nV ._35KyD6").text(),
          rating: $("._38sUEc span span").text(),
          price: $("._3qQ9m1 ").text(),
          max_price: $("._1POkHg").text(),
          disc: $("._2XDAh9").text(),
          offer: $("._1iCvwn span").text(),
          exchange_offer: $("._7g_MLT:nth-child(1) li span").text(),
          special_disc: $("._7g_MLT:nth-child(2) li span").text(),
          bank_offer: $("._7g_MLT:nth-child(3) li span").text(),
          Emi: $("._7g_MLT:nth-child(4) li span").text(),
          warranty: $("._3h7IGd").text(),
          memory: $("._3WHvuP ul li:nth-child(1)").text(),
          display: $("._3WHvuP ul li:nth-child(2)").text(),
          camera: $("._3WHvuP ul li:nth-child(3)").text(),
          battery: $("._3WHvuP ul li:nth-child(4)").text(),
          processor: $("._3WHvuP ul li:nth-child(5)").text(),
          seller_rate: $(".YddkNl").text(),
          description: $("._3u-uqB").text()
        }
      }
      final_resp.push(obj)
      fetchInfo(data, final_resp, callback)
    })
  } else {
    callback(final_resp)
  }
}

module.exports = router;