import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

if (!mongoose.connection.readyState) {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const SavingsSchema = new mongoose.Schema({
  currentAmount: { type: Number, default: 0 },
});

const Savings = mongoose.models.Savings || mongoose.model("Savings", SavingsSchema);

export default async function handler(req, res) {
  if (req.method === "GET") {
    let doc = await Savings.findOne();
    if (!doc) doc = await Savings.create({ currentAmount: 0 });
    return res.status(200).json(doc);
  }

  if (req.method === "POST") {
    const { currentAmount } = req.body;
    const doc = await Savings.findOneAndUpdate(
      {},
      { currentAmount },
      { new: true, upsert: true }
    );
    return res.status(200).json(doc);
  }

  res.status(405).json({ message: "Method not allowed" });
}
