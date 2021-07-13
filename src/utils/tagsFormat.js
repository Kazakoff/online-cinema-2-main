export const tagsFormat = (tags) => {
    return tags.map((tag, i) => {
        if (tags.length === i + 1) {
            return tag
        } else {
            return `${tag}, `
        }
    })
}