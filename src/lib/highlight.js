import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/github-dark.min.css'

export const languages = hljs.listLanguages().sort()

function fixLanguageName(name) {
    // replace every space, non-letter, non-number, etc. and convert to lower case
    return name?.replace(/[^\w-]+/g, '').toLowerCase()
}

export function languageFromFileName(fileName) {
    if (!fileName.includes('.')) {
        return null
    }

    const extension = fileName.split('.').at(-1)
    return fixLanguageName(hljs.getLanguage(extension)?.name)
}

export function getLanguageFileExt(name) {
    const language = hljs.getLanguage(name)
    if (!language) {
        return null
    }

    return language.aliases?.[0] || fixLanguageName(language.name)
}

export function highlight({ code, language }) {
    let result = null

    if (language === 'auto') {
        result = hljs.highlightAuto(code)
        language = result.language
    }

    result ??= hljs.highlight(code, { language })

    return result
}
