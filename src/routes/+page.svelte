<script lang="ts">
    import type { PageData } from "./$types";
    import ChatForm from "./chat-form.svelte";
    import { responses } from "./stores.svelte";

    interface Props {
        data: PageData;
    }
    let { data }: Props = $props();

    import * as Tabs from "$lib/components/ui/tabs";
    import OutputBox from "./OutputBox.svelte";
</script>

<div class="grow flex flex-row" id="bottom-container">
    <div class="basis-1/2 border p-6" id="prompt-half">
        <ChatForm data={data.chatForm} />
    </div>
    <div class="basis-1/2 border p-6" id="output-half">
        <Tabs.Root value="LLM 1" class="">
            <Tabs.List>
                <Tabs.Trigger value="LLM 1">LLM 1</Tabs.Trigger>
                <Tabs.Trigger value="LLM 2">LLM 2</Tabs.Trigger>
                <Tabs.Trigger value="LLM 3">LLM 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="LLM 1">
                <OutputBox outputText={responses.response1} />
            </Tabs.Content>
            <Tabs.Content value="LLM 2">
                <OutputBox outputText={responses.response2} />
            </Tabs.Content>
            <Tabs.Content value="LLM 3">
                <OutputBox outputText={responses.response3} />
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>
