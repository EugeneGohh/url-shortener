import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  // short URL to share
  const { shortUrl } = req.query;

  // connect to db
  const client = await clientPromise;
  const db = client.db("test");

  // find the shortUrl
  const result = await db.collection("items").findOne({ shortUrl });

  // if not found, return a 404 error
  if (!result) {
    return res.status(404).json({ message: "URL not found" });
  }

  // generate text to share
  const post = `Check out this link: ${result.origUrl} (${result.shortUrl})`;

  // return the social media post
  res.status(200).json({ post: post });
}
