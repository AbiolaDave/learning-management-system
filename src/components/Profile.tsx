import { Mail, MapPin, PhoneCallIcon, User } from "lucide-react";
import DP from "../assets/college.jpg";

const Profile = () => {
  return (
    <>
      <main className="w-screen mb-32">
        <div className="flex justify-around">
          <div className="flex-col p-10 border border-gray-200 hover:border-gray-400 hover:shadow-slate-700 rounded-md shadow-lg shadow-slate-500 mt-10 w-96 justify-center items-center">
            <img className="rounded-full mx-auto" width={200} src={DP} alt="" />
            <h1 className="font-bold text-center text-2xl mt-4">John Doe</h1>
            <p className="text-center">john@gmail.com</p>
          </div>
          <div className="flex-col p-10 border border-gray-400  hover:border-gray-400 hover:shadow-slate-700  rounded-md shadow-lg shadow-slate-500 mt-10 w-96 justify-center items-center">
            <h1 className="font-bold flex text-lg justify-center">
              Personal Information
            </h1>
            <div className="font-semibold py-10">
              <h3 className="my-5 flex">
                <User />
                Name:
              </h3>
              <h3 className="my-5 flex">
                <Mail />
                Email:
              </h3>
              <h3 className="my-5 flex">
                <PhoneCallIcon />
                Phone No:
              </h3>
              <h3 className="my-5 flex">
                <MapPin />
                Address:
              </h3>
            </div>
          </div>
        </div>
        <div className="flex justify-around">
          <div className="flex-col p-10 border border-gray-400  hover:border-gray-400 hover:shadow-slate-700  rounded-md shadow-lg shadow-slate-500 mt-10 w-96 justify-center items-center">
            <h1 className="font-bold flex text-lg justify-center">Academics</h1>
            <div className="font-semibold py-10">
              <h3 className="my-5 flex">School:</h3>
              <h3 className="my-5">Role:</h3>
              <h3 className="my-5">Department:</h3>
              <h3 className="my-5">College:</h3>
            </div>
          </div>
          <div className="flex-col p-10 border border-gray-400  hover:border-gray-400 hover:shadow-slate-700  rounded-md shadow-lg shadow-slate-500 mt-10 w-96 justify-center items-center">
            <h1 className="font-bold flex text-lg justify-center">
              Personal Information
            </h1>
            <div className="font-semibold py-10">
              <h3 className="my-5">Name:</h3>
              <h3 className="my-5">Email:</h3>
              <h3 className="my-5">Phone No:</h3>
              <h3 className="my-5">Address:</h3>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
