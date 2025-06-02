import image from "../../assets/ChatGPT Image May 21, 2025, 06_35_58 PM.png";

const RegisterStudent = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 flex items-center h-full justify-center bg-white p- text-blue-600">
        <form className="w-full max-w-md  mt-15 border  rounded-3xl space-y-2 p-6 px-10">
          <h1 className="text-2xl font-bold">LMS Classroom</h1>
          <h2 className="text-2xl font-bold">
            Easy Online Learning Management System
          </h2>
          <h2 className="text-xl font-semibold">Register Student</h2>

          <input
            className="w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
            placeholder="Full name"
            type="text"
          />
          <input
            className="w-full font-semibold border border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
            placeholder="Email"
            type="email"
          />
          <input
            className="w-full font-semibold border  border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
            placeholder="Gender"
            type="text"
          />
          <input
            className="w-full font-semibold border  border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
            placeholder="Date of birth"
            type="date"
          />
          <input
            className="w-full font-semibold border  border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
            placeholder="Class/Grade"
            type="text"
          />
          <input
            className="w-full font-semibold border  border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
            placeholder="Student ID"
            type="text"
          />
          <input
            className="w-full font-semibold border  border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
            placeholder="Password"
            type="password"
          />
          <input
            className="w-full font-semibold border  border-blue-600 text-blue-600 placeholder:text-blue-600 rounded px-4 py-1"
            placeholder="Confirm Password"
            type="password"
          />
          <button
            type="submit"
            className="px-6 flex float-end bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
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

export default RegisterStudent;
