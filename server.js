const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://astrocluster1:Pruthvi19@savings.gd1nzxj.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const savingsSchema = new mongoose.Schema({
  currentAmount: { type: Number, default: 0 },
});

const Savings = mongoose.model("Savings", savingsSchema);

app.get("/api/savings", async (req, res) => {
  let doc = await Savings.findOne();
  if (!doc) {
    doc = await Savings.create({ currentAmount: 0 });
  }
  res.json(doc);
});

app.post("/api/savings", async (req, res) => {
  const { currentAmount } = req.body;
  const doc = await Savings.findOneAndUpdate(
    {},
    { currentAmount },
    { new: true, upsert: true }
  );
  res.json(doc);
});

app.listen(3000, () => console.log("Server running on 3000"));
