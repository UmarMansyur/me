<script lang="ts">
	import { Plus, Briefcase, Pencil, Trash2, X } from "lucide-svelte";

	let experiences = $state<
		Array<{
			id: number;
			company: string;
			position: string;
			description: string;
			jobType: string;
			companyLogo: string | null;
			startDate: string;
			endDate: string | null;
			current: boolean;
		}>
	>([]);

	const jobTypes = ["Fulltime", "Freelance", "Part Time", "Contract", "Internship"];

	let showModal = $state(false);
	let editingExp = $state<(typeof experiences)[0] | null>(null);
	let isLoading = $state(false);

	let form = $state({
		company: "",
		position: "",
		description: "",
		jobType: "Fulltime",
		companyLogo: "",
		startDate: "",
		endDate: "",
		current: false,
	});

	function openNewModal() {
		editingExp = null;
		form = {
			company: "",
			position: "",
			description: "",
			jobType: "Fulltime",
			companyLogo: "",
			startDate: "",
			endDate: "",
			current: false,
		};
		showModal = true;
	}

	function openEditModal(exp: (typeof experiences)[0]) {
		editingExp = exp;
		form = {
			company: exp.company,
			position: exp.position,
			description: exp.description,
			jobType: exp.jobType || "Fulltime",
			companyLogo: exp.companyLogo || "",
			startDate: exp.startDate ? new Date(exp.startDate).toISOString().split("T")[0] : "",
			endDate: exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0] : "",
			current: exp.current,
		};
		showModal = true;
	}

	async function handleSubmit() {
		isLoading = true;
		try {
			const method = editingExp ? "PUT" : "POST";
			const url = editingExp
				? `/admin/experience/${editingExp.id}`
				: "/admin/experience/api";

			await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			showModal = false;
			loadExperiences();
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	}

	async function deleteExp(id: number) {
		if (!confirm("Delete this experience?")) return;
		await fetch(`/admin/experience/${id}`, { method: "DELETE" });
		loadExperiences();
	}

	async function loadExperiences() {
		const response = await fetch("/admin/experience/api");
		if (response.ok) experiences = await response.json();
	}

	$effect(() => {
		loadExperiences();
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold text-dark-100">Experience</h1>
			<p class="mt-1 text-dark-400">Manage your work experience</p>
		</div>
		<button class="btn-primary" onclick={openNewModal}>
			<Plus size={18} />
			<span>Add Experience</span>
		</button>
	</div>

	{#if experiences.length === 0}
		<div class="card py-12 text-center">
			<Briefcase size={48} class="mx-auto mb-4 text-dark-700" />
			<p class="text-dark-400">No experience yet. Add your first job!</p>
		</div>
	{:else}
		<div class="space-y-4">
			{#each experiences as exp}
				<div class="card flex items-center justify-between gap-4">
					<div class="flex-1">
						<div class="flex items-center gap-2">
							<h3 class="font-semibold text-dark-100">{exp.position}</h3>
							{#if exp.current}
								<span
									class="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400"
									>Current</span
								>
							{/if}
						</div>
						<p class="text-sm text-dark-400">@ {exp.company}</p>
					</div>
					<div class="flex gap-2">
						<button
							class="p-2 text-dark-400 hover:text-dark-100"
							onclick={() => openEditModal(exp)}
						>
							<Pencil size={20} />
						</button>
						<button
							class="p-2 text-red-400/60 hover:text-red-400"
							onclick={() => deleteExp(exp.id)}
						>
							<Trash2 size={20} />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
	>
		<div class="card w-full max-w-lg max-h-[90vh] overflow-y-auto">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-xl font-semibold text-dark-100">
					{editingExp ? "Edit Experience" : "New Experience"}
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
				<div>
					<label
						for="company"
						class="mb-1 block text-sm font-medium text-dark-300">Company</label
					>
					<input
						type="text"
						id="company"
						bind:value={form.company}
						class="input-field"
						required
					/>
				</div>
				<div>
					<label for="position" class="mb-1 block text-sm font-medium text-dark-300">Position</label>
					<input type="text" id="position" bind:value={form.position} class="input-field" required />
				</div>
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="jobType" class="mb-1 block text-sm font-medium text-dark-300">Job Type</label>
						<select id="jobType" bind:value={form.jobType} class="input-field">
							{#each jobTypes as type}
								<option value={type}>{type}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="companyLogo" class="mb-1 block text-sm font-medium text-dark-300">Company Logo URL</label>
						<input type="url" id="companyLogo" bind:value={form.companyLogo} class="input-field" placeholder="https://..." />
					</div>
				</div>
				<div>
					<label for="description" class="mb-1 block text-sm font-medium text-dark-300">Description</label>
					<textarea id="description" bind:value={form.description} rows="4" class="input-field resize-none"></textarea>
				</div>
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="startDate" class="mb-1 block text-sm font-medium text-dark-300">Start Date</label>
						<input type="date" id="startDate" bind:value={form.startDate} class="input-field" required />
					</div>
					<div>
						<label for="endDate" class="mb-1 block text-sm font-medium text-dark-300">End Date</label>
						<input type="date" id="endDate" bind:value={form.endDate} class="input-field" disabled={form.current} />
					</div>
				</div>
				<div class="flex items-center gap-3">
					<input
						type="checkbox"
						id="current"
						bind:checked={form.current}
						class="rounded border-dark-700 bg-dark-800"
					/>
					<label for="current" class="text-sm text-dark-300">Current position</label>
				</div>

				<div class="flex gap-3 pt-4">
					<button
						type="button"
						class="btn-secondary flex-1"
						onclick={() => (showModal = false)}>Cancel</button
					>
					<button type="submit" class="btn-primary flex-1" disabled={isLoading}
						>{isLoading ? "Saving..." : "Save"}</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}
