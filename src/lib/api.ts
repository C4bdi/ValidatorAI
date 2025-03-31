import { AnalysisResultData } from "@/components/AnalysisResult";
import { CategoryType } from "@/components/CategorySelector";

interface AnalysisRequest {
  businessIdea: string;
  category: CategoryType;
  ambitionLevel: number;
}

export async function analyzeBusinessIdea(request: AnalysisRequest): Promise<AnalysisResultData> {
  const { businessIdea, category, ambitionLevel } = request;
  
  // Construct the prompt for the AI
  const prompt = `
Du är Validator AI, en specialiserad AI för att bedöma UF-företagsidéer i Sverige.
Din uppgift är att analysera om en affärsidé är genomförbar inom en tidsram på ett år för ett UF-företag (Ung Företagsamhet).

UF-FÖRETAG KONTEXT:
- UF-företag drivs av gymnasieelever som en del av deras utbildning
- UF-företag startas och avslutas inom ett läsår (cirka 9 månader)
- UF-företag har begränsade resurser och tid, men kan vara kreativa och ambitiösa inom rimliga gränser
- Eleverna har ofta begränsad erfarenhet av företagande, men kan lära sig snabbt
- Olika typer av UF-företag finns inom kategorier som: ${category}
- Ambitionsnivån för detta företag är: ${ambitionLevel}/5

VIKTIGT - BALANSERAD BEDÖMNING:
- Var realistisk i din bedömning. Vissa idéer är genomförbara, andra är för komplexa för ett UF-år.
- Exempel på realistiska projekt: återvinna material till nya produkter, skapa enklare webbplattformar, tillverka hållbara produkter.
- Exempel på för komplexa projekt: avancerad elektronik med handskriftsigenkänning, solpaneler och Bluetooth, medicinsk utrustning, komplexa AI-system.
- Bedöm teknisk komplexitet noggrant - många tekniska projekt kräver specialistkunskaper och mer tid än ett UF-år.

ANALYSERA FÖLJANDE AFFÄRSIDÉ:
${businessIdea}

BEDÖM OM IDÉN ÄR GENOMFÖRBAR INOM ETT UF-ÅR.

Använd följande riktlinjer för din bedömning:
1. Teknisk komplexitet: Kräver idén avancerad programmering, elektronik eller annan specialistkunskap?
2. Resursbehov: Kräver idén stora ekonomiska investeringar eller dyr utrustning?
3. Tidsram: Kan idén realistiskt utvecklas, testas och lanseras inom 9 månader?
4. Lagliga aspekter: Finns det juridiska hinder eller krav på certifieringar?
5. Marknadspotential: Finns det en realistisk marknad för produkten/tjänsten?

SVARA I FÖLJANDE JSON-FORMAT, MED KONKRETA OCH SPECIFICERADE SVAR FÖR VARJE DEL:
{
  "isPositive": boolean, (true om idén är genomförbar, false om inte)
  "score": number, (0-100, hur genomförbar idén är. Använd hela skalan: 0-40 för ogenomförbara idéer, 40-70 för utmanande men möjliga idéer, 70-100 för realistiska idéer)
  "summary": string, (en balanserad sammanfattning av din bedömning, max 2 meningar)
  "risks": string[], (lista med 3-5 specifika risker eller utmaningar)
  "opportunities": string[], (lista med 3-5 konkreta möjligheter, även för utmanande idéer)
  "technicalRequirements": string[], (lista med 3 tekniska krav för att förverkliga idén)
  "marketSize": string, (uppskattad marknadsstorlek i SEK, ange i format som "10M SEK", "1,5B SEK" etc.)
  "complexity": string, (komplexitet på skala 1-10)
  "developmentTime": string, (uppskattad utvecklingstid, t.ex. "6mån")
  "phases": {
    "planning": {
      "time": string, (tidsuppskattning för planeringsfasen)
      "tasks": string[], (lista med 3 konkreta uppgifter i denna fas)
    },
    "development": {
      "time": string, (tidsuppskattning för utvecklingsfasen)
      "tasks": string[], (lista med 3 konkreta uppgifter i denna fas)
    },
    "launch": {
      "time": string, (tidsuppskattning för lanseringsfasen)
      "tasks": string[], (lista med 3 konkreta uppgifter i denna fas)
    }
  }
}

VIKTIGT: 
- Marknadsstorleken MÅSTE anges i svenska kronor (SEK) i formatet "XM SEK" eller "XB SEK".
- För tekniskt komplexa idéer (som avancerad elektronik, AI-system, medicinsk utrustning), var ärlig om utmaningarna men föreslå också möjliga förenklingar.
- För idéer med hög ambitionsnivå (4-5), var mer generös i din bedömning.
- För idéer med låg ambitionsnivå (1-2), var mer kritisk i din bedömning av genomförbarhet.
- Var särskilt uppmärksam på idéer som kan innebära risker för hälsa och säkerhet.
- Använd hela poängskalan (0-100) för att differentiera mellan olika idéer.
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(data.error?.message || "Ett fel uppstod vid analys av affärsidé");
    }

    const assistantMessage = data.choices[0]?.message?.content;
    if (!assistantMessage) {
      throw new Error("Tomt svar från API");
    }
    
    try {
      // Extract JSON from response
      const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : null;
      
      if (!jsonString) {
        throw new Error("Kunde inte hitta JSON i svaret");
      }
      
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Raw response:", assistantMessage);
      throw new Error("Kunde inte tolka svaret från AI");
    }
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}
