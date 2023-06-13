import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [formState, setFormState] = useState(initialState);
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignup = async () => {
    console.log(formState);
    try {
      axios(
        "https://notes-api-backend-one.vercel.app/user/signup",
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
          navigate("/");
          console.log("sucessfully Signedup");
        })
        .catch((err) => console.log(err));

      //   toast.success("sucessfully signup");
    } catch (error) {
      //   toast.error("some error");
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-[80%] h-[60%] md:w-fit bg-white m-auto rounded-md flex flex-col justify-center items-center gap-2	p-6">
        <form action="">
          <h1 className="text-black text-3xl font-semibold text-center">
            Create Student Account
          </h1>
          <input
            onChange={handleFormChange}
            id="username"
            label={"Name"}
            type={"username"}
            placeholder={"Enter Your Name"}
          />
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
          <input
            onChange={handleFormChange}
            id="confirmpassword"
            label={"Confirm Password"}
            type={"password"}
            placeholder={"Confirm Your password"}
          />
          <div className="flex gap-8">
            <span>Already have a account?</span>
            <Link to="/Login" className="text-blue-900">
              Login Here
            </Link>
          </div>
          <button
            type="button"
            onClick={() => {
              handleSignup(formState);
            }}
            className="bg-purple-500 text-center text-xl text-white rounded-lg p-1 hover:bg-purple-400"
          >
            Create Account
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
