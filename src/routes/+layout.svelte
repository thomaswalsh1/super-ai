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
			logoMoving = true;
			setTimeout(() => {
				showText = true;
			}, 300);
		}, 1000);
		
		setTimeout(() => {
			showText = false;
			showLogo = false;
			showApp = true;
		}, 4000);
	});
</script>

<ModeWatcher />
<Toaster richColors />

<div class="flex flex-col min-h-screen overflow-hidden">
	{#if showLogo || showText}
		<div class="fixed inset-0 flex items-center justify-center z-50 bg-background">
			<div class="relative w-80 sm:w-96 md:w-[32rem] lg:w-[40rem] h-32 lg:h-40">
				<!-- Logo Container -->
				{#if showLogo}
					<div
						class="absolute left-1/2 top-1/2 -translate-y-1/2 transition-transform duration-700 ease-out"
						class:translate-x-[-50%]={!logoMoving}
						class:translate-x-[-170%]={logoMoving}
						in:fade={{ duration: 500 }}
						out:fade={{ duration: 500 }}
					>
						<enhanced:img 
							src={Logo} 
							alt="Logo" 
							class="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full"
						/>
					</div>
				{/if}

				<!-- Text Container -->
				{#if showText}
					<div
						class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[25%] transition-all duration-500"
						in:fade={{ duration: 500 }}
						out:fade={{ duration: 500 }}
					>
						<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap">
							SUPER AI
						</h1>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	{#if showApp}
		<div in:fade={{ duration: 1000 }}>
			<Header />
			<main class="flex flex-col grow">
				<slot />
			</main>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>