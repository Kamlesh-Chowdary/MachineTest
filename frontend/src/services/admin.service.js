import axiosInstance from "../helpers/axiosInstance";

class AdminService {
  async registerAdmin({ username, password }) {
    try {
      const response = await axiosInstance.post("/admin/register", {
        username,
        password,
      });
      return response?.data;
    } catch (error) {
      throw error.response.data;
    }
  }
  async loginAdmin({ username, password }) {
    try {
      const response = await axiosInstance.post("/admin/login", {
        username,
        password,
      });
      return response?.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export const adminService = new AdminService();
