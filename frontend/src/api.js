import { OpenAI } from 'openai';
import pdfToText from 'react-pdftotext'

//git commit --amend --all
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true  // TODO: Move this to backend but for now it's fine
});

async function extractWordsFromPdf(file) {
  if (!file) return;

  // Ensure the file is a PDF
  if (file.type !== 'application/pdf') {
    console.log('Not a PDF file');
    return;
  }

  // pdfToText(file).then((text) => {
  //   return text;
  // })
  // .catch(error => console.error("Failed to extract text from pdf")) //TODO: Probalby should return an error here

  return await pdfToText(file);
}

/**
 * Returns a list of career paths based on the resume.
 * @param {*} file 
 * @returns 
 */
async function getCareerPaths(file) {
    const resume = await extractWordsFromPdf(file);

    const prompt = `
    Take this resume and tell me in just one word what career path is suitable for me. 
    Be as specific as possible. For example, AI researcher instead of researcher. 
    Give top 5 options, along with a percentage of how confident you are in each, and nothing else.
    The data should be formated as a list of json objects, like this:
    {
    "careers" : [{"title": "AI Researcher", "confidence": 0.9}, {"title": "Data Scientist", "confidence": 0.8}, {"title": "Software Engineer", "confidence": 0.7}, {"title": "Machine Learning Engineer", "confidence": 0.6},{"title": "Data Analyst", "confidence": 0.5}]
    }
    Provide only a JSON response without any markdown formatting or triple backticks.
    `

    console.log(resume)
    const response = await openai.chat.completions.create({
      model:"gpt-4o",
      messages: [{role:"user", content:resume.concat(prompt)}]
    })

    const responseString = response.choices[0].message.content;
    const responseJSON = JSON.parse(responseString);
    // const responseJSON = {
    //   "careers" : [{"career": "AI Researcher", "confidence": 0.9}, {"career": "Data Scientist", "confidence": 0.8}, {"career": "Software Engineer", "confidence": 0.7}, {"career": "Machine Learning Engineer", "confidence": 0.6},{"career": "Data Analyst", "confidence": 0.5}]
    //   } // for test

    // Run a softmax on the output percentage
    const exp = []
    for(let i = 0; i < responseJSON.careers.length; i++) {
      exp.push(Math.exp(responseJSON.careers[i].confidence * 3.1415926)); 
      //TODO: Should normalize the data instead of magic number
    }
    const expSum = exp.reduce((a, b) => a + b, 0);
    for(let i = 0; i < responseJSON.careers.length; i++) {
      responseJSON.careers[i].confidence = exp[i] / expSum;
    }
    //end softmax
    
    console.log(responseJSON);
    return responseJSON;
  }


export async function analyzeResume(file) { 
  const careerPaths = await getCareerPaths(file);
  //
  return careerPaths;
}