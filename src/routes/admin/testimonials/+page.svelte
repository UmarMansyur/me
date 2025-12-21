<script lang="ts">
	import { MessageSquare, Trash2, Star, Check, X } from "lucide-svelte";

	interface Testimonial {
		id: number;
		name: string;
		email: string | null;
		message: string;
		rating: number;
		isActive: boolean;
		createdAt: string;
	}

	let testimonials = $state<Testimonial[]>([]);
	let isLoading = $state(false);

	async function loadTestimonials() {
		const response = await fetch("/admin/testimonials/api");
		if (response.ok) testimonials = await response.json();
	}

	async function toggleActive(id: number, isActive: boolean) {
		isLoading = true;
		try {
			await fetch("/admin/testimonials/api", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, isActive: !isActive })
			});
			loadTestimonials();
		} finally {
			isLoading = false;
		}
	}

	async function deleteTestimonial(id: number) {
		if (!confirm("Delete this testimonial?")) return;
		await fetch("/admin/testimonials/api", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id })
		});
		loadTestimonials();
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric"
		});
	}

	$effect(() => {
		loadTestimonials();
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold text-dark-100">Testimonials</h1>
			<p class="mt-1 text-dark-400">Manage visitor feedback and testimonials</p>
		</div>
	</div>

	{#if testimonials.length === 0}
		<div class="card py-12 text-center">
			<MessageSquare size={48} class="mx-auto mb-4 text-dark-700" />
			<p class="text-dark-400">No testimonials yet.</p>
		</div>
	{:else}
		<div class="space-y-4">
			{#each testimonials as testimonial}
				<div class="card">
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-2">
								<h3 class="font-semibold text-dark-100">{testimonial.name}</h3>
								{#if testimonial.isActive}
									<span class="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">Active</span>
								{:else}
									<span class="rounded-full bg-gray-500/20 px-2 py-0.5 text-xs font-medium text-gray-400">Inactive</span>
								{/if}
							</div>
							{#if testimonial.email}
								<p class="text-xs text-dark-500 mb-2">{testimonial.email}</p>
							{/if}
							<div class="flex gap-0.5 mb-2">
								{#each Array(5) as _, i}
									<Star size={14} class={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
								{/each}
							</div>
							<p class="text-sm text-dark-400 line-clamp-3">{testimonial.message}</p>
							<p class="text-xs text-dark-600 mt-2">{formatDate(testimonial.createdAt)}</p>
						</div>
						<div class="flex gap-2">
							<button
								class="p-2 transition-colors {testimonial.isActive ? 'text-green-400 hover:text-green-300' : 'text-dark-400 hover:text-green-400'}"
								onclick={() => toggleActive(testimonial.id, testimonial.isActive)}
								disabled={isLoading}
								title={testimonial.isActive ? "Deactivate" : "Activate"}
							>
								{#if testimonial.isActive}
									<X size={20} />
								{:else}
									<Check size={20} />
								{/if}
							</button>
							<button
								class="p-2 text-red-400/60 hover:text-red-400"
								onclick={() => deleteTestimonial(testimonial.id)}
							>
								<Trash2 size={20} />
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
