import { Link } from "react-router-dom";
import Image2 from "../../assets/certificate.jpg";
import Image3 from "../../assets/college.jpg";
import Image1 from "../../assets/logo3.png";
import Image4 from "../../assets/prof.jpg";
import Style from "../../components/Dashboard.module.css";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <main
        className={`flex flex-col-reverse items-center justify-center 
              sm:flex-row sm:justify-evenly sm:items-center 
              ${Style.main}`}
      >
        <div className={Style.sty}>
          <h1
            className={`${Style.easy} font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-600`}
          >
            Easy Online Learning Management System
          </h1>
          <p
            className={`${Style.friendly} text-lg sm:text-xl md:text-2xl text-gray-800`}
          >
            A friendly environment for teachers and students to interact online
          </p>
          <div>
            <Link to={`/signup`}>
              <button
                className="text-white font-bold bg-blue-700 hover:bg-blue-800 focus:ring-4
              focus:outline-none focus:ring-blue-300 rounded-lg text-lg px-4 py-3 dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <p className="font-bold">Get Started</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-10 sm:mt-20">
          <h1 className={`${Style.ring} flex justify-center items-center`}>
            <img className="rounded-full w-48 sm:w-72" src={Image1} alt="" />
          </h1>
          <p className={`${Style.eclipse}`}></p>
          <p className={`${Style.eclipse2}`}></p>
          <p className={`${Style.eclipse3}`}></p>
          <p className={`${Style.eclipse4}`}></p>
        </div>
      </main>

      <section>
        <div className="mt-40">
          <h1 className="font-bold text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-600 mx-4 sm:mx-10 md:mx-20">
            Online classroom for students and teachers
          </h1>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-16 justify-items-center">
            <div className="max-w-xs text-center">
              <img
                className="w-full h-40 object-cover filter grayscale"
                src={Image2}
                alt=""
              />
              <h1 className="text-blue-600 font-bold text-lg mt-6">
                Effective Lesson Management and Planning
              </h1>
              <p className="text-gray-700 font-semibold mt-4">
                LMS Classroom provides teachers with an effective tool for
                lesson planning and management. Teachers can easily organize
                their lessons, create and share assignments, track students'
                progress, and provide feedback.
              </p>
              <Link to={"/about"}>
                <button className="mt-4 text-blue-500 font-bold bg-transparent rounded-lg text-lg px-4 py-3 hover:underline focus:outline-none">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="max-w-xs text-center">
              <img
                className="w-full h-40 object-cover filter grayscale"
                src={Image3}
                alt=""
              />
              <h1 className="text-blue-600 font-bold text-lg mt-6">
                Access course materials
              </h1>
              <p className="text-gray-700 font-semibold mt-4">
                LMS Classroom allows students to easily access course materials.
                Teachers can grant students access to course materials directly
                on the platform.
              </p>
              <Link to={"/about"}>
                <button className="mt-4 text-blue-500 font-bold bg-transparent rounded-lg text-lg px-4 py-3 hover:underline focus:outline-none">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="max-w-xs text-center">
              <img
                className="w-full h-40 object-cover filter grayscale"
                src={Image4}
                alt=""
              />
              <h1 className="text-blue-600 font-bold text-lg mt-6">
                Experience virtual learning
              </h1>
              <p className="text-gray-700 font-semibold mt-4">
                LMS Classroom provides students with a digital learning
                experience. Students can access course materials and assignments
                from any device and easily communicate with classmates.
              </p>
              <Link to={"/about"}>
                <button className="mt-4 text-blue-500 font-bold bg-transparent rounded-lg text-lg px-4 py-3 hover:underline focus:outline-none">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
