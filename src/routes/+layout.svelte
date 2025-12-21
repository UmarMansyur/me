<script lang="ts">
	import "../app.css";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { page } from "$app/state";

	let { children } = $props();

	const isAdminRoute = $derived(page.url.pathname.startsWith("/admin"));
</script>

<svelte:head>
	<title>Muhammad Umar Mansyur | Software Developer</title>
	<meta
		name="description"
		content="Personal portfolio of Muhammad Umar Mansyur - Software Developer from Madura Dev. Building modern web applications."
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{#if isAdminRoute}
	{@render children()}
{:else}
	<div class="flex min-h-screen flex-col">
		<Navbar currentPath={page.url.pathname} />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
{/if}
