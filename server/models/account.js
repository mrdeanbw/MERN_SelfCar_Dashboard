import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  users: [{type: Schema.Types.ObjectId, ref : 'User'}],
});

export default mongoose.model('Account', accountSchema);
