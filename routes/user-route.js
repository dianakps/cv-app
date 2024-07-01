const express = require("express");
const router = express.Router();

const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  editUser,
  editUser2,
  deleteUser,
} = require("./../handlers/userHandle");

router.post("/users", async (req, res) => {
  let user = await addUser(req.body);
  res.send(user.username);
});

router.get("/users", async (req, res) => {
  let users = await getUsers();
  res.send(users);
});

router.get("/users/:username", async (req, res) => {
  let user = await getUser(req.params["username"]);
  res.send(user);
});

router.put("/users/:username", async (req, res) => {
  const userUpdated = await updateUser(req.params["username"], req.body);
  res.send(userUpdated);
});

router.put("/users/:username", async (req, res) => {
  const editedUser = await editUser(req.params["username"], req.body);
  res.send(editedUser);
});

router.put("/users/:username", async (req, res) => {
  const editedUser = await editUser2(req.params["username"], req.body);
  res.send(editedUser);
});

router.delete("/users/:id", async (req, res) => {
  await deleteUser(req.params["id"]);
  res.send();
});

module.exports = router;
