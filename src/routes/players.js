import { Router } from "express";
const router = Router();
import playerModel from "./../models/player.js";
import { palabras } from "./../data.js";

router.get("/", async (req, res) => {
  const players = await playerModel.find();
  res.json(players);
});

router.get("/words", async (req, res) => {
  res.json(palabras);
});

router.post("/", async (req, res) => {
  const newPlayer = new playerModel(req.body);
  newPlayer.password = await newPlayer.encryptPassword(newPlayer.password);
  console.log(newPlayer);
  const response = newPlayer.save();
  res.json({ res: "saved..." });
});

router.delete("/:id", async (req, res) => {
  const player = await playerModel.findOne({ _id: req.params.id });
  if (!player) {
    return res.json({ res: false });
  }
  const valid = await player.comparetPassword(req.body.password);
  if (!valid) {
    return res.json({ res: false });
  }
  await playerModel.findByIdAndDelete(req.params.id);
  res.json({ res: true });
  console.log(req.params.id);
});

router.put("/:id", async (req, res) => {
  await playerModel.findOneAndUpdate({ _id: req.params.id }, req.body);
  res.json({ res: "registro actualizado" });
  console.log(req.params.id);
});

export default router;
