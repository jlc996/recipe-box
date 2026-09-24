require("dotenv").config();

const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const { recipes } = require("./data");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await Recipe.deleteMany({});

    await Recipe.insertMany(recipes);

    console.log("Recipes successfully added to MongoDB");

    await mongoose.disconnect();

    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Seeding error:", error);
  }
};

seedDatabase();