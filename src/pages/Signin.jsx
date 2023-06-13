import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [formState, setFormState] = useState(initialState);
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  const handleloginIn = async () => {
    try {
      axios(
        "https://notes-api-backend-one.vercel.app/user/signin",
        {
          method: "POST",
          data: formState,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          console.log("sucessfully Logedin");
          navigate("/");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[80%] h-[60%] md:w-fit p-4 bg-white rounded-md  flex flex-col items-center  gap-2	pt-3">
      <h1 className="text-black text-3xl font-semibold text-center">
        Login Here
      </h1>
      <input
        onChange={handleFormChange}
        id="email"
        label={"Mail"}
        type={"email"}
        placeholder={"Enter Your Mail"}
      />
      <input
        onChange={handleFormChange}
        id="password"
        label={"Password"}
        type={"password"}
        placeholder={"Enter Your password"}
      />
      <div className="flex">
        <span>Dosen't have a account?</span>
        <Link to="/Signup" className="text-blue-900">
          Create Here
        </Link>
      </div>
      <button
        type="button"
        onClick={handleloginIn}
        className="bg-purple-500 text-center text-xl text-white rounded-lg p-1 hover:bg-purple-400"
      >
        Login
      </button>
    </div>
  );
};

export default Signin;
