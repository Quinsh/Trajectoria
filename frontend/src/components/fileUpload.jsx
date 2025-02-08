import React, { useState } from "react";
import { analyzeResume } from "../api";

function FileUpload({ setResult }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    const data = await analyzeResume(file);
    setResult(data);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleSubmit}>Analyze Resume</button>
    </div>
  );
}

export default FileUpload;
