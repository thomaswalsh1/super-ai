import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { chatFormSchema } from "./chatFormSchema";
import { zod } from "sveltekit-superforms/adapters";
import Groq from "groq-sdk";
import { GROQ_API_KEY, WOLFRAM_API_KEY } from "$env/static/private";

export const load: PageServerLoad = async () => {
    return {
        chatForm: await superValidate(zod(chatFormSchema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const chatForm = await superValidate(event, zod(chatFormSchema));
        if (!chatForm.valid) {
            return fail(400, {
                chatForm,
            });
        };

        const chatInput = chatForm.data.chatInput;
        let response1, response2, response3, response4 = "";
        const groq = new Groq({ apiKey: GROQ_API_KEY });
        async function runLLM(modelId: string) {
            return groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: chatInput,
                    },
                ],
                model: modelId,
            });
        };

        const chatCompletion1 = await runLLM("llama-3.1-8b-instant");
        response1 = chatCompletion1.choices[0]?.message?.content || "Error";

        const chatCompletion2 = await runLLM("gemma2-9b-it");
        response2 = chatCompletion2.choices[0]?.message?.content || "Error";

        const chatCompletion3 = await runLLM("mixtral-8x7b-32768");
        response3 = chatCompletion3.choices[0]?.message?.content || "Error";

        const urlparameter = chatInput.replace(" ", "+");
        const chatCompletion4 = await fetch(`https://www.wolframalpha.com/api/v1/llm-api?input=${urlparameter}&appid=${WOLFRAM_API_KEY}&output=json`);
        const chatCompletion4Text = await chatCompletion4.text();
        if (!chatCompletion4Text) {
            throw new Error("Invalid response from Wolfram API");
        }
        response4 = chatCompletion4Text || "Error";
        // console.log(response4);
        return {
            chatForm,
            response1,
            response2,
            response3,
            response4,
        };
    },
};
