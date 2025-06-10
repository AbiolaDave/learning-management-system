import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import image from "../../assets/ChatGPT Image May 21, 2025, 06_35_58 PM.png";

const SignUpComponent = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [next, setNext] = useState<Boolean>(false);

  let url = `${import.meta.env.VITE_API_URL}/admin/auth/signup`;

  const readAsBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const formik = useFormik({
    initialValues: {
      schoolName: "",
      email: "",
      adminEmail: "",
      phoneNumber: "",
      address: "",
      schoolType: "",
      adminName: "",
      password: "",
      confirmPassword: "",
      schoolEmail: "",
      adminId: "",
      gender: "",
      profilePicture: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values.profilePicture);
      if (values.profilePicture) {
        values.profilePicture = await readAsBase64(
          values.profilePicture as unknown as File
        );
      }

      const schoolId = uuidv4();

      const payload = {
        ...values,
        schoolId: schoolId,
      };

      await axios
        .post(url, payload)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log(
              "hello",
              response.data.status,
              response.data.Admintoken
            );
            localStorage.Admintoken = response.data.Admintoken;
            navigate("/dashboard");
          } else {
            navigate("/");
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          alert("There was an error signing up. Please try again.");
          setDisabled(false);
          console.error("There was an error!", error);
        });
    },
    validationSchema: yup.object({
      schoolEmail: yup
        .string()
        .required("This field is required")
        .email("Please enter a valid email"),
      schoolName: yup.string().required("This field is required"),
      password: yup.string().required("This field is required"),
      confirmPassword: yup
        .string()
        .required("Confirm password must match password")
        .oneOf([yup.ref("password")], "Passwords must match"),
      adminEmail: yup.string().required("This field is required"),
      phoneNumber: yup.string().required("This field is required"),
      address: yup.string().required("This field is required"),
      schoolType: yup.string().required("This field is required"),
      adminName: yup.string().required("This field is required"),
      gender: yup.string().required("This field is required"),
    }),
  });
  return (
    <div className="flex flex-col md:flex-row w-full h-full md:h-screen overflow-y-auto md:overflow-visible">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 text-blue-600">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md border rounded-3xl space-y-2 p-6"
        >
          <h1 className="text-xl md:text-2xl font-bold">LMS</h1>
          <h2 className="text-lg md:text-xl font-semibold">Sign Up</h2>

          {!next ? (
            <>
              <h2 className="text-2xl font-bold">School Details</h2>

              <input
                placeholder="School Name"
                className={
                  formik.touched.schoolName && formik.errors.schoolName
                    ? "w-full text-red-600 font-semibold border border-red-600  placeholder:text-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
                }
                name="schoolName"
                onChange={formik.handleChange}
                value={formik.values.schoolName}
                onBlur={formik.handleBlur}
                type="text"
              />
              <div className="text-red-600">
                {formik.touched.schoolName && formik.errors.schoolName}
              </div>
              <input
                className={
                  formik.touched.schoolEmail && formik.errors.schoolEmail
                    ? "w-full text-red-600 font-semibold border border-red-600  placeholder:text-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
                }
                name="schoolEmail"
                onChange={formik.handleChange}
                value={formik.values.schoolEmail}
                onBlur={formik.handleBlur}
                placeholder="School Email Address"
                type="email"
              />
              <div className="text-red-600">
                {formik.touched.schoolEmail && formik.errors.schoolEmail}
              </div>

              <select
                name="schoolType"
                value={formik.values.schoolType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.schoolType && formik.errors.schoolType
                    ? "w-full text-red-600 font-semibold border border-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 rounded px-4 py-1"
                }
              >
                <option value="">Select School Type</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="university">University</option>
                <option value="college">College</option>
              </select>
              <div className="text-red-600">
                {formik.touched.schoolType && formik.errors.schoolType}
              </div>
              <button
                type="button"
                onClick={() => {
                  setNext(true);
                  // setPrev(true);
                }}
                className="px-6 flex float-end bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <input
                className={
                  formik.touched.adminName && formik.errors.adminName
                    ? "w-full text-red-600 font-semibold border border-red-600  placeholder:text-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
                }
                name="adminName"
                onChange={formik.handleChange}
                value={formik.values.adminName}
                onBlur={formik.handleBlur}
                placeholder="Admin Full Name"
                type="text"
              />
              <div className="text-red-600">
                {formik.touched.adminName && formik.errors.adminName}
              </div>
              <input
                className={
                  formik.touched.adminEmail && formik.errors.adminEmail
                    ? "w-full text-red-600 font-semibold border border-red-600  placeholder:text-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
                }
                name="adminEmail"
                onChange={formik.handleChange}
                value={formik.values.adminEmail}
                onBlur={formik.handleBlur}
                placeholder="Admin Email"
                type="email"
              />
              <input
                className={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "w-full text-red-600 font-semibold border border-red-600  placeholder:text-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
                }
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur}
                placeholder="Phone Number"
                type="text"
              />
              <div className="text-red-600">
                {formik.touched.phoneNumber && formik.errors.phoneNumber}
              </div>
              <div className="text-red-600">
                {formik.touched.adminEmail && formik.errors.adminEmail}
              </div>
              <input
                className={
                  formik.touched.address && formik.errors.address
                    ? "w-full text-red-600 font-semibold border border-red-600  placeholder:text-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
                }
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                onBlur={formik.handleBlur}
                placeholder="Address"
                type="text"
              />
              <div className="text-red-600">
                {formik.touched.address && formik.errors.address}
              </div>
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.gender && formik.errors.gender
                    ? "w-full text-red-600 font-semibold border border-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 rounded px-4 py-1"
                }
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              <input
                className={
                  formik.touched.password && formik.errors.password
                    ? "w-full text-red-600 font-semibold border border-red-600  placeholder:text-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
                }
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                placeholder="Password"
                type="password"
              />
              <div className="text-red-600">
                {formik.touched.password && formik.errors.password}
              </div>
              <input
                className={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "w-full text-red-600 font-semibold border border-red-600  placeholder:text-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
                }
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
                type="password"
              />
              <div className="text-red-600">
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </div>
              <input
                className={
                  formik.touched.adminId && formik.errors.adminId
                    ? "w-full text-red-600 font-semibold border border-red-600  placeholder:text-red-600 rounded px-4 py-1"
                    : "w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
                }
                name="adminId"
                onChange={formik.handleChange}
                value={formik.values.adminId}
                onBlur={formik.handleBlur}
                placeholder="Admin ID"
                type="text"
              />
              <div className="text-red-600">
                {formik.touched.adminId && formik.errors.adminId}
              </div>
              <div className="md:col-span-2 flex">
                <label className="block font-bold text-blue-600 mb-1 mr-3 text-nowrap">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      formik.setFieldValue("profilePicture", file);
                    }
                  }}
                  className="w-full text-sm text-gray-700 font-bold file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded"
                />
                {formik.values.profilePicture &&
                  typeof formik.values.profilePicture === "object" && (
                    <img
                      src={URL.createObjectURL(formik.values.profilePicture)}
                      alt="Preview"
                      className="w-20 h-20 mt-2 object-cover rounded-full"
                    />
                  )}
              </div>
              <div>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                ) : null}
              </div>
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setNext(false);
                  }}
                  className="px-6 flex float-start bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={disabled}
                  onClick={() => setDisabled(true)}
                  className="px-6 flex float-end bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Login
                  </a>
                </p>
              </div>
            </>
          )}
        </form>
      </div>

      <div className="w-1/2 relative h-full border-l-4  flex items-center justify-center bg-white">
        <div className="absolute left-0 top-0 h-full w-1 bg-white"></div>

        <img
          src={image}
          alt="Signup Illustration"
          className="w-80 max-w-[80%] object-contain"
        />
      </div>
    </div>
  );
};

export default SignUpComponent;
