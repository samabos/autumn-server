const db = require("../models");
const {response : Resp} = require("../contract/response");
const { tariff : Tarrif, user : User } = db;
// current timestamp in milliseconds
//let ts = Date.now();

//let date_ob = new Date(ts);
//let date = date_ob.getDate();

exports.tarrifByHeader = (req, res) => {
  Tarrif.find({ Header: req.params.header })
    .exec(async (err, tarrif) => {
        if (err) {
            return res.status(500).send(new Resp(false,err,null));
        }
        if (!tarrif) {
          return res.status(200).send(new Resp(false,"HS Code Not found.",null));
        }
        res.status(200).send(new Resp(true,"HS Code found.",tarrif));
    });
};

exports.tarrifByCode = (req, res) => {
  Tarrif.findOne({ HSCode : req.params.code })
    .exec(async (err, tarrif) => {
        if (err) {
            return res.status(500).send(new Resp(false,err,null));
        }
        if (!tarrif) {
          return res.status(200).send(new Resp(false,"HS Code Not found.",null));
        }
        res.status(200).send(new Resp(true,"HS Code found.",tarrif));
    });
};