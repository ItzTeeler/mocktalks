
"use client";
import { IDropZoneImage } from "@/Interfaces/Interfaces";
import { FileInput, Label } from "flowbite-react";

export function DropZoneComponent(props: IDropZoneImage) {
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    let file = e.target.files?.[0];

    if (file) {
      // console.log(((file.size/1024)/1024).toFixed(4))
      if (Number(((file.size/1024)/1024).toFixed(4)) < 5) {
        reader.onload = () => {
          props.setProfileImg(reader.result as string);
          alert("Image accepted successfully")
        };
        reader.readAsDataURL(file);
      } else {
        alert("Image is too large!")
        file = undefined;
      }
    } else {
      alert("Image set to default")
      props.setProfileImg("");
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-[150px] w-[150px] cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            className="h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>

        </div>
        <FileInput onChange={handleImage} accept='image/png, image/jpeg' id="dropzone-file" className="hidden" />
      </Label>
    </div>
  );
}