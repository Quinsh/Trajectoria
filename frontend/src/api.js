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

    const prompt = "Take this resume and tell me in just one word what career path is suitable for me. Be as specific as possible. For example, AI researcher instead of researcher. Just output the position name I should target and nothing else. Comma separated. Give top 5 options. " 

    console.log(resume)
    const response = await openai.chat.completions.create({
      model:"gpt-4o",
      messages: [{role:"user", content:resume.concat(prompt)}]
    })

    const responseString = response.choices[0].message.content;
    return responseString.split(",");
  }


export async function analyzeResume(file) { 
  const careerPaths = await getCareerPaths(file);
  //
  return careerPaths;
}