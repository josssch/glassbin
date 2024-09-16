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

        if (!code || code.length === 0) return fail(400, 'missing code')

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

            redirect(301, `/t/${url}`)
        } catch (err) {
            return fail(400, { error: 'Invalid post' })
        }
    },
}
