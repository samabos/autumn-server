const db = require("../models");
const {response : Resp} = require("../contract/response");
const { requirement : Requirement, user : User } = db;
// current timestamp in milliseconds
//let ts = Date.now();

//let date_ob = new Date(ts);
//let date = date_ob.getDate();

exports.regulationByHSCode = (req, res) => {
    Requirement.find({ HSCode: req.params.hscode })
      .exec(async (err, rows) => {
          if (err) {
              return res.status(500).send(new Resp(false,err,null));
          }
          if (!rows) {
            return res.status(200).send(new Resp(false,"HS Code Not found.",null));
          }
          res.status(200).send(new Resp(true,"HS Code found.",rows));
      });
  };