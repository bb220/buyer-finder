import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, GroundingSource, AnalysisReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCompany = async (url: string): Promise<AnalysisResult> => {
  const prompt = `
    Target Website: ${url}

    Your goal is to act as a Senior Private Equity Analyst focusing on Small and Medium-sized Businesses (SMBs). 

    PHASE 1: DIRECT WEBSITE ANALYSIS
    First, visit the provided website URL and analyze its content (${url}). Extract the company profile information (Name, Industry, Location, Size (Revenue and Employee Count) Offerings) from this website only.

    PHASE 2: BUYER SOURCING
    After understanding the company from its website, identify exactly 5 distinct Private Equity funds that are a good strategic fit.

    Return the analysis as a structured JSON object.

    REQUIREMENTS:
    1. **Company Profile**: Extract the company name, industry, location, size (estimated revenue/employees), and offerings. 
       - IMPORTANT: When stating facts like Revenue and Employee count in the 'size' field, include an inline markdown link to the source if available, e.g. "$5M [Source](url)".
    2. **Suitability**: Analyze market stability, scalability, potential risks, and the investment thesis.
    3. **Buyers**: Identify exactly 5 distinct Private Equity funds that are a good strategic fit.
       - For 'website', provide the direct homepage URL (e.g., "https://fund.com").
       - For 'fitReason', explain the strategic link.

    Use the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            companyProfile: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                industry: { type: Type.STRING },
                location: { type: Type.STRING },
                size: { type: Type.STRING, description: "Revenue/Employees with inline [Source](url)" },
                offerings: { type: Type.STRING, description: "Key products and value propositions" }
              },
              required: ["name", "industry", "location", "size", "offerings"]
            },
            suitability: {
              type: Type.OBJECT,
              properties: {
                marketAnalysis: { type: Type.STRING },
                scalability: { type: Type.STRING },
                risks: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "List of 3-5 potential risks"
                },
                investmentThesis: { type: Type.STRING }
              },
              required: ["marketAnalysis", "scalability", "risks", "investmentThesis"]
            },
            buyers: {
              type: Type.ARRAY,
              description: "List of 5 potential PE buyers",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  website: { type: Type.STRING },
                  fitReason: { type: Type.STRING },
                  buyerProfile: { type: Type.STRING },
                  portfolioHighlight: { type: Type.STRING }
                },
                required: ["name", "website", "fitReason", "buyerProfile", "portfolioHighlight"]
              }
            }
          },
          required: ["companyProfile", "suitability", "buyers"]
        }
      },
    });

    // Parse JSON response
    const jsonText = response.text || "{}";
    const report = JSON.parse(jsonText) as AnalysisReport;
    
    // Extract grounding chunks for the "Sources" UI component
    const groundingSources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          groundingSources.push({
            uri: chunk.web.uri,
            title: chunk.web.title
          });
        }
      });
    }

    return {
      report,
      groundingSources
    };

  } catch (error) {
    console.error("Error calling Gemini:", error);
    throw new Error("Failed to analyze the website. Please check the URL and try again.");
  }
};