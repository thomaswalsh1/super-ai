import type { RequestHandler } from "./$types";
import Groq from "groq-sdk";
import { GROQ_API_KEY } from "$env/static/private";

const groq = new Groq({ apiKey: GROQ_API_KEY });
async function runLLM(modelId: string, inputText: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: inputText,
            },
        ],
        model: modelId,
    });
};

export const POST: RequestHandler = async ({request}) => {
    const inputs = await request.json();
    const llmName = "llama-3.1-70b-versatile";
    let responsesText = "";
    inputs.responses.forEach((resp: any, idx: number) => {
        responsesText += `\nResponse ${idx + 1}. ${resp.llm_name}:\n${resp.response}\n`;
    });
    const evaluatePrompt = `[INST] Evaluate these ${inputs.responses.length} language model responses to the prompt: "${inputs.prompt}"

    ${responsesText}
    
    You MUST follow this EXACT format in your response:
    
    EVALUATION FOR ${inputs.responses[0].llm_name}:
    SCORES:
    - Relevance: (0-10)
    - Accuracy: (0-10)
    - Coherence: (0-10)
    - Completeness: (0-10)
    REASONING: (1 sentence explaining these scores)
    
    EVALUATION FOR ${inputs.responses[1].llm_name}:
    SCORES:
    - Relevance: (0-10)
    - Accuracy: (0-10)
    - Coherence: (0-10)
    - Completeness: (0-10)
    REASONING: (1 sentence explaining these scores)
    
    [Continue same format for each response]
    
    FINAL RANKING:
    1. [Model Name]: [Average Score]
    2. [Model Name]: [Average Score]
    3. [Model Name]: [Average Score]
    4. [Model Name]: [Average Score]
    5. [Model Name]: [Average Score]
    
    Rules:
    1. You must evaluate EVERY response
    2. All scores must be numbers between 0 and 10
    3. You must provide reasoning for each response, limit the reasoning to ONE SENTENCE ONLY
    4. You must include a final ranking of ALL responses
    5. Use EXACT headings: "EVALUATION FOR", "SCORES:", "REASONING:", "FINAL RANKING:"
    6. Calculate average scores as (Relevance + Accuracy + Coherence + Completeness) / 4
    
    Begin your evaluation now, following the exact format above. [/INST]`;
    
    function parseEvaluation(responseText: string) {
        const rankings: any[] = [];
        const regex = /EVALUATION FOR (.*?):\s*SCORES:\s*- Relevance: (\d+)\s*- Accuracy: (\d+)\s*- Coherence: (\d+)\s*- Completeness: (\d+)\s*REASONING: (.*?)\s*(?=EVALUATION FOR|FINAL RANKING|\[INST\])/gs;
        
        let match;
        while ((match = regex.exec(responseText)) !== null) {
            const [_, modelName, relevance, accuracy, coherence, completeness, reasoning] = match;
            
            rankings.push({
                llm_name: modelName,
                scores: {
                    relevance: parseInt(relevance),
                    accuracy: parseInt(accuracy),
                    coherence: parseInt(coherence),
                    completeness: parseInt(completeness),
                },
                reasoning: reasoning.trim(),
                score: (parseInt(relevance) + parseInt(accuracy) + parseInt(coherence) + parseInt(completeness)) / 4
            });
        }
    
        // Extract the final ranking
        const rankingRegex = /FINAL RANKING:\s*(.*?)\s*\[INST\]/s;
        const rankingMatch = rankingRegex.exec(responseText);
        
        if (rankingMatch) {
            const rankings = rankingMatch[1].split("\n").map(line => {
                const [rank, modelName, score] = line.trim().split(":");
                return {
                    rank: parseInt(rank),
                    modelName: modelName.trim(),
                    averageScore: parseFloat(score.trim())
                };
            });
    
            return { rankings };
        }
    
        return { rankings };
    }


    const llmResponse = await runLLM(llmName, evaluatePrompt);
    const responseText = llmResponse.choices[0]?.message?.content || "Error";


    const evaluationData = parseEvaluation(responseText);

    const superPrompt = `Generate an aggregate response that uses parts of all these responses: "${JSON.stringify(inputs)}" choose which parts of the responses to use using these rankings: "${JSON.stringify(evaluationData)}."`;
    const theSuperResponse = await runLLM(llmName, superPrompt);
    const superText = theSuperResponse.choices[0]?.message?.content || "Error";

    return new Response(JSON.stringify({
        data: evaluationData,
        superResponse: superText
    }), {headers: {"Content-Type": "application/json"}});
};
