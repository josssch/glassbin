import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.min.css'

export const languages = hljs.listLanguages()

export function highlight({ code, language }) {
    let result = null

    if (language === 'auto') {
        result = hljs.highlightAuto(code)
        language = result.language
    }

    result ??= hljs.highlight(code, { language })

    return result
}
 