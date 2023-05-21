import mongoose from "mongoose"
import schema from "../schemas/schemaReq.js"

const model = mongoose.model("model", schema)



export default model