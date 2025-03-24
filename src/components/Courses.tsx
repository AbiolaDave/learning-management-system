import { Folder, NotebookPen, Plus } from "lucide-react";
import DP from "../assets/certificate.jpg";

const Courses = () => {
  return (
    <>
      <main className="w-screen mb-32">
        <Plus className="float-end mt-7 mr-10" />
        <div className="grid grid-cols-3 justify-items-center h-full gap-y-10 pt-16 w-full">
          <div className="border rounded-lg border-slate-700 w-72 h-64">
            <div className="border h-24 pt-3 px-3">
              <h1 className="font-semibold text-xl">CSC 420</h1>
              <h3 className="font-semibold">2019/2020 Session</h3>
              <h3 className="font-semibold">Dr Dada Aborisade</h3>
            </div>
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
          <div className="border rounded-lg border-slate-700 w-72 h-64">
            <div className="border h-24 pt-3 px-3">
              <h1 className="font-semibold text-xl">CSC 420</h1>
              <h3 className="font-semibold">2019/2020 Session</h3>
              <h3 className="font-semibold">Dr Dada Aborisade</h3>
            </div>
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
          <div className="border rounded-lg border-slate-700 w-72 h-64">
            <div className="border h-24 pt-3 px-3">
              <h1 className="font-semibold text-xl">CSC 420</h1>
              <h3 className="font-semibold">2019/2020 Session</h3>
              <h3 className="font-semibold">Dr Dada Aborisade</h3>
            </div>
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
