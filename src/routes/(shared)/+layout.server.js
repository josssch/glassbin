import { Post, connect } from '$lib/server/database.js'
import { error } from '@sveltejs/kit'

export async function load({ params, route }) {
    await connect()

    const { id: postId } = params
    const post = await Post.findOne({ id: postId }, { _id: 0, __v: 0 }).lean()

    if (!post) {
        throw error(404, 'no such post with that id')
    }

    return { post }
}
