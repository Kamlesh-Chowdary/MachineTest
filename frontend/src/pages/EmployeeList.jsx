import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeService } from "../services/employee.service";
import { deleteEmployee, setEmployees } from "../store/employeeSlice";
import { NavLink, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const [error, SetError] = useState("");
  const employeeList = useSelector((state) => state.employee.employeeList);
  const navigate = useNavigate();
  console.log(employeeList);
  useEffect(() => {
    (async () => {
      SetError("");
      try {
        const response = await employeeService.getEmployees();
        dispatch(setEmployees(response.data));
      } catch (error) {
        console.log(error);
        SetError(error.message);
      }
    })();
  }, [dispatch]);

  const handleUpdate = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await employeeService.deleteEmployee(id);
      console.log(response);
      dispatch(deleteEmployee(id));
    } catch (error) {
      SetError(error.message);
    }
  };
  return (
    <section>
      <h1 className="bg-[#FFFE05] p-3 text-xl">Employee List</h1>
      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}
      {employeeList.length > 0 ? (
        <section>
          <div className="flex justify-end gap-10 pr-20">
            <p>Total Count : {employeeList.length}</p>
            <NavLink to="/create-employee" className="bg-[#A8D08D]  px-20">
              Create Employee
            </NavLink>
          </div>
          <div className="flex bg-[#BDD6EE] justify-end gap-10 pr-20">
            <label className="">Search</label>
            <input
              type="text"
              placeholder="Enter Search Keyword"
              className="px-20 border border-black"
            />
          </div>
          <table className=" w-full">
            <thead>
              <tr className="bg-[#BDD6EE] ">
                <td>S.No</td>
                <td>Unique Id</td>
                <td>Image</td>
                <td>Name</td>
                <td>Email</td>
                <td>Mobile No</td>
                <td>Designation</td>
                <td>Gender</td>
                <td>Course</td>
                <td>Create Date</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee, index) => {
                return (
                  <tr key={employee._id} className="border ">
                    <td>{index + 1}</td>
                    <td>{employee._id}</td>
                    <td>
                      <img src={employee.image} alt="Employee Image" />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.gender.toUpperCase()}</td>
                    <td>{employee.course.toUpperCase()}</td>
                    <td>{employee.createdAt.slice(0, 10)}</td>
                    <td>
                      <button onClick={() => handleUpdate(employee._id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(employee._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default EmployeeList;
