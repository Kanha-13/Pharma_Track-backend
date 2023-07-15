const analyseParentCategory = (products) => {
  let allopathic = 0
  let ayurvedic = 0
  let general = 0
  let generic = 0
  let surgical = 0

  products.map((prod) => {
    switch (prod.parentCategory) {
      case "ALLOPATHIC":
        allopathic += parseFloat(prod.total || prod.netAmt)
        break;
      case "AYURVEDIC":
        ayurvedic += parseFloat(prod.total || prod.netAmt)
        break;
      case "GENERAL":
        general += parseFloat(prod.total || prod.netAmt)
        break;
      case "GENERIC":
        generic += parseFloat(prod.total || prod.netAmt)
        break;
      case "SURGICAL":
        surgical += parseFloat(prod.total || prod.netAmt)
        break;
      default:
        break;
    }
  })
  allopathic = allopathic.toFixed(2)
  ayurvedic = ayurvedic.toFixed(2)
  general = general.toFixed(2)
  generic = generic.toFixed(2)
  surgical = surgical.toFixed(2)

  return {
    allopathic,
    ayurvedic,
    general,
    generic,
    surgical
  }
}

const BillingUtils = {
  analyseParentCategory
}

module.exports = BillingUtils