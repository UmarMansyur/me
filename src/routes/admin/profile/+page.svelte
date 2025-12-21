<script lang="ts">
	import { CheckCircle } from 'lucide-svelte';

	let profile = $state({
		name: 'Muhammad Umar Mansyur',
		title: 'Software Developer',
		description: 'Passionate Software Developer from Madura Dev',
		email: 'contact@umarmansyur.com',
		phone: '',
		location: 'Rombasan, Pragaan, Sumenep',
		avatarUrl: '',
		github: 'https://github.com/UmarMansyur',
		linkedin: '',
		twitter: ''
	});

	let isLoading = $state(false);
	let saved = $state(false);

	async function handleSave() {
		isLoading = true;
		try {
			await fetch('/admin/profile/api', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(profile)
			});
			saved = true;
			setTimeout(() => (saved = false), 3000);
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	}

	async function loadProfile() {
		try {
			const response = await fetch('/admin/profile/api');
			if (response.ok) {
				const data = await response.json();
				if (data) profile = { ...profile, ...data };
			}
		} catch (e) {
			console.error(e);
		}
	}

	$effect(() => { loadProfile(); });
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-semibold text-dark-100">Profile</h1>
		<p class="mt-1 text-dark-400">Manage your personal information</p>
	</div>

	<form onsubmit={(e) => { e.preventDefault(); handleSave(); }} class="card space-y-6">
		<div class="grid gap-6 sm:grid-cols-2">
			<div>
				<label for="name" class="mb-1 block text-sm font-medium text-dark-300">Full Name</label>
				<input type="text" id="name" bind:value={profile.name} class="input-field" required />
			</div>
			<div>
				<label for="title" class="mb-1 block text-sm font-medium text-dark-300">Title</label>
				<input type="text" id="title" bind:value={profile.title} placeholder="e.g. Software Developer" class="input-field" />
			</div>
		</div>

		<div>
			<label for="description" class="mb-1 block text-sm font-medium text-dark-300">Description</label>
			<textarea id="description" bind:value={profile.description} rows="3" class="input-field resize-none"></textarea>
		</div>

		<div class="grid gap-6 sm:grid-cols-2">
			<div>
				<label for="email" class="mb-1 block text-sm font-medium text-dark-300">Email</label>
				<input type="email" id="email" bind:value={profile.email} class="input-field" />
			</div>
			<div>
				<label for="phone" class="mb-1 block text-sm font-medium text-dark-300">Phone</label>
				<input type="tel" id="phone" bind:value={profile.phone} class="input-field" />
			</div>
		</div>

		<div>
			<label for="location" class="mb-1 block text-sm font-medium text-dark-300">Location</label>
			<input type="text" id="location" bind:value={profile.location} class="input-field" />
		</div>

		<div>
			<label for="avatarUrl" class="mb-1 block text-sm font-medium text-dark-300">Avatar URL</label>
			<input type="url" id="avatarUrl" bind:value={profile.avatarUrl} placeholder="https://example.com/avatar.jpg" class="input-field" />
			{#if profile.avatarUrl}
				<div class="mt-2 flex items-center gap-3">
					<img src={profile.avatarUrl} alt="Avatar Preview" class="size-16 rounded-full object-cover border-2 border-dark-700" />
					<span class="text-xs text-dark-500">Avatar preview</span>
				</div>
			{/if}
		</div>

		<hr class="border-dark-800" />

		<h3 class="font-semibold text-dark-100">Social Links</h3>

		<div class="grid gap-6 sm:grid-cols-3">
			<div>
				<label for="github" class="mb-1 block text-sm font-medium text-dark-300">GitHub</label>
				<input type="url" id="github" bind:value={profile.github} placeholder="https://github.com/..." class="input-field" />
			</div>
			<div>
				<label for="linkedin" class="mb-1 block text-sm font-medium text-dark-300">LinkedIn</label>
				<input type="url" id="linkedin" bind:value={profile.linkedin} placeholder="https://linkedin.com/in/..." class="input-field" />
			</div>
			<div>
				<label for="twitter" class="mb-1 block text-sm font-medium text-dark-300">Twitter</label>
				<input type="url" id="twitter" bind:value={profile.twitter} placeholder="https://twitter.com/..." class="input-field" />
			</div>
		</div>

		<div class="flex items-center gap-4 pt-4">
			<button type="submit" class="btn-primary" disabled={isLoading}>
				{isLoading ? 'Saving...' : 'Save Changes'}
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
