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
    import { responses } from "./stores.svelte";

    type Props = {
        data: SuperValidated<Infer<ChatFormSchema>>;
    }
    let { data }: Props = $props();

    const chatForm = superForm(data, {
        validators: zodClient(chatFormSchema),
        onUpdate({ form, result }) {
            const action = result.data as FormResult<ActionData>;
            if (form.valid && action.response1 && action.response2 && action.response3) {
                responses.response1 = action.response1;
                responses.response2 = action.response2;
                responses.response3 = action.response3;
            };
        },
    });

    const { form: formData, enhance } = chatForm;
</script>

<form method="POST" use:enhance class="flex flex-row gap-4">
    <Form.Field form={chatForm} name="chatInput" class="grow">
        <Form.Control>
            {#snippet children({ props })}
                <!-- <Form.Label>Chat</Form.Label> -->
                <Textarea {...props} bind:value={$formData.chatInput} />
            {/snippet}
        </Form.Control>
        <!-- <Form.Description>Write any thing</Form.Description> -->
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Send</Form.Button>
</form>
