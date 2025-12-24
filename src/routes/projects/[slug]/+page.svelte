<script lang="ts">
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import {
		ArrowLeft,
		ExternalLink,
		Github,
		Calendar,
		User,
		Image,
	} from "lucide-svelte";
	import { Icon } from "svelte-icons-pack";
	import * as Ri from "svelte-icons-pack/ri";
	import * as Si from "svelte-icons-pack/si";
	import * as Bi from "svelte-icons-pack/bi";

	interface Project {
		id: number;
		title: string;
		slug: string;
		description: string;
		content: string | null;
		imageUrl: string | null;
		liveUrl: string | null;
		sourceUrl: string | null;
		role: string | null;
		tags: string;
		featured: boolean;
		createdAt: string;
	}

	let project = $state<Project | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	const tagConfig: Record<string, { icon: any; color: string }> = {
		Laravel: { icon: Si.SiLaravel, color: "#FF2D20" },
		SvelteKit: {
			icon: Ri.RiLogosSvelteFill,
			color: "#FF3E00",
		},
		Svelte: {
			icon: Ri.RiLogosSvelteFill,
			color: "#FF3E00",
		},
		MySQL: { icon: Si.SiMysql, color: "#4479A1" },
		TailwindCSS: { icon: Si.SiTailwindcss, color: "#06B6D4" },
		Bootstrap: { icon: Si.SiBootstrap, color: "#7952B3" },
		CodeIgniter: { icon: Si.SiCodeigniter, color: "#EF4223" },
		Flutter: { icon: Si.SiFlutter, color: "#02569B" },
		React: { icon: Si.SiReact, color: "#61DAFB" },
		Lumen: { icon: Si.SiLumen, color: "#E74430" },
		Prisma: { icon: Si.SiPrisma, color: "#2D3748" },
		TypeScript: { icon: Si.SiTypescript, color: "#3178C6" },
		ChartJs: { icon: Si.SiChartdotjs, color: "#FF6384" },
		WebSocket: { icon: null, color: "#010101" },
		PHP: { icon: Si.SiPhp, color: "#777BB4" },
		Vue: { icon: Si.SiVuedotjs, color: "#4FC08D" },
		Next: { icon: Si.SiNextdotjs, color: "#000000" },
		NodeJs: { icon: Si.SiNodedotjs, color: "#339933" },
		MongoDB: { icon: Si.SiMongodb, color: "#47A248" },
		PostgreSQL: { icon: Si.SiPostgresql, color: "#4169E1" },
		API: { icon: null, color: "#6366F1" },
		GraphQl: { icon: Si.SiGraphql, color: "#E10098" },
		Redis: { icon: Si.SiRedis, color: "#DC382D" },
		AWS: { icon: Bi.BiLogoAws, color: "#FF9900" },
		DigitalOcean: { icon: Si.SiDigitalocean, color: "#0080FF" },
		Heroku: { icon: Si.SiHeroku, color: "#430098" },
		Netlify: { icon: Si.SiNetlify, color: "#00C7B7" },
		Vercel: { icon: Si.SiVercel, color: "#000000" },
		GitHub: { icon: Si.SiGithub, color: "#181717" },
		GitLab: { icon: Si.SiGitlab, color: "#FC6D26" },
		Bitbucket: { icon: Si.SiBitbucket, color: "#0052CC" },
		Docker: { icon: Si.SiDocker, color: "#2496ED" },
		Git: { icon: Si.SiGit, color: "#F05032" },
		vercel: { icon: Si.SiVercel, color: "#000000" },
		html5: { icon: Si.SiHtml5, color: "#E34F26" },
		css3: { icon: Si.SiCss3, color: "#1572B6" },
		javascript: { icon: Si.SiJavascript, color: "#F7DF1E" },
		bootstrap: { icon: Si.SiBootstrap, color: "#7952B3" },
		tailwindcss: { icon: Si.SiTailwindcss, color: "#06B6D4" },
		php: { icon: Si.SiPhp, color: "#777BB4" },
		mysql: { icon: Si.SiMysql, color: "#4479A1" },
		ReactQuery: { icon: Si.SiReactquery, color: "#FF4154" },
		Figma: { icon: Si.SiFigma, color: "#F24E1E" },
		JavaScript: { icon: Si.SiJavascript, color: "#F7DF1E" },
		"Framer Motion": { icon: Si.SiFramer, color: "#0055FF" },
		ExpressJs: { icon: Si.SiExpress, color: "#0055FF" },
		HTML: { icon: Si.SiHtml5, color: "#E34F26" },
		CSS: { icon: Si.SiCss3, color: "#1572B6" },
	};

	onMount(async () => {
		try {
			const res = await fetch(`/api/projects/${page.params.slug}`);
			if (res.ok) {
				project = await res.json();
			} else {
				error = "Project not found";
			}
		} catch (e) {
			error = "Failed to load project";
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>{project?.title || "Project"} | Muhammad Umar Mansyur</title>
</svelte:head>
<div
	class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[30px_30px]"
></div>
<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 relative">
	<a
		href="/projects"
		class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 mb-8 transition-colors"
	>
		<ArrowLeft size={16} />
		Back to Projects
	</a>

	{#if loading}
		<div class="text-center py-20">
			<div
				class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"
			></div>
			<p class="mt-4 text-gray-500">Loading project...</p>
		</div>
	{:else if error}
		<div class="text-center py-20">
			<p class="text-red-500">{error}</p>
			<a href="/projects" class="btn-primary mt-4 inline-flex"
				>Back to Projects</a
			>
		</div>
	{:else if project}
		<!-- Project Image -->
		<div
			class="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gray-100"
		>
			{#if project.imageUrl}
				<img
					src={project.imageUrl}
					alt={project.title}
					class="w-full h-full object-cover"
				/>
			{:else}
				<div
					class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
				>
					<Image size={64} class="text-gray-300" />
				</div>
			{/if}
			{#if project.featured}
				<div class="absolute top-4 left-4">
					<span
						class="px-3 py-1 text-sm font-medium rounded-full bg-blue-500 text-white shadow-lg"
						>Featured</span
					>
				</div>
			{/if}
		</div>

		<!-- Project Header -->
		<div class="mb-8">
			<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
				{project.title}
			</h1>

			<div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
				{#if project.role}
					<div class="flex items-center gap-1.5">
						<User size={16} />
						<span>{project.role}</span>
					</div>
				{/if}
				<div class="flex items-center gap-1.5">
					<Calendar size={16} />
					<span
						>{new Date(project.createdAt).toLocaleDateString("en-US", {
							month: "long",
							year: "numeric",
						})}</span
					>
				</div>
			</div>

			<!-- Tags -->
			<div class="flex flex-wrap gap-1 mb-6">
				{#each project.tags.split(",").filter((t) => t.trim()) as tag}
					{@const config = tagConfig[tag.trim()] || {
						icon: null,
						color: "#6B7280",
					}}
					<span
						class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full"
						style="color: {config.color};"
					>
						{#if config.icon}
							<Icon src={config.icon} size={28} />
						{/if}
					</span>
				{/each}
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-wrap gap-3">
				{#if project.liveUrl}
					<a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn-primary"
					>
						<ExternalLink size={18} />
						Live Demo
					</a>
				{/if}
				{#if project.sourceUrl}
					<a
						href={project.sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn-secondary"
					>
						<Github size={18} />
						Source Code
					</a>
				{/if}
			</div>
		</div>

		<!-- Project Description -->
		<div class="prose prose-lg max-w-none">
			<h2 class="text-xl font-semibold text-gray-900 mb-4">
				About this project
			</h2>
			<p class="text-gray-600 leading-relaxed mb-6">{project.description}</p>

			{#if project.content}
				<div class="mt-8 pt-8 border-t border-gray-200">
					<h2 class="text-xl font-semibold text-gray-900 mb-4">
						Project Details
					</h2>
					<div class="text-gray-600 leading-relaxed whitespace-pre-wrap">
						{project.content}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
