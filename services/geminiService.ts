
import { GoogleGenAI } from "@google/genai";
import { Asset } from '../types';
import { matrices } from '../lib/mockData';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this environment, we assume it's set.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateAssetDescription = async (asset: Asset): Promise<string> => {
  try {
    const primaryMatrix = matrices.find(m => m.id === asset.primary_matrix_id);
    const secondaryMatrix = matrices.find(m => m.id === asset.secondary_matrix_id);
    
    const prompt = `
      You are a creative director for a digital asset marketplace called ALFA OS.
      Your task is to write a short, compelling, and professional description for a new digital asset.
      Use the following details to craft the description. Be creative and evoke a feeling.
      
      Asset Details:
      - SKU: "${asset.sku_slug}"
      - Primary Category: "${primaryMatrix?.name || 'N/A'}"
      - Secondary Category: "${secondaryMatrix?.name || 'N/A'}"
      - Rarity: "${asset.current_rarity}"
      - Lifecycle Stage: "${asset.lifecycle_state}"

      Instructions:
      - Keep the description under 50 words.
      - Focus on the mood and potential use of the asset.
      - Do not just list the details; synthesize them into a coherent narrative.
      - The tone should be professional yet alluring.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });
    
    const text = response.text;
    if (text) {
      return text.trim();
    }
    return "Could not generate a description.";
    
  } catch (error) {
    console.error("Error generating asset description:", error);
    return "An error occurred while generating the description. Please check your API key and try again.";
  }
};
