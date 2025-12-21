<script lang="ts">
	import { Briefcase, Calendar, MapPin, Building2 } from "lucide-svelte";
	import { Icon } from "svelte-icons-pack";
	import { BiBriefcase } from "svelte-icons-pack/bi";
	import { onMount } from "svelte";

	interface Experience {
		id: number;
		company: string;
		position: string;
		description: string;
		jobType: string;
		companyLogo: string | null;
		startDate: string;
		endDate: string | null;
		current: boolean;
	}

	const jobTypeColors: Record<
		string,
		{ bg: string; text: string; border: string }
	> = {
		Fulltime: {
			bg: "bg-green-50",
			text: "text-green-600",
			border: "border-green-200",
		},
		Freelance: {
			bg: "bg-purple-50",
			text: "text-purple-600",
			border: "border-purple-200",
		},
		"Part Time": {
			bg: "bg-blue-50",
			text: "text-blue-600",
			border: "border-blue-200",
		},
		Contract: {
			bg: "bg-orange-50",
			text: "text-orange-600",
			border: "border-orange-200",
		},
		Internship: {
			bg: "bg-pink-50",
			text: "text-pink-600",
			border: "border-pink-200",
		},
	};

	let experiences = $state<Experience[]>([]);

	const defaultExperiences: Experience[] = [
		{
			id: 1,
			company: "Madura Dev",
			position: "Software Developer",
			description:
				"Building modern web applications using Laravel, SvelteKit, and cutting-edge technologies. Collaborating with team to develop digital solutions for clients.",
			jobType: "Fulltime",
			companyLogo: "https://avatars.githubusercontent.com/u/70986579",
			startDate: "2023-01-01",
			endDate: null,
			current: true,
		},
		{
			id: 2,
			company: "Freelance",
			position: "Full Stack Developer",
			description:
				"Working on various web projects for local and international clients. Creating information systems and management applications for SMEs.",
			jobType: "Freelance",
			companyLogo: null,
			startDate: "2019-01-01",
			endDate: null,
			current: true,
		},
		{
			id: 3,
			company: "Startup Project",
			position: "Lead Developer",
			description:
				"Led development team in building e-commerce platform. System architecture and code review to maintain code quality.",
			jobType: "Contract",
			companyLogo: null,
			startDate: "2020-01-01",
			endDate: "2022-12-01",
			current: false,
		},
	];

	function formatDate(dateStr: string | null): string {
		if (!dateStr) return "Present";
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			month: "short",
			year: "numeric",
		});
	}

	onMount(async () => {
		const res = await fetch("/api/experience");
		if (res.ok) {
			const data = await res.json();
			if (data.length > 0) {
				experiences = data;
			} else {
				experiences = defaultExperiences;
			}
		} else {
			experiences = defaultExperiences;
		}
	});
</script>

<svelte:head>
	<title>Experience | Muhammad Umar Mansyur</title>
	<meta name="description" content="Work experience of Muhammad Umar Mansyur" />
</svelte:head>
<div
	class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[30px_30px]"
></div>
<div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="section-title mb-4">Experience</h1>
		<p class="section-subtitle border-b border-dashed border-gray-200 pb-6">
			My professional journey and career milestones as a software developer.
		</p>
	</div>

	<!-- Timeline -->
	<div class="relative">
		{#each experiences as exp, i}
			<div class="relative pl-8 pb-12 last:pb-0">
				<!-- Timeline Line -->
				{#if i < experiences.length - 1}
					<div
						class="absolute left-[5px] top-3 bottom-0 w-0.5 bg-gray-200"
					></div>
				{/if}

				<!-- Timeline Dot -->
				<div class="absolute left-0 top-1.5">
					<div
						class="timeline-dot {exp.current ? '' : 'bg-dark-700 shadow-none'}"
					></div>
				</div>

				<!-- Content Card -->
				<div class="card">
					<div class="flex gap-4">
						<!-- Company Logo -->
						<div class="hidden sm:block flex-shrink-0">
							{#if exp.companyLogo}
								<img
									src={exp.companyLogo}
									alt={exp.company}
									class="size-14 rounded-xl object-cover border border-gray-200 shadow-sm"
								/>
							{:else}
								<div
									class="size-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
								>
									<Building2 size={24} class="text-gray-400" />
								</div>
							{/if}
						</div>

						<div class="flex-1">
							<!-- Position & Badges -->
							<div class="flex flex-wrap items-center gap-2 mb-1">
								<h2
									class="text-lg font-semibold {exp.current
										? 'text-blue-500'
										: 'text-dark-100'}"
								>
									{exp.position}
								</h2>
								{#if exp.current}
									<span
										class="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
									>
										Current
									</span>
								{/if}
								{#if exp.jobType}
									{@const colors = jobTypeColors[exp.jobType] || {
										bg: "bg-gray-50",
										text: "text-gray-600",
										border: "border-gray-200",
									}}
									<span
										class="px-2 py-0.5 text-xs font-medium rounded-full {colors.bg} {colors.text} border {colors.border}"
									>
										{exp.jobType}
									</span>
								{/if}
							</div>

							<div
								class="flex flex-wrap items-center gap-4 text-sm text-dark-400 mb-4"
							>
								<div class="flex items-center gap-1.5">
									<Briefcase size={14} />
									<span>{exp.company}</span>
								</div>
								<div class="flex items-center gap-1.5">
									<Calendar size={14} />
									<span
										>{formatDate(exp.startDate)} - {formatDate(
											exp.endDate,
										)}</span
									>
								</div>
							</div>

							<!-- Description -->
							<p class="text-sm text-dark-400 leading-relaxed">
								{exp.description}
							</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
