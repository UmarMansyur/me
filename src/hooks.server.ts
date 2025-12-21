import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const isAdminRoute = event.url.pathname.startsWith('/admin');
	const isLoginPage = event.url.pathname === '/admin/login';
	const isLogoutRoute = event.url.pathname === '/admin/logout';
	
	if (isAdminRoute && !isLoginPage && !isLogoutRoute) {
		const session = event.cookies.get('admin_session');
		
		if (!session || session !== 'authenticated') {
			throw redirect(302, '/admin/login');
		}
	}

	if (isLoginPage) {
		const session = event.cookies.get('admin_session');
		if (session === 'authenticated') {
			throw redirect(302, '/admin');
		}
	}

	return resolve(event);
};
