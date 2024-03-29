
const db = require("../models");
const {response:Resp} = require("../contract/response");

const { product: Product, user: User } = db;
// current timestamp in milliseconds
let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();

const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};


  exports.products = (req, res) => {
    const {page, size, keyword} = req.query;

    var condition = keyword != null && keyword != 'undefined'
    ? { Keyword: { $regex: new RegExp(keyword), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);
    Product.paginate(condition, { offset, limit })
      .then((data) => {
        var payload = {
          totalItems: data.totalDocs,
          records: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        }
        var m = new Resp(true, "Products found.", payload);
        res.status(200).send(m);
      }).catch((err) => {
        res.status(500).send(new Resp(false, err.message, null));
      });
   
  };
  exports.productById = (req, res) => {
      Product.findById(req.params.id)
        .exec(async (err, product) => {
            if (err) {
              return res.status(500).send(new Resp(false,err,null));
            }
            if (!product) {
              return res.status(200).send(new Resp(false,"Product Not found.",null));
            }

            res.status(200).send(new Resp(true,"Products found.",product));
        });
  };
  exports.productByKeyword = (req, res) => {
    Product.findOne({ Keyword: req.params.keyword })
      .exec(async (err, product) => {
          if (err) {
              return res.status(500).send(new Resp(false,err,null));
          }
          if (!product) {
            return res.status(200).send(new Resp(false,"Product Not found.",null));
          }
          res.status(200).send(new Resp(true,"Products found.",product));
      });
  };
  exports.productByFilter = (req, res) => {
    Product.find(req.body.filter)
      .exec(async (err, product) => {
          if (err) {
            return res.status(500).send(new Resp(false,err,null));
          }
          if (!product) {
            return res.status(200).send(new Resp(false,"Product Not found.",null));
          }
          res.status(200).send(new Resp(true,"Products found.",product));
      });
  };
  exports.productAdd = (req, res) => {
    User.findById(req.userId).exec((err, user) => 
    {
      if (err) {
        return res.status(500).send(new Resp(false,err,null));
      }
      const product = new Product({
        Keyword: req.body.Keyword,
        Class: req.body.Class,
        Code: req.body.Code,
        Tags: req.body.Tags,
        CreatedBy: user.username,
        Created: date,
        ModifiedBy: user.username,
        Modified: date,
        IsActive: req.body.IsActive
      });

      product.save((err, product) => {
        if (err) {
          return res.status(500).send(new Resp(false,err,null));
        }
        res.status(200).send(new Resp(true,"Product added successfully.",product));
      });
    });
  };
  exports.productUpdate = (req, res) => {
    User.findById(req.userId).exec((err, user) => 
    {
      if (err) {
        return res.status(500).send(new Resp(false,err,null));
      }
      Product.findById(req.body.id)
      .exec(async (err, product) => {
          if (err) {
            return res.status(500).send(new Resp(false,err,null));
          }
      
          if (!product) {
            return res.status(200).send(new Resp(false,"Product Not found.",null));
          }
          product.Keyword = req.body.Keyword;
          product.Class = req.body.Class;
          product.Code = req.body.Code;
          product.Tags = req.body.Tags;
          product.ModifiedBy = user.username;
          product.Modified = date;
          product.IsActive = req.body.IsActive;
          
          product.save((err, product) => {
            if (err) {
              return res.status(500).send(new Resp(false,err,null));
            }
          });
        res.status(200).send(new Resp(true,"Product updated successfully.",product));
      });
    });
  };
  exports.productDelete = (req, res) => {
    Product.deleteOne({_id : req.body.id})
    .exec(async (err, result) => {
        if (err) {
          return res.status(500).send(new Resp(false,err,null));
        }
    
        if (result.deletedCount==0) {
          return res.status(200).send(new Resp(false,"Product Not found.",null));
        }
        res.status(200).send(new Resp(true,"Product deleted successfully.",result));
    });
  };