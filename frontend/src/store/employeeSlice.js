import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeList: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employeeList = action.payload;
    },

    addEmployee: (state, action) => {
      state.employeeList.push(action.payload);
    },
    modifyEmployee: (state, action) => {
      state.employeeList = state.employeeList.map((employee) =>
        employee._id === action.payload._id ? action.payload : employee
      );
    },
    deleteEmployee: (state, action) => {
      state.employeeList = state.employeeList.filter(
        (employee) => employee._id !== action.payload
      );
    },
  },
});

export const { setEmployees, addEmployee, modifyEmployee, deleteEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
