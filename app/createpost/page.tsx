"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createfulldata } from "../api/db";
import Uploadimage from "@/components/example-uploader";
import { Plus } from "lucide-react";

export default function MyComponent() {
  const [actualcontent, setactualcontent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [actualcontentrescived, setactualcontentrescived] = useState("");
  const [imageUrlFromChild, setImageUrlFromChild] = useState("");
  const [tableofcontent, settableofContent] = useState<any>([]);
  const [renderInput, setrenderInput] = useState(["1"]);
  const [add, setadd] = useState("");
  const [edit, setedit] = useState([false]);
  function addTableC(e: any, index: number) {
    setadd(e.target.value);
  }
  function seteditIndex(index: number) {
    setedit((prevEdit) => {
      const newValue = [...prevEdit];
      newValue[index] = !newValue[index];
      return newValue;
    });
  }
  function setaddIndex(index: number) {
    setedit((prevEdit) => {
      const newValue = [...prevEdit];
      newValue[index] = !newValue[index];
      return newValue;
    });
  }
  console.log(tableofcontent);
  function addtableofcontent() {
    const c = [...renderInput, "1"];
    const value = [...edit, true];
    setedit(value);
    setrenderInput(c);
  }

  // Function to handle URL passed from child component
  const handleClientUploadComplete = (url: string) => {
    setImageUrlFromChild(url);
    // Do whatever you need to do with the URL in the parent component
  };
  async function setdata() {
    const response = await createfulldata(
      title,
      description,
      actualcontent,
      imageUrlFromChild,
      tableofcontent
    );
    alert("success");
    console.log(response);
    setactualcontentrescived(response.actualcontent);
  }
  function addtableofcontentfun(index: number) {
    const adds = [...tableofcontent];
    adds[index] = add;
    // const adds = [...tableofcontent, add];
    settableofContent(adds);
  }

  function setinputcomponents() {}
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <>
      <Card className="sm:p-20">
        <h1 className="  text-sm font-medium">Set Heading</h1>
        <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

        <>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setdescription(e.target.value)}
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your post"
          ></textarea>
        </>
        <>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Enter Table of Content
          </label>
          {renderInput.map((item: any, index: number) => (
            <>
              {" "}
              {edit[index] === true ? (
                <div className="grid grid-cols-3">
                  <div className="col-span-2">
                    <Input
                      id={item + index}
                      placeholder="Enter Table of Content Heading"
                      onChange={(e) => {
                        addTableC(e, index);
                      }}
                    />
                  </div>
                  <button
                    className="bg-indigo-400 p-1 pr-2 pl-2  rounded-md"
                    onClick={(e) => {
                      addtableofcontentfun(index);
                      setaddIndex(index);
                    }}
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3">
                  <h1 className="col-span-2 bg-slate-50 text-center font-bold text-md">
                    {tableofcontent[index]}
                  </h1>
                  <button
                    className="p-1 pr-2 pl-2 bg-gray-200 rounded-md"
                    onClick={() => {
                      seteditIndex(index);
                    }}
                  >
                    edit
                  </button>
                </div>
              )}
            </>
          ))}

          <Plus onClick={addtableofcontent} />
        </>
        <Uploadimage onClientUploadComplete={handleClientUploadComplete} />
        <>
          {" "}
          <ReactQuill
            style={{ height: "500px" }}
            theme="snow"
            value={actualcontent}
            onChange={setactualcontent}
          />
        </>
      </Card>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded"
        onClick={setdata}
      >
        Submit
      </button>
      <div dangerouslySetInnerHTML={{ __html: actualcontentrescived }} />
      {imageUrlFromChild}
    </>
  );
}
