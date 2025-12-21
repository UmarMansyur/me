<script lang="ts">
  import { Menu, X, Terminal } from "lucide-svelte";

  let { currentPath = "/" } = $props();

  let isMenuOpen = $state(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/certificates", label: "Certificates" },
    { href: "/contact", label: "Contact" },
  ];

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header
  class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100"
>
  <div class="mx-auto md:max-w-[80vw] px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 group">
        <div
          class="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 transition-all group-hover:bg-blue-500/20"
        >
          <Terminal size={20} />
        </div>
        <span class="text-lg font-semibold text-black"
          >umar<span class="text-blue-500">.dev</span></span
        >
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden items-center gap-1 md:flex">
        {#each navLinks as link}
          <a
            href={link.href}
            class="relative px-4 py-2 text-sm font-medium transition-colors
              {currentPath === link.href
              ? 'text-blue-600'
              : 'text-black hover:text-blue-600'}"
          >
            {link.label}
            {#if currentPath === link.href}
              <span
                class="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-blue-500"
              ></span>
            {/if}
          </a>
        {/each}
      </nav>

      <!-- Right Side Actions -->
      <div class="hidden items-center gap-4 md:flex">
        <div class="flex items-center gap-2 text-sm">
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
            ></span>
          </span>
          <span class="text-gray-600">Available for work</span>
        </div>
        <a href="/contact" class="btn-primary text-sm px-4 py-2"> Hire Me </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors md:hidden"
        onclick={toggleMenu}
        aria-label="Toggle menu"
      >
        {#if isMenuOpen}
          <X size={24} />
        {:else}
          <Menu size={24} />
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <div class="border-t border-gray-200 bg-white md:hidden animate-slide-up">
      <nav class="flex flex-col gap-1 p-4">
        {#each navLinks as link}
          <a
            href={link.href}
            class="rounded-lg px-4 py-3 text-sm font-medium transition-colors
              {currentPath === link.href
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}"
            onclick={() => (isMenuOpen = false)}
          >
            {link.label}
          </a>
        {/each}
        <div class="mt-4 flex items-center justify-between px-4">
          <div class="flex items-center gap-2 text-sm">
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
              ></span>
            </span>
            <span class="text-gray-600">Available</span>
          </div>
          <a
            href="/contact"
            class="btn-primary text-sm px-4 py-2"
            onclick={() => (isMenuOpen = false)}
          >
            Hire Me
          </a>
        </div>
      </nav>
    </div>
  {/if}
</header>
