<script lang="ts">
  import {
    Calendar,
    Eye,
    Clock,
    Share2,
    ArrowLeft,
    Bookmark,
  } from "lucide-svelte";
  import SEO from "$lib/components/SEO.svelte";

  let { data } = $props();
  let post = $derived(data.post);

  // Calculate reading time
  const readingTime = $derived(() => {
    if (!post) return 0;
    const wordsPerMinute = 200;
    const text = post.content || "";
    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
    const wordCount = cleanText.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  });
</script>

{#if post}
  <SEO
    title="{post.title} | Blog"
    description={post.excerpt || post.title}
    image={post.coverImage ?? undefined}
    article={true}
    tags={post.tags ?? undefined}
  />
{/if}

<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
  <div
    class="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-3xl animate-pulse"
  ></div>
  <div
    class="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-3xl animate-pulse"
    style="animation-delay: 2s"
  ></div>
</div>

{#if post}
  <div class="min-h-screen pb-24">
    <!-- Article Header -->
    <header class="relative pt-24 pb-16 overflow-hidden">
      <div class="container mx-auto px-4 max-w-4xl relative z-10">
        <a
          href="/blog"
          class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
        >
          <ArrowLeft
            size={16}
            class="group-hover:-translate-x-1 transition-transform"
          />
          Back to Blog
        </a>

        <div class="space-y-6">
          {#if post.tags}
            <div class="flex flex-wrap gap-2">
              {#each post.tags.split(",") as tag}
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/50 text-blue-700 backdrop-blur-sm border border-blue-200/50"
                >
                  {tag.trim()}
                </span>
              {/each}
            </div>
          {/if}

          <h1
            class="text-4xl md:text-6xl font-bold text-gray-900 font-display leading-[1.1] tracking-tight"
          >
            {post.title}
          </h1>

          <div
            class="flex flex-wrap items-center gap-6 text-sm text-gray-500 pt-2 border-t border-gray-100"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold"
              >
                UM
              </div>
              <span class="font-medium text-gray-900">Umar Mansyur</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Calendar size={14} />
              <time
                >{new Date(post.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</time
              >
            </div>
            <div class="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{readingTime()} min read</span>
            </div>
            <div class="flex items-center gap-1.5 ml-auto">
              <Eye size={14} />
              <span>{post.views} views</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Article Content -->
    <main class="container mx-auto px-4 max-w-4xl">
      {#if post.coverImage}
        <div class="relative mb-16 group">
          <div
            class="absolute inset-0 bg-blue-600/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          ></div>
          <div
            class="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              class="w-full h-auto object-cover max-h-[600px] scale-[1.01] group-hover:scale-100 transition-transform duration-700"
            />
          </div>
        </div>
      {/if}

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Sidebar / Share (Sticky) -->
        <aside class="hidden lg:block w-16">
          <div class="sticky top-32 flex flex-col gap-4">
            <button
              class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all group"
              title="Share"
            >
              <Share2
                size={20}
                class="group-hover:scale-110 transition-transform"
              />
            </button>
            <button
              class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
              title="Save"
            >
              <Bookmark
                size={20}
                class="group-hover:scale-110 transition-transform"
              />
            </button>
          </div>
        </aside>

        <!-- Content -->
        <div class="flex-1">
          <div
            class="prose prose-lg prose-slate max-w-none
            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:border prose-img:border-gray-100
            prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-900 prose-pre:rounded-2xl prose-pre:shadow-xl
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic
            font-sans leading-relaxed text-gray-700"
          >
            {@html post.contentHtml}
          </div>

          <!-- Footer / Tags -->
          <footer class="mt-16 pt-8 border-t border-gray-100">
            <div class="flex items-center justify-between flex-wrap gap-6">
              <div class="flex items-center gap-4">
                <span class="text-sm font-semibold text-gray-900"
                  >Share this post:</span
                >
                <div class="flex gap-2">
                  <button
                    class="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {#if post.tags}
                <div class="flex flex-wrap gap-2">
                  {#each post.tags.split(",") as tag}
                    <span
                      class="text-xs text-gray-500 hover:text-blue-600 cursor-pointer"
                      >#{tag.trim()}</span
                    >
                  {/each}
                </div>
              {/if}
            </div>

            <!-- Author Box -->
            <div
              class="mt-16 p-8 rounded-3xl bg-gray-50 border border-gray-100 flex items-center gap-6"
            >
              <div
                class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg shadow-blue-200"
              >
                UM
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">
                  Muhammad Umar Mansyur
                </h3>
                <p class="text-gray-600 text-sm mt-1 leading-relaxed">
                  Full-stack developer passionate about building beautiful,
                  functional web applications and exploring the future of AI.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  </div>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="animate-pulse text-gray-400">Loading post...</div>
  </div>
{/if}

<style>
  :global(.prose h2) {
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
  }
</style>
