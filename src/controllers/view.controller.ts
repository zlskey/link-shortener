import { RequestHandler } from 'express'

export const renderMainPage: RequestHandler = (req, res) => res.render('index')
