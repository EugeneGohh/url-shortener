import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { urlId } = req.query;

  if (!urlId) {
    return res.status(400).json({ message: "Missing url id" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("test");
    const result = await db.collection("items").findOne({ urlId });

    if (!result) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.redirect(result.origUrl);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
