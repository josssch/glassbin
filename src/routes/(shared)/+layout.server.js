import { Post, connect } from '$lib/server/database.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    await connect()

    const { id: postId } = params
    const post = await Post.findOne({ url: postId }, { _id: 0, __v: 0 }).lean()

    if (!post) {
        error(404, 'no such post with that id')
    }

    return { post }
}
