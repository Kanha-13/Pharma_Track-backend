const calculateLoss = (data) => {
  let pkg = data.pkg / 1 || 1
  let netRate = data.netRate || 0
  let qnty = data.returnQnty
  return ((netRate / pkg) * qnty).toFixed(2)
}

module.exports = { calculateLoss }