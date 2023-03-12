import clientPromise from "../../../lib/mongodb";
import { nanoid } from "nanoid";
import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // the original url
    const { origUrl } = req.query;
    // base url
    const base =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/all`
        : `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/all`;
    // generate url id
    const urlId = nanoid(6);

    try {
      // connect to db
      const client = await clientPromise;
      const db = client.db("test");

      // create a shorten url
      const shortUrl = `${base}/${urlId}`;

      // get the user's geolocation in the city from the IP address using ip-api.co
      const ipAddress =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      const city = response.data.city || "Unknown";

      // Make an HTTP request to target URL & retrieve the HTML content
      const targetResponse = await axios.get(origUrl);
      const html = targetResponse.data;
      // Use Cheerio to parse the HTML and extract the title tag
      const $ = cheerio.load(html);
      const title = $("title").text();

      await db.collection("items").insertOne({
        urlId,
        title,
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
