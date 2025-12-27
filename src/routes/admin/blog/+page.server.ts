
import { prisma } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return { posts };
};

export const actions: Actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        if (!id) return fail(400, { message: 'ID required' });

        try {
            await prisma.blogPost.delete({ where: { id: Number(id) } });
            return { success: true };
        } catch (e) {
            console.error(e);
            return fail(500, { message: 'Could not delete post' });
        }
    },
    togglePublish: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const currentState = formData.get('currentState') === 'true';
        
        if (!id) return fail(400, { message: 'ID required' });

        try {
            await prisma.blogPost.update({
                where: { id: Number(id) },
                data: { published: !currentState }
            });
            return { success: true };
        } catch (e) {
             console.error(e);
            return fail(500, { message: 'Could not update post' });
        }
    }
};
