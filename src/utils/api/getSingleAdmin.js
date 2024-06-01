import axios from 'axios';

const getSingleAdminUser = async (adminUser) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
        const {email, password} = adminUser
      try {
        const adminusersRes = localStorage.getItem("adminUsers") || []
        const adminusers = JSON.parse(adminusersRes)
        const admin = adminusers.find((adminuser) => adminuser.email == email && adminuser.password == password)
        resolve(admin)
      } catch (error) {
        reject(null);
      }
    }, 2000); // 2 seconds delay
  });
};

export default getSingleAdminUser