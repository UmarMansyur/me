<script lang="ts">
  import { X, Lock, User, AlertCircle, Loader2 } from "lucide-svelte";

  let { isOpen = $bindable(false), onSuccess = () => {} } = $props();

  let username = $state("");
  let password = $state("");
  let error = $state("");
  let loading = $state(false);

  async function handleLogin(e: Event) {
    e.preventDefault();
    error = "";
    loading = true;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        error = data.message || "Login failed";
        return;
      }

      isOpen = false;
      username = "";
      password = "";
      onSuccess();
    } catch (err) {
      error = "An error occurred. Please try again.";
    } finally {
      loading = false;
    }
  }

  function closeModal() {
    isOpen = false;
    error = "";
    username = "";
    password = "";
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") closeModal();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <button
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onclick={closeModal}
      aria-label="Close modal"
    ></button>

    <!-- Modal -->
    <div class="relative w-full max-w-md animate-slide-up">
      <div class="card !p-0 overflow-hidden shadow-2xl">
        <!-- Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex items-center justify-center size-10 rounded-full bg-primary-100 dark:bg-primary-500/20"
            >
              <Lock size={20} class="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-black">
                Admin Login
              </h2>
              <p class="text-sm text-gray-500 dark:text-black/60">
                Enter your credentials
              </p>
            </div>
          </div>
          <button
            onclick={closeModal}
            class="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-black/60 dark:hover:text-black hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <!-- Form -->
        <form onsubmit={handleLogin} class="p-6 space-y-4">
          {#if error}
            <div
              class="flex items-center gap-2 p-3 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-sm"
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          {/if}

          <div class="space-y-2">
            <label
              for="username"
              class="block text-sm font-medium text-gray-700 dark:text-black/80"
            >
              Username
            </label>
            <div class="relative">
              <User
                size={18}
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="username"
                type="text"
                bind:value={username}
                placeholder="Enter username"
                class="input-field pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div class="space-y-2">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-black/80"
            >
              Password
            </label>
            <div class="relative">
              <Lock
                size={18}
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="password"
                type="password"
                bind:value={password}
                placeholder="Enter password"
                class="input-field pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            class="btn-primary w-full justify-center mt-6"
            disabled={loading}
          >
            {#if loading}
              <Loader2 size={18} class="animate-spin" />
              <span>Signing in...</span>
            {:else}
              <span>Sign In</span>
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}
