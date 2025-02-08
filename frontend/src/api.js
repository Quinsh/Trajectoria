export async function analyzeResume(file) {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("http://localhost:8000/analyze-resume", {
      method: "POST",
      body: formData,
    });
  
    return response.json();
  }
