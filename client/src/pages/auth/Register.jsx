import React, { useState } from 'react';
import axios from 'axios';
import { createAlert } from '../../utils/createAlert';

function Register() {
  const [value, setValue] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });

  const hdlOnchange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
    console.log(e.target.name, e.target.value);
  }

  const hdlSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/register', value);
      console.log(res)

      createAlert("success", "Register Success");
      
    } catch (error) {
      createAlert("info", "Register Fail");

      console.log(error.response.data.message);

    }

    console.log("Form submitted:", value);
    // คุณสามารถเพิ่มการตรวจสอบข้อมูลและส่งข้อมูลไปยังเซิร์ฟเวอร์ที่นี่
  }

  return (
    <div className="flex w-full h-full justify-end">
      <div className="w-64 border p-4 rounded-md">
        <h1 className="text-xl font-bold text-center">Register</h1>

        {/* form */}
        <form onSubmit={hdlSubmit}>
          <div className="flex flex-col gap-2 py-4">
            <input
              placeholder="Email"
              type="text"
              name="email"
              className="border w-full border-gray-400 rounded-md p-1 px-4"
              onChange={hdlOnchange}
            />

            <input
              placeholder="Firstname"
              type="text"
              name="firstname"
              className="border w-full border-gray-400 rounded-md p-1 px-4"
              onChange={hdlOnchange}
            />

            <input
              placeholder="Lastname"
              type="text"
              name="lastname"
              className="border w-full border-gray-400 rounded-md p-1 px-4"
              onChange={hdlOnchange}
            />

            <input
              placeholder="Password"
              type="password"
              name="password"
              className="border w-full border-gray-400 rounded-md p-1 px-4"
              onChange={hdlOnchange}
            />

            <input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              className="border w-full border-gray-400 rounded-md p-1 px-4"
              onChange={hdlOnchange}
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-md w-full">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;