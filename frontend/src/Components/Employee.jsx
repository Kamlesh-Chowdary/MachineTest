/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { employeeService } from "../services/employee.service";
import { useDispatch } from "react-redux";
import { addEmployee, modifyEmployee } from "../store/employeeSlice";
import { useNavigate } from "react-router-dom";
const Employee = ({ employee }) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      phoneNumber: employee?.phoneNumber || "",
      designation: employee?.designation || "",
      gender: employee?.gender || "",
      course: employee?.course || "",
      image: employee?.image || "",
    },
  });

  useEffect(() => {
    if (employee) {
      setValue("name", employee.name);
      setValue("email", employee.email);
      setValue("phoneNumber", employee.phoneNumber);
      setValue("designation", employee.designation);
      setValue("gender", employee.gender);
      setValue("course", employee.course);
      setValue("image", employee.image);
    }
  }, [employee, setValue]);
  const formSubmit = async (data) => {
    console.log(data);
    setError("");
    try {
      if (employee) {
        const response = await employeeService.modifyEmployee(employee._id, {
          ...data,
          image: data.image[0],
        });
        dispatch(modifyEmployee(response.data));
        reset();
        navigate("/employee-list");
      } else {
        const response = await employeeService.createEmployee({
          ...data,
          image: data.image[0],
        });
        dispatch(addEmployee(response.data));
        reset();
        navigate("/employee-list");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {error && (
        <p className="text-center text-red-600 mt-5 font-semibold">{error}</p>
      )}
      <div className="w-1/3 mx-auto mt-5 text-nowrap">
        <div className="py-2 flex  items-center">
          <label htmlFor="name" className="w-1/3">
            Full Name :
          </label>
          <input
            type="text"
            name="name"
            className="p-2 border border-black w-full "
            {...register("name", {
              required: true,
            })}
          />
        </div>
        {errors.name?.type === "required" && (
          <p role="alert" className="text-red-600 font-semibold">
            *Full Name is required
          </p>
        )}
        <div className="py-2  flex  items-center">
          <label htmlFor="email" className="w-1/3">
            Email :
          </label>
          <input
            type="email"
            name="email"
            className="p-2 border border-black w-full "
            {...register("email", {
              required: true,
            })}
          />
        </div>
        {errors.email?.type === "required" && (
          <p role="alert" className="text-red-600 font-semibold">
            *Email is required
          </p>
        )}
        <div className="py-2 flex  items-center">
          <label htmlFor="phoneNumber" className="w-1/3">
            Mobile No :
          </label>
          <input
            type="tel"
            name="phoneNumber"
            className="p-2 border border-black w-full"
            {...register("phoneNumber", {
              required: true,
            })}
          />
        </div>
        {errors.phoneNumber?.type === "required" && (
          <p role="alert" className="text-red-600 font-semibold">
            *Mobile Number is required
          </p>
        )}
        <div className="py-2 flex  items-center">
          <label htmlFor="designation" className="w-1/3">
            Designation :
          </label>
          <select
            name="designation"
            className="p-2 border border-black w-full"
            {...register("designation", { required: true })}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
          </select>
        </div>
        {errors.designation?.type === "required" && (
          <p role="alert" className="text-red-600 font-semibold">
            *Designation is required
          </p>
        )}
        <div className="py-2  flex  items-center">
          <label htmlFor="gender" className="w-1/3">
            Gender :
          </label>
          <div className="p-2 border border-black w-full">
            <input
              {...register("gender", { required: true })}
              type="radio"
              name="gender"
              value="M"
            />
            <label htmlFor="gender" className="pl-1 pr-5">
              M
            </label>
            <input
              {...register("gender", { required: true })}
              type="radio"
              name="gender"
              value="F"
            />
            <label htmlFor="gender" className="pl-1">
              F
            </label>
          </div>
        </div>
        {errors.gender?.type === "required" && (
          <p role="alert" className="text-red-600 font-semibold">
            *Gender is required
          </p>
        )}
        <div className="py-2 flex  items-center">
          <label htmlFor="course" className="w-1/3">
            Course :
          </label>
          <select
            name="course"
            className="p-2 border border-black w-full"
            {...register("course", { required: true })}
          >
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>
        </div>
        {errors.course?.type === "required" && (
          <p role="alert" className="text-red-600 font-semibold">
            *Course is required
          </p>
        )}
        {employee && (
          <div className="py-2 w-36">
            <img src={employee.image} alt="Employee Image" />
          </div>
        )}
        <div className="py-2 flex  items-center">
          <label htmlFor="image" className="w-1/3">
            Image Upload :
          </label>
          <input
            type="file"
            className="p-2 border border-black w-full"
            accept="image/png, image/jpeg"
            {...register("image", {
              required: !employee,
            })}
          />
        </div>
        {errors.image?.type === "required" && (
          <p role="alert" className="text-red-600 font-semibold">
            *Image is required
          </p>
        )}

        <button className="bg-[#92D050] w-full py-2 mt-2">
          {employee ? "update" : "submit"}
        </button>
      </div>
    </form>
  );
};

export default Employee;
