<script lang="ts">
	import { page } from "$app/state";
	import {
		LayoutDashboard,
		User,
		Folder,
		Briefcase,
		Award,
		MessageSquare,
		FileText,
		X,
		Home,
		LogOut,
		Menu,
		BookOpen,
	} from "lucide-svelte";

	let { children } = $props();

	const navItems = [
		{ href: "/admin", label: "Dashboard", icon: LayoutDashboard },
		{ href: "/admin/profile", label: "Profile", icon: User },
		{ href: "/admin/about", label: "About", icon: FileText },
		{ href: "/admin/blog", label: "Blog", icon: BookOpen },
		{ href: "/admin/projects", label: "Projects", icon: Folder },
		{ href: "/admin/experience", label: "Experience", icon: Briefcase },
		{ href: "/admin/certificates", label: "Certificates", icon: Award },
		{ href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
	];

	let sidebarOpen = $state(false);
</script>

<svelte:head>
	<title>Admin Panel | Umar Mansyur</title>
</svelte:head>

<div class="flex min-h-screen">
	<!-- Sidebar -->
	<aside
		class="fixed inset-y-0 left-0 z-50 w-64 transform border-r border-dark-800 bg-dark-900 transition-transform duration-200 lg:relative lg:translate-x-0 {sidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<div
			class="flex h-16 items-center justify-between border-b border-dark-800 px-6"
		>
			<a href="/admin" class="text-lg font-semibold text-dark-100">
				Admin<span class="text-blue-500">Panel</span>
			</a>
			<button
				class="text-dark-400 hover:text-dark-100 lg:hidden"
				onclick={() => (sidebarOpen = false)}
			>
				<X size={24} />
			</button>
		</div>

		<nav class="p-4">
			<ul class="space-y-1">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors {page
								.url.pathname === item.href
								? 'bg-blue-500/10 text-blue-400'
								: 'text-dark-400 hover:bg-dark-800 hover:text-dark-100'}"
						>
							<item.icon size={20} />
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="absolute bottom-0 left-0 right-0 border-t border-dark-800 p-4">
			<a
				href="/"
				class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-dark-400 transition-colors hover:bg-dark-800 hover:text-dark-100"
			>
				<Home size={20} />
				View Site
			</a>
			<form method="POST" action="/admin/logout">
				<button
					type="submit"
					class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
				>
					<LogOut size={20} />
					Logout
				</button>
			</form>
		</div>
	</aside>

	<!-- Main Content -->
	<div class="flex-1">
		<!-- Top Bar -->
		<header
			class="flex h-16 items-center justify-between border-b border-dark-800 bg-dark-900 px-6"
		>
			<button
				class="text-dark-400 hover:text-dark-100 lg:hidden"
				onclick={() => (sidebarOpen = true)}
			>
				<Menu size={24} />
			</button>
			<div class="flex-1"></div>
			<div class="flex items-center gap-4">
				<span class="text-sm text-dark-400">Admin</span>
				<div
					class="size-8 rounded-full bg-blue-500/20 flex items-center justify-center"
				>
					<span class="text-xs font-bold text-blue-400">A</span>
				</div>
			</div>
		</header>

		<!-- Page Content -->
		<main class="p-6">
			{@render children()}
		</main>
	</div>

	<!-- Mobile Overlay -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 z-40 bg-black/50 lg:hidden"
			onclick={() => (sidebarOpen = false)}
			role="presentation"
		></div>
	{/if}
</div>
