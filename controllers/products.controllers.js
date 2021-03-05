const Product = require('../models/product');

const doActionThatMightFailValidation = require('../failValidation/failValidation');

exports.getProduct = async (request, response) => {
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    response.json(await Product.find(request.query).select('-_id -__v'));
  });
};

exports.deleteProductSKU = async (request, response) => {
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    response.sendStatus((await Product.deleteOne({
      sku: request.params.sku,
    })).deletedCount > 0 ? 200 : 404);
  });
};

exports.deleteProduct = async (request, response) => {
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    response.sendStatus((await Product.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
  });
};

exports.postProduct = async (request, response) => {
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    await new Product(request.body).save();
    response.sendStatus(201);
  });
};

exports.putProduct = async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  product.sku = sku;
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    await Product.findOneAndReplace({ sku }, product, {
      upsert: true,
    });
    response.sendStatus(200);
  });
};

exports.getProductSKU = async (request, res) => {
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, res, async () => {
    const getResult = await Product.findOne({ sku: request.params.sku }).select('-_id -__v');
    if (getResult != null) {
      res.json(getResult);
    } else {
      res.sendStatus(404);
    }
  });
};

exports.productPatch = async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  delete product.sku;
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    const patchRequest = await product
      .findOneAndUpdate({ sku }, product, {
        new: true,
      })
      .select('-_id -__v');
    if (patchRequest != null) {
      response.json(patchRequest);
    } else {
      response.sendStatus(404);
    }
  });
};
