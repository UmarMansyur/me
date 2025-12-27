<script lang="ts">
  import { onMount, tick } from "svelte";
  import "quill/dist/quill.snow.css";
  import { Code, Eye } from "lucide-svelte";

  let {
    value = $bindable(""),
    label = "Content",
    placeholder = "Write your HTML content here...",
    height = "h-[500px]",
  } = $props();

  let editorElement = $state<HTMLElement>();
  let quill = $state<any>();
  let isSourceMode = $state(false);
  let sourceValue = $state("");
  let initialValueSet = $state(false);

  onMount(async () => {
    const Quill = (await import("quill")).default;

    // Wait for next tick to ensure DOM element is bound
    await tick();

    if (!editorElement) return;

    quill = new Quill(editorElement, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "code-block"],
          ["clean"],
        ],
      },
      placeholder,
      theme: "snow",
    });

    // Set initial content - the value prop should already have the content
    if (value) {
      quill.root.innerHTML = value;
      sourceValue = value;
      initialValueSet = true;
    }

    // Update value on change
    quill.on("text-change", () => {
      value = quill.root.innerHTML;
      sourceValue = value;
      if (value === "<p><br></p>") {
        value = "";
        sourceValue = "";
      }
    });
  });

  // This effect ensures content is set when value changes after quill is initialized
  // This handles the case when value is set/updated after the component mounts
  $effect(() => {
    if (quill && value && !initialValueSet) {
      quill.root.innerHTML = value;
      sourceValue = value;
      initialValueSet = true;
    }
  });

  function toggleSourceMode() {
    if (isSourceMode) {
      // Switching from Source to Visual
      value = sourceValue;
      if (quill) {
        quill.root.innerHTML = sourceValue;
      }
    } else {
      // Switching from Visual to Source
      sourceValue = value;
    }
    isSourceMode = !isSourceMode;
  }

  function handleSourceInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    sourceValue = target.value;
    value = sourceValue;
  }
</script>

<div class="space-y-2">
  <div class="flex items-center justify-between">
    <label
      for="html-editor"
      class="block text-sm font-medium text-gray-700 font-display"
    >
      {label}
    </label>
    <button
      type="button"
      onclick={toggleSourceMode}
      class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all {isSourceMode
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
    >
      {#if isSourceMode}
        <Eye size={14} />
        Visual Editor
      {:else}
        <Code size={14} />
        Source HTML
      {/if}
    </button>
  </div>
  <div
    class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5"
  >
    {#if isSourceMode}
      <div class="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <span class="text-xs font-mono text-gray-400">HTML Source Code</span>
      </div>
      <textarea
        class="w-full {height} p-4 font-mono text-sm bg-gray-900 text-gray-100 focus:outline-none resize-none"
        placeholder="Paste your HTML code here..."
        oninput={handleSourceInput}
        value={sourceValue}
      ></textarea>
    {:else}
      <div id="html-editor" bind:this={editorElement} class={height}></div>
    {/if}
  </div>
  {#if isSourceMode}
    <p class="text-xs text-gray-500">
      💡 <strong>Tip:</strong> Paste your HTML code here, then switch back to Visual
      Editor to preview and continue editing.
    </p>
  {/if}
</div>

<style>
  :global(.ql-toolbar.ql-snow) {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f8fafc;
    padding: 0.75rem;
  }

  :global(.ql-container.ql-snow) {
    border: none;
    font-family: inherit;
    font-size: 1rem;
  }

  :global(.ql-editor) {
    padding: 1.5rem;
    min-height: 200px;
    line-height: 1.6;
  }

  :global(.ql-editor.ql-blank::before) {
    left: 1.5rem;
    font-style: normal;
    color: #94a3b8;
  }

  :global(.ql-snow .ql-stroke) {
    stroke: #64748b;
  }

  :global(.ql-snow .ql-fill) {
    fill: #64748b;
  }

  :global(.ql-snow .ql-picker) {
    color: #64748b;
  }
</style>
