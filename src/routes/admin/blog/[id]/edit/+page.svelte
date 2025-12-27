<script lang="ts">
  import HTMLEditor from "$lib/components/HTMLEditor.svelte";
  import { enhance } from "$app/forms";
  import { ArrowLeft } from "lucide-svelte";
  import { untrack } from "svelte";

  let { data } = $props();

  let title = $state(untrack(() => data.post.title));
  let slug = $state(untrack(() => data.post.slug));
  let content = $state(untrack(() => data.post.content));

  $effect(() => {
    // This allows the form to reset when navigating between different posts
    const post = data.post;
    untrack(() => {
      title = post.title;
      slug = post.slug;
      content = post.content;
    });
  });
</script>

<div class="space-y-6 max-w-5xl mx-auto">
  <div class="flex items-center gap-4">
    <a
      href="/admin/blog"
      class="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
    >
      <ArrowLeft size={20} />
    </a>
    <div>
      <h1 class="text-2xl font-semibold text-dark-100">Edit Post</h1>
      <p class="text-sm text-dark-400">Make it better</p>
    </div>
  </div>

  <form method="POST" class="space-y-6" use:enhance>
    <div class="grid gap-6 md:grid-cols-2">
      <div class="space-y-2">
        <label for="title" class="text-sm font-medium text-gray-700"
          >Title</label
        >
        <input
          type="text"
          id="title"
          name="title"
          class="input-field"
          bind:value={title}
          required
        />
      </div>
      <div class="space-y-2">
        <label for="slug" class="text-sm font-medium text-gray-700">Slug</label>
        <input
          type="text"
          id="slug"
          name="slug"
          class="input-field"
          bind:value={slug}
          required
        />
      </div>
    </div>

    <div class="space-y-2">
      <input type="hidden" name="content" value={content} />
      <HTMLEditor
        label="Content"
        placeholder="Start writing..."
        height="h-[600px]"
        bind:value={content}
      />
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <div class="space-y-2">
        <label for="excerpt" class="text-sm font-medium text-gray-700"
          >Excerpt</label
        >
        <textarea
          id="excerpt"
          name="excerpt"
          rows="3"
          class="input-field resize-none"
          value={data.post.excerpt}
        ></textarea>
      </div>
      <div class="space-y-2">
        <div class="space-y-2">
          <label for="tags" class="text-sm font-medium text-gray-700"
            >Tags (comma separated)</label
          >
          <input
            type="text"
            id="tags"
            name="tags"
            class="input-field"
            placeholder="Tech, Life, thoughts"
            value={data.post.tags}
          />
        </div>
        <div class="space-y-2 pt-2">
          <label
            for="coverImage"
            class="text-sm font-medium text-gray-700 block"
            >Cover Image URL</label
          >
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            class="input-field"
            placeholder="https://..."
            value={data.post.coverImage}
          />
        </div>
      </div>
    </div>

    <div
      class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100"
    >
      <input
        type="checkbox"
        id="published"
        name="published"
        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
        checked={data.post.published}
      />
      <label for="published" class="text-sm font-medium text-gray-700"
        >Publish immediately</label
      >
    </div>

    <div class="flex justify-end gap-4">
      <a href="/admin/blog" class="btn-secondary">Cancel</a>
      <button type="submit" class="btn-primary">Update Post</button>
    </div>
  </form>
</div>
