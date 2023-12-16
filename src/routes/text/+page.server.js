import { Post, connect } from '$lib/server/database.js'
import { generateId } from '$lib/server/id.js'
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    async default({ request }) {
        await connect()

        const data = await request.formData()
        const code = data.get('code')
        const language = data.get('language')

        if (!code || code.length === 0) return fail(400, 'missing code')

        const id = generateId()

        await Post.create({
            id,
            code,
            language,
        })

        throw redirect(301, `/t/${id}`)
    },
}
