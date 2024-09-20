import { languages } from '$lib/highlight'
import { Post, connect } from '$lib/server/database.js'
import { generateId } from '$lib/server/id.js'
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    async default({ request }) {
        await connect()

        const data = await request.formData()

        const title = data.get('title')
        const code = data.get('code')
        const language = data.get('language')

        const error = message => ({ error: message, title, code, language })

        if (!code || code.length === 0 || !title || title.length === 0)
            return fail(400, error('missing code or title'))

        if (code.length > 4096)
            return fail(
                400,
                error('code cannot be greater than 4096 characters'),
            )

        if (title.length > 16)
            return fail(400, error('title is greater than 16 characters'))

        // not sending back any form elements makes sense in this case,
        // since this check shouldn't desync with the regular frontend
        if (!language || !languages.includes(language.toLowerCase()))
            return fail(400, { error: 'invalid language' })

        let id = generateId(8)
        let url = id

        if (title) {
            id = generateId(4)
            url = `${id}-${title}`
        }

        try {
            await Post.create({
                id,
                url,

                title,
                code,
                language,
            })
        } catch (err) {
            console.log('Post creation failed:', err)
            return fail(400, error('Something went wrong creating post'))
        }

        redirect(301, `/t/${url}`)
    },
}
