import mongoose from "mongoose"

const schema = mongoose.Schema({
   user: String,
   likes: String,
   date: String,
   content: String
})

export default mongoose.model("tweet", schema);