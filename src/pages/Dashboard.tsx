import Image2 from "../assets/certificate.jpg";
import Image3 from "../assets/college.jpg";
import Image1 from "../assets/logo3.png";
import Image4 from "../assets/prof.jpg";
import Style from "../components/Dashboard.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className={`flex justify-evenly ${Style.main}`}>
        <div className={Style.sty}>
          <h1 className={`${Style.easy} font-bold text-5xl text-blue-600`}>
            Easy Online Learning Management Sytem
          </h1>
          <p className={`${Style.friendly} text-2xl text-gray-800`}>
            A friendly environment for teachers and students to interact online
          </p>
          <div>
            <button className="text-white font-bold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <p className="font-bold">Get Started</p>
            </button>
          </div>
        </div>
        <div className="mt-20">
          <h1 className={`${Style.ring} flex justify-center items-center`}>
            <img className="rounded-full " width={350} src={Image1} alt="" />
          </h1>
          <p className={`${Style.eclipse}`}></p>
          <p className={`${Style.eclipse2}`}></p>
          <p className={`${Style.eclipse3}`}></p>
          <p className={`${Style.eclipse4}`}></p>
        </div>
      </main>
      <section>
        <div className="mt-40">
          <h1 className="font-bold text-5xl text-purple-600 mx-40">
            Online classroom for students and teachers
          </h1>
          <div className={`${Style.gridContainer}`}>
            <div className={`${Style.gridItems}`}>
              <img
                className={`${Style.gridImage}`}
                src={Image2}
                width={300}
                alt=""
              />
              <h1 className="text-purple-600">
                Effective Lesson Management and Planning
              </h1>
              <p className="text-gray-700">
                LMS Classroom provides teachers with an effective tool for
                lesson planning and management. Teachers can easily organize
                their lessons, create and share assignments, track students'
                progress, and provide feedback.
              </p>
              <button className="text-purple-500 font-bold bg-white-700 focus:outline-none rounded-lg text-lg px-4 py-3 dark:bg-white-600">
                Learn More
              </button>
            </div>
            <div className={`${Style.gridItems}`}>
              <img
                className={`${Style.gridImage}`}
                src={Image3}
                width={300}
                alt=""
              />
              <h1 className="text-purple-600">Access course materials</h1>
              <p className="text-gray-700">
                LMS Classroom allows students to easily access course materials.
                Teachers can grant students access to course materials directly
                on the platform.
              </p>
              <button className="text-purple-500 font-bold bg-white-700 focus:outline-none rounded-lg text-lg px-4 py-3 dark:bg-white-600">
                Learn More
              </button>
            </div>
            <div className={`${Style.gridItems}`}>
              <img
                className={`${Style.gridImage}`}
                src={Image4}
                width={300}
                alt=""
              />
              <h1 className="text-purple-600">Experience virtual learning</h1>
              <p className="text-gray-700">
                LMS Classroom provides students with a digital learning
                experience. Students can access course materials and assignments
                from any device and easily communicate with classmates.
              </p>
              <button className="text-purple-500 font-bold bg-white-700 focus:outline-none rounded-lg text-lg px-4 py-3 dark:bg-white-600">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
