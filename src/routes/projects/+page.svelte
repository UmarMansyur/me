<script lang="ts">
	import { ExternalLink, Github, FolderOpen, Image } from "lucide-svelte";
	import { Icon } from "svelte-icons-pack";
	import * as Ri from "svelte-icons-pack/ri";
	import * as Si from "svelte-icons-pack/si";
	import * as Bi from "svelte-icons-pack/bi";
	import { onMount } from "svelte";

	interface Project {
		id: number;
		title: string;
		slug: string | null;
		description: string;
		imageUrl: string | null;
		role: string | null;
		tags: string;
		liveUrl: string | null;
		sourceUrl: string | null;
		featured: boolean;
	}

	let projects = $state<Project[]>([]);
	let activeFilter = $state("All");
	let allTags = $state<string[]>(["All"]);
	let currentPage = $state(1);
	const itemsPerPage = 6;

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
		Node: { icon: Si.SiNodedotjs, color: "#339933" },
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
	};
	const defaultProjects: Project[] = [
		{
			id: 1,
			title: "E-commerce Platform",
			slug: "e-commerce-platform",
			description:
				"Modern e-commerce with payment integration and inventory management",
			imageUrl:
				"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
			role: "FullStack Developer",
			tags: "Laravel,MySQL,TailwindCSS",
			liveUrl: "#",
			sourceUrl: "#",
			featured: true,
		},
		{
			id: 2,
			title: "Task Management",
			slug: "task-management",
			description:
				"Collaborative task app with real-time updates and team features",
			imageUrl:
				"https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
			role: "FullStack Developer",
			tags: "SvelteKit,Prisma,WebSocket",
			liveUrl: "#",
			sourceUrl: "#",
			featured: true,
		},
		{
			id: 3,
			title: "Analytics Dashboard",
			slug: "analytics-dashboard",
			description: "Real-time analytics for tracking business metrics",
			imageUrl:
				"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
			role: "FrontEnd Developer",
			tags: "TypeScript,Chart.js,API",
			liveUrl: "#",
			sourceUrl: "#",
			featured: false,
		},
		{
			id: 4,
			title: "Portfolio Website",
			slug: "portfolio-website",
			description: "This very website you are viewing now",
			imageUrl:
				"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
			role: "FullStack Developer",
			tags: "SvelteKit,TailwindCSS,Prisma",
			liveUrl: "#",
			sourceUrl: "https://github.com/UmarMansyur",
			featured: false,
		},
	];

	onMount(async () => {
		const res = await fetch("/api/projects");
		if (res.ok) {
			const data = await res.json();
			if (data.length > 0) {
				projects = data;
				const tags = new Set<string>();
				data.forEach((p: Project) => {
					p.tags.split(",").forEach((t) => {
						if (t.trim()) tags.add(t.trim());
					});
				});
				allTags = ["All", ...Array.from(tags)];
			} else {
				projects = defaultProjects;
			}
		} else {
			projects = defaultProjects;
		}
	});

	const filteredProjects = $derived(
		activeFilter === "All"
			? projects
			: projects.filter((p) => p.tags.includes(activeFilter)),
	);

	const totalPages = $derived(
		Math.ceil(filteredProjects.length / itemsPerPage),
	);
	const paginatedProjects = $derived(
		filteredProjects.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage,
		),
	);

	function changePage(page: number) {
		currentPage = page;
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
</script>

<svelte:head>
	<title>Projects | Muhammad Umar Mansyur</title>
	<meta
		name="description"
		content="View projects built by Muhammad Umar Mansyur"
	/>
</svelte:head>
<div
	class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[30px_30px]"
></div>
<div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 relative">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="section-title mb-4">Projects</h1>
		<p class="section-subtitle border-b border-dashed border-gray-200 pb-6">
			A collection of projects I've built. Feel free to explore and check out
			the source code.
		</p>
	</div>

	<!-- Filters -->
	<div class="mb-10 flex flex-wrap gap-2">
		{#each allTags as filter}
			<button
				class="px-4 py-2 text-sm font-medium rounded-lg transition-all
					{activeFilter === filter
					? 'bg-blue-500 text-white'
					: 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900'}"
				onclick={() => (activeFilter = filter)}
			>
				{filter}
			</button>
		{/each}
	</div>

	<!-- Projects Grid -->
	{#if paginatedProjects.length > 0}
		<div class="grid gap-6 md:grid-cols-3">
			{#each paginatedProjects as project (project.id)}
				<a
					href="/projects/{project.slug || project.id}"
					class="block border border-gray-200 rounded-xl group overflow-hidden hover:shadow-lg transition-shadow relative"
				>
					<div
						class="absolute top-0 right-0 bg-blue-400 text-white text-[13px] font-medium py-1 px-2 rounded-bl-xl rounded-tr-xl z-[2]"
					>
						{project.role}
					</div>
					<!-- Project Image -->
					<div
						class="relative h-48 overflow-hidden bg-gray-100 border-b border-gray-200"
					>
						{#if project.imageUrl}
							<img
								src={project.imageUrl}
								alt={project.title}
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
						{:else}
							<div
								class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
							>
								<Image size={48} class="text-gray-300" />
							</div>
						{/if}
						{#if project.featured}
							<div class="absolute top-3 left-3">
								<span
									class="px-2 py-1 text-xs font-medium rounded-full bg-blue-500 text-white shadow-lg"
								>
									Featured
								</span>
							</div>
						{/if}
						<!-- Overlay with links -->
						<div
							class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100"
						>
							{#if project.liveUrl}
								<button
									onclick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										if (project.liveUrl) window.open(project.liveUrl, "_blank");
									}}
									class="p-3 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-lg"
									aria-label="Live demo"
								>
									<ExternalLink size={20} />
								</button>
							{/if}
							{#if project.sourceUrl}
								<button
									onclick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										if (project.sourceUrl)
											window.open(project.sourceUrl, "_blank");
									}}
									class="p-3 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-lg"
									aria-label="Source code"
								>
									<Github size={20} />
								</button>
							{/if}
						</div>
					</div>

					<!-- Content -->
					<div class="px-5 py-3 bg-white">
						<h2
							class="font-semibold text-sm text-dark-100 group-hover:text-black transition-colors mb-2"
						>
							{project.title}
						</h2>
						<p class="text-xs text-dark-400 mb-4 line-clamp-2">
							{project.description}
						</p>

						<!-- Tags with icons -->
						<div class="flex flex-wrap gap-2">
							{#each project.tags.split(",").filter((t) => t.trim()) as tag}
								{@const config = tagConfig[tag.trim()] || {
									icon: null,
									color: "#6B7280",
									bg: "bg-gray-100",
								}}

								{#if config.icon}
									<div
										class="flex items-center gap-2"
										style="color: {config.color}"
									>
										<Icon src={config.icon} size={24} />
									</div>
								{/if}
								<!-- {tag.trim()} -->
							{/each}
						</div>
					</div>
				</a>
			{/each}
		</div>
		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="flex justify-center items-center gap-2 mt-10">
				<button
					class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={currentPage === 1}
					onclick={() => changePage(currentPage - 1)}
				>
					Previous
				</button>
				{#each Array(totalPages) as _, i}
					<button
						class="px-4 py-2 rounded-lg {currentPage === i + 1
							? 'bg-blue-500 text-white'
							: 'border border-gray-200 text-gray-600 hover:bg-gray-100'}"
						onclick={() => changePage(i + 1)}
					>
						{i + 1}
					</button>
				{/each}
				<button
					class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={currentPage === totalPages}
					onclick={() => changePage(currentPage + 1)}
				>
					Next
				</button>
			</div>
		{/if}
	{:else}
		<div class="card py-16 text-center">
			<FolderOpen size={48} class="mx-auto mb-4 text-gray-300" />
			<p class="text-gray-500">No projects found with the selected filter.</p>
		</div>
	{/if}
</div>
