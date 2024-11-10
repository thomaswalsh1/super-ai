<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Textarea } from "$lib/components/ui/textarea";
    import { chatFormSchema, type ChatFormSchema } from "./chatFormSchema";
    import {
        type SuperValidated,
        type Infer,
        type FormResult,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { type ActionData } from "./$types";
    import { evaluations, responses, evaluating } from "./stores.svelte";
    import LoaderCircle from "lucide-svelte/icons/loader-circle";
    import { toast } from "svelte-sonner";

    type Props = {
        data: SuperValidated<Infer<ChatFormSchema>>;
    }
    let { data }: Props = $props();

    const chatForm = superForm(data, {
        validators: zodClient(chatFormSchema),
        async onUpdate({ form, result }) {
            const action = result.data as FormResult<ActionData>;
            if (form.valid && action.response1 && action.response2 && action.response3 && action.response4) {
                responses.response1 = action.response1;
                responses.response2 = action.response2;
                responses.response3 = action.response3;
                responses.response4 = action.response4;
                toast.success("LLM responses success");
                try {
                    evaluating.is = true;
                    toast.info("Evaluating...");
                    console.log("Evaluating inputs:");
                    const inputs = {
                        prompt: form.data.chatInput,
                        responses: [
                            {
                                "llm_name": "llama",
                                "response": action.response1,
                                "metadata": {
                                    "temperature": 0.5,
                                },
                            },
                            {
                                "llm_name": "gemma2",
                                "response": action.response2,
                                "metadata": {
                                    "temperature": 0.5,
                                },
                            },
                            {
                                "llm_name": "mixtral",
                                "response": action.response3,
                                "metadata": {
                                    "temperature": 0.5,
                                },
                            },
                            {
                                "llm_name": "wolfram",
                                "response": action.response4,
                                "metadata": {
                                    "temperature": 0.5,
                                },
                            },
                        ]
                    };
                    console.log(inputs);
                    const response = await fetch("/api/evaluate", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(inputs),
                    });
                    if (!response.ok) {
                        toast.error("Evaluating failed");
                    } else {
                        const result = await response.json();
                        console.log("Evaluating result:");
                        console.log(result);
                        evaluations.evaluation = result;
                        toast.success("Evaluating success");
                    };
                    evaluating.is = false;
                } catch (error) {
                    console.error(error);
                    toast.error("Evaluating failed");
                    evaluating.is = false;
                };
            };
        },
        onError() {
            toast.error("Error, please try again later :(");
        },
        resetForm: false,
    });

    const { form: formData, enhance, delayed } = chatForm;
</script>

<form method="POST" use:enhance class="flex flex-row gap-4">
    <Form.Field form={chatForm} name="chatInput" class="grow">
        <Form.Control>
            {#snippet children({ props })}
                <!-- <Form.Label>Chat</Form.Label> -->
                <Textarea {...props} bind:value={$formData.chatInput} placeholder="Ask a question..." />
            {/snippet}
        </Form.Control>
        <!-- <Form.Description>Write any thing</Form.Description> -->
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button disabled={$delayed}>
        {#if $delayed}
            <LoaderCircle class="mr-2 size-4 animate-spin" />
        {/if}
        Send
    </Form.Button>
</form>
