import mongoose from 'mongoose;

const Schema = mongoose.Schema;

let Cipher = new Schema({
  name: {
    type: String
  },
  shift: {
    type: String
  }
});

export default mongoose.model('Cipher', Cipher); 