const addNewSaleOrder = async (saleOrderData) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // Simulate a post request and save to local storage
        const existingData = JSON.parse(localStorage.getItem('saleOrders')) || [];
        const existingSaleOrderIndex = existingData.findIndex((data) => data.invoice_no === saleOrderData.invoice_no);
        
        if (existingSaleOrderIndex !== -1) {
          // Updating existing sale order
          existingData[existingSaleOrderIndex] = saleOrderData;
        } else {
          // Adding new sale order
          existingData.push(saleOrderData);
        }
        
        localStorage.setItem('saleOrders', JSON.stringify(existingData));
        resolve({ message: 'Sale order saved successfully' });
      } catch (error) {
        reject({ message: 'Error saving sale order' });
      }
    }, 2000); // 2 seconds delay
  });
};

export default addNewSaleOrder;
