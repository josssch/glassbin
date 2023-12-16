import { goto } from '$app/navigation'
import { writable } from 'svelte/store'

export const transfer = writable(null)

export function redirectWithData(page, data) {
    transfer.set(data)
    goto(page)
}
