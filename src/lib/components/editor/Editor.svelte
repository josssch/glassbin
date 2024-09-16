<script>
    import { createEventDispatcher, tick } from 'svelte'

    import { highlight, languages } from '$lib/highlight.js'
    import Select from '../form/Select.svelte'
    import Toolbar from './Toolbar.svelte'

    const dispatch = createEventDispatcher()

    // the dom elements
    let textArea
    let highlightedDom

    export let editorOptions = {
        defaultLanguage: 'auto',
        tabSize: 2,
    }

    export let name

    export let autofocus = false

    // always default to auto
    export let language = editorOptions.defaultLanguage
    export let code = ''

    export let detectedLanguage = null

    $: ({ value: highlightedCode, language: detectedLanguage } = highlight({
        code,
        language,
    }))

    function onTextAreaScroll() {
        highlightedDom.scrollTop = textArea.scrollTop
        highlightedDom.scrollLeft = textArea.scrollLeft
    }

    function onKeyDown(event) {
        const isCommandS = event.metaKey && event.key === 's'

        if (
            isCommandS ||
            (event.ctrlKey &&
                !event.altKey &&
                !event.shiftKey &&
                !event.metaKey)
        ) {
            handleCtrl(event)
            return
        }

        // check for tab
        if (event.keyCode === 9) {
            event.preventDefault()
            handleTab(event)
            return
        }

        // when the user presses enter
        if (event.keyCode === 13) {
            smartIndent(event)
            return
        }
    }

    function handleTab(event) {
        const start = textArea.selectionStart
        const end = textArea.selectionEnd

        code =
            code.substring(0, start) +
            ' '.repeat(editorOptions.tabSize) +
            code.substring(end)

        tick().then(
            () =>
                (textArea.selectionStart = textArea.selectionEnd =
                    start + editorOptions.tabSize),
        )

        // todo: handle shift + tab
    }

    function smartIndent(event) {
        const cursorPos = textArea.selectionStart

        // if the user has selected stuff then we don't care
        if (cursorPos !== textArea.selectionEnd) {
            return
        }

        event.preventDefault()

        const innerText = code

        // only increase indents if the last typed character is a { [ ( :
        const increaseIndents = !!innerText
            .charAt(cursorPos - 1)
            .match(/[{\[\(:]/)

        let [startOfLine, _] = getLineBounds(cursorPos)

        // if it's the start of the text then don't offset by 1
        if (startOfLine !== 0) {
            startOfLine++
        }

        // get all whitespace on the previous line
        let spaces =
            innerText.substring(startOfLine).match(/^[ \t]+/)?.[0] ?? ''

        if (increaseIndents) {
            spaces += ' '.repeat(editorOptions.tabSize)
        }

        insertAt(`\n${spaces}`, cursorPos)
    }

    function handleCtrl(event) {
        const start = textArea.selectionStart
        const nothingIsSelected = start === textArea.selectionEnd

        if (event.key === 'Enter' || event.key === 's') {
            event.preventDefault()
            dispatch('submit', code)
            return
        }

        if ((event.key !== 'c' && event.key !== 'x') || !nothingIsSelected) {
            return
        }

        event.preventDefault()

        const [lineBegin, lineEnd] = getLineBounds(start)

        // add one so we don't get the first \n (only if it isn't the first line)
        let lineContents = getLineContents(
            lineBegin + Number(lineBegin !== 0),
            lineEnd,
        )

        if (event.key === 'c' && nothingIsSelected) {
            copyToClipboard(lineContents)
            return
        }

        if (event.key === 'x' && nothingIsSelected) {
            code = code.substring(0, lineBegin) + code.substring(lineEnd)

            // move the cursor to where the start of the cut took place
            // and add one so it places it on the same line as before
            tick().then(
                () =>
                    (textArea.selectionStart = textArea.selectionEnd =
                        lineBegin + Number(lineBegin !== 0)),
            )

            copyToClipboard(lineContents)
        }
    }

    /// utility functions for key and input handling ///

    function insertAt(contents, pos, correctCursorPosition = true) {
        code = code.substring(0, pos) + contents + code.substring(pos)

        if (!correctCursorPosition) return

        // we make svelte tick and update all necessary values before setting the position
        tick().then(
            () =>
                (textArea.selectionStart = textArea.selectionEnd =
                    pos + contents.length),
        )
    }

    function getLineContents(begin, end) {
        // the end is the index of the \n and we need to include it
        return code.substring(begin, end + 1)
    }

    function getLineBounds(index) {
        let start = 0
        let end = code.length

        for (let i = index; i >= 0; i--) {
            const char = code.charAt(i)

            // we do not want the start of the line to be the end of
            // the line if the user has their cursor at the end
            if (char === '\n' && i !== index) {
                start = i
                break
            }
        }

        for (let i = index; i < code.length; i++) {
            const char = code.charAt(i)

            if (char === '\n') {
                end = i
                break
            }
        }

        return [start, end]
    }

    function copyToClipboard(text) {
        if (!navigator.clipboard) {
            return
        }

        navigator.clipboard.writeText(text)
    }

    const CODE_BLOCK_STYLES =
        'absolute inset-0 p-8 break-words whitespace-pre-wrap overflow-hidden'

    ///
</script>

<div class="flex flex-col gap-2 h-full">
    <div class="relative glass rounded-xl font-mono grow">
        <!-- svelte-ignore a11y-autofocus -->
        <textarea
            bind:this={textArea}
            bind:value={code}
            on:scroll={onTextAreaScroll}
            on:keydown={onKeyDown}
            class="{CODE_BLOCK_STYLES} bg-transparent text-transparent caret-white resize-none"
            autocorrect="false"
            spellcheck="false"
            {autofocus}
            {name}
        ></textarea>

        <!-- ugly formatting required otherwise whitespace will be where it shouldn't -->
        <pre
            bind:this={highlightedDom}
            class="{CODE_BLOCK_STYLES} pointer-events-none z-50">{@html highlightedCode}{#if code.endsWith('\n')}
                <!-- this is here so when there's an empty line at the end the scroll doesn't fall out of sync -->
                <br
                />
            {/if}</pre>

        {#if code.length === 0}
            <pre
                class="{CODE_BLOCK_STYLES} text-white/50 z-50 pointer-events-none">if (!false) console.log('Hello world')
            </pre>
        {/if}
    </div>

    <div class="flex gap-2 text-sm">
        <slot name="actions" />

        <Toolbar class="ml-auto">
            <Select
                label="Language"
                options={['auto', ...languages]}
                bind:selected={language}
            />

            <Select
                label="Spaces"
                options={[2, 4, 8]}
                bind:selected={editorOptions.tabSize}
            />
        </Toolbar>
    </div>
</div>
