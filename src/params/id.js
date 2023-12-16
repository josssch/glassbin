export function match(param) {
    return /^\w{8,16}$/.test(param)
}
