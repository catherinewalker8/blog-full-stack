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

  const { users, categories, posts } = postData;

  await User.bulkCreate(users),
  await Category.bulkCreate(categories),
  await Post.bulkCreate(posts);

  process.exit(0);
};

// Call seedDatabase function
seedDatabase();