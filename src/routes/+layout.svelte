<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "$lib/components/ui/sonner";
	import Header from "./Header.svelte";
	
	import { onMount } from "svelte";
	import { fly, fade } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import Logo from "$lib/assets/logo.jpg?enhanced";
	
	let showLogo = true;
	let showText = false;
	let showApp = false;
	let logoMoving = false;
	
	onMount(() => {
		setTimeout(() => {
			showText = true;
			logoMoving = true;
		}, 1000);
	
		setTimeout(() => {
			showText = false;
			showLogo = false;
			showApp = true;
		}, 2000);
	});
</script>
	
<ModeWatcher />

<Toaster richColors />

<div class="flex flex-col min-h-screen">
	{#if showLogo}
		<div
			class="absolute inset-0 flex items-center justify-center z-50"
			in:fly={{ x: 0, y: 0, duration: 500, easing: cubicOut }} 
			out:fade={{ duration: 1000 }}
		>
			<div
				class:moving={logoMoving}
				class="transition-all duration-1000 ease-out-cubic"
			>
				<enhanced:img src={Logo} alt="Logo" class="h-64 w-64 rounded-full" />
			</div>
		</div>
	{/if}

	{#if showText}
		<div
			class="absolute inset-0 flex items-center justify-center"
			in:fly={{ x: 0, duration: 500 }}
			out:fade={{ duration: 1000 }}
		>
			<h1 class="text-4xl font-bold">SUPER AI</h1>
		</div>
	{/if}

	{#if showApp}
		<Header />

		<main class="flex flex-col grow">
			<slot />
		</main>
	{/if}
</div>

<style>
	.moving {
		transform: translateX(calc(-50vw + 700px));
	}
</style>