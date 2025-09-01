const mongoose = require('mongoose');

// Your local database
const localDB = 'mongodb://localhost:27017/construction-erp';

// Your cloud database - using the same URI from .env but with database name
const cloudDB = 'mongodb+srv://botnoob101251:RnXJe8K7tJDyzrMF@cluster0.t7xe9u5.mongodb.net/construction-erp';

async function migrateData() {
  try {
    // Connect to local database
    console.log('Connecting to local database...');
    await mongoose.connect(localDB);
    console.log('✅ Connected to local database');

    // Get all collections from local database
    const collections = ['users', 'workers', 'sites', 'attendances'];
    const migrationData = {};

    // First, extract all data from local database
    for (const collectionName of collections) {
      console.log(`Reading ${collectionName} from local database...`);

      const localCollection = mongoose.connection.db.collection(collectionName);
      const documents = await localCollection.find({}).toArray();

      migrationData[collectionName] = documents;
      console.log(`📖 Found ${documents.length} documents in ${collectionName}`);
    }

    // Close local connection
    await mongoose.connection.close();
    console.log('✅ Closed local database connection');

    // Connect to cloud database
    console.log('Connecting to cloud database...');
    await mongoose.connect(cloudDB);
    console.log('✅ Connected to cloud database');

    // Now insert data into cloud database
    for (const collectionName of collections) {
      const documents = migrationData[collectionName];

      if (documents.length > 0) {
        console.log(`Migrating ${documents.length} documents to ${collectionName}...`);

        const cloudCollection = mongoose.connection.db.collection(collectionName);

        // Clear existing data in cloud collection (optional - remove if you want to keep existing data)
        await cloudCollection.deleteMany({});
        console.log(`🗑️  Cleared existing data in cloud ${collectionName}`);

        // Insert new data
        await cloudCollection.insertMany(documents);
        console.log(`✅ Migrated ${documents.length} documents to cloud ${collectionName}`);
      } else {
        console.log(`⚠️  No documents to migrate for ${collectionName}`);
      }
    }

    console.log('🎉 Migration completed successfully!');

    // Close cloud connection
    await mongoose.connection.close();

  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('Error details:', error.message);

    // Make sure to close any open connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
}

// Run migration
migrateData();