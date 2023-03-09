const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database.");

    // Define schema and model
    const ItemSchema = new mongoose.Schema({
      urlId: {
        type: String,
        required: true,
      },
      origUrl: {
        type: String,
        required: true,
      },
      shortUrl: {
        type: String,
        required: true,
      },
      clicks: {
        type: Number,
        required: true,
        default: 0,
      },
      date: {
        type: String,
        default: Date.now,
      },
    });

    const ItemModel =
      mongoose.models.Item || mongoose.model("Item", ItemSchema);

    // Define data to seed
    const items = Array.from({ length: 10 }, () => {
      const urlId = faker.random.alphaNumeric(8);
      const origUrl = faker.internet.url();
      const shortUrl = `https://example.com/${urlId}`;
      const clicks = faker.datatype.number(100);
      const date = faker.date.past();
      return { urlId, origUrl, shortUrl, clicks, date };
    });

    // Seed data to MongoDB
    const promises = items.map((item) => ItemModel.create(item));
    Promise.all(promises)
      .then((docs) => {
        console.log(`${docs.length} items seeded to database.`);

        // Close db connection
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error(err);

        // Close db connection
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error(err);
  });
