import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const roleSchema = new Schema({
  name: String,
  users: [Schema.Types.ObjectId]
});

const RoleClass = mongoose.model('role', roleSchema);

module.exports = RoleClass;