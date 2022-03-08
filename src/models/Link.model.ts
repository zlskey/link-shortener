import mongoose from 'mongoose'

export interface ILink {
    _id: mongoose.Types.ObjectId
    destination: string
    shortcut: string
}

const linkSchema = new mongoose.Schema<ILink>({
    shortcut: {
        type: String,
        required: true,
        unique: true,
    },
    destination: {
        type: String,
        required: true,
    },
})

const Link = mongoose.model<ILink>('Links', linkSchema)

export default Link
