"use client";

import { UploadButton, UploadDropzone } from "@/src/utils/uploadthing";
import { useState } from "react";

export default function Uploadimage({
  onClientUploadComplete,
}: {
  onClientUploadComplete: (url: string) => void;
}) {
  const [imageurl, setimageurl] = useState("");
  return (
    <>
      <h1>UploadImage</h1>
      <div className="grid grid-cols-2">
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res: any) => {
            // Do something with the response
            console.log("Files: ", res);
            onClientUploadComplete(res[0].url);
            setimageurl(res[0].url);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        {imageurl.length ? <img src={imageurl} className="w-full" /> : null}
      </div>
    </>
  );
}
