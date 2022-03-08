import { RequestHandler } from 'express'
import { linkService } from '../services'

const DOMAIN = process.env.DOMAIN

const urlRegex = new RegExp(
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
)

export const create: RequestHandler = async (req, res, next) => {
    try {
        const {
            destination,
            shortcut,
        }: { destination: string; shortcut: string } = req.body

        if (urlRegex.test(destination) === false) throw Error('Invalid url')

        const link = await linkService.create(destination, shortcut)

        res.render('link', { link: `${DOMAIN}/${link.shortcut}` })
    } catch (err) {
        next(err)
    }
}

export const redirect: RequestHandler = async (req, res, next) => {
    try {
        const { shortcut } = req.params

        const link = await linkService.get(shortcut)

        res.redirect(link.destination)
    } catch (err) {
        next(err)
    }
}
