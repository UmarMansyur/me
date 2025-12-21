<script lang="ts">
	import { Plus, Star, Pencil, Trash2, X } from 'lucide-svelte';

	let skills = $state<Array<{
		id: number;
		name: string;
		icon: string | null;
		category: string;
	}>>([]);

	let showModal = $state(false);
	let editingSkill = $state<typeof skills[0] | null>(null);
	let isLoading = $state(false);

	let form = $state({
		name: '',
		icon: '',
		category: 'Frontend'
	});

	const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Language'];

	function openNewModal() {
		editingSkill = null;
		form = { name: '', icon: '', category: 'Frontend' };
		showModal = true;
	}

	function openEditModal(skill: typeof skills[0]) {
		editingSkill = skill;
		form = { name: skill.name, icon: skill.icon || '', category: skill.category };
		showModal = true;
	}

	async function handleSubmit() {
		isLoading = true;
		try {
			const method = editingSkill ? 'PUT' : 'POST';
			const url = editingSkill ? `/admin/skills/${editingSkill.id}` : '/admin/skills/api';
			
			await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			});

			showModal = false;
			loadSkills();
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	}

	async function deleteSkill(id: number) {
		if (!confirm('Delete this skill?')) return;
		await fetch(`/admin/skills/${id}`, { method: 'DELETE' });
		loadSkills();
	}

	async function loadSkills() {
		const response = await fetch('/admin/skills/api');
		if (response.ok) skills = await response.json();
	}

	$effect(() => { loadSkills(); });
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold text-dark-100">Skills</h1>
			<p class="mt-1 text-dark-400">Manage your technical skills</p>
		</div>
		<button class="btn-primary" onclick={openNewModal}>
			<Plus size={18} />
			<span>Add Skill</span>
		</button>
	</div>

	{#if skills.length === 0}
		<div class="card py-12 text-center">
			<Star size={48} class="mx-auto mb-4 text-dark-700" />
			<p class="text-dark-400">No skills yet. Add your first skill!</p>
		</div>
	{:else}
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each skills as skill}
				<div class="card flex items-center justify-between">
					<div>
						<p class="font-semibold text-dark-100">{skill.name}</p>
						<p class="text-xs text-dark-500">{skill.category}</p>
					</div>
					<div class="flex gap-1">
						<button class="p-2 text-dark-400 hover:text-dark-100" onclick={() => openEditModal(skill)}>
							<Pencil size={18} />
						</button>
						<button class="p-2 text-red-400/60 hover:text-red-400" onclick={() => deleteSkill(skill.id)}>
							<Trash2 size={18} />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
		<div class="card w-full max-w-md">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-xl font-semibold text-dark-100">{editingSkill ? 'Edit Skill' : 'New Skill'}</h2>
				<button class="text-dark-400 hover:text-dark-100" onclick={() => (showModal = false)}>
					<X size={24} />
				</button>
			</div>

			<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
				<div>
					<label for="name" class="mb-1 block text-sm font-medium text-dark-300">Name</label>
					<input type="text" id="name" bind:value={form.name} class="input-field" required />
				</div>

				<div>
					<label for="category" class="mb-1 block text-sm font-medium text-dark-300">Category</label>
					<select id="category" bind:value={form.category} class="input-field">
						{#each categories as cat}
							<option value={cat}>{cat}</option>
						{/each}
					</select>
				</div>

				<div class="flex gap-3 pt-4">
					<button type="button" class="btn-secondary flex-1" onclick={() => (showModal = false)}>Cancel</button>
					<button type="submit" class="btn-primary flex-1" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</button>
				</div>
			</form>
		</div>
	</div>
{/if}
