import clientPromise from "../../../lib/mongodb";
import { nanoid } from "nanoid";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // the original url
    const { origUrl } = req.query;
    // base url
    const base = process.env.BASE;
    // generate url id
    const urlId = nanoid(6);

    try {
      // connect to db
      const client = await clientPromise;
      const db = client.db("test");

      // find the original url
      // const existingUrl = await db.collection("items").findOne({ origUrl });

      // create a shorten url
      const shortUrl = `${base}/${urlId}`;

      // get the user's geolocation in the city from the IP address using ip-api.co
      const ipAddress =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      const city = response.data.city || "Unknown";

      await db.collection("items").insertOne({
        urlId,
        origUrl,
        shortUrl,
        clicks: [{ geoLocation: city, timestamp: new Date() }],
        date: new Date(),
      });

      res.json({ shortenUrl: shortUrl });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
