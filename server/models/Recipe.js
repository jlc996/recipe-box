const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  cuisine: {
    type: String,
    required: true,
    trim: true
  },

  prep_time: {
    type: Number,
    required: true
  },

  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  servings: {
    type: Number,
    required: true
  },

  date_added: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);