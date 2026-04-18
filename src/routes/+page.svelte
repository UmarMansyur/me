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
    MessageCircle,
    Send,
    CheckCircle,
    Loader2,
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
  import SEO from "$lib/components/SEO.svelte";

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
  let isReacting = $state(false);

  // Testimonial form state
  let testimonialForm = $state({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });
  let isSubmittingTestimonial = $state(false);
  let testimonialSuccess = $state(false);

  async function submitTestimonial() {
    if (!testimonialForm.name || !testimonialForm.message) return;

    isSubmittingTestimonial = true;
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialForm),
      });
      if (res.ok) {
        testimonialSuccess = true;
        testimonialForm = { name: "", email: "", message: "", rating: 5 };
        setTimeout(() => (testimonialSuccess = false), 5000);
      }
    } finally {
      isSubmittingTestimonial = false;
    }
  }

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
    if (isReacting) return; // Prevent double clicks
    isReacting = true;

    // Optimistic update for instant feedback
    const previousStats = { ...siteStats };
    const wasLiked = siteStats.userReaction === "like";
    const wasDisliked = siteStats.userReaction === "dislike";

    if (type === "like") {
      if (wasLiked) {
        siteStats.likes--;
        siteStats.userReaction = null;
      } else {
        siteStats.likes++;
        if (wasDisliked) siteStats.dislikes--;
        siteStats.userReaction = "like";
      }
    } else {
      if (wasDisliked) {
        siteStats.dislikes--;
        siteStats.userReaction = null;
      } else {
        siteStats.dislikes++;
        if (wasLiked) siteStats.likes--;
        siteStats.userReaction = "dislike";
      }
    }

    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: type }),
      });
      if (res.ok) {
        // Sync with actual server state
        siteStats = await res.json();
      } else {
        // Revert on error
        siteStats = previousStats;
      }
    } catch {
      // Revert on network error
      siteStats = previousStats;
    } finally {
      isReacting = false;
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

<SEO
  title="{displayProfile.name} | {displayProfile.title}"
  description={displayProfile.description}
/>

<!-- Hero Section -->
<div
  class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[30px_30px]"
></div>
<section class="relative min-h-[90vh] flex items-center md:w-[85vw] max-w-7xl mx-auto py-10">
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
  </div>

  <div class="relative mx-auto px-4 py-20 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
    
    <!-- LEFT SIDE: Profile Detail -->
    <div class="col-span-1 md:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-8 z-10 w-full">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 animate-fade-in">
        <div class="relative flex-shrink-0">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full blur-xl opacity-40"></div>
          <img
            src={displayProfile.avatarUrl || "https://avatars.githubusercontent.com/u/70986579"}
            alt={displayProfile.name}
            class="relative rounded-full w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-2xl object-cover"
          />
        </div>
        
        <div>
          <!-- Greeting / Status -->
          <div class="mb-4 animate-fade-in">
            <span class="inline-flex items-center gap-2 rounded-full border border-emerald-200/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50/80 backdrop-blur-sm shadow-sm">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Open for opportunities
            </span>
          </div>

          <!-- Main Title -->
          <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-slate-800 animate-slide-up">
            Hi, I'm <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">{displayProfile.name.split(" ")[1] || displayProfile.name}</span>
          </h1>
          <p class="mt-2 text-xl md:text-2xl font-medium text-slate-500">
            {displayProfile.title}
          </p>
        </div>
      </div>

      <!-- Description -->
      {#if isLoading}
        <div class="space-y-3 pt-2">
          <Skeleton variant="text" width="90%" height="24px" />
          <Skeleton variant="text" width="80%" height="24px" />
          <Skeleton variant="text" width="60%" height="24px" />
        </div>
      {:else}
        <p class="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl animate-slide-up" style="animation-delay: 0.1s">
          {displayProfile.description}
        </p>
      {/if}

      <!-- Location -->
      <div class="flex items-center gap-2 text-slate-500 font-medium animate-slide-up" style="animation-delay: 0.15s">
        <MapPin size={20} class="text-emerald-500" />
        <span class="text-lg">{displayProfile.location || "Sumenep, Madura"}</span>
      </div>

      <!-- CTA & Socials -->
      <div class="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 pt-4 animate-slide-up" style="animation-delay: 0.2s">
        <div class="flex items-center gap-4 w-full sm:w-auto">
          <a href="/contact" class="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1">
            <span>Get in Touch</span>
            <ArrowRight size={18} />
          </a>
          <a href="/projects" class="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold hover:border-blue-500 hover:text-blue-600:text-blue-400 transition-all hover:shadow-md hover:-translate-y-1">
            Projects
          </a>
        </div>
        
        <div class="hidden sm:block w-px h-10 bg-slate-200"></div>

        <div class="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <a
            href={displayProfile.github || "https://github.com/UmarMansyur"}
            target="_blank" rel="noopener noreferrer"
            class="flex size-14 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800:text-white bg-white transition-all hover:-translate-y-1 hover:shadow-md"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href={displayProfile.linkedin || "https://linkedin.com/in/umarmansyur"}
            target="_blank" rel="noopener noreferrer"
            class="flex size-14 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 bg-white transition-all hover:-translate-y-1 hover:shadow-md"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE: Analytics -->
    <div class="col-span-1 md:col-span-5 w-full mt-10 md:mt-0 relative z-10 animate-fade-in" style="animation-delay: 0.3s">
      <div class="group relative w-full max-w-[420px] mx-auto md:ms-auto md:me-0">
        <!-- Glow effect -->
        <div class="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-emerald-400/20 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-70"></div>
        
        <div class="relative bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/10 border border-white">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Live Analytics</h3>
              <div class="flex items-center gap-2">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p class="text-base font-bold text-slate-800">Platform Status</p>
              </div>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-50 to-slate-100 shadow-inner flex items-center justify-center border border-white">
              <Icon src={RiLogosSvelteFill} size={28} className="text-orange-500 drop-shadow-sm" />
            </div>
          </div>
          
          {#if isLoading}
            <div class="space-y-6">
              {#each Array(3) as _}
                <Skeleton variant="text" width="100%" height="72px" class="rounded-2xl" />
              {/each}
            </div>
          {:else}
            <!-- Metrics -->
            <div class="space-y-4">
              <!-- Total Visitors Container -->
              <div class="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blue-50 to-indigo-50/50 p-6 border border-blue-100/50 group-hover:border-blue-200:border-blue-900 transition-colors">
                <div class="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div class="flex items-center justify-between relative z-10">
                  <div>
                    <p class="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">Total Visitors</p>
                    <p class="text-4xl lg:text-5xl font-bold font-mono text-slate-800 tracking-tight">
                      {siteStats.visitors.toLocaleString()}
                    </p>
                  </div>
                  <div class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-500 border border-blue-100 transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500">
                    <Eye size={24} />
                  </div>
                </div>
              </div>

              <!-- Reactions Row -->
              <div class="grid grid-cols-2 gap-4">
                <div class="rounded-[1.5rem] bg-slate-50 p-5 border border-slate-100 hover:bg-rose-50/50:bg-rose-900/10 transition-colors">
                  <div class="flex items-center gap-2 mb-2 text-rose-500">
                    <ThumbsUp size={16} />
                    <span class="text-[10px] font-bold tracking-widest uppercase">Likes</span>
                  </div>
                  <p class="text-3xl font-bold font-mono text-slate-800">
                    {siteStats.likes.toLocaleString()}
                  </p>
                </div>
                
                <div class="rounded-[1.5rem] bg-slate-50 p-5 border border-slate-100 hover:bg-slate-100:bg-slate-800 transition-colors">
                  <div class="flex items-center gap-2 mb-2 text-slate-500">
                    <ThumbsDown size={16} />
                    <span class="text-[10px] font-bold tracking-widest uppercase">Dislikes</span>
                  </div>
                  <p class="text-3xl font-bold font-mono text-slate-800">
                    {siteStats.dislikes.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <!-- Interaction Buttons -->
            <div class="mt-8 flex items-center gap-3">
              <button
                class="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300
                {siteStats.userReaction === 'like'
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-[1.02] ring-2 ring-blue-600 ring-offset-2'
                  : 'bg-slate-100 text-slate-600 hover:bg-white hover:shadow-md:bg-slate-700 hover:-translate-y-0.5'}"
                onclick={() => handleReaction("like")}
                disabled={isReacting}
              >
                <ThumbsUp size={20} class={siteStats.userReaction === 'like' ? 'fill-current' : ''} />
                <span class="tracking-wide">Leave a Like</span>
              </button>
              
              <button
                class="w-16 flex items-center justify-center rounded-2xl transition-all duration-300
                {siteStats.userReaction === 'dislike'
                  ? 'bg-slate-800 text-white shadow-xl scale-[1.02] py-4'
                  : 'bg-slate-100 text-slate-400 hover:bg-white hover:shadow-md:bg-slate-700 hover:-translate-y-0.5 py-4'}"
                onclick={() => handleReaction("dislike")}
                disabled={isReacting}
              >
                <ThumbsDown size={20} class={siteStats.userReaction === 'dislike' ? 'fill-current' : ''} />
              </button>
            </div>
          {/if}
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
<section class="py-24 overflow-hidden relative">
  <!-- Dynamic background mesh -->
  <div class="absolute inset-0 -z-10 bg-slate-50/50">
    <div
      class="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50/50 rounded-full blur-3xl opacity-50"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-50/50 rounded-full blur-3xl opacity-50"
    ></div>
  </div>

  <div class="mx-auto md:max-w-[1200px] px-4 sm:px-6 lg:px-8">
    <div
      class="flex flex-col md:flex-row items-end justify-between mb-16 gap-6"
    >
      <div class="max-w-xl">
        <span
          class="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-3"
          >Feedback</span
        >
        <h2
          class="text-4xl md:text-5xl font-bold text-slate-900 font-display"
        >
          Voices from the Community
        </h2>
        <p class="mt-4 text-lg text-slate-500">
          Discover what neighbors and collaborators are saying about our journey
          together.
        </p>
      </div>
      <div class="flex gap-2">
        <div
          class="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400"
        >
          <MessageCircle size={20} />
        </div>
      </div>
    </div>

    {#if isLoading}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {#each Array(3) as _}
          <div
            class="bg-white p-8 rounded-3xl shadow-sm animate-pulse"
          >
            <div
              class="h-4 bg-slate-100 rounded w-1/4 mb-6"
            ></div>
            <div
              class="h-4 bg-slate-100 rounded w-full mb-2"
            ></div>
            <div
              class="h-4 bg-slate-100 rounded w-3/4 mb-10"
            ></div>
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 bg-slate-100 rounded-full"
              ></div>
              <div
                class="h-4 bg-slate-100 rounded w-1/3"
              ></div>
            </div>
          </div>
        {/each}
      </div>
    {:else if testimonials.length > 0}
      <div class="relative mb-20">
        <div class="marquee-container py-4">
          <div class="marquee-content flex gap-8">
            {#each [...testimonials, ...testimonials] as testimonial}
              <div
                class="testimonial-card group relative p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 w-[400px]"
              >
                <div
                  class="absolute top-8 right-8 text-slate-100 group-hover:text-blue-50:text-blue-900/20 transition-colors duration-500"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    ><path
                      d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.017C7.46472 8 7.017 8.44772 7.017 9V12C7.017 12.5523 6.56929 13 6.017 13H4.017V21H6.017Z"
                    /></svg
                  >
                </div>

                <div class="flex gap-1 mb-6">
                  {#each Array(5) as _, i}
                    <svg
                      class="w-5 h-5 {i < testimonial.rating
                        ? 'text-amber-400'
                        : 'text-slate-200'}"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  {/each}
                </div>

                <p
                  class="text-lg text-slate-700 leading-relaxed italic relative z-10"
                >
                  "{testimonial.message}"
                </p>

                <div
                  class="mt-8 pt-8 border-t border-slate-50 flex items-center gap-4"
                >
                  <div
                    class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase"
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p class="font-bold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p class="text-xs text-slate-400">Verified Visitor</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <div
        class="text-center py-20 mb-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-200"
      >
        <div
          class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400"
        >
          <MessageCircle size={24} />
        </div>
        <p class="text-slate-500 text-lg">
          Your humble feedback will light up this space.
        </p>
        <p class="text-sm text-slate-400 mt-2">
          Become the pioneer, share your thoughts below.
        </p>
      </div>
    {/if}

    <!-- Redesigned Testimonial Form -->
    <div class="max-w-3xl mx-auto">
      <div class="relative">
        <div
          class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[2.5rem] blur opacity-10"
        ></div>
        <div
          class="relative bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-slate-100"
        >
          <div class="text-center mb-10">
            <h3 class="text-2xl font-bold text-slate-900 mb-2">
              Leave a Legacy
            </h3>
            <p class="text-slate-500">
              Your experience helps others understand the value we build
              together.
            </p>
          </div>

          {#if testimonialSuccess}
            <div
              class="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 flex items-start gap-4 animate-scale-in"
            >
              <div
                class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0"
              >
                <CheckCircle size={20} />
              </div>
              <div>
                <p class="text-emerald-800 font-bold">
                  Feedback Received!
                </p>
                <p class="text-emerald-600 text-sm mt-1">
                  Thank you for being part of this story. Your testimonial will
                  appear after a quick review.
                </p>
              </div>
            </div>
          {/if}

          <form
            onsubmit={(e) => {
              e.preventDefault();
              submitTestimonial();
            }}
            class="space-y-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  for="testimonial-name"
                  class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1"
                  >Identity</label
                >
                <input
                  type="text"
                  id="testimonial-name"
                  bind:value={testimonialForm.name}
                  class="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white:bg-slate-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  placeholder="What shall I call you?"
                  required
                />
              </div>
              <div class="space-y-2">
                <label
                  for="testimonial-email"
                  class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1"
                  >Digital Mail (Privacy First)</label
                >
                <input
                  type="email"
                  id="testimonial-email"
                  bind:value={testimonialForm.email}
                  class="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white:bg-slate-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label
                for="testimonial-message"
                class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1"
                >The Narrative</label
              >
              <textarea
                id="testimonial-message"
                bind:value={testimonialForm.message}
                rows="4"
                class="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white:bg-slate-800 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                placeholder="Paint your story here..."
                required
              ></textarea>
            </div>

            <div class="flex flex-col items-center gap-4">
              <span
                class="text-xs font-bold text-slate-500 uppercase tracking-widest"
                >Rate the Journey</span
              >
              <div class="flex gap-2">
                {#each Array(5) as _, i}
                  <button
                    type="button"
                    onclick={() => (testimonialForm.rating = i + 1)}
                    class="p-2 hover:scale-125 transition-all duration-300"
                  >
                    <svg
                      class="w-10 h-10 {i < testimonialForm.rating
                        ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'text-slate-100'} transition-all duration-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </button>
                {/each}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingTestimonial ||
                !testimonialForm.name ||
                !testimonialForm.message}
              class="group relative w-full overflow-hidden rounded-2xl bg-slate-900 text-white font-bold py-5 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <span
                class="relative z-10 flex items-center justify-center gap-3"
              >
                {#if isSubmittingTestimonial}
                  <Loader2 size={24} class="animate-spin" />
                  Processing...
                {:else}
                  <Send size={20} />
                  Submit Your Feedback
                {/if}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

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
