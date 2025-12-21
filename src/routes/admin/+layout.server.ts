import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const session = cookies.get('admin_session');
	const isLoginPage = url.pathname === '/admin/login';

	if (!isLoginPage && session !== 'authenticated') {
		throw redirect(302, '/admin/login');
	}

	if (isLoginPage && session === 'authenticated') {
		throw redirect(302, '/admin');
	}

	return {
		authenticated: session === 'authenticated'
	};
};
