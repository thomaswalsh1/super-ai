<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import Header from "./Header.svelte";

	let { children } = $props();
</script>

<ModeWatcher />

<Header />

{@render children()}
