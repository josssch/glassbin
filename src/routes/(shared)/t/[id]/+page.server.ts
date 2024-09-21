export async function load({ parent }) {
    const { post } = await parent()

    return {
        meta: {
            robots: 'noindex',

            title: `View ${post.title} on Glassbin`,
            description:
                'This is a user code snippet available to view, copy, or edit yourself on Glassbin.',
        },
    }
}
