const mongoose = require('mongoose');
const slugify = require('slugify');
const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    company: { type: String },
    slug: { type: String, unique: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: String, required: true, ref: 'User' },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  const doc = this;
  doc.slug = slugify(doc.name, {
    strict: true,
    lower: true,
    locale: 'en',
    replacement: '-',
  });
  return next();
});
const Product = mongoose.model('product', productSchema);

module.exports = Product;
