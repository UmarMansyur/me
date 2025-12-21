<script lang="ts">
	import { Plus, Award, Pencil, Trash2, X, ExternalLink } from "lucide-svelte";

	interface Certificate {
		id: number;
		title: string;
		issuer: string;
		issuerLogo: string | null;
		credentialId: string | null;
		credentialUrl: string | null;
		issueDate: string;
		expiryDate: string | null;
		description: string | null;
	}

	let certificates = $state<Certificate[]>([]);
	let showModal = $state(false);
	let editingCert = $state<Certificate | null>(null);
	let isLoading = $state(false);

	let form = $state({
		title: "",
		issuer: "",
		issuerLogo: "",
		credentialId: "",
		credentialUrl: "",
		issueDate: "",
		expiryDate: "",
		description: "",
	});

	function openNewModal() {
		editingCert = null;
		form = {
			title: "",
			issuer: "",
			issuerLogo: "",
			credentialId: "",
			credentialUrl: "",
			issueDate: new Date().toISOString().split("T")[0],
			expiryDate: "",
			description: "",
		};
		showModal = true;
	}

	function openEditModal(cert: Certificate) {
		editingCert = cert;
		form = {
			title: cert.title,
			issuer: cert.issuer,
			issuerLogo: cert.issuerLogo || "",
			credentialId: cert.credentialId || "",
			credentialUrl: cert.credentialUrl || "",
			issueDate: cert.issueDate ? new Date(cert.issueDate).toISOString().split("T")[0] : "",
			expiryDate: cert.expiryDate ? new Date(cert.expiryDate).toISOString().split("T")[0] : "",
			description: cert.description || "",
		};
		showModal = true;
	}

	async function handleSubmit() {
		isLoading = true;
		try {
			const method = editingCert ? "PUT" : "POST";
			const url = editingCert
				? `/admin/certificates/${editingCert.id}`
				: "/admin/certificates/api";

			await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			showModal = false;
			loadCertificates();
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	}

	async function deleteCert(id: number) {
		if (!confirm("Delete this certificate?")) return;
		await fetch(`/admin/certificates/${id}`, { method: "DELETE" });
		loadCertificates();
	}

	async function loadCertificates() {
		const response = await fetch("/admin/certificates/api");
		if (response.ok) certificates = await response.json();
	}

	function formatDate(dateStr: string | null): string {
		if (!dateStr) return "No Expiry";
		return new Date(dateStr).toLocaleDateString("en-US", {
			month: "short",
			year: "numeric",
		});
	}

	$effect(() => {
		loadCertificates();
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold text-dark-100">Certificates</h1>
			<p class="mt-1 text-dark-400">Manage your certifications and credentials</p>
		</div>
		<button class="btn-primary" onclick={openNewModal}>
			<Plus size={18} />
			<span>Add Certificate</span>
		</button>
	</div>

	{#if certificates.length === 0}
		<div class="card py-12 text-center">
			<Award size={48} class="mx-auto mb-4 text-dark-700" />
			<p class="text-dark-400">No certificates yet. Add your first certificate!</p>
		</div>
	{:else}
		<div class="space-y-4">
			{#each certificates as cert}
				<div class="card flex items-center justify-between gap-4">
					<div class="flex items-center gap-4 flex-1">
						{#if cert.issuerLogo}
							<img src={cert.issuerLogo} alt={cert.issuer} class="size-12 rounded-lg object-contain bg-white p-1" />
						{:else}
							<div class="size-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
								<Award size={24} class="text-blue-400" />
							</div>
						{/if}
						<div class="flex-1">
							<div class="flex items-center gap-2">
								<h3 class="font-semibold text-dark-100">{cert.title}</h3>
								{#if cert.credentialUrl}
									<a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300">
										<ExternalLink size={14} />
									</a>
								{/if}
							</div>
							<p class="text-sm text-dark-400">{cert.issuer}</p>
							<p class="text-xs text-dark-500">
								Issued: {formatDate(cert.issueDate)} 
								{#if cert.expiryDate}
									• Expires: {formatDate(cert.expiryDate)}
								{/if}
							</p>
						</div>
					</div>
					<div class="flex gap-2">
						<button
							class="p-2 text-dark-400 hover:text-dark-100"
							onclick={() => openEditModal(cert)}
						>
							<Pencil size={20} />
						</button>
						<button
							class="p-2 text-red-400/60 hover:text-red-400"
							onclick={() => deleteCert(cert.id)}
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
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
		<div class="card w-full max-w-lg max-h-[90vh] overflow-y-auto">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-xl font-semibold text-dark-100">
					{editingCert ? "Edit Certificate" : "New Certificate"}
				</h2>
				<button class="text-dark-400 hover:text-dark-100" onclick={() => (showModal = false)}>
					<X size={24} />
				</button>
			</div>

			<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
				<div>
					<label for="title" class="mb-1 block text-sm font-medium text-dark-300">Certificate Title</label>
					<input type="text" id="title" bind:value={form.title} class="input-field" required />
				</div>

				<div>
					<label for="issuer" class="mb-1 block text-sm font-medium text-dark-300">Issuing Organization</label>
					<input type="text" id="issuer" bind:value={form.issuer} class="input-field" required />
				</div>

				<div>
					<label for="issuerLogo" class="mb-1 block text-sm font-medium text-dark-300">Issuer Logo URL</label>
					<input type="url" id="issuerLogo" bind:value={form.issuerLogo} class="input-field" placeholder="https://..." />
					{#if form.issuerLogo}
						<div class="mt-2 flex items-center gap-2">
							<img src={form.issuerLogo} alt="Logo Preview" class="h-12 w-12 object-contain rounded-lg bg-white p-1 border" />
							<span class="text-xs text-dark-500">Logo preview</span>
						</div>
					{/if}
				</div>

				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="credentialId" class="mb-1 block text-sm font-medium text-dark-300">Credential ID</label>
						<input type="text" id="credentialId" bind:value={form.credentialId} class="input-field" />
					</div>
					<div>
						<label for="credentialUrl" class="mb-1 block text-sm font-medium text-dark-300">Credential URL</label>
						<input type="url" id="credentialUrl" bind:value={form.credentialUrl} class="input-field" />
					</div>
				</div>

				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="issueDate" class="mb-1 block text-sm font-medium text-dark-300">Issue Date</label>
						<input type="date" id="issueDate" bind:value={form.issueDate} class="input-field" required />
					</div>
					<div>
						<label for="expiryDate" class="mb-1 block text-sm font-medium text-dark-300">Expiry Date (optional)</label>
						<input type="date" id="expiryDate" bind:value={form.expiryDate} class="input-field" />
					</div>
				</div>

				<div>
					<label for="description" class="mb-1 block text-sm font-medium text-dark-300">Description</label>
					<textarea id="description" bind:value={form.description} rows="3" class="input-field resize-none"></textarea>
				</div>

				<div class="flex gap-3 pt-4">
					<button type="button" class="btn-secondary flex-1" onclick={() => (showModal = false)}>Cancel</button>
					<button type="submit" class="btn-primary flex-1" disabled={isLoading}>
						{isLoading ? "Saving..." : "Save"}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
