<script lang="ts">
	import { Award, ExternalLink, Calendar } from "lucide-svelte";
	import { onMount } from "svelte";

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

	const defaultCertificates: Certificate[] = [
		{
			id: 1,
			title: "AWS Certified Cloud Practitioner",
			issuer: "Amazon Web Services",
			issuerLogo:
				"https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
			credentialId: "ABC123XYZ",
			credentialUrl: "https://aws.amazon.com/verification",
			issueDate: "2024-01-15",
			expiryDate: "2027-01-15",
			description:
				"Foundational understanding of AWS Cloud concepts, services, and terminology.",
		},
		{
			id: 2,
			title: "Google Professional Cloud Developer",
			issuer: "Google Cloud",
			issuerLogo:
				"https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
			credentialId: "GCP-DEV-2024",
			credentialUrl: "https://cloud.google.com/certification",
			issueDate: "2024-03-20",
			expiryDate: null,
			description:
				"Expertise in building scalable and reliable applications using Google Cloud technologies.",
		},
	];

	function formatDate(dateStr: string | null): string {
		if (!dateStr) return "No Expiry";
		return new Date(dateStr).toLocaleDateString("en-US", {
			month: "long",
			year: "numeric",
		});
	}

	function isExpired(expiryDate: string | null): boolean {
		if (!expiryDate) return false;
		return new Date(expiryDate) < new Date();
	}

	onMount(async () => {
		const res = await fetch("/api/certificates");
		if (res.ok) {
			const data = await res.json();
			if (data.length > 0) {
				certificates = data;
			} else {
				certificates = defaultCertificates;
			}
		} else {
			certificates = defaultCertificates;
		}
	});
</script>

<svelte:head>
	<title>Certificates | Muhammad Umar Mansyur</title>
	<meta
		name="description"
		content="Professional certifications and credentials of Muhammad Umar Mansyur"
	/>
</svelte:head>
<div
	class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[30px_30px]"
></div>
<div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="section-title mb-4">Certificates</h1>
		<p class="section-subtitle border-b border-dashed border-gray-200 pb-6">
			Professional certifications and credentials that validate my expertise.
		</p>
	</div>

	<!-- Certificates Grid -->
	{#if certificates.length > 0}
		<div class="grid gap-6 md:grid-cols-2">
			{#each certificates as cert (cert.id)}
				<article
					class="border bg-white border-gray-200 rounded-lg p-6 group relative overflow-hidden hover:shadow-lg transition-shadow"
				>
					<!-- Issuer Logo & Badge -->
					<div class="flex items-start justify-between mb-6">
						<div class="flex items-center gap-4 mt-3">
							{#if cert.issuerLogo}
								<div
									class="size-14 rounded-xl bg-white p-2 shadow-sm border border-gray-100 flex items-center justify-center"
								>
									<img
										src={cert.issuerLogo}
										alt={cert.issuer}
										class="max-h-10 max-w-10 object-contain"
									/>
								</div>
							{:else}
								<div
									class="size-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
								>
									<Award size={28} class="text-white" />
								</div>
							{/if}
							<div>
								<h2
									class="font-semibold text-dark-100 group-hover:text-blue-500 transition-colors"
								>
									{cert.title}
								</h2>
								<p class="text-sm text-dark-400">{cert.issuer}</p>
							</div>
						</div>

						{#if cert.credentialUrl}
							<a
								href={cert.credentialUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="p-2 text-gray-400 hover:text-blue-500 transition-colors"
								aria-label="View credential"
							>
								<ExternalLink size={18} />
							</a>
						{/if}
					</div>

					<!-- Description -->
					{#if cert.description}
						<p class="text-sm text-dark-400 mb-4 line-clamp-2">
							{cert.description}
						</p>
					{/if}

					<!-- Dates & Credential ID -->
					<div class="flex flex-wrap items-center gap-4 text-xs text-dark-500">
						<div class="flex items-center gap-1.5">
							<Calendar size={14} />
							<span>Issued: {formatDate(cert.issueDate)}</span>
						</div>
						{#if cert.expiryDate}
							<div class="flex items-center gap-1.5">
								<span class={isExpired(cert.expiryDate) ? "text-red-400" : ""}>
									{isExpired(cert.expiryDate) ? "Expired:" : "Expires:"}
									{formatDate(cert.expiryDate)}
								</span>
							</div>
						{:else}
							<span class="text-green-500">No Expiration</span>
						{/if}
					</div>

					{#if cert.credentialId}
						<div class="mt-3 pt-3 border-t border-gray-100">
							<span class="text-xs text-dark-500"
								>Credential ID: {cert.credentialId}</span
							>
						</div>
					{/if}

					<!-- Status Badge -->
					{#if cert.expiryDate && isExpired(cert.expiryDate)}
						<div class="absolute top-0 left-0">
							<span
								class="absolute top-0 left-0 text-[11px] font-semibold py-1.5 px-3 rounded-br-xl rounded-tl-2xl z-[2] bg-red-600 text-white"
							>
								Expired
							</span>
						</div>
					{:else}
						<div class="absolute top-0 left-0">
							<span
								class="absolute top-0 left-0 text-[11px] font-semibold py-1.5 px-3 rounded-br-xl rounded-tl-2xl z-[2] bg-emerald-400 text-white"
							>
								Active
							</span>
						</div>
					{/if}
				</article>
			{/each}
		</div>
	{:else}
		<div class="card py-16 text-center">
			<Award size={48} class="mx-auto mb-4 text-gray-300" />
			<p class="text-gray-500">No certificates found.</p>
		</div>
	{/if}
</div>
