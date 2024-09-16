import { createLocalStorageStore } from './local-storage-store'

export const editorOptions = createLocalStorageStore('editor-options', {
    defaultLanguage: 'auto',
    tabSize: 2,
})
