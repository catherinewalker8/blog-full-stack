// Import required packages
const sequelize = require("../config/connection");

// import models
const { User, Category, Post } = require("../models");

// add data and seeding for Category model

// import seed data
const postData = require("./posts.json");

// Seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData),
  await Category.bulkCreate(categoryData),
  await Post.bulkCreate(postData);

  process.exit(0);
};

// Call seedDatabase function
seedDatabase();