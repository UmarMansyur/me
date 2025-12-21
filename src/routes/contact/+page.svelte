<script lang="ts">
	import {
		Mail,
		MapPin,
		Briefcase,
		Send,
		Loader2,
		CheckCircle,
		Github,
		Linkedin,
	} from "lucide-svelte";

	let formData = $state({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state("");

	async function handleSubmit() {
		isSubmitting = true;
		submitError = "";

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1500));

		isSubmitting = false;
		submitSuccess = true;
		formData = { name: "", email: "", subject: "", message: "" };

		setTimeout(() => (submitSuccess = false), 5000);
	}
</script>

<svelte:head>
	<title>Contact | Muhammad Umar Mansyur</title>
	<meta name="description" content="Get in touch with Muhammad Umar Mansyur" />
</svelte:head>
<div
	class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[30px_30px]"
></div>
<div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 relative">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="section-title mb-4">Contact</h1>
		<p class="section-subtitle border-b border-dashed border-gray-200 pb-6">
			Have a project in mind? Let's talk and build something amazing together.
		</p>
	</div>

	<div class="grid gap-12 lg:grid-cols-2">
		<!-- Contact Form -->
		<div>
			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				class="space-y-6"
			>
				<div class="grid gap-6 sm:grid-cols-2">
					<div>
						<label
							for="name"
							class="mb-2 block text-sm font-medium text-dark-300"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							placeholder="Your name"
							class="input-field"
							required
						/>
					</div>
					<div>
						<label
							for="email"
							class="mb-2 block text-sm font-medium text-dark-300"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							placeholder="you@example.com"
							class="input-field"
							required
						/>
					</div>
				</div>

				<div>
					<label
						for="subject"
						class="mb-2 block text-sm font-medium text-dark-300"
					>
						Subject
					</label>
					<input
						type="text"
						id="subject"
						bind:value={formData.subject}
						placeholder="What is this about?"
						class="input-field"
						required
					/>
				</div>

				<div>
					<label
						for="message"
						class="mb-2 block text-sm font-medium text-dark-300"
					>
						Message
					</label>
					<textarea
						id="message"
						bind:value={formData.message}
						placeholder="Write your message here..."
						rows="5"
						class="input-field resize-none"
						required
					></textarea>
				</div>

				{#if submitError}
					<div
						class="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400"
					>
						{submitError}
					</div>
				{/if}

				{#if submitSuccess}
					<div
						class="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-center"
					>
						<CheckCircle size={24} class="mx-auto mb-2 text-emerald-500" />
						<p class="text-emerald-400">
							Message sent successfully! I'll get back to you soon.
						</p>
					</div>
				{/if}

				<button
					type="submit"
					class="btn-primary w-full"
					disabled={isSubmitting}
				>
					{#if isSubmitting}
						<Loader2 size={18} class="animate-spin" />
						<span>Sending...</span>
					{:else}
						<Send size={18} />
						<span>Send Message</span>
					{/if}
				</button>
			</form>
		</div>

		<!-- Contact Info -->
		<div class="space-y-6">
			<div class="card">
				<h3 class="text-lg font-semibold text-dark-100 mb-6">Get in Touch</h3>

				<div class="space-y-6">
					<div class="flex items-start gap-4">
						<div
							class="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 shrink-0"
						>
							<Mail size={20} />
						</div>
						<div>
							<p class="text-sm text-dark-500">Email</p>
							<a
								href="mailto:contact@umarmansyur.com"
								class="text-dark-200 hover:text-blue-400 transition-colors"
							>
								contact@umarmansyur.com
							</a>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 shrink-0"
						>
							<MapPin size={20} />
						</div>
						<div>
							<p class="text-sm text-dark-500">Location</p>
							<p class="text-dark-200">Rombasan, Pragaan, Sumenep</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 shrink-0"
						>
							<Briefcase size={20} />
						</div>
						<div>
							<p class="text-sm text-dark-500">Organization</p>
							<p class="text-dark-200">Madura Dev</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Social Links -->
			<div class="card">
				<h3 class="text-lg font-semibold text-dark-100 mb-4">Follow Me</h3>
				<div class="flex gap-3">
					<a
						href="https://github.com/UmarMansyur"
						target="_blank"
						rel="noopener noreferrer"
						class="flex size-12 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-1"
						aria-label="GitHub"
					>
						<Github size={22} />
					</a>
					<a
						href="https://linkedin.com/in/umarmansyur"
						target="_blank"
						rel="noopener noreferrer"
						class="flex size-12 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-1"
						aria-label="LinkedIn"
					>
						<Linkedin size={22} />
					</a>
					<a
						href="mailto:contact@umarmansyur.com"
						class="flex size-12 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-1"
						aria-label="Email"
					>
						<Mail size={22} />
					</a>
				</div>
			</div>

			<!-- Map -->
			<div class="card p-0 overflow-hidden">
				<iframe
					title="Location Map"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.59489849528!2d113.7890573!3d-7.0423846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd9e5f2f1e72cb3%3A0x5b7f51ac51ed3d6e!2sSumenep%2C%20Kabupaten%20Sumenep%2C%20Jawa%20Timur!5e0!3m2!1sen!2sid!4v1702980000000!5m2!1sen!2sid"
					width="100%"
					height="200"
					style="border:0;"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	</div>
</div>
