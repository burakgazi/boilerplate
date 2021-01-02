const i18n = require('i18n');

const Product = require('../models/Product');

function GetCreate(req, res) {
  return res.render('product/create');
}

function PostCreate(req, res, next) {
  return new Product({
    name: req.body.name,
    description: req.body.description,
    createdBy: req.user._id,
    company: req.user.company,
  }).save((e, product) => {
    if (e) {
      req.flash('errors', e.message);
      return res.redirect('/product/list');
    }
    req.flash('success', {
      msg: i18n.__('backend.product.createSuccessMessage', { name: product.name }),
    });
    return res.redirect('/product');
  });
}

function List(req, res, next) {
  return Product.find({ company: req.user.company })
    .lean()
    .exec((e, productList) => {
      if (e) {
        req.flash('errors', e.message);
        return res.redirect('/');
      }
      return res.render('product/list', {
        list: productList.map((product) => {
          return {
            ...product,
            url: `/product/edit/${product._id}`,
          };
        }),
      });
    });
}

function GetUpdate(req, res, next) {
  const productName = req.params.productName;
  return Product.findOne({ _id: productName, company: req.user.company })
    .populate('createdBy')
    .lean()
    .exec((e, product) => {
      if (e) {
        req.flash('errors', e.message);
        return res.redirect('/product/list');
      }
      return res.render('product/edit', { product });
    });
}

function Update(req, res, next) {
  return Product.updateOne(
    { _id: req.body.id },
    {
      name: req.body.name,
      description: req.body.description,
    }
  )
    .lean()
    .exec((e, r) => {
      if (e) {
        req.flash('errors', { msg: e.message });
      } else if (r.nModified === 1) {
        req.flash('success', { msg: i18n.__('backend.product.updateTrans') });
      }
      return res.redirect('/product');
    });
}

function Delete(req, res, next) {
  return Product.updateOne(
    { _id: req.body.id },
    {
      isDeleted: req.body.isDeleted === 'true' ? false : true,
    }
  )
    .lean()
    .exec((e, r) => {
      if (e) {
        req.flash('errors', { msg: e.message });
      } else {
        req.flash('success', { msg: i18n.__('backend.product.delete') });
      }
      return res.redirect('/product');
    });
}

function GetBySlug(req, res, next) {
  const slug = req.params.slug;
  return Product.findOne({ slug, isDeleted: false })
    .populate('createdBy')
    .lean()
    .exec((e, product) => {
      if (e) {
        req.flash('errors', e.message);
        return res.redirect('/product/list');
      }
      return res.render('product/index', { product });
    });
}
module.exports = {
  GetCreate,
  PostCreate,
  GetBySlug,
  List,
  GetUpdate,
  Update,
  Delete,
};
