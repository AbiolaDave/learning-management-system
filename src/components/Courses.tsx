import { Folder, NotebookPen } from "lucide-react";
import DP from "../assets/certificate.jpg";

const Courses = () => {
  return (
    <>
      <main className="w-screen mb-32">
        <div className="grid grid-cols-3 w-full justify-center text-center mx-auto">
          <div className="border rounded-lg border-slate-700 w-64 h-64">
            <div className="border h-24"></div>
            <div className="border h-28">
              <img
                className="rounded-full relative float-end -mt-12 mr-5"
                width={100}
                src={DP}
                alt=""
              />
            </div>
            <div className="flex float-end mr-5 gap-5 mt-4">
              <NotebookPen className="" />
              <Folder />
            </div>
          </div>
          <div className="border rounded-lg border-slate-700 w-64 h-64">
            <div className="border h-24"></div>
            <div className="border h-28">
              <img
                className="rounded-full relative float-end -mt-12 mr-5"
                width={100}
                src={DP}
                alt=""
              />
            </div>
            <div className="flex float-end mr-5 gap-5 mt-4">
              <NotebookPen className="" />
              <Folder />
            </div>
          </div>
          <div className="border rounded-lg border-slate-700 w-64 h-64">
            <div className="border h-24"></div>
            <div className="border h-28">
              <img
                className="rounded-full relative float-end -mt-12 mr-5"
                width={100}
                src={DP}
                alt=""
              />
            </div>
            <div className="flex float-end mr-5 gap-5 mt-4">
              <NotebookPen className="" />
              <Folder />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Courses;
