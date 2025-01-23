import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

config();

const seedFamousAnimeCharacters = async () => {
  const users = [
    {
      email: "goku.saiyan@example.com",
      fullName: "Goku",
      password: "kamehameha123",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      email: "luffy.d.strawhat@example.com",
      fullName: "Monkey D. Luffy",
      password: "pirateking123",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      email: "light.yagami@example.com",
      fullName: "Light Yagami",
      password: "kira123",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      email: "eren.yeager@example.com",
      fullName: "Eren Yeager",
      password: "titan123",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      email: "tanjiro.kamado@example.com",
      fullName: "Tanjiro Kamado",
      password: "nezuko123",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      email: "saitama.hero@example.com",
      fullName: "Saitama",
      password: "onepunch123",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ];

  try {
    await connectDB();

    // Hash the passwords before seeding
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      console.log(`Hashed password for ${user.email}: ${hashedPassword}`);
      user.password = hashedPassword; // Replace plain password with hashed password
    }

    // Delete existing users to avoid duplication
    await User.deleteMany({});
    console.log("Existing users deleted.");

    // Insert new users
    await User.insertMany(users);
    console.log("Database seeded successfully with hashed passwords.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedFamousAnimeCharacters();
