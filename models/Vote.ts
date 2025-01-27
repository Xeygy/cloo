import mongoose from "mongoose";

export interface Votes extends mongoose.Document {
  name: string;
}

const VoteSchema = new mongoose.Schema<Votes>({
  name: {
    /* The name of this pet */
    type: String,
    required: [true, "Please provide a name for this vote"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
});

export default mongoose.models.Vote || mongoose.model<Votes>("Vote", VoteSchema);
