import Logo from "../assets/logo1.png";

const CreateSchool = () => {
  return (
    <>
      <main className="">
        <div className="w-full border mt-20 mb-20 shadow-lg rounded max-w-lg mx-auto pt-20">
          <div className="flex justify-center gap-5">
            <img
              src={Logo}
              width={50}
              className="rounded-full shadow-lg"
              alt=""
            />
            <h1 className="font-bold text-3xl text-purple-600 mt-2">
              Register New School
            </h1>
          </div>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            action=""
          >
            <div className="mb-4">
              <label
                className="block text-purple-500 text-sm font-bold mb-2"
                htmlFor=""
              >
                School Name:
              </label>
              <input
                className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-purple-500 leading-tight hover:border-purple-500 focus:border-purple-600 focus:shadow-outline"
                id="School Name"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-purple-500 text-sm font-bold mb-2"
                htmlFor=""
              >
                Country:
              </label>
              <input
                className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-purple-500 hover:border-purple-500 leading-tight focus:border-purple-600 focus:shadow-outline"
                id="School Name"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="flex relative w-100 mb-4">
              <label
                className="block text-purple-500 text-sm font-bold mb-2"
                htmlFor=""
              >
                Size:
              </label>
              <select
                className="flex w-40 mx-5 bg-white border text-purple-500 border-purple-300 hover:border-purple-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:border-purple-600 focus:shadow-outline"
                name=""
                id=""
              >
                <option value="">Small(1 - 100)</option>
                <option value="">Small(101 - 1000)</option>
                <option value="">Small(1001+)</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-purple-500 text-sm font-bold mb-2"
                htmlFor=""
              >
                Description:
              </label>
              <textarea
                className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-purple-500 leading-tight hover:border-purple-500 focus:border-purple-600 focus:shadow-outline"
                name=""
                id=""
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-purple-500 text-sm font-bold mb-2"
                htmlFor=""
              >
                School Email:
              </label>
              <input
                className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-purple-500 leading-tight hover:border-purple-500 focus:border-purple-600 focus:shadow-outline"
                type="email"
              />
            </div>
            <div className="mb-4">
              <label
                className=" text-purple-500 text-sm font-bold mb-2"
                htmlFor=""
              >
                School Logo:
              </label>
              <input
                className=" mx-3 text-purple-500 border-none"
                type="file"
                accept=".jpg, .jpeg, .png, .svg"
              />
            </div>
            <div className="mb-4">
              <input type="checkbox" />
              <label
                className="mx-3 text-purple-500 text-sm font-bold mb-2"
                htmlFor=""
              >
                I accept all terms & conditions
              </label>
            </div>
            <button className="bg-white w-full hover:bg-purple-500 hover:text-white text-purple-600 font-semibold py-2 px-4 border border-purple-400 rounded shadow">
              Register School
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateSchool;
