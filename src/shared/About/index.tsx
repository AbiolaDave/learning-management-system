import image3 from "../../assets/6bbe76a0-a947-4b37-ac5e-69e9b6c1beec.png";
import image1 from "../../assets/ChatGPT Image May 20, 2025, 04_38_20 PM.png";
import image2 from "../../assets/ChatGPT Image May 20, 2025, 04_43_36 PM.png";
import Style from "../../components/Dashboard.module.css";

const AboutComponents = () => {
  return (
    <>
      <div className="w-full flex flex-col mt-32 justify-center text-center">
        <h1 className={`${Style.easy} font-bold text-5xl text-blue-600`}>
          About LMS Classroom
        </h1>
        <h2 className="text-4xl font-semibold text-blue-500 mt-10 md:text-3xl">
          Easy Online Learning Management System
        </h2>
        <p className="text-2xl font-medium mx-auto mt-5 leading-normal text-gray-600 max-w-4xl md:max-w-xl">
          LMS Classroom is a user-friendly platform designed to enhance the
          online learning experience for both teachers and students. Our goal is
          to provide a digital space where education is accessible, organized,
          and interactive — anytime, anywhere.
        </p>
      </div>
      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-around gap-10 mt-20 px-4">
        <div className="max-w-xl md:max-w-md leading-normal text-center md:text-left">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            A Friendly Learning Environment
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
            We foster a collaborative environment where teachers and students
            can interact seamlessly. Whether you're delivering lessons or
            completing assignments, LMS Classroom makes communication and
            engagement easy and effective.
          </p>
        </div>

        <div className="max-w-md w-full">
          <img
            src={image1}
            alt="Learning Environment"
            className="w-full h-auto"
          />
        </div>
      </div>

    
      <div className="w-full flex flex-col-reverse md:flex-row-reverse justify-around items-center gap-10 mt-20 px-4">
        <div className="max-w-xl md:max-w-md leading-normal text-center md:text-left">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            Effective Lesson Management and Planning
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-normal">
            Teachers have access to powerful tools that simplify lesson planning
            and classroom management. With LMS Classroom, educators can:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-4 text-left">
            <li>Organize and schedule lessons</li>
            <li>Create and share assignments</li>
            <li>Track student progress</li>
            <li>Provide timely feedback</li>
          </ul>
        </div>
        <div className="max-w-md w-full">
          <img src={image2} alt="Lesson Planning" className="w-full h-auto" />
        </div>
      </div>


      <div className="w-full flex mb-6 flex-col md:flex-row justify-around items-center gap-10 mt-20 px-4">
        <div className="max-w-xl md:max-w-md leading-normal text-center md:text-left">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            Instant Access to Course Materials
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
            Students can easily view and download learning resources shared by
            their teachers. All materials are stored securely on the platform,
            ensuring that learners can access what they need — whenever they
            need it.
          </p>
        </div>
        <div className="max-w-md w-full">
          <img src={image3} alt="Course Materials" className="w-full h-auto" />
        </div>
      </div>
    </>
  );
};

export default AboutComponents;
