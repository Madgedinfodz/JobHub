import { GoogleGenAI, Type } from "@google/genai";
import { Job, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeJobMatch(job: Job, profile: UserProfile) {
  const prompt = `
    Analyze the match between this job and the user profile.
    
    Job:
    Title: ${job.title}
    Description: ${job.description}
    Requirements: ${job.requirements.join(', ')}
    
    User Profile:
    Title: ${profile.title}
    Skills: ${profile.skills.join(', ')}
    Experience: ${profile.experience}
    
    Provide a match score (0-100) and a brief explanation in Arabic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            explanation: { type: Type.STRING }
          },
          required: ["score", "explanation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return { score: 0, explanation: "تعذر تحليل المطابقة حالياً." };
  }
}

export async function generateJobRecommendations(query: string) {
  const prompt = `
    Generate 5 realistic job listings for a search query: "${query}".
    Return them in JSON format matching the Job interface.
    Include title, company, location, type, salary, description, requirements (array), postedAt, and category.
    The content should be in Arabic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              company: { type: Type.STRING },
              location: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['Full-time', 'Part-time', 'Contract', 'Remote'] },
              salary: { type: Type.STRING },
              description: { type: Type.STRING },
              requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
              postedAt: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["id", "title", "company", "location", "type", "salary", "description", "requirements", "postedAt", "category"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return [];
  }
}
