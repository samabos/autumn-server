const db = require("../models");
const {response : Resp} = require("../contract/response");
const { currency : Currency } = db;

exports.currencyByCode = (req, res) => {
    Currency.findOne({ CurrencyCode: req.params.code })
      .exec(async (err, row) => {
          if (err) {
              return res.status(500).send(new Resp(false,err,null));
          }
          if (!row) {
            return res.status(200).send(new Resp(false,"Currency Not found.",null));
          }
          res.status(200).send(new Resp(true,"Currency found.",row));
      });
  };

  exports.currency = (req, res) => {
    Currency.find()
      .exec(async (err, rows) => {
          if (err) {
              return res.status(500).send(new Resp(false,err,null));
          }
          if (!rows) {
            return res.status(200).send(new Resp(false,"Currency Not found.",null));
          }
          res.status(200).send(new Resp(true,"Currency found.",rows));
      });
  };