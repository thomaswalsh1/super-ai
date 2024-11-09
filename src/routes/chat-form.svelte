<script lang="ts">
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { chatFormSchema, type ChatFormSchema } from "./chatFormSchema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    type Props = {
        data: SuperValidated<Infer<ChatFormSchema>>;
    }
    let { data }: Props = $props();

    const chatForm = superForm(data, {
        validators: zodClient(chatFormSchema),
    });

    const { form: formData, enhance } = chatForm;
</script>

<form method="POST" use:enhance>
    <Form.Field form={chatForm} name="chatInput">
    <Form.Control>
        {#snippet children({ props })}
            <Form.Label>Username</Form.Label>
            <Input {...props} bind:value={$formData.username} />
        {/snippet}
    </Form.Control>
    <Form.Description>This is your public display name.</Form.Description>
    <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
</form>
