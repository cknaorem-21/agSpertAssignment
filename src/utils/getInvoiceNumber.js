const getInvoiceNumber = () => {
    const saleOrders = localStorage.getItem("saleOrders") || []
    const length = JSON.parse(saleOrders).length
    const number = 10000000 + length

    return `Invoice - ${number.toString()}`
}

export default getInvoiceNumber