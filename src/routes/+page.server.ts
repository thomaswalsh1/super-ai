import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms";
import { chatFormSchema } from "./chatFormSchema";
import { zod } from "sveltekit-superforms/adapters";

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
        }
        return {
            chatForm,
        };
    },
};
