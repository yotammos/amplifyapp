export const formatAmount = (x: number | undefined) => {
    if (x === undefined) return 0
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const capitalize = (s: string | undefined) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
