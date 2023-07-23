const Product = require("../models/product")

const updateProduct = async (id, data) => {
  try {
    const response = await Product.updateOne({ _id: id }, data)
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const updateProductQnty = async (id, data) => {
  try {
    const response = await Product.updateOne({ _id: id }, { $inc: { qnty: data.qnty } })
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const updateMultipleProductsQnty = async (documents) => {
  try {
    const bulkOps = [];
    for (const document of documents) {
      // criteria for duplicate entries
      const searchCriteria = { _id: document.pId };

      // update operation
      const updateOperation = {
        $inc: { qnty: document.qnty }
      };
      //update operation to the bulk operation
      bulkOps.push({
        updateOne: {
          filter: searchCriteria,
          update: updateOperation,
        },
      });
    }

    if (bulkOps.length > 0) {
      // Execute the bulk write operation
      const result = await Product.bulkWrite(bulkOps);
      return { data: result, err: null }
    }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const PRODUCTS = {
  updateProduct,
  updateProductQnty,
  updateMultipleProductsQnty
}

module.exports = PRODUCTS;