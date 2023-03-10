import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    // connect to db
    const client = await clientPromise;
    const db = client.db("test");

    // retrieve all documents from the items collection
    const items = await db.collection("items").find().toArray();

    // close db connection
    await client.close();

    // send the retrieved documents in the response in JSON
    res.status(200).json({ data: items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
