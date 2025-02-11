import axios from "axios";
import { useState } from "react";
import { createAlert } from "../../utils/createAlert";
// rfce
function Register() {
  // Javascript
  const [value, setValue] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });
  const hdlOnChange = (e) => {
    // code body
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/register", value);
      console.log(res);

      createAlert("success", "Register Success");
    } catch (error) {
      createAlert("info", error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="flex w-full h-full justify-end">
      <div className="w-64 border p-4 rounded-md">
        <h1 className="text-xl font-bold text-center">Register</h1>

        {/* Form */}
        <form onSubmit={hdlSubmit}>
          <div className="flex flex-col gap-2 py-4">
            <input
              placeholder="email"
              type="text"
              name="email"
              className="border w-full border-gray-400 
              rounded-md p-1 px-4"
              onChange={hdlOnChange}
            />
            <input
              placeholder="firstname"
              type="text"
              name="firstname"
              className="border w-full border-gray-400 
              rounded-md p-1 px-4"
              onChange={hdlOnChange}
            />
            <input
              placeholder="lastname"
              type="text"
              name="lastname"
              className="border w-full border-gray-400 
              rounded-md p-1 px-4"
              onChange={hdlOnChange}
            />
            <input
              placeholder="password"
              type="text"
              name="password"
              className="border w-full border-gray-400 
              rounded-md p-1 px-4"
              onChange={hdlOnChange}
            />
            <input
              placeholder="confirmPassword"
              type="text"
              name="confirmPassword"
              className="border w-full border-gray-400 
              rounded-md p-1 px-4"
              onChange={hdlOnChange}
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white 
            px-2 py-1 rounded-md hover:cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
