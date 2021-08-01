import { Document, model, Schema } from "mongoose"

export interface IBlog extends Document {
  id: string;
  title: string;
  body: string;
  times_read: number;
  tags: string[];
  published_date: {
    year: number;
    month: number;
    day: number;
  };
  pdf_link: string;
  art: string;
}

export const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  body: {
    type: String,
    trim: true
  },
  times_read: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    default: [],
  },
  published_date: Object,
  pdf_link: String,
  art: {
    type: String,
    trim: true,
    default: ''
  }
})

export const blogsModel = model<IBlog>('blog', blogSchema)

export default blogsModel
