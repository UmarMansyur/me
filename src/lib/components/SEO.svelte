<script lang="ts">
  import { page } from "$app/state";

  interface Props {
    title?: string;
    description?: string;
    image?: string;
    article?: boolean;
    author?: string;
    tags?: string;
  }

  let {
    title = "Muhammad Umar Mansyur | Software Developer",
    description = "Personal portfolio and blog of Muhammad Umar Mansyur - Building modern web applications.",
    image = "/og-image.png", // Make sure to have a default OG image or generate one
    article = false,
    author = "Muhammad Umar Mansyur",
    tags = "",
  }: Props = $props();

  const url = $derived(page.url.href);
  const siteName = "Muhammad Umar Mansyur";
  const twitterHandle = "@umarmansyur_"; // Change if you have one
</script>

<svelte:head>
  <!-- Basic -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />

  <!-- Open Graph -->
  <meta property="og:site_name" content={siteName} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content={article ? "article" : "website"} />

  {#if article}
    <meta property="article:author" content={author} />
    {#if tags}
      {#each tags.split(",") as tag}
        <meta property="article:tag" content={tag.trim()} />
      {/each}
    {/if}
  {/if}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  {#if twitterHandle}
    <meta name="twitter:site" content={twitterHandle} />
    <meta name="twitter:creator" content={twitterHandle} />
  {/if}
</svelte:head>
