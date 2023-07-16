const mergeBillsInOne = (bills = [], paymentDetail) => {
  try {
    let productsDetail = [],
      totalAmt = 0,
      totalValue = 0,
      totalTax = 0;

    bills.map((bill) => {
      productsDetail.push(...bill.productsDetail)
      totalAmt += bill.totalAmt;
      totalValue += bill.totalValue;
      totalTax += bill.totalTax;
    })

    totalAmt.toFixed(2)
    totalValue.toFixed(2)
    totalTax.toFixed(2)

    let mergedBill = {
      productsDetail,
      billInfo: {
        purDate: paymentDetail.newBillDate,
        vId: bills[0].vId,
        billNo: paymentDetail.newBillNo,
        paymentDate: paymentDetail.paymentDate,
        paymentType: paymentDetail.paymentMode,
        paymentId: paymentDetail.paymentId,
        totalAmt,
        totalValue,
        totalTax
      }
    }
    return { data: mergedBill, err: null };
  } catch (error) {
    return { data: null, err: error };
  }
}

module.exports = { mergeBillsInOne }