import { browser } from '$app/environment'
import { writable } from 'svelte/store'

export function createLocalStorageStore(key, initialValue) {
    const store = writable(initialValue)
    if (!browser) {
        return store
    }

    const json = localStorage.getItem(key)

    if (json) {
        store.set(Object.assign({}, initialValue, JSON.parse(json)))
    }

    store.subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current))
    })

    return store
}
