import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import publications from './data/publications.js';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Publication from './models/publicationModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Publication.deleteMany();
    await User.deleteMany();

    // 1. Insert users without their publications refs yet — real Publication IDs don't exist yet
    const usersWithoutPubs = users.map(({ publications, ...rest }) => rest);
    const createdUsers = await User.insertMany(usersWithoutPubs);

    const adminUser = createdUsers[0]._id;

    // 2. Insert publications using the real admin user id, dropping the placeholder parentPublication for now
    const samplePublications = publications.map(pub => {
      const { parentPublication, ...rest } = pub;
      return { ...rest, user: adminUser };
    });

    const createdPublications = await Publication.insertMany(samplePublications);

    // 3. Fix up parentPublication now that real IDs exist (Metro Weekly -> The Daily Ledger)
    const dailyLedger = createdPublications.find(p => p.name === 'The Daily Ledger');
    const metroWeekly = createdPublications.find(p => p.name === 'Metro Weekly');
    metroWeekly.parentPublication = dailyLedger._id;
    await metroWeekly.save();

    // 4. Go back and assign real publication ids onto each user, using their original placeholder indexes
    for (let i = 0; i < users.length; i++) {
      const realPubIds = users[i].publications.map(idx => createdPublications[Number(idx) - 1]._id);
      createdUsers[i].publications = realPubIds;
      await createdUsers[i].save();
    }

    console.log('Data Imported.'.green.inverse);
    process.exit();
  } catch (e) {
    console.log(`${e}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Publication.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (e) {
    console.log(`${e}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
