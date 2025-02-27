import { OpenAI } from "openai";
import pdfToText from "react-pdftotext";

//git commit --amend --all
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // TODO: Move this to backend but for now it's fine
});

let resume_cache = null;

async function extractWordsFromPdf(file) {
  if (!file) return;

  // Ensure the file is a PDF
  if (file.type !== "application/pdf") {
    console.log("Not a PDF file");
    return;
  }

  // pdfToText(file).then((text) => {
  //   return text;
  // })
  // .catch(error => console.error("Failed to extract text from pdf")) //TODO: Probalby should return an error here

  return await pdfToText(file);
}

/**
 * 
 * @param {*} arr array of career paths
 * @param {*} column column name to perform softmax on
 */
function softmaxHelper(arr, column) { 
    // Run a softmax on the output percentage
    const exp = [];
    const multiplier = Math.random() * 4 + 7;
    for (let i = 0; i < arr.length; i++) {
      exp.push(Math.exp(arr[i][column] * multiplier));
      //TODO: Should normalize the data instead of magic number
    }
    const expSum = exp.reduce((a, b) => a + b, 0);
    for (let i = 0; i < arr.length; i++) {
      arr[i][column] = exp[i] / expSum;
    }
    //end softmax
}

/**
 * Returns a list of career paths based on the resume.
 * @param {*} file
 * @returns
 */
async function getCareerPaths(file) {
  resume_cache = await extractWordsFromPdf(file);

  const prompt = `
    Take this resume and tell me in at most two words what career path is suitable for me. 
    Be as specific as possible. For example, AI researcher instead of researcher. 
    Give top 5 options, along with a confidence of how much the resume matches the title, and nothing else. 1 means are you highly confident, 0.5 means you are unsure.
    The data should be formated as a list of json objects, like this:
    {
    "careers" : [{"title": "AI Engineer", "confidence": 0.673} ... ]
    }
    Provide only a JSON response without any markdown formatting or triple backticks.
    `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: resume_cache.concat(prompt) }],
  });

  const responseString = response.choices[0].message.content;
  const responseJSON = JSON.parse(responseString);
  // const responseJSON = {
  //   "careers" : [{"career": "AI Researcher", "confidence": 0.9}, {"career": "Data Scientist", "confidence": 0.8}, {"career": "Software Engineer", "confidence": 0.7}, {"career": "Machine Learning Engineer", "confidence": 0.6},{"career": "Data Analyst", "confidence": 0.5}]
  //   } // for test

  softmaxHelper(responseJSON.careers, "confidence");

  return responseJSON;
}

async function peopleSearch(careers) { 
  const results = [];

  // Loop through each career path and fetch data
  for (let careerPath of careers) {
    //endpoint for finding people in the given career path.
    const url = `https://api-proxy.zhuyiyun060209.workers.dev/api_apollo/v1/mixed_people/search?person_titles[]=${encodeURIComponent(
      careerPath.title
    )}&person_locations[]=United%20States&per_page=3`;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "x-api-key": "DOj4oWhivdNlm2Ov2Hinug",
      },
    };

    // Fetch data for each career path
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      // Store all 3 people for each career path
      if (data.people && data.people.length > 0) {
        for (let i = 0; i < data.people.length; i++) {
          const enrichURL = `https://api-proxy.zhuyiyun060209.workers.dev/api_apollo/v1/people/match?first_name=${data.people[i].first_name}&last_name=${data.people[i].last_name}&linkedin_url=${data.people[i].linkedin_url}&reveal_personal_emails=true&reveal_phone_number=false`;

          // fetch(enrichURL, options)
          //   .then((res) => res.json())
          //   .then((json) => console.log(json.person.email))
          //   .catch((err) => console.error(err));

          const individualResponse = await fetch(enrichURL, options);
          const individualDate = await individualResponse.json();

          results.push({
            careerPath: careerPath.title,
            first_name: data.people[i].first_name,
            last_name: data.people[i].last_name,
            city: data.people[i].city,
            headline: data.people[i].headline,
            linkedin_url: data.people[i].linkedin_url,
            seniority: data.people[i].seniority,
            title: data.people[i].title,
            email: individualDate.person.email,
            photo_url: individualDate.person.photo_url,
          });
        }
      } else {
        // Handle case where no people are found for the career path
        for (let i = 0; i < 3; i++) {
          results.push({
            careerPath: careerPath,
            first_name: null,
            last_name: null,
            city: null,
            headline: null,
            linkedin_url: null,
            seniority: null,
            title: null,
          });
        }
      }
    } catch (err) {
      console.error(`Error fetching data for career path: ${careerPath}`, err);
    }
  }

  return results;
}

async function getNiche(topCareer) {
  const prompt = `
  Take this resume and this career path: ${topCareer}, tell me in at most two words what niche within that career is suitable for me. 
  Be as specific as possible. For example, computing architecture instead of backend engineer. 
  Give top 5 options, along with a confidence of how much the resume matches the niche, and nothing else. 1 means are you highly confident, 0.5 means you are unsure.
  The data should be formated as a list of json objects, like this:
  {
  "niches" : [{"title": "Title1", "confidence": 0.673} ... ]
  }
  Provide only a JSON response without any markdown formatting or triple backticks.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: resume_cache.concat(prompt) }],
  });

  const responseJSON = JSON.parse(response.choices[0].message.content);

  softmaxHelper(responseJSON.niches, "confidence");

  return responseJSON;
}

export async function analyzeResume(file) {
  const careerPaths = await getCareerPaths(file);
  // const results = await peopleSearch(careerPaths.careers);
  const [contacts, niches] = await Promise.all([peopleSearch(careerPaths.careers), getNiche(careerPaths.careers[0].title)]);
  

  careerPaths["contacts"] = contacts;
  careerPaths["niches"] = niches["niches"];
  console.log(careerPaths);
  return careerPaths;
}
