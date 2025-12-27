<script lang="ts">
  import { Plus, BookOpen, Pencil, Trash2, Eye, EyeOff } from "lucide-svelte";
  import { enhance } from "$app/forms";

  let { data } = $props();
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-semibold text-dark-100">Blog Posts</h1>
      <p class="mt-1 text-dark-400">Manage your blog content</p>
    </div>
    <a
      href="/admin/blog/create"
      class="btn-primary flex items-center gap-2 px-4 py-2"
    >
      <Plus size={18} />
      <span>New Post</span>
    </a>
  </div>

  {#if data.posts.length === 0}
    <div class="card py-12 text-center">
      <BookOpen size={48} class="mx-auto mb-4 text-dark-700" />
      <p class="text-dark-400">No blog posts yet. Write your first one!</p>
    </div>
  {:else}
    <div class="space-y-4">
      {#each data.posts as post}
        <div
          class="card flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h3 class="font-semibold text-dark-100">{post.title}</h3>
              {#if post.published}
                <span
                  class="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-600"
                >
                  Published
                </span>
              {:else}
                <span
                  class="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-600"
                >
                  Draft
                </span>
              {/if}
            </div>
            <p class="mt-1 text-sm text-dark-400 line-clamp-1">
              {post.excerpt || "No excerpt"}
            </p>
            <div class="mt-2 text-xs text-dark-400">
              Views: {post.views} • Created: {new Date(
                post.createdAt,
              ).toLocaleDateString()}
            </div>
          </div>
          <div class="flex gap-2 items-center">
            <form action="?/togglePublish" method="POST" use:enhance>
              <input type="hidden" name="id" value={post.id} />
              <input
                type="hidden"
                name="currentState"
                value={post.published.toString()}
              />
              <button
                type="submit"
                class="p-2 text-dark-400 transition-colors hover:text-blue-500"
                title={post.published ? "Unpublish" : "Publish"}
              >
                {#if post.published}
                  <EyeOff size={20} />
                {:else}
                  <Eye size={20} />
                {/if}
              </button>
            </form>

            <a
              href="/admin/blog/{post.id}/edit"
              class="p-2 text-dark-400 transition-colors hover:text-dark-100"
              title="Edit"
            >
              <Pencil size={20} />
            </a>

            <form action="?/delete" method="POST" use:enhance>
              <input type="hidden" name="id" value={post.id} />
              <button
                type="submit"
                class="p-2 text-red-400/60 transition-colors hover:text-red-400"
                onclick={(e) => !confirm("Are you sure?") && e.preventDefault()}
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </form>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
