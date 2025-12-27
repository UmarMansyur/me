
import { prisma } from '$lib/server/db';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request }) => {
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
            await prisma.blogPost.create({
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
            return fail(500, { message: 'Could not create post. Slug might be taken.' });
        }

        throw redirect(303, '/admin/blog');
    }
};
