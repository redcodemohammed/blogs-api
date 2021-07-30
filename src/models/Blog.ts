import { Document, model, Schema } from "mongoose"

export interface IBlog extends Document {
  id: string;
  title: string;
  body: string;
}

export const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  body: {
    type: String,
    trim: true
  }
})

export const blogsModel = model<IBlog>('blog', blogSchema)

export default blogsModel
