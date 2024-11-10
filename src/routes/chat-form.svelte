<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Switch } from "$lib/components/ui/switch";
    import { Label } from "$lib/components/ui/label";
    import * as Popover from "$lib/components/ui/popover";
    import Settings from "lucide-svelte/icons/settings";
    import { buttonVariants } from "$lib/components/ui/button";
    import { chatFormSchema, type ChatFormSchema } from "./chatFormSchema";
    import {
        type SuperValidated,
        type Infer,
        type FormResult,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { type ActionData } from "./$types";
    import { evaluations, responses, evaluating, usePy } from "./stores.svelte";
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
                try {
                    evaluations.evaluation.rankings = [];
                    evaluating.is = true;
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
                                "llm_name": "gemma",
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
                    let host = "/api/evaluate";
                    const isUsePy = usePy.is;
                    if (isUsePy) {
                        host = "http://localhost:8000/evaluate";
                    };
                    const response = await fetch(host, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(inputs),
                    });
                    if (!response.ok) {
                        toast.error("Evaluating failed, please try again later :(");
                    } else {
                        const result = await response.json();
                        if (isUsePy) {
                            evaluations.evaluation = result;
                            responses.superResponse = "";
                        } else {
                            evaluations.evaluation = result.data;
                            responses.superResponse = result.superResponse;
                        }
                    };
                    evaluating.is = false;
                } catch (error) {
                    toast.error("Evaluating failed, please try again later :(");
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

<form method="POST" use:enhance class="flex flex-row items-start gap-4">
    <Form.Field form={chatForm} name="chatInput" class="grow">
        <Form.Control>
            {#snippet children({ props })}
                <!-- <Form.Label>Chat</Form.Label> -->
                <Textarea {...props} bind:value={$formData.chatInput} placeholder="Ask a question..." class="h-32" />
            {/snippet}
        </Form.Control>
        <!-- <Form.Description>Write any thing</Form.Description> -->
        <Form.FieldErrors />
    </Form.Field>
    <div class="flex flex-col-reverse gap-4 items-center">
        <Popover.Root>
            <Popover.Trigger class={buttonVariants({ variant: "outline", size: "icon"})}>
                <Settings class="h-4 w-4" />
            </Popover.Trigger>
            <Popover.Content side="bottom" align="end" class="w-fit">
                <div class="flex flex-row items-center gap-2">
                    <Label>js</Label>
                    <Switch bind:checked={usePy.is} />
                    <Label>py</Label>
                </div>
            </Popover.Content>
        </Popover.Root>
        <Form.Button disabled={$delayed}>
            {#if $delayed}
                <LoaderCircle class="mr-2 size-4 animate-spin" />
            {/if}
            Send
        </Form.Button>
    </div>
</form>
