<script lang="ts">
	import {
		Mail,
		MapPin,
		Briefcase,
		MessageCircle,
		Github,
		Linkedin,
		Phone,
		ArrowRight,
		Send,
		Sparkles,
	} from "lucide-svelte";
	import SEO from "$lib/components/SEO.svelte";

	const whatsappNumber = "6285230648617";
	const whatsappLink = `https://wa.me/${whatsappNumber}`;

	let formData = $state({
		name: "",
		subject: "",
		message: "",
	});

	function openWhatsApp() {
		const text =
			formData.name || formData.subject || formData.message
				? `Halo, saya ${formData.name || "..."}.\n\n*${formData.subject || "Pertanyaan"}*\n\n${formData.message || "..."}`
				: "Halo, saya ingin bertanya...";

		const encodedText = encodeURIComponent(text);
		window.open(`${whatsappLink}?text=${encodedText}`, "_blank");
	}
</script>

<SEO
	title="Contact | Muhammad Umar Mansyur"
	description="Get in touch with Muhammad Umar Mansyur via WhatsApp for your next project."
/>

<div class="relative min-h-screen overflow-hidden">
	<!-- Enhanced Background -->
	<div class="absolute inset-0 -z-10 bg-slate-50">
		<div
			class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-60 animate-pulse"
		></div>
		<div
			class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px] opacity-60"
		></div>
	</div>

	<div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
		<!-- Header with Animation -->
		<div class="mb-20 text-center max-w-3xl mx-auto">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6 border border-blue-100 animate-slide-up"
			>
				<Sparkles size={16} />
				Ready for new opportunities
			</div>
			<h1
				class="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-display animate-slide-up"
				style="animation-delay: 0.1s"
			>
				Let's start something <span
					class="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"
					>legendary</span
				>
			</h1>
			<p
				class="text-xl text-slate-600 animate-slide-up"
				style="animation-delay: 0.2s"
			>
				Pick your preferred way to connect. I'm most active on WhatsApp for
				direct and fast communication.
			</p>
		</div>

		<div class="grid gap-12 lg:grid-cols-12 max-w-6xl mx-auto">
			<!-- Main Contact Column (WhatsApp focus) -->
			<div
				class="lg:col-span-7 space-y-8 animate-slide-up"
				style="animation-delay: 0.3s"
			>
				<!-- Featured WhatsApp Card -->
				<div class="group relative">
					<div
						class="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"
					></div>
					<div
						class="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 overflow-hidden"
					>
						<!-- Techy background decoration -->
						<div
							class="absolute -right-20 -top-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"
						></div>

						<div class="relative z-10">
							<div class="flex flex-col md:flex-row items-center gap-8 mb-10">
								<div
									class="w-24 h-24 rounded-3xl bg-emerald-500 shadow-xl shadow-emerald-500/20 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500"
								>
									<MessageCircle size={48} class="text-white" />
								</div>
								<div class="text-center md:text-left">
									<h2
										class="text-3xl font-bold text-slate-900 mb-2"
									>
										Direct Message
									</h2>
									<p class="text-slate-500">
										Available via WhatsApp for instant support and project
										inquiries.
									</p>
								</div>
							</div>

							<form
								onsubmit={(e) => {
									e.preventDefault();
									openWhatsApp();
								}}
								class="space-y-6"
							>
								<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div class="space-y-2">
										<label
											for="name"
											class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1"
											>Identity</label
										>
										<input
											type="text"
											id="name"
											bind:value={formData.name}
											placeholder="Your full name"
											class="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
										/>
									</div>
									<div class="space-y-2">
										<label
											for="subject"
											class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1"
											>Topic</label
										>
										<input
											type="text"
											id="subject"
											bind:value={formData.subject}
											placeholder="Project, Collaboration, etc."
											class="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
										/>
									</div>
								</div>
								<div class="space-y-2">
									<label
										for="message"
										class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1"
										>Narrative</label
									>
									<textarea
										id="message"
										bind:value={formData.message}
										placeholder="Tell me your story..."
										rows="4"
										class="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
									></textarea>
								</div>

								<div class="flex flex-col md:flex-row gap-4 pt-4">
									<button
										type="submit"
										class="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/20"
									>
										<svg
											class="w-6 h-6"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
											/>
										</svg>
										Send to WhatsApp
									</button>
									<div
										class="flex items-center justify-center px-8 border-2 border-slate-100 rounded-2xl group-hover:border-emerald-500/30 transition-colors"
									>
										<p class="font-mono text-slate-600">
											+62 852 3064 8617
										</p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<!-- Sidebar Info Column -->
			<div
				class="lg:col-span-5 space-y-8 animate-slide-up"
				style="animation-delay: 0.4s"
			>
				<!-- Traditional Contact Details -->
				<div
					class="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100"
				>
					<h3 class="text-xl font-bold text-slate-900 mb-8">
						Other Channels
					</h3>
					<div class="space-y-8">
						<a
							href="mailto:muhammadumarmansyur2001@gmail.com"
							class="flex items-start gap-5 group"
						>
							<div
								class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
							>
								<Mail size={22} />
							</div>
							<div>
								<p
									class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1"
								>
									Email
								</p>
								<p class="text-slate-900 font-medium break-all">
									muhammadumarmansyur2001@gmail.com
								</p>
							</div>
						</a>

						<div class="flex items-start gap-5 group">
							<div
								class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"
							>
								<MapPin size={22} />
							</div>
							<div>
								<p
									class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1"
								>
									Location
								</p>
								<p class="text-slate-900 font-medium">
									Rombasan, Pragaan, Sumenep
								</p>
								<p class="text-sm text-slate-500">Madura, Indonesia</p>
							</div>
						</div>

						<div class="flex items-start gap-5 group">
							<div
								class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"
							>
								<Briefcase size={22} />
							</div>
							<div>
								<p
									class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1"
								>
									Organization
								</p>
								<p class="text-slate-900 font-medium">
									Madura Dev
								</p>
							</div>
						</div>
					</div>

					<div
						class="mt-12 pt-10 border-t border-slate-50"
					>
						<p
							class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center"
						>
							Join my network
						</p>
						<div class="flex justify-center gap-4">
							<a
								href="https://github.com/UmarMansyur"
								target="_blank"
								class="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all"
							>
								<Github size={20} />
							</a>
							<a
								href="https://linkedin.com/in/umarmansyur"
								target="_blank"
								class="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all"
							>
								<Linkedin size={20} />
							</a>
						</div>
					</div>
				</div>

				<!-- Map Bento Box -->
				<div
					class="rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white h-64 relative group"
				>
					<iframe
						title="Location Map"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.59489849528!2d113.7890573!3d-7.0423846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd9e5f2f1e72cb3%3A0x5b7f51ac51ed3d6e!2sSumenep%2C%20Kabupaten%20Sumenep%2C%20Jawa%20Timur!5e0!3m2!1sen!2sid!4v1702980000000!5m2!1sen!2sid"
						width="100%"
						height="100%"
						style="border:0;"
						loading="lazy"
						class="grayscale group-hover:grayscale-0 transition-all duration-1000"
					></iframe>
					<div
						class="absolute inset-x-4 bottom-4 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20"
					>
						<p
							class="text-xs font-bold text-emerald-600 uppercase tracking-widest"
						>
							Base Operations
						</p>
						<p class="text-slate-900 font-semibold">
							Madura, ID
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.animate-slide-up) {
		animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
		opacity: 0;
	}

	@keyframes slideUp {
		from {
			transform: translateY(30px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
