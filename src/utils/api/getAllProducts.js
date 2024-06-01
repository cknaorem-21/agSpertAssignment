import axios from 'axios';

const getAllProducts = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const products = localStorage.getItem("products") || []
        resolve(JSON.parse(products));
      } catch (error) {
        reject(error);
      }
    }, 2000); // 2 seconds delay
  });
};

export default getAllProducts