import axiosInstance from "../helpers/axiosInstance";

class EmployeeService {
  async createEmployee({
    name,
    email,
    phoneNumber,
    designation,
    gender,
    course,
  }) {
    try {
      const response = await axiosInstance(
        "/employee/create",
        {
          name,
          email,
          phoneNumber,
          designation,
          gender,
          course,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }

  async getEmployees() {
    try {
      const response = await axiosInstance.get("/employee/get-employee");
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }

  async modifyEmployee(
    employeeId,
    { name, email, phoneNumber, designation, gender, course }
  ) {
    try {
      const response = await axiosInstance.patch(
        `/employee/modify/${employeeId}`,
        {
          name,
          email,
          phoneNumber,
          designation,
          gender,
          course,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
  async deleteEmployee(employeeId) {
    try {
      const response = await axiosInstance.delete(
        `/employee/delete${employeeId}`
      );
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
}

export const employeeService = new EmployeeService();
