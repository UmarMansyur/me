<script lang="ts">
  import { Github, Linkedin, Mail, Heart } from "lucide-svelte";
</script>

<footer class="border-t border-gray-200 bg-white">
  <div class="mx-auto md:max-w-[80vw] px-4 py-12 sm:px-6 lg:px-8">
    <div
      class="flex flex-col items-center gap-6 md:flex-row md:justify-between"
    >
      <!-- Left -->
      <div class="text-center md:text-left">
        <p class="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Muhammad Umar Mansyur. Built with
          <span class="text-blue-500">SvelteKit</span> &
          <span class="text-blue-500">TailwindCSS</span>
        </p>
      </div>

      <!-- Social Links -->
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/UmarMansyur"
          target="_blank"
          rel="noopener noreferrer"
          class="flex size-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          href="https://linkedin.com/in/umarmansyur"
          target="_blank"
          rel="noopener noreferrer"
          class="flex size-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="mailto:contact@umarmansyur.com"
          class="flex size-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
          aria-label="Email"
        >
          <Mail size={18} />
        </a>
      </div>

      <!-- Made with love -->
      <div class="flex items-center gap-1 text-sm text-gray-500">
        <span>Made with</span>
        <Heart size={14} class="text-red-500 fill-red-500" />
        <span>from Madura</span>
      </div>
    </div>
  </div>
</footer>
