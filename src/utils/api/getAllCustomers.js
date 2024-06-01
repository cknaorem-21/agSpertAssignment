import axios from 'axios';

const getAllCustomers = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const customers = localStorage.getItem("customers") || []
        resolve(JSON.parse(customers))
      } catch (error) {
        reject(error);
      }
    }, 2000); // 2 seconds delay
  });
};

export default getAllCustomers