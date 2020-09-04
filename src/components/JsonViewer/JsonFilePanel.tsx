import React, { useRef, useState } from "react";
import "./JsonFilePanel.css";
import { Inbox } from "react-feather";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

type props = {
  handleNewJsonFile: (json: string) => void;
};

const JsonFilePanel: React.FC<props> = ({ handleNewJsonFile }) => {
  const fileUploader = useRef<HTMLInputElement>(null);
  const [dragEntered, setDragEntered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickBtn = (_: any) => {
    fileUploader!.current!.click();
  };

  const handleDropFile = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    let dt = e.dataTransfer;
    let files = dt.files;

    setDragEntered(false);
    readFile(files[0]);
  };

  const handleInputChange = (event: any) => {
    if (!event.target.files.length) {
      return;
    }
    const fileUploaded = event.target.files[0];

    readFile(fileUploaded);
  };

  const readFile = (fileUploaded: any) => {
    var reader = new FileReader();
    setIsLoading(true);
    reader.onload = (e) => {
      const fileContent = e.target?.result;
      handleNewJsonFile(fileContent as string);
      setIsLoading(false);
    };

    // Read in the image file as a data URL.
    reader.readAsText(fileUploaded);
  };

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <Spinner />
        </div>
      )}
      <input
        hidden
        type="file"
        ref={fileUploader}
        accept=".json"
        onChange={handleInputChange}
      />
      <h2>File Uploader</h2>
      <button className="button-file-upload" onClick={handleClickBtn}>
        Upload a File
      </button>
      <div className="file-upload-separator">-- OR --</div>
      <div
        className={"file-upload-drop" + (dragEntered ? " drag-enter" : "")}
        onDrop={handleDropFile}
        onDragEnter={() => setDragEntered(true)}
        onDragLeave={() => setDragEntered(false)}
        onDragOver={(e) => e.preventDefault()}
      >
        <Inbox />
        <div>Drop your files here</div>
      </div>
    </>
  );
};

export default JsonFilePanel;
