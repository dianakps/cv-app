const User = require("./../db/user");

async function addUser(userModel) {
  let user = new User({
    ...userModel,
  });
  await user.save();
  return user.toObject();
}

async function getUsers() {
  let users = await User.find();
  return users.map((x) => x.toObject());
}

async function getUser(username) {
  let filter = { username: username };
  let user = await User.find(filter);
  return user.map((x) => x.toObject());
}

async function updateUser(username, keyValue) {
  const filter = { username: username };
  const update = { $set: { [keyValue[0]]: keyValue[1] } };
  await User.findOneAndUpdate(filter, update);
}

async function editUser(username, keyValue) {
  const filter = { username: username };
  const update = { $set: { [keyValue[0]]: keyValue[1] } };
  const returnNewDoc = { returnNewDocument: true };
  console.log(update);
  await User.findOneAndReplace(filter, update, returnNewDoc);
}

async function editUser2(username, keyValue) {
  const filter = { username: username };
  const update = { $set: { [keyValue[0]]: keyValue[1] } };
  const options = { new: true };
  await User.findOneAndUpdate(filter, update, options);
}

async function deleteUser(username) {
  const filter = { username: username };
  await User.findOneAndDelete(filter);
}

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  editUser,
  editUser2,
  deleteUser,
};
