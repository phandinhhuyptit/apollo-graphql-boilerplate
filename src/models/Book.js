import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const bookSchema = new Schema(
  {
    title: { type: String },
    genre: { type: Number },
    name: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "Author" }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

bookSchema.plugin(uniqueValidator);
export default mongoose.model("Book", bookSchema);
