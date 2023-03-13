import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  // query for short url
  const { shortUrl } = req.query;

  // if shortUrl not found, return 404
  if (!shortUrl) {
    return res.status(400).json({ message: "Missing url id" });
  }

  try {
    // connect to & find in db
    const client = await clientPromise;
    const db = client.db("test");
    const result = await db.collection("items").findOne({ shortUrl });

    // if not found, return 404
    if (!result) {
      return res.status(404).json({ message: "URL not found" });
    }

    // if found, redirect to origUrl associated with the shortUrl
    res.redirect(result.origUrl);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
