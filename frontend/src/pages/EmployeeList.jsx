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
  const employeesPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [isSortedByEmail, setIsSortedByEmail] = useState(false);
  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [isSortedById, setIsSortedById] = useState(false);

  const handleSortByName = () => {
    if (isSortedByName) {
      setEmployeesToDisplay(employeeList);
    } else {
      const sortByName = [...employeeList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setEmployeesToDisplay(sortByName);
    }
    setIsSortedByName((prev) => !prev);
    setIsSortedByEmail(false);
    setIsSortedByDate(false);
    setIsSortedById(false);
  };

  const handleSortByEmail = () => {
    if (isSortedByEmail) {
      setEmployeesToDisplay(employeeList);
    } else {
      const sortByEmail = [...employeeList].sort((a, b) =>
        a.email.localeCompare(b.email)
      );

      setEmployeesToDisplay(sortByEmail);
    }
    setIsSortedByEmail((prev) => !prev);
    setIsSortedByName(false);
    setIsSortedByDate(false);
    setIsSortedById(false);
  };

  const handleSortByDate = () => {
    if (isSortedByDate) {
      setEmployeesToDisplay(employeeList);
    } else {
      const sortByDate = [...employeeList].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setEmployeesToDisplay(sortByDate);
    }
    setIsSortedByDate(!isSortedByDate);
    setIsSortedByName(false);
    setIsSortedByEmail(false);
    setIsSortedById(false);
  };

  const handleSortById = () => {
    if (isSortedById) {
      setEmployeesToDisplay(employeeList);
    } else {
      const sortedById = [...employeeList].sort((a, b) =>
        a._id.localeCompare(b._id)
      );
      setEmployeesToDisplay(sortedById);
    }
    setIsSortedById((prev) => !prev);
    setIsSortedByName(false);
    setIsSortedByDate(false);
    setIsSortedByEmail(false);
  };

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
  useEffect(() => {
    setEmployeesToDisplay(employeeList);
  }, [employeeList]);
  const lastIndex = currentPage * employeesPerPage;
  const firstIndex = lastIndex - employeesPerPage;

  const [employeesToDisplay, setEmployeesToDisplay] = useState(employeeList);
  const employeePagination =
    employeesToDisplay &&
    employeesToDisplay
      .filter((employee) => employee.name.includes(searchEmployee))
      .slice(firstIndex, lastIndex);

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const nextPage = () => {
    const totalPages = Math.ceil(employeeList.length / employeesPerPage);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleUpdate = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await employeeService.deleteEmployee(id);
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
              value={searchEmployee}
              onChange={(e) => setSearchEmployee(e.target.value)}
            />
          </div>
          <table className=" w-full">
            <thead>
              <tr className="bg-[#BDD6EE] ">
                <td>S.No</td>
                <td>
                  Unique Id{" "}
                  <button
                    className="bg-white  rounded-xl px-2"
                    onClick={handleSortById}
                  >
                    {isSortedById ? "original" : "sort"}
                  </button>
                </td>
                <td>Image</td>
                <td>
                  Name{" "}
                  <button
                    className="bg-white  rounded-xl px-2"
                    onClick={handleSortByName}
                  >
                    {isSortedByName ? "original" : "sort"}
                  </button>
                </td>
                <td>
                  Email{" "}
                  <button
                    className="bg-white  rounded-xl px-2"
                    onClick={handleSortByEmail}
                  >
                    {isSortedByEmail ? "original" : "sort"}
                  </button>
                </td>
                <td>Mobile No</td>
                <td>Designation</td>
                <td>Gender</td>
                <td>Course</td>
                <td>
                  Create Date{" "}
                  <button
                    className="bg-white  rounded-xl px-2"
                    onClick={handleSortByDate}
                  >
                    {isSortedByDate ? "original" : "sort"}
                  </button>
                </td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {employeePagination.length > 0 ? (
                employeePagination.map((employee, index) => {
                  return (
                    <tr key={employee._id} className="border">
                      <td>{index + 1}</td>
                      <td>{employee._id}</td>
                      <td className="w-36">
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
                        <button
                          onClick={() => handleUpdate(employee._id)}
                          className="bg-green-200 p-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="bg-red-200 p-2 mx-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11}>
                    <p className="text-xl text-center mt-10">
                      No Results Found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-center gap-5 items-center pt-5">
            <button
              className="bg-[#FFFE05] p-2 rounded-full"
              onClick={previousPage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
              </svg>
            </button>
            <p className="text-lg font-semibold">{currentPage}</p>
            <button
              className="bg-[#FFFE05] p-2 rounded-full"
              onClick={nextPage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </button>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default EmployeeList;
