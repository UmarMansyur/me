<script lang="ts">
	import { Folder, Briefcase, Award, MessageSquare, Eye, ThumbsUp, PlusCircle, Pencil } from "lucide-svelte";

	let stats = $state([
		{ label: "Projects", value: 0, icon: Folder, href: "/admin/projects" },
		{ label: "Experience", value: 0, icon: Briefcase, href: "/admin/experience" },
		{ label: "Certificates", value: 0, icon: Award, href: "/admin/certificates" },
		{ label: "Testimonials", value: 0, icon: MessageSquare, href: "/admin/testimonials" },
	]);

	let siteStats = $state({ visitors: 0, likes: 0, dislikes: 0 });

	async function loadStats() {
		const [projectsRes, experienceRes, certificatesRes, testimonialsRes, siteRes] = await Promise.all([
			fetch("/admin/projects/api"),
			fetch("/admin/experience/api"),
			fetch("/admin/certificates/api"),
			fetch("/admin/testimonials/api"),
			fetch("/api/stats")
		]);

		if (projectsRes.ok) {
			const data = await projectsRes.json();
			stats[0].value = data.length;
		}
		if (experienceRes.ok) {
			const data = await experienceRes.json();
			stats[1].value = data.length;
		}
		if (certificatesRes.ok) {
			const data = await certificatesRes.json();
			stats[2].value = data.length;
		}
		if (testimonialsRes.ok) {
			const data = await testimonialsRes.json();
			stats[3].value = data.length;
		}
		if (siteRes.ok) {
			siteStats = await siteRes.json();
		}
	}

	$effect(() => {
		loadStats();
	});
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-2xl font-semibold text-dark-100">Dashboard</h1>
		<p class="mt-2 text-dark-400">Welcome to your admin panel</p>
	</div>

	<!-- Site Stats -->
	<div class="grid gap-6 sm:grid-cols-3">
		<div class="card flex items-center gap-4">
			<div class="flex size-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
				<Eye size={24} />
			</div>
			<div>
				<p class="text-2xl font-bold text-dark-100">{siteStats.visitors}</p>
				<p class="text-sm text-dark-400">Total Visitors</p>
			</div>
		</div>
		<div class="card flex items-center gap-4">
			<div class="flex size-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
				<ThumbsUp size={24} />
			</div>
			<div>
				<p class="text-2xl font-bold text-dark-100">{siteStats.likes}</p>
				<p class="text-sm text-dark-400">Total Likes</p>
			</div>
		</div>
		<div class="card flex items-center gap-4">
			<div class="flex size-12 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
				<ThumbsUp size={24} class="rotate-180" />
			</div>
			<div>
				<p class="text-2xl font-bold text-dark-100">{siteStats.dislikes}</p>
				<p class="text-sm text-dark-400">Total Dislikes</p>
			</div>
		</div>
	</div>

	<!-- Content Stats Cards -->
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each stats as stat}
			<a href={stat.href} class="card card-hover flex items-center gap-4">
				<div class="flex size-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
					<stat.icon size={24} />
				</div>
				<div>
					<p class="text-2xl font-bold text-dark-100">{stat.value}</p>
					<p class="text-sm text-dark-400">{stat.label}</p>
				</div>
			</a>
		{/each}
	</div>

	<!-- Quick Actions -->
	<div>
		<h2 class="mb-4 text-lg font-semibold text-dark-100">Quick Actions</h2>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<a href="/admin/projects" class="card flex items-center gap-3 transition-colors hover:border-blue-500/30">
				<PlusCircle size={20} class="text-blue-500" />
				<span class="text-sm font-medium text-dark-200">Add Project</span>
			</a>
			<a href="/admin/experience" class="card flex items-center gap-3 transition-colors hover:border-blue-500/30">
				<PlusCircle size={20} class="text-blue-500" />
				<span class="text-sm font-medium text-dark-200">Add Experience</span>
			</a>
			<a href="/admin/certificates" class="card flex items-center gap-3 transition-colors hover:border-blue-500/30">
				<PlusCircle size={20} class="text-blue-500" />
				<span class="text-sm font-medium text-dark-200">Add Certificate</span>
			</a>
			<a href="/admin/profile" class="card flex items-center gap-3 transition-colors hover:border-blue-500/30">
				<Pencil size={20} class="text-blue-500" />
				<span class="text-sm font-medium text-dark-200">Edit Profile</span>
			</a>
		</div>
	</div>

	<!-- Help Section -->
	<div class="card border-blue-500/20 bg-blue-500/5">
		<h3 class="mb-2 font-semibold text-dark-100">Getting Started</h3>
		<p class="text-sm text-dark-400">
			Use the sidebar to navigate between different sections. You can manage
			your projects, skills, experience, and profile information from here.
			Changes will be reflected on the public website.
		</p>
	</div>
</div>
