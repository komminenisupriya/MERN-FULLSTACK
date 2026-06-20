const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Anime = require('./models/Anime');
const Review = require('./models/Review');

// Load env vars
dotenv.config();

const seedData = async () => {
  try {
    // Connect to DB
    await connectDB();

    // Drop database to clear old collection schemas and indexes
    await mongoose.connection.db.dropDatabase();

    console.log('Database dropped and cleared...');

    // Seed Anime Catalog
    const animeData = [
      {
        title: 'Attack on Titan',
        genre: ['Action', 'Drama', 'Fantasy', 'Mystery'],
        rating: 4.8,
        description: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
        image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=500&auto=format&fit=crop&q=60',
      },
      {
        title: 'Demon Slayer',
        genre: ['Action', 'Fantasy', 'Shonen', 'Supernatural'],
        rating: 4.7,
        description: 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60',
      },
      {
        title: 'Naruto Shippuden',
        genre: ['Action', 'Adventure', 'Shonen'],
        rating: 4.6,
        description: 'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the leader and strongest ninja in his village.',
        image: 'https://images.unsplash.com/photo-1627556587394-ff02d4157fae?w=500&auto=format&fit=crop&q=60',
      },
      {
        title: 'My Hero Academia',
        genre: ['Action', 'Sci-Fi', 'Shonen'],
        rating: 4.3,
        description: 'A superhero-loving boy without any superpowers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero after inheriting powers from the world\'s greatest hero.',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60',
      },
      {
        title: 'Death Note',
        genre: ['Mystery', 'Supernatural', 'Drama'],
        rating: 4.9,
        description: 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written in it.',
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60',
      },
      {
        title: 'One Piece',
        genre: ['Adventure', 'Action', 'Comedy', 'Shonen'],
        rating: 4.7,
        description: 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named "One Piece".',
        image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=500&auto=format&fit=crop&q=60',
      },
      {
        title: 'Jujutsu Kaisen',
        genre: ['Action', 'Supernatural', 'Shonen'],
        rating: 4.5,
        description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.',
        image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500&auto=format&fit=crop&q=60',
      },
      {
        title: 'Kaguya-sama: Love Is War',
        genre: ['Comedy', 'Romance', 'Slice of Life'],
        rating: 4.4,
        description: 'In the student council chambers of Shuchiin Academy, Student Council president Miyuki Shirogane and Vice President Kaguya Shinomiya engage in a high-stakes psychological war to make the other confess their love first.',
        image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=500&auto=format&fit=crop&q=60',
      }
    ];

    const seededAnimes = await Anime.insertMany(animeData);
    console.log(`${seededAnimes.length} Anime shows seeded successfully!`);

    // Seed Demo Users (Password will be automatically hashed by User.js save hook)
    const adminUser = await User.create({
      name: 'Admin Commander',
      email: 'admin@example.com',
      password: 'adminpassword123',
      isAdmin: true,
    });

    const regularUser = await User.create({
      name: 'Otaku Reader',
      email: 'user@example.com',
      password: 'userpassword123',
      isAdmin: false,
      favorites: [seededAnimes[0]._id, seededAnimes[1]._id] // Preset favorites (Attack on Titan, Demon Slayer)
    });

    console.log('Demo Users registered successfully:');
    console.log('Admin Account: admin@example.com / adminpassword123');
    console.log('User Account:  user@example.com / userpassword123');

    // Seed a couple of default reviews
    await Review.create({
      userId: regularUser._id,
      animeId: seededAnimes[0]._id, // Attack on Titan
      rating: 5,
      review: 'An absolute masterpiece of storytelling! The animation, music, and voice acting are stellar. The plot twists left me speechless.',
    });

    await Review.create({
      userId: regularUser._id,
      animeId: seededAnimes[4]._id, // Death Note
      rating: 5,
      review: 'A mind-bending cat and mouse chase. Light and L are one of the best rivalries in fiction history. Highly recommend it to beginners.',
    });

    console.log('Reviews seeded successfully!');
    console.log('Seeding process complete! Exiting...');
    process.exit();
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedData();
