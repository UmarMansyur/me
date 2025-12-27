<script lang="ts">
	import "../app.css";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { page } from "$app/state";

	import SEO from "$lib/components/SEO.svelte";

	let { children } = $props();

	const isAdminRoute = $derived(page.url.pathname.startsWith("/admin"));
</script>

<SEO />

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
