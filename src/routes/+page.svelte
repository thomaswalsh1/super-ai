<script lang="ts">
    import type { PageData } from "./$types";
    import ChatForm from "./chat-form.svelte";
    let { data } = $props();

    import { Textarea } from "$lib/components/ui/textarea";
    import { Button } from "$lib/components/ui/button";
    import * as Tabs from "$lib/components/ui/tabs";
    import OutputBox from "./OutputBox.svelte";
</script>

<div class="grow flex flex-row" id="bottom-container">
    <div class="basis-1/2 border p-6 flex items-start w-full" id="prompt-half">
        <ChatForm data={data.chatForm} />
        <div id="prompt box" class="flex gap-4 w-full">
            <Textarea placeholder="chat" class="bg-muted text-lg" />
            <Button type="submit">Send</Button>
        </div>
    </div>
    <div class="basis-1/2 border p-6" id="output-half">
        <Tabs.Root value="LLM 1" class="">
            <Tabs.List>
                <Tabs.Trigger value="LLM 1">LLM 1</Tabs.Trigger>
                <Tabs.Trigger value="LLM 2">LLM 2</Tabs.Trigger>
                <Tabs.Trigger value="LLM 3">LLM 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="LLM 1">
                <OutputBox outputText="text 1" />
            </Tabs.Content>
            <Tabs.Content value="LLM 2">
                <OutputBox outputText="text 2" />
            </Tabs.Content>
            <Tabs.Content value="LLM 3">
                <OutputBox outputText="text 3" />
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>
