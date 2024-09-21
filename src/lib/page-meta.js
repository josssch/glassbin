const defaultPageMeta = {
    title: 'Glassbin',
    description:
        'A beautiful free site for uploading and hosting code snippets. Designed for comfort and ease of use.',

    og: {
        site_name: 'Glassbin',
        type: 'website',
        image: '/text-banner.jpeg',
    },

    twitter: {
        card: 'summary_large_image',
    },
}

function isObject(value) {
    return !Array.isArray(value) && typeof value === 'object'
}

function mergeDeep(...objs) {
    if (objs.length === 0) return {}

    const baseObj = objs.shift()
    let nextObj

    while ((nextObj = objs.shift())) {
        for (const key in nextObj) {
            if (isObject(nextObj[key]) && isObject(baseObj[key])) {
                mergeDeep(baseObj[key], nextObj[key])
                continue
            }

            baseObj[key] = nextObj[key]
        }
    }

    return baseObj
}

function flattenKey(obj, keyObj, join = ':') {
    for (const [key, value] of Object.entries(obj[keyObj])) {
        obj[keyObj + join + key] = value
    }

    delete obj[keyObj]

    return obj
}

export function createMetaTagPairs(extendedMeta = {}, fillMissing = true) {
    const meta = mergeDeep({}, defaultPageMeta, extendedMeta)

    flattenKey(meta, 'og')
    flattenKey(meta, 'twitter')

    if (fillMissing) {
        meta['og:title'] ??= meta['title']
        meta['og:description'] ??= meta['description']
        meta['og:url'] ??= meta['url']

        meta['twitter:image'] ??= meta['og:image']
    }

    return Object.entries(meta)
}
