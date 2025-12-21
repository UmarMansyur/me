<script lang="ts">
	import { CheckCircle, FileText } from "lucide-svelte";

	interface AboutContent {
		id: number;
		section: string;
		title: string;
		content: string;
	}

	let contents = $state<AboutContent[]>([]);
	let isLoading = $state(false);
	let saved = $state(false);

	const sections = [
		{ key: "background", label: "Background", placeholder: "Tell visitors about your background..." },
		{ key: "specialization", label: "Specialization", placeholder: "What technologies do you specialize in..." },
		{ key: "hobbies", label: "When Not Coding", placeholder: "What do you do when not coding..." },
	];

	let form = $state<Record<string, { title: string; content: string }>>({
		background: { title: "Background", content: "" },
		specialization: { title: "Specialization", content: "" },
		hobbies: { title: "When I'm Not Coding", content: "" },
	});

	async function loadContents() {
		const response = await fetch("/admin/about/api");
		if (response.ok) {
			const data = await response.json();
			data.forEach((item: AboutContent) => {
				if (form[item.section]) {
					form[item.section] = { title: item.title, content: item.content };
				}
			});
		}
	}

	async function handleSave() {
		isLoading = true;
		try {
			for (const [section, data] of Object.entries(form)) {
				await fetch("/admin/about/api", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ section, ...data })
				});
			}
			saved = true;
			setTimeout(() => (saved = false), 3000);
		} finally {
			isLoading = false;
		}
	}

	$effect(() => {
		loadContents();
	});
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-semibold text-dark-100">About Content</h1>
		<p class="mt-1 text-dark-400">Manage your about page content</p>
	</div>

	<form onsubmit={(e) => { e.preventDefault(); handleSave(); }} class="space-y-6">
		{#each sections as section}
			<div class="card">
				<h3 class="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
					<FileText size={20} class="text-blue-500" />
					{section.label}
				</h3>
				<div class="space-y-4">
					<div>
						<label for="{section.key}-title" class="mb-1 block text-sm font-medium text-dark-300">Title</label>
						<input type="text" id="{section.key}-title" bind:value={form[section.key].title} class="input-field" />
					</div>
					<div>
						<label for="{section.key}-content" class="mb-1 block text-sm font-medium text-dark-300">Content</label>
						<textarea id="{section.key}-content" bind:value={form[section.key].content} rows="4" class="input-field resize-none" placeholder={section.placeholder}></textarea>
					</div>
				</div>
			</div>
		{/each}

		<div class="flex items-center gap-4">
			<button type="submit" class="btn-primary" disabled={isLoading}>
				{isLoading ? "Saving..." : "Save All Changes"}
			</button>
			{#if saved}
				<span class="flex items-center gap-2 text-sm text-emerald-400">
					<CheckCircle size={16} />
					Saved successfully!
				</span>
			{/if}
		</div>
	</form>
</div>
