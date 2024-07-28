import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminService } from "../services/admin.service";
import { login } from "../store/authSlice";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const adminData = await adminService.loginAdmin({ username, password });
      dispatch(login(adminData.data.username));
      setUsername("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="">
      <div className="bg-[#FFFE05] p-5 text-xl">Login Page</div>
      <section className=" p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && <p className="text-red-600 font-semibold">{error}</p>}
          <div className="w-1/4 flex text-nowrap ">
            <label htmlFor="username" className="text-lg px-3">
              Username
            </label>
            <input
              className="border-black rounded border-2 text-lg px-2 w-full"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex w-1/4">
            <label htmlFor="password" className="text-lg px-3">
              Password
            </label>
            <input
              className="border-black rounded border-2 text-lg px-2 w-full"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="px-3 py-1 bg-[#92D050] rounded w-1/4 hover:bg-green-200"
            type="submit"
          >
            Login
          </button>
        </form>
      </section>
    </section>
  );
};

export default LoginPage;
