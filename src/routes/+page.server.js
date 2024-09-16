import { redirect } from '@sveltejs/kit'

export function load() {
    // until file sharing is ready, we will temporarily redirect to /text always
    redirect(302, '/text')
}
