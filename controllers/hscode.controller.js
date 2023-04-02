
const db = require("../models");
const {response : Resp} = require("../contract/response");
const {runCompletion: MLModel} = require('../utilities/hscode.service');
const { hscode : HSCode, user : User } = db;
// current timestamp in milliseconds
let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();

///ML Model Search
exports.hsAsk = async (req, res)=>{
  await MLModel(req.body.keyword).then(
    function(value) { 
      let hscode = value.data.choices[0].text.trim();
      const regex = /[^0-9]/ig;
      hscode = hscode.replace(regex,'');
      if(hscode.length > 4){
        hscode = hscode.substring(0, 4)+"."+hscode.substr(4, 2);
      }
      HSCode.findOne({ Code: hscode})
      .exec(async (err, hs) => {
          if (err) {
              return res.status(500).send(new Resp(false,err,null));
          }
          if (!hs) {
            return res.status(200).send(new Resp(false,"HS Code Not found.",null));
          }
          res.status(200).send(new Resp(true,"HS Code found.",[hs]));
      });
      //var m = new Resp(true,"HS Code found.",value.data.choices[0].text);
      //res.status(200).send(m) 
    },
    function(error) {
      return res.status(500).send(new Resp(false,error,null))
    }
  );
}



exports.hsCodes = (req, res) => {
    HSCode.find().limit(100)
    .exec(async (err, hs) => {
        if (err) {
            return res.status(500).send(new Resp(false,err,null));
        }
        if (!hs) {
            return res.status(200).send(new Resp(false,"HS Code Not found.",null));
        }
        var m = new Resp(true,"HS Code found.",hs);
        res.status(200).send(m);
      });
  };
  exports.hsCodesById = (req, res) => {
    HSCode.findById(req.params.id)
        .exec(async (err, hs) => {
            if (err) {
              return res.status(500).send(new Resp(false,err,null));
            }
            if (!hs) {
              return res.status(200).send(new Resp(false,"HS Code Not found.",null));
            }

            res.status(200).send(new Resp(true,"HS Code found.",hs));
        });
  };
  exports.hsCodesByCode = (req, res) => {
    HSCode.findOne({ Code: req.params.code })
      .exec(async (err, hs) => {
          if (err) {
              return res.status(500).send(new Resp(false,err,null));
          }
          if (!hs) {
            return res.status(200).send(new Resp(false,"HS Code Not found.",null));
          }
          res.status(200).send(new Resp(true,"HS Code found.",[hs]));
      });
  };
  exports.hsCodesByFilter = (req, res) => {
    HSCode.find(req.body.filter)
      .exec(async (err, hs) => {
          if (err) {
            return res.status(500).send(new Resp(false,err,null));
          }
          if (!hs) {
            return res.status(200).send(new Resp(false,"HS Code Not found.",null));
          }
          res.status(200).send(new Resp(true,"HS Code found.",hs));
      });
  };
  exports.hsCodesAdd = (req, res) => {
    User.findById(req.userId).exec((err, user) => 
    {
      if (err) {
        return res.status(500).send(new Resp(false,err,null));
      }
      const hs = new HSCode({
        Order: req.body.Order,
        Level: req.body.Level,
        ParentId: req.body.ParentId,
        Code: req.body.Code,
        ParentCode: req.body.ParentCode,
        Description: req.body.Description,
        SelfExplanatory: req.body.SelfExplanatory
      });

      hs.save((err, hs) => {
        if (err) {
          return res.status(500).send(new Resp(false,err,null));
        }
        res.status(200).send(new Resp(true,"HS Code added successfully.",hs));
      });
    });
  };
  exports.hsCodesUpdate = (req, res) => {
    User.findById(req.userId).exec((err, user) => 
    {
      if (err) {
        return res.status(500).send(new Resp(false,err,null));
      }
      HSCode.findById(req.body.id)
      .exec(async (err, hscode) => {
          if (err) {
            return res.status(500).send(new Resp(false,err,null));
          }
      
          if (!hscode) {
            return res.status(200).send(new Resp(false,"HS Code Not found.",null));
          }
          hscode.Order = req.body.Order;
          hscode.Level= req.body.Level;
          hscode.ParentId= req.body.ParentId;
          hscode.Code= req.body.Code;
          hscode.ParentCode= req.body.ParentCode;
          hscode.Description= req.body.Description;
          hscode.SelfExplanatory= req.body.SelfExplanatory;
          
          hscode.save((err, hscode) => {
            if (err) {
              return res.status(500).send(new Resp(false,err,null));
            }
          });
        res.status(200).send(new Resp(true,"HS Code updated successfully.",hscode));
      });
    });
  };
  exports.hsCodesDelete = (req, res) => {
    HSCode.deleteOne({_id : req.body.id})
    .exec(async (err, result) => {
        if (err) {
          return res.status(500).send(new Resp(false,err,null));
        }
    
        if (result.deletedCount==0) {
          return res.status(200).send(new Resp(false,"HS Code Not found.",null));
        }
        res.status(200).send(new Resp(true,"HS Code deleted successfully.",result));
    });
  };
  exports.hsCodesByOptionId = async (req, res) => {
      let query = HSCode.find({ Level: 1 });
    if (!req.body.id && !req.body.pid && !req.body.level)
    {
        query = HSCode.find({ Level: 1 });
    }
    else if(!req.body.id && req.body.pid && req.body.level)
    {
        query = HSCode.find({ Level: req.body.level, ParentId: req.body.pid});
    }
    else if(req.body.id && !req.body.pid && !req.body.level)
    {
        query = HSCode.findOne({Id:req.body.id});
    }
    else if(!req.body.id && req.body.pid && !req.body.level)
    {
        query = HSCode.find({ ParentId: req.body.pid});
    }
    else if(req.body.id && !req.body.pid && req.body.level)
    { 
        var result = await HSCode.findOne({ Level: req.body.level, Id: req.body.id}).exec();
        query = HSCode.find({ Level: req.body.level, ParentId: result.ParentId});
    }
    query.sort({ Order: 'asc' }).exec(async (err, hs) => {
          if (err) {
              return res.status(500).send(new Resp(false,err,null));
          }
          if (!hs) {
            return res.status(200).send(new Resp(false,"HS Code Not found.",null));
          }
          res.status(200).send(new Resp(true,"HS Code found.",hs));
      });
    
  };
  exports.hsCodesByOptionCode = async (req, res) => {
      let query = HSCode.find({ Level: 1 });
    if (!req.body.code && !req.body.pcode && !req.body.level)
    {
        query = HSCode.find({ Level: 1 });
    }
    else if(!req.body.code && req.body.pcode && req.body.level)
    {
        query = HSCode.find({ Level: req.body.level, ParentCode: req.body.pcode});
    }
    else if(req.body.code && !req.body.pcode && !req.body.level)
    {
        query = HSCode.findOne({Code:req.body.code});
    }
    else if(!req.body.code && req.body.pcode && !req.body.level)
    {
        query = HSCode.find({ ParentCode: req.body.pcode});
    }
    else if(req.body.code && !req.body.pcode && req.body.level)
    { 
        //var result = await HSCode.findOne({ Level: req.body.level, Code: req.body.code}).exec();
        //query = HSCode.find({ Level: req.body.level, ParentCode: result.ParentCode});
    }
    query.sort({ Order: 'asc' }).exec(async (err, hs) => {
          if (err) {
              return res.status(500).send(new Resp(false,err,null));
          }
          if (!hs) {
            return res.status(200).send(new Resp(false,"HS Code Not found.",null));
          }
          res.status(200).send(new Resp(true,"HS Code found.", hs));
      });
    
  };