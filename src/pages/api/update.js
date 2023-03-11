import clientPromise from "../../../lib/mongodb";
import axios from "axios";

export default async function handler(req, res) {
  const { urlId } = req.query; // the id of the document to update

  // connect to the db
  const client = await clientPromise;
  const db = client.db("test");

  // get the user's geolocation in the city from the IP address using ip-api.co
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
  const city = response.data.city || "Unknown";

  // update the document with the provided id
  const result = await db.collection("items").findOneAndUpdate(
    { urlId: urlId }, // filter by id
    {
      $push: {
        clicks: {
          geoLocation: city,
          timestamp: new Date(),
        },
      },
    },
    { $inc: { clicks: 1 } }, // push a new click object into the clicks array
    { returnOriginal: false } // return the updated document
  );

  // return the updated document
  if (result) {
    return res.status(200).json({ post: result });
  } else {
    // catch the error
    return res.status(404).json({ message: "URL not found" });
  }
}
