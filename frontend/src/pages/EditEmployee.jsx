import { useParams } from "react-router-dom";
import { Employee } from "../Components";
import { useEffect, useState } from "react";
import { employeeService } from "../services/employee.service";

const EditEmployee = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [employee, setEmployee] = useState();

  useEffect(() => {
    (async () => {
      setError("");
      try {
        const response = await employeeService.getSingleEmployee(id);
        setEmployee(response.data);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [id]);
  return (
    <section>
      <h1 className="bg-[#FFFE05] p-5 text-xl">Employee Edit</h1>
      {error && (
        <p className="text-center text-red-600 mt-5 font-semibold">{error}</p>
      )}
      <Employee employee={employee} />
    </section>
  );
};

export default EditEmployee;
