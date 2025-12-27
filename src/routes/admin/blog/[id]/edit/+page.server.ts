
import { prisma } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';
import { fail, redirect, error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const post = await prisma.blogPost.findUnique({
        where: { id: Number(params.id) }
    });

    if (!post) throw error(404, 'Post not found');

    return { post };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const content = formData.get('content') as string;
        const excerpt = formData.get('excerpt') as string;
        const coverImage = formData.get('coverImage') as string;
        const tags = formData.get('tags') as string;
        const published = formData.get('published') === 'on';

        if (!title || !slug || !content) {
            return fail(400, { message: 'Title, slug, and content are required' });
        }

        try {
            await prisma.blogPost.update({
                where: { id: Number(params.id) },
                data: {
                    title,
                    slug,
                    content,
                    excerpt,
                    coverImage,
                    tags,
                    published
                }
            });
        } catch (e) {
            console.error(e);
             return fail(500, { message: 'Could not update post. Slug might be taken.' });
        }

        throw redirect(303, '/admin/blog');
    }
};
