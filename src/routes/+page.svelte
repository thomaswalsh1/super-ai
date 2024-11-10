<script lang="ts">
    import type { PageData } from "./$types";
    import ChatForm from "./chat-form.svelte";
    import { responses, evaluations } from "./stores.svelte";

    interface Props {
        data: PageData;
    }
    let { data }: Props = $props();

    import * as Tabs from "$lib/components/ui/tabs";
    import * as Card from "$lib/components/ui/card";
    import OutputBox from "./OutputBox.svelte";
    import Gauge from "./Gauge.svelte";

    let sortedRankings = $derived([...evaluations.evaluation.rankings].sort((a: any, b: any) => b.score - a.score));
    let topRanking  = $derived(sortedRankings[0]);
</script>

<svelte:head>
	<title>SuperAI</title>
	<meta name="description" content="SuperAI - the superpowered AI aggregator" />
</svelte:head>

<div class="grow flex flex-col md:flex-row" id="bottom-container">
    <div class="basis-1/2 border p-6" id="prompt-half">
        <ChatForm data={data.chatForm} />
        <div class="flex flex-col items-center border">
            <div class="w-fit grid grid-cols-2 gap-8 p-6">
                {#each sortedRankings as ranking}
                    <Card.Root class="w-88 flex flex-col items-center" style={"border: " + (topRanking.llm_name === ranking.llm_name ? "2px solid green" : "")}>
                        <Card.Header>
                            <Card.Title class="flex flex-row gap-4">
                                {ranking.llm_name}
                            </Card.Title>
                            <!-- <Card.Description>Card Description</Card.Description> -->
                        </Card.Header>
                        <Card.Content class="flex flex-col items-center gap-4">
                            <p>Ranking:</p>
                            <Gauge value={ranking.score} max={10} />
                        </Card.Content>
                        <!-- <Card.Footer>
                            <p>Card Footer</p>
                        </Card.Footer> -->
                    </Card.Root>
                {/each}
            </div>
            <!-- <pre>
{JSON.stringify(evaluations.evaluation, null, 2)}
            </pre> -->
        </div>
    </div>
    <div class="basis-1/2 border p-6" id="output-half">
        <Tabs.Root value="llama-3.1-8b-instant">
            <Tabs.List>
                <Tabs.Trigger value="llama-3.1-8b-instant">llama</Tabs.Trigger>
                <Tabs.Trigger value="gemma2-9b-it">gemma</Tabs.Trigger>
                <Tabs.Trigger value="mixtral-8x7b-32768">mixtral</Tabs.Trigger>
                <Tabs.Trigger value="mixtral-8x7b-32768-2">Wolfram Alpha</Tabs.Trigger>

            </Tabs.List>
            <Tabs.Content value="llama-3.1-8b-instant">
                <OutputBox outputText={responses.response1} />
            </Tabs.Content>
            <Tabs.Content value="gemma2-9b-it">
                <OutputBox outputText={responses.response2} />
            </Tabs.Content>
            <Tabs.Content value="mixtral-8x7b-32768">
                <OutputBox outputText={responses.response3} />
            </Tabs.Content>
            <Tabs.Content value="mixtral-8x7b-32768-2">
                <OutputBox outputText={responses.response4} />
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>
