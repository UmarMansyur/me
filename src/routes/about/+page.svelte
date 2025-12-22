<script lang="ts">
	import {
		Coffee,
		Rocket,
		FolderGit2,
		GraduationCap,
		Heart,
		Code2,
	} from "lucide-svelte";
	import Skeleton from "$lib/components/Skeleton.svelte";
	import { onMount } from "svelte";

	interface Profile {
		name: string;
		title: string;
		description: string;
		email: string;
		location: string;
	}

	interface AboutContent {
		section: string;
		title: string;
		content: string;
	}

	let profile = $state<Profile | null>(null);
	let aboutContents = $state<Record<string, AboutContent>>({});
	let isLoading = $state(true);

	const defaultProfile = {
		name: "Muhammad Umar Mansyur",
		title: "Software Developer",
		description:
			"A passionate Software Developer from Madura Dev. I love building modern, user-friendly web applications with cutting-edge technologies.",
		email: "contact@umarmansyur.com",
		location: "Sumenep, Madura",
	};

	const defaultAbout = {
		background: {
			section: "background",
			title: "Background",
			content:
				"I specialize in building full-stack web applications using modern technologies like Laravel, SvelteKit, and TypeScript. I enjoy solving complex problems and turning ideas into functional, beautiful applications.",
		},
		specialization: {
			section: "specialization",
			title: "Specialization",
			content:
				"Full-stack web development with expertise in Laravel, SvelteKit, TypeScript, and modern database technologies.",
		},
		hobbies: {
			section: "hobbies",
			title: "When I'm Not Coding",
			content:
				"When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while reading tech articles.",
		},
	};

	onMount(async () => {
		try {
			const [profileRes, aboutRes] = await Promise.all([
				fetch("/api/profile"),
				fetch("/api/about"),
			]);

			if (profileRes.ok) {
				const data = await profileRes.json();
				if (data) profile = data;
			}

			if (aboutRes.ok) {
				const data = await aboutRes.json();
				if (data && data.length > 0) {
					data.forEach((item: AboutContent) => {
						aboutContents[item.section] = item;
					});
				}
			}
		} finally {
			isLoading = false;
		}
	});

	const displayProfile = $derived(profile || defaultProfile);
	const displayAbout = $derived({
		background: aboutContents.background || defaultAbout.background,
		specialization: aboutContents.specialization || defaultAbout.specialization,
		hobbies: aboutContents.hobbies || defaultAbout.hobbies,
	});

	const stats = [
		{ icon: FolderGit2, value: "92+", label: "GitHub Repositories" },
		{ icon: Rocket, value: "50+", label: "Projects Completed" },
		{ icon: Coffee, value: "∞", label: "Cups of Coffee" },
		{ icon: Code2, value: "5+", label: "Years Experience" },
	];

	const interests = [
		"Web Development",
		"Open Source",
		"UI/UX Design",
		"Cloud Computing",
		"System Architecture",
		"Database Design",
	];
</script>

<svelte:head>
	<title>About | {displayProfile.name}</title>
	<meta name="description" content="Learn more about {displayProfile.name}" />
</svelte:head>
<div
	class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[30px_30px]"
></div>
<div class="mx-auto md:max-w-[80vw] px-4 py-16 sm:px-6 lg:px-8 relative">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="section-title mb-4">About Me</h1>
		<p class="section-subtitle border-b border-dashed border-gray-200 pb-6">
			Get to know more about me, my background, and what drives me.
		</p>
	</div>

	<div class="grid gap-12 lg:grid-cols-3">
		<!-- Main Content -->
		<div class="lg:col-span-2 space-y-8">
			<!-- Bio Section -->
			<div class="card">
				{#if isLoading}
					<div class="flex items-center gap-2 mb-4">
						<Skeleton variant="circle" width="24px" height="24px" />
						<Skeleton variant="text" width="120px" height="24px" />
					</div>
					<div class="space-y-4">
						<Skeleton variant="text" width="90%" />
						<Skeleton variant="text" width="85%" />
						<Skeleton variant="text" width="80%" />
					</div>
				{:else}
					<h2
						class="text-xl font-semibold text-dark-100 mb-4 flex items-center gap-2"
					>
						<GraduationCap size={24} class="text-blue-500" />
						{displayAbout.background.title}
					</h2>
					<div class="space-y-4 text-dark-400 leading-relaxed">
						<p>
							Hello! I'm <span class="text-dark-100 font-medium"
								>{displayProfile.name}</span
							>, a {displayProfile.title} based in {displayProfile.location ||
								"Madura, Indonesia"}.
						</p>
						<p>{displayProfile.description}</p>
						<p>{displayAbout.background.content}</p>
					</div>
				{/if}
			</div>

			<!-- Specialization Section -->
			{#if isLoading}
				<div class="card">
					<div class="flex items-center gap-2 mb-4">
						<Skeleton variant="circle" width="24px" height="24px" />
						<Skeleton variant="text" width="150px" height="24px" />
					</div>
					<Skeleton variant="text" width="100%" />
				</div>
			{:else if displayAbout.specialization.content}
				<div class="card">
					<h2
						class="text-xl font-semibold text-dark-100 mb-4 flex items-center gap-2"
					>
						<Code2 size={24} class="text-blue-500" />
						{displayAbout.specialization.title}
					</h2>
					<p class="text-dark-400 leading-relaxed">
						{displayAbout.specialization.content}
					</p>
				</div>
			{/if}

			<!-- Hobbies Section -->
			{#if isLoading}
				<div class="card">
					<div class="flex items-center gap-2 mb-4">
						<Skeleton variant="circle" width="24px" height="24px" />
						<Skeleton variant="text" width="180px" height="24px" />
					</div>
					<Skeleton variant="text" width="100%" />
				</div>
			{:else if displayAbout.hobbies.content}
				<div class="card">
					<h2
						class="text-xl font-semibold text-dark-100 mb-4 flex items-center gap-2"
					>
						<Coffee size={24} class="text-blue-500" />
						{displayAbout.hobbies.title}
					</h2>
					<p class="text-dark-400 leading-relaxed">
						{displayAbout.hobbies.content}
					</p>
				</div>
			{/if}

			<!-- Interests -->
			<div class="card">
				<h2
					class="text-xl font-semibold text-dark-100 mb-4 flex items-center gap-2"
				>
					<Heart size={24} class="text-blue-500" />
					Interests
				</h2>
				<div class="flex flex-wrap gap-2">
					{#each interests as interest}
						<span class="tech-badge">
							{interest}
						</span>
					{/each}
				</div>
			</div>
		</div>

		<!-- Sidebar -->
		<div class="space-y-6">
			<!-- Stats -->
			<div class="card">
				<h3 class="text-lg font-semibold text-dark-100 mb-4">Quick Stats</h3>
				<div class="space-y-4">
					{#each stats as stat}
						<div class="flex items-center gap-4">
							<div
								class="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500"
							>
								<stat.icon size={20} />
							</div>
							<div>
								<p class="text-xl font-bold text-dark-100">{stat.value}</p>
								<p class="text-xs text-dark-500">{stat.label}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Contact Info -->
			<div class="card">
				<h3 class="text-lg font-semibold text-dark-100 mb-4">Contact</h3>
				<div class="space-y-3 text-sm">
					<div>
						<p class="text-dark-500">Email</p>
						<a
							href="mailto:{displayProfile.email}"
							class="text-blue-400 hover:underline"
						>
							{displayProfile.email}
						</a>
					</div>
					<div>
						<p class="text-dark-500">Location</p>
						<p class="text-dark-300">
							{displayProfile.location || "Sumenep, Madura"}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
