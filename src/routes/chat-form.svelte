<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Textarea } from "$lib/components/ui/textarea";
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
