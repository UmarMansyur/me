<script lang="ts">
  import {
    Github,
    Linkedin,
    ArrowRight,
    MapPin,
    ExternalLink,
    ThumbsUp,
    ThumbsDown,
    Eye,
    Image,
  } from "lucide-svelte";
  import { onMount } from "svelte";
  import { RiLogosSvelteFill } from "svelte-icons-pack/ri";
  import {
    SiLaravel,
    SiMysql,
    SiTailwindcss,
    SiPostgresql,
    SiMongodb,
  } from "svelte-icons-pack/si";
  import * as Si from "svelte-icons-pack/si";
  import * as Ri from "svelte-icons-pack/ri";
  import * as Bi from "svelte-icons-pack/bi";
  import { Icon } from "svelte-icons-pack";

  import Skeleton from "$lib/components/Skeleton.svelte";

  interface Profile {
    name: string;
    title: string;
    description: string;
    avatarUrl: string | null;
    github: string;
    linkedin: string;
    location: string;
  }

  interface Skill {
    name: string;
    icon: any;
    category: string;
  }

  interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    tags: string;
    liveUrl: string | null;
    sourceUrl: string | null;
    featured: boolean;
  }

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

  let profile = $state<Profile | null>(null);
  let skills = $state<Skill[]>([]);
  let projects = $state<Project[]>([]);
  let siteStats = $state({
    visitors: 0,
    likes: 0,
    dislikes: 0,
    userReaction: null as string | null,
  });
  let testimonials = $state<
    Array<{ id: number; name: string; message: string; rating: number }>
  >([]);
  let isLoading = $state(true);

  const defaultProfile = {
    name: "Muhammad Umar Mansyur",
    title: "Software Developer",
    description:
      "Passionate Software Developer from Madura Dev. Building modern, user-friendly web applications with cutting-edge technologies.",
    avatarUrl: "https://avatars.githubusercontent.com/u/70986579",
    github: "https://github.com/UmarMansyur",
    linkedin: "https://linkedin.com/in/umarmansyur",
    location: "Sumenep, Madura",
  };

  const techStacks = [
    {
      name: "SvelteKit",
      icon: RiLogosSvelteFill,
      category: "Frontend",
      color: "#FF3E00", // Svelte official orange
    },
    {
      name: "Laravel",
      icon: SiLaravel,
      category: "Backend",
      color: "#FF2D20", // Laravel official red
    },
    {
      name: "TypeScript",
      icon: Bi.BiLogoTypescript,
      category: "Language",
      color: "#3178C6",
    },
    {
      name: "Node.js",
      icon: Bi.BiLogoNodejs,
      category: "Backend",
      color: "#339933",
    },
    {
      name: "PHP",
      icon: Bi.BiLogoPhp,
      category: "Backend",
      color: "#777BB4",
    },
    {
      name: "MySQL",
      icon: SiMysql,
      category: "Database",
      color: "#4479A1",
    },
    {
      name: "TailwindCSS",
      icon: SiTailwindcss,
      category: "Tools",
      color: "#06B6D4",
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      category: "Database",
      color: "#4169E1",
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      category: "Database",
      color: "#47A248",
    },
    {
      name: "GraphQL",
      icon: Si.SiGraphql,
      category: "Tools",
      color: "#E10098",
    },
    {
      name: "Redis",
      icon: Si.SiRedis,
      category: "Tools",
      color: "#DC382D",
    },
    {
      name: "Vue",
      icon: Si.SiVuedotjs,
      category: "Frontend",
      color: "#4FC08D",
    },
    {
      name: "React",
      icon: Si.SiReact,
      category: "Frontend",
      color: "#61DAFB",
    },
    {
      name: "Lumen",
      icon: Si.SiLumen,
      category: "Backend",
      color: "#FF2D20",
    },
    {
      name: "Bootstrap",
      icon: Si.SiBootstrap,
      category: "Frontend",
      color: "#7952B3",
    },
    {
      name: "GitHub",
      icon: Si.SiGithub,
      category: "Tools",
      color: "#181717",
    },
    {
      name: "GitLab",
      icon: Si.SiGitlab,
      category: "Tools",
      color: "#FC6D26",
    },
    {
      name: "JavaScript",
      icon: Si.SiJavascript,
      category: "Language",
      color: "#F7DF1E",
    },
  ];

  async function recordVisit() {
    await fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "visit" }),
    });
  }

  async function handleReaction(type: "like" | "dislike") {
    const res = await fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: type }),
    });
    if (res.ok) {
      siteStats = await res.json();
    }
  }

  onMount(async () => {
    try {
      const [profileRes, skillsRes, projectsRes, statsRes, testimonialsRes] =
        await Promise.all([
          fetch("/api/profile"),
          fetch("/api/skills"),
          fetch("/api/projects?featured=true"),
          fetch("/api/stats"),
          fetch("/api/testimonials"),
        ]);

      if (profileRes.ok) {
        const data = await profileRes.json();
        if (data) profile = data;
      }

      if (skillsRes.ok) {
        skills = await skillsRes.json();
      }

      if (projectsRes.ok) {
        projects = await projectsRes.json();
      }

      if (statsRes.ok) {
        siteStats = await statsRes.json();
      }

      if (testimonialsRes.ok) {
        testimonials = await testimonialsRes.json();
      }

      recordVisit();
    } finally {
      isLoading = false;
    }
  });

  const displayProfile = $derived(profile || defaultProfile);
</script>

<svelte:head>
  <title>{displayProfile.name} | {displayProfile.title}</title>
</svelte:head>

<!-- Hero Section -->
<div
  class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[30px_30px]"
></div>
<section class="relative min-h-[90vh] flex items-center md:w-[80vw] mx-auto">
  <div class="absolute inset-0 overflow-hidden">
    <div
      class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"
    ></div>
  </div>

  <div
    class="relative mx-auto px-4 py-20 sm:px-6 lg:px-8 md:grid md:grid-cols-12 gap-2 items-center"
  >
    <div class="hidden md:block col-span-3">
      <img
        src={displayProfile.avatarUrl ||
          "https://avatars.githubusercontent.com/u/70986579"}
        alt={displayProfile.name}
        class="rounded-full w-64 h-64 border border-gray-200 p-3 object-cover"
      />
    </div>
    <div class="col-span-6">
      <!-- Greeting -->
      <div class="mb-6 animate-fade-in">
        <span
          class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-green-500 bg-green-50"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
            ></span>
          </span>
          Open for opportunities
        </span>
      </div>
      <!-- Main Title -->
      <h1
        class="text-4xl font-bold leading-tight text-gray-700 sm:text-5xl lg:text-6xl animate-slide-up"
      >
        Hi, I'm <span class="gradient-text"
          >{displayProfile.name.split(" ")[1]}</span
        >
        <span class="block mt-2 text-gray-500">
          {displayProfile.title}
        </span>
      </h1>

      <!-- Description -->
      {#if isLoading}
        <div class="mt-6 space-y-2">
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
      {:else}
        <p
          class="mt-6 text-lg text-dark-400 leading-relaxed max-w-2xl animate-slide-up"
          style="animation-delay: 0.1s"
        >
          {displayProfile.description}
        </p>
      {/if}

      <!-- Location -->
      <div
        class="mt-4 flex items-center gap-2 text-dark-500 animate-slide-up"
        style="animation-delay: 0.15s"
      >
        <MapPin size={16} />
        <span class="text-sm"
          >{displayProfile.location || "Sumenep, Madura"}</span
        >
      </div>

      <!-- CTA Buttons -->
      <div
        class="mt-8 flex flex-wrap items-center gap-4 animate-slide-up"
        style="animation-delay: 0.2s"
      >
        <a href="/contact" class="btn-primary group">
          <span>Get in Touch</span>
          <ArrowRight
            size={18}
            class="transition-transform group-hover:translate-x-1"
          />
        </a>
        <a href="/projects" class="btn-secondary"> View Projects </a>
      </div>

      <!-- Social Links -->
      <div
        class="mt-8 flex items-center gap-4 animate-slide-up"
        style="animation-delay: 0.25s"
      >
        <a
          href={displayProfile.github || "https://github.com/UmarMansyur"}
          target="_blank"
          rel="noopener noreferrer"
          class="flex size-11 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-1"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href={displayProfile.linkedin ||
            "https://linkedin.com/in/umarmansyur"}
          target="_blank"
          rel="noopener noreferrer"
          class="flex size-11 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-1"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </div>
    <div class="md:flex hidden col-span-3 ms-auto">
      <div class="flex flex-col gap-4 w-full">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Site Stats</h3>

        <div class="flex gap-10">
          {#if isLoading}
            {#each Array(3) as _}
              <div class="stat-card">
                <div class="flex items-center gap-3">
                  <Skeleton variant="circle" width="48px" height="48px" />
                  <div class="space-y-2">
                    <Skeleton variant="text" width="40px" height="24px" />
                    <Skeleton variant="text" width="60px" height="16px" />
                  </div>
                </div>
              </div>
            {/each}
          {:else}
            <!-- Visitors Count -->
            <div class="stat-card group">
              <div class="flex items-center gap-3">
                <div class="stat-icon">
                  <Eye size={24} />
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-800">
                    {siteStats.visitors}
                  </p>
                  <p class="text-sm text-gray-500">Visitors</p>
                </div>
              </div>
            </div>

            <!-- Likes -->
            <div class="stat-card group">
              <div class="flex items-center gap-3">
                <div class="stat-icon">
                  <ThumbsUp size={24} />
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-800">
                    {siteStats.likes}
                  </p>
                  <p class="text-sm text-gray-500">Likes</p>
                </div>
              </div>
            </div>

            <!-- Dislikes -->
            <div class="stat-card group">
              <div class="flex items-center gap-3">
                <div class="stat-icon">
                  <ThumbsDown size={24} />
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-800">
                    {siteStats.dislikes}
                  </p>
                  <p class="text-sm text-gray-500">Dislikes</p>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!-- Interactive Buttons -->
        <div class="flex gap-2 mt-4">
          <button
            class="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 {siteStats.userReaction ===
            'like'
              ? 'bg-blue-100 text-blue-600'
              : 'text-blue-600 hover:bg-blue-50'}"
            onclick={() => handleReaction("like")}
          >
            <ThumbsUp
              size={18}
              class={siteStats.userReaction === "like" ? "fill-blue-600" : ""}
            />
            <span class="text-sm font-medium">Like</span>
          </button>
          <button
            class="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 {siteStats.userReaction ===
            'dislike'
              ? 'bg-red-100 text-red-600'
              : 'text-gray-600 hover:bg-gray-100'}"
            onclick={() => handleReaction("dislike")}
          >
            <ThumbsDown
              size={18}
              class={siteStats.userReaction === "dislike" ? "fill-red-600" : ""}
            />
            <span class="text-sm font-medium">Dislike</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Skills Section -->
{#if techStacks.length > 0}
  <section
    class="border-t py-20 border-dashed border-gray-300 relative md:w-[80vw] mx-auto"
  >
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mb-10">
        <h2 class="section-title">Tech Stack</h2>
        <p class="mt-2 section-subtitle">Technologies I work with</p>
      </div>

      <div
        class="flex grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-10"
      >
        {#each techStacks as skill}
          <div
            class="skill-card group flex flex-col border border-dark-800 rounded-xl p-3 items-center justify-center gap-2
         transition-all duration-500"
            style="--skill-color: {skill.color};"
          >
            <div
              class="transition-all duration-500 group-hover:scale-110"
              style="color: {skill.color};"
            >
              <Icon src={skill.icon} size={40} />
            </div>

            <span class="text-xs font-semibold text-gray-600 text-center mt-1">
              {skill.name}
            </span>
          </div>

          <style>
            .skill-card:hover {
              box-shadow:
                0 0 24px color-mix(in srgb, var(--skill-color) 40%, transparent),
                0 0 12px color-mix(in srgb, var(--skill-color) 30%, transparent),
                0 4px 8px
                  color-mix(in srgb, var(--skill-color) 20%, transparent);
            }
          </style>
        {/each}
      </div>
    </div>
  </section>
{:else}
  <section class="border-gray-300 py-20 border-t border-dashed">
    <div class="mx-auto md:max-w-[80vw] px-4 sm:px-6 lg:px-8">
      <div class="mb-10">
        <h2 class="section-title">Tech Stack</h2>
        <p class="mt-2 section-subtitle">Technologies I work with</p>
      </div>
      <div>
        <div>Tidak ada data</div>
      </div>
    </div>
  </section>
{/if}

<!-- Featured Projects -->
<section class="border-gray-300 border-t py-20 border-dashed">
  <div class="mx-auto md:max-w-[80vw] px-4 sm:px-6 lg:px-8">
    <div class="mb-10 flex items-end justify-between">
      <div>
        <h2 class="section-title">Featured Projects</h2>
        <p class="mt-2 section-subtitle">Some of my recent work</p>
      </div>
      <a
        href="/projects"
        class="hidden sm:flex items-center gap-2 text-sm text-dark-400 hover:text-blue-400 transition-colors"
      >
        <span>View all</span>
        <ArrowRight size={16} />
      </a>
    </div>

    {#if isLoading}
      <div class="grid gap-6 md:grid-cols-2">
        {#each Array(4) as _}
          <div class="card p-0 overflow-hidden">
            <Skeleton variant="rect" height="160px" />
            <div class="p-4 space-y-3">
              <Skeleton variant="text" width="60%" height="24px" />
              <Skeleton variant="text" width="90%" />
              <div class="flex gap-2">
                <Skeleton variant="text" width="40px" height="20px" />
                <Skeleton variant="text" width="40px" height="20px" />
                <Skeleton variant="text" width="40px" height="20px" />
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else if projects.length > 0}
      <div class="grid gap-6 md:grid-cols-2">
        {#each projects.slice(0, 4) as project}
          <article class="card card-hover group overflow-hidden p-0">
            <!-- Project Image -->
            <div class="relative h-40 overflow-hidden bg-gray-100">
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
                  <Image size={40} class="text-gray-300" />
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
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2.5 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-lg"
                    aria-label="Live demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                {/if}
                {#if project.sourceUrl}
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2.5 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-lg"
                    aria-label="Source code"
                  >
                    <Github size={18} />
                  </a>
                {/if}
              </div>
            </div>

            <!-- Content -->
            <div class="p-4">
              <h3
                class="text-lg font-semibold text-dark-100 group-hover:text-blue-500 transition-colors mb-2"
              >
                {project.title}
              </h3>
              <p class="text-sm text-dark-400 mb-3 line-clamp-2">
                {project.description}
              </p>
              <div class="flex flex-wrap gap-1.5">
                {#each project.tags.split(",").filter((t) => t.trim()) as tag}
                  {@const config = tagConfig[tag.trim()] || {
                    icon: null,
                    color: "#6B7280",
                    bg: "bg-gray-100",
                  }}
                  <span
                    class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full {config.color}"
                    style="color: {config.color};"
                  >
                    {#if config.icon}
                      <Icon src={config.icon} size={12} />
                    {/if}
                    {tag.trim()}
                  </span>
                {/each}
              </div>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <p class="text-center text-gray-600">No projects found</p>
    {/if}

    <div class="mt-8 text-center sm:hidden">
      <a href="/projects" class="btn-secondary">
        View all projects
        <ArrowRight size={16} />
      </a>
    </div>
  </div>
</section>

<!-- Testimonials Section -->
{#if isLoading}
  <section class="py-20 overflow-hidden">
    <div class="mx-auto md:max-w-[80vw] px-4 sm:px-6 lg:px-8 mb-10">
      <Skeleton variant="text" width="200px" height="32px" class="mb-2" />
      <Skeleton variant="text" width="150px" height="20px" />
    </div>
    <div class="flex gap-6 px-10 overflow-hidden">
      {#each Array(4) as _}
        <div class="testimonial-card">
          <div class="flex gap-1 mb-3">
            {#each Array(5) as _}
              <div class="size-4 bg-gray-200 rounded-full animate-pulse"></div>
            {/each}
          </div>
          <div class="space-y-2 mb-3">
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="90%" />
          </div>
          <Skeleton variant="text" width="40%" />
        </div>
      {/each}
    </div>
  </section>
{:else if testimonials.length > 0}
  <section class="py-20 overflow-hidden">
    <div class="mx-auto md:max-w-[80vw] px-4 sm:px-6 lg:px-8 mb-10">
      <h2 class="section-title">What People Say</h2>
      <p class="mt-2 section-subtitle">Feedback from visitors</p>
    </div>

    <div class="relative">
      <div class="marquee-container">
        <div class="marquee-content">
          {#each [...testimonials, ...testimonials] as testimonial}
            <div class="testimonial-card">
              <div class="flex gap-0.5 mb-3">
                {#each Array(5) as _, i}
                  <svg
                    class="w-4 h-4 {i < testimonial.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300'}"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                {/each}
              </div>
              <p class="text-sm text-gray-600 mb-3 line-clamp-3">
                "{testimonial.message}"
              </p>
              <p class="text-sm font-semibold text-gray-800">
                — {testimonial.name}
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>
{/if}

<!-- CTA Section -->
<section class="border-dark-800 py-20">
  <div class="mx-auto md:max-w-[80vw] px-4 sm:px-6 lg:px-8">
    <div class="card text-center py-12">
      <h2 class="text-2xl font-semibold text-dark-100 mb-4">
        Interested in working together?
      </h2>
      <p class="text-dark-400 mb-6 max-w-md mx-auto">
        I'm currently available for freelance work. Let's build something
        amazing together.
      </p>
      <a href="/contact" class="btn-primary inline-flex">
        <span>Start a conversation</span>
        <ArrowRight size={18} />
      </a>
    </div>
  </div>
</section>

<style>
  .marquee-container {
    overflow: hidden;
    width: 100%;
  }
  .marquee-content {
    display: flex;
    gap: 1.5rem;
    animation: marquee 30s linear infinite;
    width: max-content;
  }
  .marquee-content:hover {
    animation-play-state: paused;
  }
  .testimonial-card {
    flex-shrink: 0;
    width: 300px;
    padding: 1.5rem;
    background: white;
    border-radius: 1rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
