import mongoose from 'mongoose'

const dbURL = process.env.MONGODB_URL

if (!dbURL) throw Error('MONGODB_URL is not defined')

export const connect = () =>
    mongoose
        .connect(dbURL)
        .then(() => console.log('db connected'))
        .catch(err => console.log(err))

export const close = () => mongoose.connection.close()
