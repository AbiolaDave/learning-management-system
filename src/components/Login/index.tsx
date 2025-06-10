import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import image from "../../assets/ChatGPT Image May 21, 2025, 06_35_58 PM.png";
import { useAuth } from "../../context/Auth/AuthContext";

const LoginComponent = () => {
  let navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setAdminData } = useAuth();

  let url = `${import.meta.env.VITE_API_URL}/admin/auth/login`;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values, "Form Values");
      await axios
        .post(url, values)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setAdminData(response.data);
            console.log(response.data);
            localStorage.AdminEmail = response.data.data.user.email;
            localStorage.AdminRole = response.data.data.user.role;
            localStorage.AdminSchool = response.data.data.user.school;
            localStorage.token = response.data.token;
            console.log("Fetched Response from backend", response.data);
            localStorage.setItem("AdminData", JSON.stringify(response.data));
            navigate("/dashboard");
          } else {
            alert("Incorrect details");
            setDisabled(false);
            // navigate("/");
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          alert("Incorrect details");
          setDisabled(false);
          console.error("There was an error!", error);
        });
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("This field is required")
        .email("Please enter a valid email"),
      password: yup.string().required("This field is required"),
    }),
  });

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 text-blue-600">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md border rounded-3xl space-y-4 p-6"
        >
          <h1 className="text-xl md:text-2xl font-bold">LMS Classroom</h1>
          <h2 className="text-lg md:text-xl font-bold">
            Easy Online Learning Management System
          </h2>
          <h2 className="text-base md:text-lg font-semibold">Login</h2>

          <input
            className={
              formik.touched.email && formik.errors.email
                ? "w-full text-red-600 font-semibold border border-red-600 placeholder:text-red-600 rounded px-4 py-2"
                : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-2"
            }
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            placeholder="Email"
            type="email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600 text-sm">{formik.errors.email}</div>
          )}

          <input
            className={
              formik.touched.password && formik.errors.password
                ? "w-full text-red-600 font-semibold border border-red-600 placeholder:text-red-600 rounded px-4 py-2"
                : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-2"
            }
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            placeholder="Password"
            type="password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-600 text-sm">{formik.errors.password}</div>
          )}

          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={disabled}
            className="px-6 w-full md:w-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign Up
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Forgot your password?{" "}
            <a
              href="/reset-password"
              className="text-blue-600 hover:underline font-semibold"
            >
              Reset Password
            </a>
          </p>
        </form>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 border-t md:border-t-0 md:border-l">
        <img
          src={image}
          alt="Signup Illustration"
          className="w-72 md:w-80 max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default LoginComponent;
