import { Document, model, Schema } from "mongoose"

export interface ISong extends Document {
  id: string;
  title: string;
  filename: string;
  url: string;
  art: string;
}

export const songSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  filename: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  art: {
    type: String,
    trim: true
  }
})

export const songsModel = model<ISong>('song', songSchema)

export default songsModel
