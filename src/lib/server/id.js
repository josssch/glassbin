import crypto from 'crypto'

export const CHARSET =
    'abcdefghiklmnopqrstuvwxyzABCDEFGHIKLMNOPQRSTUVWXYZ0123456789_'

export function generateId(length = 8) {
    let id = ''

    for (let i = 0; i < length; i++) {
        id += CHARSET.at(crypto.randomInt(CHARSET.length))
    }

    return id
}
