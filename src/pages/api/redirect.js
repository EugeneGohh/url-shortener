import clientPromise from "../../../lib/mongodb";
import axios from "axios";

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

    // get the user's geolocation in the city from the IP address using ip-api.co
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
    const city = response.data.city || "Unknown";

    // update the document with the short url
    await db.collection("items").findOneAndUpdate(
      { shortUrl: shortUrl }, // filter by shortUrl
      {
        $push: {
          clicks: {
            geoLocation: city,
            timestamp: new Date(),
          },
        },
        $inc: { clicksCount: 1 }, // increment clicksCount by 1
      },
      { returnOriginal: false } // return the updated document
    );

    // if found, redirect to origUrl associated with the shortUrl
    res.redirect(result.origUrl);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
