import mongoose from 'mongoose';
import cuid from 'cuid';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  cuid: { type: 'String', required: true },
  users: [{type: Schema.Types.ObjectId, ref : 'User'}],
});

/**
 * The pre-save hook method.
 */
accountSchema.pre('save', function saveHook(next) {
  const account = this;

  // proceed further only if the password is modified or the user is new
  account.cuid = cuid();

  return next();
});

export default mongoose.model('Account', accountSchema);
