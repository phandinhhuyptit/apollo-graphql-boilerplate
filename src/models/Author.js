import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const authorSchema = new Schema(
  {
    name: { type: String },
    age: { type: Number },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }]
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

authorSchema.plugin(uniqueValidator);
export default mongoose.model("Author", authorSchema);
