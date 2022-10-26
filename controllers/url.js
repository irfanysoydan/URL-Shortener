const { createRandom } = require("../utils/shortCodeMaker.js");
const validUrl = require("valid-url");
const Url = require("../models/urlModel.js");

const createShortUrl = async (req, res) => {
  const longUrl = req.body.url;
  const baseUrl = process.env.baseUrl;

  //Check base URL
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  //Create URL Code
  let urlCode = req.body.custom;
  if (req.body.custom === "") urlCode = createRandom();

  const shortUrl = baseUrl + "/" + urlCode;
  const searchShortUrl = await Url.findOne({ shortUrl: shortUrl });

  if (searchShortUrl)
    return res.status(500).json(`This short url exist, try again.`);

  //Check long URL
  if (validUrl.isUri(longUrl)) {
    try {
      const url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date(),
      });

      await url.save();

      res.status(200).json(`Created short URL: ${url.shortUrl}`);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
};

module.exports = { createShortUrl };
