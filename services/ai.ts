
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export type ContextType = 'dashboard' | 'canvas' | 'roadmap' | 'prd' | 'financials' | 'profile' | 'market' | 'readiness' | 'gtm';

export const getIntelligence = async (context: ContextType, data: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As a strategic startup co-founder, provide 3 high-impact intelligence cards for the ${context} section. 
    Current data: ${JSON.stringify(data)}.
    Return as JSON with: { "cards": [{ "title": string, "description": string, "type": "optimization"|"insight"|"risk", "impact": string }] }`,
    config: {
      thinkingConfig: { thinkingBudget: 16384 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cards: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                type: { type: Type.STRING },
                impact: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '{"cards": []}');
  } catch (e) {
    return { cards: [] };
  }
};

export const stressTestFinancials = async (data: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Perform a financial stress test for this startup: ${JSON.stringify(data)}. 
    Simulate 3 'Black Swan' scenarios (e.g. 50% CAC increase, 2x Churn, Delayed Round).
    For each, provide: Scenario Name, Impact on Runway (months), and a Mitigation Strategy.
    Return as JSON: { "scenarios": [{ "name": string, "impact": string, "mitigation": string }] }`,
    config: {
      thinkingConfig: { thinkingBudget: 24576 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          scenarios: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                impact: { type: Type.STRING },
                mitigation: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '{"scenarios": []}');
  } catch (e) {
    return { scenarios: [] };
  }
};

export const refinePitchNarrative = async (slides: any[], round: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Critique the narrative flow of this ${round} pitch deck: ${JSON.stringify(slides)}. 
    Suggest 3 specific narrative improvements to make the 'Ask' feel more inevitable.
    Return as JSON: { "improvements": [string] }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          improvements: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  try {
    return JSON.parse(response.text || '{"improvements": []}');
  } catch (e) {
    return { improvements: [] };
  }
};

export const getInvestorReadiness = async (startupData: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze startup data for investor readiness: ${JSON.stringify(startupData)}.
    Return JSON: { score (0-100), gaps (strings), milestones (strings), questions (strings) }.`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
          milestones: { type: Type.ARRAY, items: { type: Type.STRING } },
          questions: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return { score: 0, gaps: [], milestones: [], questions: [] };
  }
};

export const getMarketIntelligence = async (startupData: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Deep research market for: ${JSON.stringify(startupData)}. 
    Return JSON: { signals (strings), niches (strings), pivotRecommendation (string) }.`,
    config: {
      tools: [{ googleSearch: {} }],
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          signals: { type: Type.ARRAY, items: { type: Type.STRING } },
          niches: { type: Type.ARRAY, items: { type: Type.STRING } },
          pivotRecommendation: { type: Type.STRING }
        }
      }
    }
  });
  const groundingSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  try {
    const data = JSON.parse(response.text || '{}');
    return { ...data, sources: groundingSources };
  } catch (e) {
    return { signals: [], niches: [], pivotRecommendation: "", sources: [] };
  }
};

export const generateSlideVisual = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: `High-end minimalist editorial pitch deck visual: ${prompt}` }] },
    config: { imageConfig: { aspectRatio: "16:9" } },
  });
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

export const chatWithAgent = async (agentName: string, message: string, history: any[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the ${agentName} Agent for StartupAI. Strategic, elite, and calm.`,
    }
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const getSectionSuggestion = async (sectionTitle: string, startupContext: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a strategic Lean Canvas suggestion for "${sectionTitle}" given: ${startupContext}`,
    config: { thinkingConfig: { thinkingBudget: 8000 } }
  });
  return response.text?.trim();
};

// Fix: Added missing export getCompetitorAnalysis to support pages/MarketResearch.tsx
export const getCompetitorAnalysis = async (name: string, tagline: string, sector: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze the competitive landscape for "${name}" (${tagline}) in the "${sector}" sector. Identify 3 competitors.`,
    config: {
      thinkingConfig: { thinkingBudget: 16384 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          competitors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                advantage: { type: Type.STRING },
                risk: { type: Type.STRING },
                counterStrategy: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });
  try {
    return JSON.parse(response.text || '{"competitors": []}');
  } catch (e) {
    return { competitors: [] };
  }
};

// Fix: Added missing export getGTMStrategy to support pages/GTM.tsx
export const getGTMStrategy = async (startupData: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a comprehensive GTM strategy for: ${JSON.stringify(startupData)}. Focus on ICP, pillars, and channels.`,
    config: {
      thinkingConfig: { thinkingBudget: 16384 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          icp: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          pillars: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          channels: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                efficiency: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    }
  });
  try {
    return JSON.parse(response.text || 'null');
  } catch (e) {
    return null;
  }
};
