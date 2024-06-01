import axios from 'axios';

const getAllSaleOrders = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const saleOrders = localStorage.getItem("saleOrders") || []
        resolve(JSON.parse(saleOrders));
      } catch (error) {
        reject(error);
      }
    }, 2000); // 2 seconds delay
  });
};

export default getAllSaleOrders