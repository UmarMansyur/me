<script lang="ts">
	import { ShieldCheck, Loader2, ArrowRight } from "lucide-svelte";

	let password = $state("");
	let error = $state("");
	let isLoading = $state(false);

	async function handleLogin(event: Event) {
		event.preventDefault();
		isLoading = true;
		error = "";

		try {
			const response = await fetch("/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			});

			if (response.ok) {
				window.location.href = "/admin";
			} else {
				const data = await response.json();
				error = data.error || "Invalid password";
			}
		} catch {
			error = "An error occurred";
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Login | Umar Mansyur</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-dark-950 px-4">
	<div class="w-full max-w-md">
		<div class="card">
			<div class="mb-8 text-center">
				<div
					class="mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"
				>
					<ShieldCheck size={32} />
				</div>
				<h1 class="text-2xl font-semibold text-dark-100">Admin Login</h1>
				<p class="mt-2 text-sm text-dark-400">
					Enter your password to access the dashboard
				</p>
			</div>

			<form onsubmit={handleLogin} class="space-y-6">
				{#if error}
					<div
						class="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400"
					>
						{error}
					</div>
				{/if}

				<div>
					<label
						for="password"
						class="mb-2 block text-sm font-medium text-dark-300"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						placeholder="Enter admin password"
						class="input-field"
						required
					/>
				</div>

				<button type="submit" class="btn-primary w-full" disabled={isLoading}>
					{#if isLoading}
						<Loader2 size={18} class="animate-spin" />
						<span>Logging in...</span>
					{:else}
						<span>Login</span>
						<ArrowRight size={18} />
					{/if}
				</button>
			</form>

			<div class="mt-6 text-center">
				<a
					href="/"
					class="text-sm text-dark-400 hover:text-blue-400 transition-colors"
				>
					← Back to website
				</a>
			</div>
		</div>
	</div>
</div>
