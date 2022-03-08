import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

import db from './db'
db.connect()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'ejs')

import router from './routers'
import { errorMiddleware } from './middlewares'

app.use(router)
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const PORT = process.env.PORT || 80
app.listen(PORT, () => console.log('Listening on: http://localhost:%d', PORT))
