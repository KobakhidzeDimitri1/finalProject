const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const { title, type, price, stars, reviewCount, description, imageUrl } =
    req.body;

  const product = new Product({
    title,
    price,
    type,
    stars,
    reviewCount,
    description,
    imageUrl,
  });
  product
    .save()
    .then(() => {
      return res.send(product._id);
    })
    .catch((err) => res.send({ success: false }));
};
