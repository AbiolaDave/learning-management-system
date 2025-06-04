const ServicesComponent = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-6 mt-32">
      <h1 className="text-5xl font-bold text-blue-600 text-center mb-6">
        Our Services
      </h1>
      <p className="text-lg max-w-3xl text-center text-gray-600 mb-12">
        LMS Classroom provides a comprehensive suite of tools designed to
        improve online education for schools, teachers, and students.
      </p>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full">
    
        <div className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-blue-500 mb-3">
            Online Class Management
          </h2>
          <p className="text-gray-600">
            Easily create, manage, and schedule virtual classes. Teachers can
            track attendance, share content, and interact with students in real
            time.
          </p>
        </div>

        
        <div className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-blue-500 mb-3">
            Assignments & Grading
          </h2>
          <p className="text-gray-600">
            Create and submit assignments online. Teachers can grade and provide
            instant feedback directly through the platform.
          </p>
        </div>

    
        <div className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-blue-500 mb-3">
            Resource Sharing
          </h2>
          <p className="text-gray-600">
            Upload and organize educational resources for students. From
            documents to videos, everything is accessible 24/7.
          </p>
        </div>

     
        <div className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-blue-500 mb-3">
            Student Progress Tracking
          </h2>
          <p className="text-gray-600">
            Teachers and admins can monitor student performance through detailed
            analytics and activity logs.
          </p>
        </div>

        
        <div className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-blue-500 mb-3">
            Interactive Communication
          </h2>
          <p className="text-gray-600">
            Facilitate effective communication through announcements, direct
            messaging, and class-wide updates.
          </p>
        </div>

  
        <div className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-blue-500 mb-3">
            Secure Access & Authentication
          </h2>
          <p className="text-gray-600">
            Ensure that all users access content securely, with proper login
            credentials and role-based access control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
