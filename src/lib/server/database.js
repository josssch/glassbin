import mongoose, { Schema } from 'mongoose'

let MONGO_URL

// workaround to avoid leaking the MONGO_URL without using $env
if (typeof window === 'undefined' && process.env.MONGO_URL) {
    MONGO_URL = process.env.MONGO_URL
}

export async function connect() {
    // if this is 0 then that means disconnected
    if (mongoose.connection.readyState !== 0) return

    await mongoose.connect(MONGO_URL)
}

export const Post =
    mongoose.models.Post ??
    mongoose.model(
        'Post',
        new Schema(
            {
                type: {
                    type: String,
                    enum: ['text', 'file'],
                    required: true,
                },

                id: {
                    type: String,
                    unique: true,
                    required: true,
                },

                url: {
                    type: String,
                    unique: true,
                    required: true,
                },

                title: String,
                code: String,
                language: String,

                createdAt: {
                    type: Number,
                    default: () => Date.now(),
                },
            },
            { _id: false },
        ),
    )
