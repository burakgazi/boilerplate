const Product = require('../models/Product');

function Index(req, res, next) {
  return Product.find({ isDeleted: false })
    .lean()
    .exec((e, productList) => {
      if (e) {
        req.flash('errors', e.message);
        return res.render('home');
      }
      return res.render('home', {
        list: productList.map((product) => {
          return {
            ...product,
            url: `/product/${product.slug}`,
          };
        }),
      });
    });
}
module.exports = {
  index: Index,
};
