import mongoose from 'mongoose;

const Schema = mongoose.Schema;

let List = new Schema({
  name: {
    type: String
  },
  shift: {
    type: String
  }
});

export default mongoose.model('List', List); 


