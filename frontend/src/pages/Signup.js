import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import signin from "../assets/signin.gif";
import imageToBase64 from "../utils/imageToBase64";
import SummaryApi from "../common/index";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    ProfilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imagePic = await imageToBase64(file);
      setData((prev) => {
        return { ...prev, ProfilePic: imagePic };
      });
    } else {
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataResult = await dataResponse.json();
      if (dataResult.success) {
        toast.success(dataResult.message);
        navigate("/login");
      } 

      if (dataResult.error) {
        toast.error(dataResult.message);
      }
      
    } else {
      toast.error("Password and Confirm Password do not match");
    }
  };

  return (
    <section id="signup" className="mb-14">
      <div className="container mx-auto p-4 mt-[60px]">
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden relative">
            <img src={data.ProfilePic || signin} alt="Profile" />
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 cursor-pointer absolute pb-4 pt-2 text-center bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form
            className="mt-6 pt-6 flex flex-col gap-3"
            onSubmit={handleOnSubmit}
          >
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={data.name}
                  required
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={data.email}
                  required
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  value={data.password}
                  required
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  required
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 mt-10 w-full max-w-[150px] rounded-full mx-auto hover:scale-110 transition-all duration-200 block">
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-md">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
