<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import Header from "./Header.svelte";

	let { children } = $props();
</script>

<ModeWatcher />

<div class="flex flex-col min-h-screen">

	<Header />

	<main class="flex grow">
		{@render children()}
	</main>

</div>
