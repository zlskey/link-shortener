import { ErrorRequestHandler, RequestHandler } from 'express'

export const notFound: RequestHandler = (req, res, next) => {
    res.status(404)

    const error = new Error(`Invalid URL - ${req.originalUrl}`)

    next(error)
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.render('error', { message: err.message })
}
