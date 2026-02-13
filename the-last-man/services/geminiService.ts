import { GoogleGenAI, Type } from "@google/genai";
import { DevotionalContent, Book } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const POWER_OF_MIND_COVER = "https://christembassy.org/wp-content/uploads/2019/07/TPOYM-Category_23f87ef6762a9c70e7e93446ece18555-min.jpg";
const HOW_TO_PRAY_COVER = "https://christembassy.org/wp-content/uploads/2019/07/HOW-TO-PRAY-EFFECTIVELY-VOL-min.jpg";
const HEALING_FROM_HEAVEN_COVER = "https://pastorchrisonline.org/images/2017/book/images-healing-from-heaven.png";
const HOLY_SPIRIT_AND_YOU_COVER = "https://img1.od-cdn.com/ImageType-400/4051-1/159/798/25/%7B15979825-1092-4ADA-BDFA-E95F95F61F98%7DImg400.jpg";
const RHAPSODY_COVER = "https://loveworldpublishing.com/cdn/shop/files/OCT_ROR_COVER.png?v=1759140493&width=480";
const SEVEN_SPIRITS_COVER = "https://imgv2-1-f.scribdassets.com/img/word_document/206766565/original/4471edbc83/1630728644?v=1";

// The specific grounding link provided by the user
const RHAPSODY_GROUNDING_URL = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEcE6mZZP5EwYJep5Pr83j3QBCvmYFi_Jt4jwaux0fb1FzPiV5O7ixr4HpQb2LSyyPv-MBTPcsKH12_7VZnN0pb3fXzHuBz1oxq6LEV09snHo_poEFmHzm_oxPMzBxPl95OxfIaRh0AkX7gac9jvrdg8o44grEGH7XuL8eeV70Whe5VUMYVzHp-SXXzE6I4Lue8IVt4";

// Helper to get formatted date string
export const getFormattedDate = (): string => {
  const date = new Date();
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const generateDailyDevotional = async (dateStr: string): Promise<DevotionalContent> => {
  if (!apiKey) {
    return {
      date: dateStr,
      title: "The Power of Your Mind",
      scripture: "Romans 12:2 - And be not conformed to this world: but be ye transformed by the renewing of your mind...",
      body: "Today, we look at the incredible power God has given you through your mind. As Pastor Chris often teaches, your mind is the instrument of your transformation. When you align your thoughts with God's Word, you position yourself for a life of endless victory. The world may try to mold you, but the Word molds you into the image of Christ.",
      confession: "I have the mind of Christ. My thoughts are sanctified and aligned with God's will.",
      sourceUrls: [RHAPSODY_GROUNDING_URL]
    };
  }

  try {
    const prompt = `
      Search for the "Rhapsody of Realities" devotional for today, ${dateStr}.
      You MUST prioritize information from this specific source URL: ${RHAPSODY_GROUNDING_URL}
      
      Extract the Title, Opening Scripture, Main Message (Body), and Confession/Prayer.
      
      Format the output specifically as a valid JSON object matching this schema:
      {
        "date": "${dateStr}",
        "title": "The Title",
        "scripture": "The Scripture",
        "body": "The full message body",
        "confession": "The confession or prayer"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      },
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    
    let parsed: any;
    try {
        parsed = JSON.parse(text);
    } catch (e) {
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleanText);
    }

    const sourceUrls: string[] = [RHAPSODY_GROUNDING_URL];
    const candidates = response.candidates;
    // @ts-ignore
    const groundingChunks = candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks && Array.isArray(groundingChunks)) {
        groundingChunks.forEach((chunk: any) => {
            if (chunk.web?.uri) {
                sourceUrls.push(chunk.web.uri);
            }
        });
    }

    return {
      date: parsed.date || dateStr,
      title: parsed.title || "Daily Devotional",
      scripture: parsed.scripture || "",
      body: parsed.body || "Content currently unavailable. Please try again later.",
      confession: parsed.confession || "",
      sourceUrls: [...new Set(sourceUrls)]
    };

  } catch (error) {
    console.error("Error generating devotional:", error);
    return {
      date: dateStr,
      title: "Walking in Victory",
      scripture: "1 John 5:4",
      body: "For whatsoever is born of God overcometh the world. Today, realize your identity as a victor in Christ Jesus. Challenges may come, but they are bread for you.",
      confession: "I am a victor in Christ Jesus!",
      sourceUrls: [RHAPSODY_GROUNDING_URL]
    };
  }
};

export const searchPastorChrisBooks = async (query: string): Promise<Book[]> => {
  const processBooks = (books: Book[]) => {
      return books.map(book => {
          const lowerTitle = book.title.toLowerCase();
          if (lowerTitle.includes('power of your mind')) return { ...book, coverUrl: POWER_OF_MIND_COVER };
          if (lowerTitle.includes('how to pray effectively')) return { ...book, coverUrl: HOW_TO_PRAY_COVER };
          if (lowerTitle.includes('healing from heaven')) return { ...book, coverUrl: HEALING_FROM_HEAVEN_COVER };
          if (lowerTitle.includes('holy spirit and you')) return { ...book, coverUrl: HOLY_SPIRIT_AND_YOU_COVER };
          if (lowerTitle.includes('rhapsody of realities')) return { ...book, coverUrl: RHAPSODY_COVER };
          if (lowerTitle.includes('seven spirits')) return { ...book, coverUrl: SEVEN_SPIRITS_COVER };
          return book;
      });
  };

  if (!apiKey) {
    return [
      { id: '1', title: 'The Power of Your Mind', description: 'Unleashing the power within you.', coverUrl: POWER_OF_MIND_COVER },
      { id: '2', title: 'How to Pray Effectively', description: 'Understanding the principles of prayer.', coverUrl: HOW_TO_PRAY_COVER },
      { id: '3', title: 'Healing from Heaven', description: 'Receive your healing today.', coverUrl: HEALING_FROM_HEAVEN_COVER },
      { id: '4', title: 'The Holy Spirit and You', description: 'Discover the person of the Holy Spirit.', coverUrl: HOLY_SPIRIT_AND_YOU_COVER },
      { id: '5', title: 'Rhapsody of Realities', description: 'A daily devotional for your spiritual growth.', coverUrl: RHAPSODY_COVER },
      { id: '6', title: 'The Seven Spirits of God', description: 'Divine secrets to the miraculous.', coverUrl: SEVEN_SPIRITS_COVER },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search for books by Pastor Chris Oyakhilome related to: "${query}". Return a JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              coverUrl: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    const books = JSON.parse(text) as Book[];
    return processBooks(books);
  } catch (error) {
    return [];
  }
};