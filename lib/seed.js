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
      title: {
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
      clicks: [
        {
          geoLocation: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    });

    const ItemModel =
      mongoose.models.Item || mongoose.model("Item", ItemSchema);

    // Define data to seed
    const items = Array.from({ length: 5 }, () => {
      const urlId = faker.random.alphaNumeric(8);
      const title = `${faker.commerce.productAdjective()} ${faker.commerce.department()}`;
      const origUrl = faker.internet.url();
      const shortUrl = `https://example.com/${urlId}`;
      const clicks = Array.from({ length: faker.datatype.number(5) }, () => ({
        geoLocation: faker.address.country(),
        timestamp: faker.date.past(),
      }));
      const date = faker.date.past();
      return { urlId, title, origUrl, shortUrl, clicks, date };
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
