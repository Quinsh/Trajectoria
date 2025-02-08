const {OpenAI} = require('openai');

//git commit --amend --all
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const testPrompt = `
650-334-8141 | zhuyiyun060209@gmail.com | LinkedIn | GitHub |
Education
Grinnell College Grinnell, IA
Bachelor of Arts in Computer Science August. 2024 – June 2028
• GPA: 4.0 / 4.0
• CS coursework: Software Design, Algorithms, Data Structures, Programming Languages, Computer Architecture
Experience
Co-founder
CityPlug 2021 – 2024
• Led the development effort by creating the main algorithm by using DBSCAN, SciPy, Numpy, Sk-Learn, and
GeoPandas, creating a web data-visualizer using JavaScript, Mapbox, ExpressJS, and NodeJS, essential to the
success of our MVP.
• Led the company through the seeding, development, and funding stages by building and testing a minimum viable
product, securing $11k in grants from the 1517 Fund in San Diego.
• Engaged with industry professionals, non-profits, government officials, and investors through strategic outreach and
presentations, increasing visibility and interest in CityPlug.
Software Developer / Project Manager
Peninsula Robotics 2021 – 2024
• Led the development of general robot functionalities and superstructure using Git, Java, Python, PID, State-Space
Modeling, Trajectory Optimization and building robot simulations, improving robot performance and team
efficiency.
• Built a fingerprint sign-in system to streamline lab hour monitoring using MongoDB, Python, and ReactJS,
enhancing efficiency in team management.
• Built hardware integrated systems for logging and data collection using JNI, Wpilib (Hardware Abstraction Layer),
Java, and Gradle, greatly expedited and automated post-match analysis and trouble shooting.
Backend developer
Webbet May 2024 – August 2024
• Created an AI discord moderator for an online betting platform using ExpressJS, NodeJS, DiscordJs, and
GPT-API. Structured Postgres SQL database for user information and activity history. Created a recommendation
system based on current events and user history.
Software Engineering Intern
Qoom November 2024 – Present
• Created pipeline to evaluate top performing LLM models on coding tasks using Huggingface, greatly expedited
developement cycle.
• Integrated back-end API with LLM for programming assistance using NodeJS, eliminating a major roadblock.
Projects
Fingerprint Logger August 2022 – September 2022
• Developed software of a fingerprint sensor for a lab sign in system that allows organizations to track time
contributions from members. See project: github.com/HandsomeSB/Fingerprint Logger
• Created with Python, ReactJS, MongoDB, Tinkerboard, Adafruit
Peninsula Logger 2023
• Created an API that allows the main robot program to interact with the hardware abstraction layer, obtaining
hidden hardware level metrics such as voltage, memory utilization, and CPU temperature
• Created with Flatbuffer, WPILib, C++, Java, JNI.
Skills
Languages(most to least proficient): Python, Java, C++, Javascript, HTML, CSS, SQL
Technologies: Git, Pandas, SciPy, NumPy, scikit-learn, Tensorflow, GeoPandas, GPT-API, MongoDB, PostgreSQL,
ReactJS, ExpressJs, Mapbox
`
const fs = require('fs');
const pdf = require('pdf-parse');

// Function to extract words from PDF
const extractWordsFromPdf = (pdfPath) => {
  // Read the PDF file
  const dataBuffer = fs.readFileSync(pdfPath);

  // Parse the PDF content
  pdf(dataBuffer).then((data) => {
    // Extract all the text from the PDF
    const text = data.text;
    // Print all words
    console.log(text);
  }).catch((err) => {
    console.error('Error extracting PDF content:', err);
  });
};

//export
async function analyzeResume(file) {
    // const formData = new FormData();
    // formData.append("file", file);
  
    // const response = await fetch("http://localhost:8000/analyze-resume", {
    //   method: "POST",
    //   body: formData,
    // });
  
    // return response.json();

    const prompt = "Take this resume and tell me in just one word what career path is suitable for me. Be as specific as possible. For example, AI researcher instead of researcher. Just output the position name I should target and nothing else. Comma separated. Give top 5 options. " 

    const response = await openai.chat.completions.create({
      model:"gpt-4o",
      messages: [{role:"user", content:testPrompt.concat(prompt)}]
    })

    const responseString = response.choices[0].message.content;
    console.log(responseString);
    console.log(responseString.split(","));

  }


  analyzeResume(extractWordsFromPdf("/Users/yiyunzhu/Files/resume/Orion.pdf"));
