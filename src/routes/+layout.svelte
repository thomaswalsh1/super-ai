<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import Header from "./Header.svelte";

	let { children } = $props();

	import { onMount } from "svelte";
	import { fly, fade } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import Logo from "$lib/assets/logo.jpg?enhanced";

	let logoMovedLeft = $state(false);
	let showLogo = $state(true);
	let showText = $state(false);
	let showApp = $state(false);

	onMount(() => {
		setTimeout(() => {
			logoMovedLeft = true;
			showText = true;
			showLogo = false;
		}, 1000);

		setTimeout(() => {
			showText = false;
			showApp = true;
		}, 2000);
	});
</script>

<ModeWatcher />

<div class="flex flex-col min-h-screen">
	{#if showLogo}
		<div
			class="absolute inset-0 flex items-center justify-center"
			in:fly={{ x: 0, y: 0, duration: 500 }}
			out:fly={{ x: -window.innerWidth / 2 + 400, duration: 1000, easing: cubicOut }}
		>
			<enhanced:img src={Logo} alt="Logo" class="h-64 w-64 rounded-full" />
		</div>
	{/if}

	{#if showText}
		<div
			class="absolute inset-0 flex items-center justify-center"
			in:fly={{ x: 0, duration: 500 }}
			out:fly={{ x: window.innerWidth / 2 - 50, duration: 1000, easing: cubicOut }}
		>
			<h1 class="text-4xl font-bold">SUPER AI</h1>
		</div>
	{/if}

	{#if showApp}
		<Header />

		<main class="flex flex-col grow">
			{@render children()}
		</main>
	{/if}
</div>
