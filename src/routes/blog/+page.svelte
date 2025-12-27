<script lang="ts">
  import { Calendar, Tag, ArrowRight, Search, Clock } from "lucide-svelte";
  import SEO from "$lib/components/SEO.svelte";

  let { data } = $props();

  let featuredPost = $derived(data.posts[0]);
  let remainingPosts = $derived(data.posts.slice(1));

  function getReadingTime(text: string) {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
    const words = cleanText.trim().split(/\s+/);
    const wordCount = words[0] === "" ? 0 : words.length;
    return Math.ceil(wordCount / wordsPerMinute) || 1;
  }
</script>

<SEO
  title="Blog | Muhammad Umar Mansyur"
  description="Thoughts, tutorials and insights on software development."
/>

<!-- Background Elements -->
<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
  <div
    class="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-blue-50/40 rounded-full blur-3xl animate-pulse"
  ></div>
  <div
    class="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-50/40 rounded-full blur-3xl animate-pulse"
    style="animation-delay: 3s"
  ></div>
</div>

<div class="py-20 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <!-- Header -->
    <div class="max-w-3xl mb-16">
      <h2
        class="text-base font-semibold leading-7 text-blue-600 tracking-wide uppercase"
      >
        Writing
      </h2>
      <p
        class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-display"
      >
        The Journal
      </p>
      <p class="mt-6 text-xl leading-8 text-gray-600 max-w-2xl">
        Exploring technology, design, and the occasional deep dive into the code
        that builds our world.
      </p>
    </div>

    {#if data.posts.length > 0}
      <!-- Featured Post -->
      <div class="mb-24">
        {#if featuredPost}
          <a
            href="/blog/{featuredPost.slug}"
            class="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl overflow-hidden hover:bg-white transition-colors duration-500 p-2 -m-2"
          >
            <div
              class="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto lg:h-[450px] overflow-hidden rounded-2xl shadow-xl shadow-gray-200/50"
            >
              {#if featuredPost.coverImage}
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              {:else}
                <div
                  class="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center"
                >
                  <Tag size={80} class="text-white/20" />
                </div>
              {/if}
              <div
                class="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
            </div>

            <div class="lg:col-span-5 space-y-6 px-4">
              <div class="flex items-center gap-4">
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                  >Featured Post</span
                >
                <span class="text-sm text-gray-500 flex items-center gap-1.5">
                  <Clock size={14} />
                  {getReadingTime(featuredPost.content)} min read
                </span>
              </div>
              <h3
                class="text-3xl font-bold text-gray-900 font-display group-hover:text-blue-600 transition-colors"
              >
                {featuredPost.title}
              </h3>
              <p
                class="text-lg text-gray-600 line-clamp-3 leading-relaxed text-pretty"
              >
                {featuredPost.excerpt ||
                  "Read our latest updates and insights on development, AI, and modern web architecture..."}
              </p>
              <div
                class="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all"
              >
                Read full article <ArrowRight size={18} />
              </div>
            </div>
          </a>
        {/if}
      </div>

      <!-- Grid for rest of the posts -->
      <div class="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
        {#each remainingPosts as post}
          <article class="flex flex-col group h-full">
            <a
              href="/blog/{post.slug}"
              class="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {#if post.coverImage}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              {:else}
                <div
                  class="absolute inset-0 bg-gray-100 flex items-center justify-center"
                >
                  <Tag size={32} class="text-gray-300" />
                </div>
              {/if}
            </a>

            <div class="flex-1 px-1">
              <div class="flex items-center gap-x-4 text-xs mb-4">
                <time
                  datetime={post.createdAt.toISOString()}
                  class="text-gray-500 font-medium"
                >
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <div class="flex items-center gap-1 text-gray-400">
                  <Clock size={12} />
                  <span>{getReadingTime(post.content)} min</span>
                </div>
              </div>

              <div class="group relative">
                <h3
                  class="text-xl font-bold text-gray-900 group-hover:text-blue-600 font-display transition-colors"
                >
                  <a href="/blog/{post.slug}">
                    <span class="absolute inset-0"></span>
                    {post.title}
                  </a>
                </h3>
                <p
                  class="mt-4 text-sm leading-relaxed text-gray-600 line-clamp-2"
                >
                  {post.excerpt || "Dive into the details of this topic..."}
                </p>
              </div>

              {#if post.tags}
                <div class="mt-6 flex flex-wrap gap-2">
                  {#each post.tags.split(",").slice(0, 2) as tag}
                    <span
                      class="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md"
                    >
                      {tag.trim()}
                    </span>
                  {/each}
                </div>
              {/if}
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <div
        class="text-center py-40 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200"
      >
        <div
          class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6"
        >
          <Search size={24} class="text-gray-400" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900">No stories found</h3>
        <p class="mt-2 text-gray-500 text-pretty max-w-xs mx-auto">
          We're still crafting our first few posts. Check back soon for updates!
        </p>
      </div>
    {/if}
  </div>
</div>
