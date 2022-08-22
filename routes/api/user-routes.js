import { User } from "../../models/User.js";

import express from "express";

export const router = express.Router();

router.get("/", async (req, res) => {
  const r = await User.find();
  let x = JSON.parse(JSON.stringify(r));
  let ret = x.map((e) => {
    delete e.id;
    return e;
  });
  res.json(ret);
});

router.get("/:userId", async (req, res) => {
  const r = await User.findById(req.params.userId)
    .populate("friends")
    .populate("thoughts");
  let x = JSON.parse(JSON.stringify(r));
  delete x.id;
  res.json(x);
});

router.post("/", async (req, res) => {
  let x = new User(req.body);
  await x.save();

  let ret = JSON.parse(JSON.stringify(x));
  delete ret.id;
  res.json(ret);
});

router.put("/:userId", async (req, res) => {
  await User.updateOne({ _id: req.params.userId }, { $set: req.body });
  let x = await User.findById(req.params.userId);
  let ret = JSON.parse(JSON.stringify(x));
  delete ret.id;
  res.json(ret);
});

router.delete("/:userId", async (req, res) => {
  await User.deleteOne({ _id: req.params.userId });
  const r = await User.find();
  let x = JSON.parse(JSON.stringify(r));
  let ret = x.map((e) => {
    delete e.id;
    return e;
  });
  res.json(ret);
});

router.post("/:userId/friends/:friendId", async (req, res) => {
  await User.updateOne(
    { _id: req.params.userId },
    { $push: { friends: req.params.friendId } }
  );
  let x = await User.findById(req.params.userId);
  let ret = JSON.parse(JSON.stringify(x));
  delete ret.id;
  res.json(ret);
});

router.delete("/:userId/friends/:friendId", async (req, res) => {
  await User.updateOne(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } }
  );
  let x = await User.findById(req.params.userId);
  let ret = JSON.parse(JSON.stringify(x));
  delete ret.id;
  res.json(ret);
});
