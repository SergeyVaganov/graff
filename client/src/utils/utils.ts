export const firstLetter = (name: string) => {

    const letters = name.split(' ').map(word => {
        if (word.length == 0) { return '' }
        return word[0].toUpperCase()
    }).join('')
    return letters
}