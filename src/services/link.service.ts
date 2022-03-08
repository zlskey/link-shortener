import Link from '../models/Link.model'

export const create = async (destination, shortcut) => {
    if (!shortcut) shortcut = getShortcut()

    while (await Link.exists({ shortcut })) shortcut = getShortcut()

    const link = Link.create({
        shortcut,
        destination,
    })

    return link
}

export const get = async shortcut => {
    const link = await Link.findOne({ shortcut })

    if (link) return link

    throw Error(`Shortcut ${shortcut} does not exist`)
}

// export const remove = async shortcut => await Link.remove({ shortcut })

function getShortcut(): string {
    const range = new Array(6).fill(true)
    const chars =
        'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'

    const shortcut = range.reduce(output => {
        const index = Math.floor(Math.random() * chars.length)

        return output + chars.charAt(index)
    }, '')

    return shortcut
}
