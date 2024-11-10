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
    import * as Popover from "$lib/components/ui/popover";
    import OutputBox from "./OutputBox.svelte";
    import Gauge from "./Gauge.svelte";
    import { evaluating } from "./stores.svelte";
    import { Skeleton } from "$lib/components/ui/skeleton";

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
        <div class="flex flex-col items-center border rounded-lg mt-2">
            <p class="text-xl font-semibold pt-4">Rankings:</p>
            {#if evaluating.is}
                <div class="w-fit grid grid-cols-2 gap-8 p-6">
                    <Skeleton class="w-64 h-48" />
                    <Skeleton class="w-64 h-48" />
                    <Skeleton class="w-64 h-48" />
                    <Skeleton class="w-64 h-48" />
                </div>
            {/if}
            <div class="w-fit grid grid-cols-2 gap-8 p-6">
                {#each sortedRankings as ranking}
                    <Popover.Root>
                        <Popover.Trigger>
                            <Card.Root class="w-88 flex flex-col items-center px-8" style={"border: " + (topRanking.llm_name === ranking.llm_name ? "2px solid green" : "")}>
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
                        </Popover.Trigger>
                        <Popover.Content side="right" class="w-52 spece-y-2">
                            <p>Additional data:</p>
                            <ul>
                                {#each Object.entries(ranking.scores) as [key, value]}
                                  <li class="flex flex-row items-center justify-between gap-2 pb-2">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}: 
                                    <Gauge value={value} max={10} size={50} strokeWidth={7} />
                                  </li>
                                {/each}
                            </ul>
                            <p>Reasoning:</p>
                            <p class="text-sm font-semibold">{ranking.reasoning}</p>
                        </Popover.Content>
                    </Popover.Root>
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
                <Tabs.Trigger value="wolfram">wolfram</Tabs.Trigger>
                <Tabs.Trigger value="super">super ai</Tabs.Trigger>
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
            <Tabs.Content value="wolfram">
                <OutputBox outputText={responses.response4} />
            </Tabs.Content>
            <Tabs.Content value="super">
                <OutputBox outputText={responses.superResponse} />
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>
