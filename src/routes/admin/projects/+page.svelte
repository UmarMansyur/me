<script lang="ts">
	import { Plus, FolderOpen, Pencil, Trash2, X } from "lucide-svelte";

	let projects = $state<
		Array<{
			id: number;
			title: string;
			slug: string | null;
			description: string;
			content: string | null;
			imageUrl: string | null;
			liveUrl: string | null;
			sourceUrl: string | null;
			role: string | null;
			tags: string;
			featured: boolean;
		}>
	>([]);

	const roles = [
		"FullStack Developer",
		"BackEnd Developer", 
		"FrontEnd Developer",
		"UI/UX Designer",
		"Database Administrator",
		"DevOps Engineer",
		"Mobile Developer",
		"Project Manager",
	];

	let showModal = $state(false);
	let editingProject = $state<(typeof projects)[0] | null>(null);
	let isLoading = $state(false);

	function generateSlug(title: string): string {
		return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
	}

	let form = $state({
		title: "",
		slug: "",
		description: "",
		content: "",
		imageUrl: "",
		liveUrl: "",
		sourceUrl: "",
		role: "",
		tags: "",
		featured: false,
	});

	function openNewModal() {
		editingProject = null;
		form = {
			title: "",
			slug: "",
			description: "",
			content: "",
			imageUrl: "",
			liveUrl: "",
			sourceUrl: "",
			role: "",
			tags: "",
			featured: false,
		};
		showModal = true;
	}

	function openEditModal(project: (typeof projects)[0]) {
		editingProject = project;
		form = {
			title: project.title,
			slug: project.slug || "",
			description: project.description,
			content: project.content || "",
			imageUrl: project.imageUrl || "",
			liveUrl: project.liveUrl || "",
			sourceUrl: project.sourceUrl || "",
			role: project.role || "",
			tags: project.tags,
			featured: project.featured,
		};
		showModal = true;
	}

	async function handleSubmit() {
		isLoading = true;
		try {
			const method = editingProject ? "PUT" : "POST";
			const url = editingProject
				? `/admin/projects/${editingProject.id}`
				: "/admin/projects/api";

			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			if (response.ok) {
				showModal = false;
				loadProjects();
			}
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	}

	async function deleteProject(id: number) {
		if (!confirm("Are you sure you want to delete this project?")) return;

		try {
			await fetch(`/admin/projects/${id}`, { method: "DELETE" });
			loadProjects();
		} catch (e) {
			console.error(e);
		}
	}

	async function loadProjects() {
		try {
			const response = await fetch("/admin/projects/api");
			if (response.ok) {
				projects = await response.json();
			}
		} catch (e) {
			console.error(e);
		}
	}

	$effect(() => {
		loadProjects();
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold text-dark-100">Projects</h1>
			<p class="mt-1 text-dark-400">Manage your portfolio projects</p>
		</div>
		<button class="btn-primary" onclick={openNewModal}>
			<Plus size={18} />
			<span>Add Project</span>
		</button>
	</div>

	<!-- Projects List -->
	{#if projects.length === 0}
		<div class="card py-12 text-center">
			<FolderOpen size={48} class="mx-auto mb-4 text-dark-700" />
			<p class="text-dark-400">No projects yet. Add your first project!</p>
		</div>
	{:else}
		<div class="space-y-4">
			{#each projects as project}
				<div class="card flex items-center justify-between gap-4">
					<div class="flex-1">
						<div class="flex items-center gap-3">
							<h3 class="font-semibold text-dark-100">{project.title}</h3>
							{#if project.featured}
								<span
									class="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400"
								>
									Featured
								</span>
							{/if}
						</div>
						<p class="mt-1 text-sm text-dark-400 line-clamp-1">
							{project.description}
						</p>
						<div class="mt-2 flex flex-wrap gap-1">
							{#each project.tags.split(",").filter((t) => t.trim()) as tag}
								<span
									class="rounded bg-dark-800 px-2 py-0.5 text-xs text-dark-400"
								>
									{tag.trim()}
								</span>
							{/each}
						</div>
					</div>
					<div class="flex gap-2">
						<button
							class="p-2 text-dark-400 transition-colors hover:text-dark-100"
							onclick={() => openEditModal(project)}
						>
							<Pencil size={20} />
						</button>
						<button
							class="p-2 text-red-400/60 transition-colors hover:text-red-400"
							onclick={() => deleteProject(project.id)}
						>
							<Trash2 size={20} />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Modal -->
{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
	>
		<div class="card w-full max-w-lg max-h-[90vh] overflow-y-auto">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-xl font-semibold text-dark-100">
					{editingProject ? "Edit Project" : "New Project"}
				</h2>
				<button
					class="text-dark-400 hover:text-dark-100"
					onclick={() => (showModal = false)}
				>
					<X size={24} />
				</button>
			</div>

			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				class="space-y-4"
			>
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="title" class="mb-1 block text-sm font-medium text-dark-300">Title</label>
						<input type="text" id="title" bind:value={form.title} oninput={() => { if (!editingProject) form.slug = generateSlug(form.title); }} class="input-field" required />
					</div>
					<div>
						<label for="slug" class="mb-1 block text-sm font-medium text-dark-300">Slug</label>
						<input type="text" id="slug" bind:value={form.slug} class="input-field" placeholder="auto-generated-from-title" />
					</div>
				</div>

				<div>
					<label for="role" class="mb-1 block text-sm font-medium text-dark-300">Role/Position</label>
					<select id="role" bind:value={form.role} class="input-field">
						<option value="">Select Role</option>
						{#each roles as role}
							<option value={role}>{role}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="description" class="mb-1 block text-sm font-medium text-dark-300">Short Description</label>
					<textarea id="description" bind:value={form.description} rows="2" class="input-field resize-none" required></textarea>
				</div>

				<div>
					<label for="content" class="mb-1 block text-sm font-medium text-dark-300">Full Content (for detail page)</label>
					<textarea id="content" bind:value={form.content} rows="5" class="input-field resize-none" placeholder="Detailed description of the project..."></textarea>
				</div>

				<div>
					<label for="imageUrl" class="mb-1 block text-sm font-medium text-dark-300">Image URL</label>
					<input type="url" id="imageUrl" bind:value={form.imageUrl} placeholder="https://example.com/image.jpg" class="input-field" />
					{#if form.imageUrl}
						<img src={form.imageUrl} alt="Preview" class="mt-2 h-32 w-full object-cover rounded-lg" />
					{/if}
				</div>

				<div>
					<label for="tags" class="mb-1 block text-sm font-medium text-dark-300">Tags (comma separated)</label>
					<input type="text" id="tags" bind:value={form.tags} placeholder="SvelteKit, TailwindCSS, TypeScript" class="input-field" />
				</div>

				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="liveUrl" class="mb-1 block text-sm font-medium text-dark-300">Live URL</label>
						<input type="url" id="liveUrl" bind:value={form.liveUrl} class="input-field" />
					</div>
					<div>
						<label for="sourceUrl" class="mb-1 block text-sm font-medium text-dark-300">Source URL</label>
						<input type="url" id="sourceUrl" bind:value={form.sourceUrl} class="input-field" />
					</div>
				</div>

				<div class="flex items-center gap-3">
					<input
						type="checkbox"
						id="featured"
						bind:checked={form.featured}
						class="rounded border-dark-700 bg-dark-800"
					/>
					<label for="featured" class="text-sm text-dark-300"
						>Featured project</label
					>
				</div>

				<div class="flex gap-3 pt-4">
					<button
						type="button"
						class="btn-secondary flex-1"
						onclick={() => (showModal = false)}
					>
						Cancel
					</button>
					<button type="submit" class="btn-primary flex-1" disabled={isLoading}>
						{isLoading ? "Saving..." : "Save"}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
