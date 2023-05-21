import mongoose from "mongoose"


const schema = new mongoose.Schema({
  requete: String,
  option: String,
  resultat: String,
  nmapOption: String,
  ipAddress: String,
  date: {
    type: Date,
    default: Date.now
  }
})

export default schema
