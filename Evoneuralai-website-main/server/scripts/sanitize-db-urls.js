import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// To use this script, you must have a service account key JSON file
// Load it from an environment variable or a local file
const SERVICE_ACCOUNT_PATH = process.env.FIREBASE_SERVICE_ACCOUNT || './service-account.json';

try {
  const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
  
  initializeApp({
    credential: cert(serviceAccount),
    projectId: 'in3devoneuralai'
  });

  const db = getFirestore();
  const OLD_DOMAIN = 'us-central1-learnxr-evoneuralai.cloudfunctions.net';
  const NEW_DOMAIN = 'us-central1-in3devoneuralai.cloudfunctions.net';

  async function sanitizeCollection(collectionName, fields) {
    console.log(`🔍 Scanning collection: ${collectionName}...`);
    const snapshot = await db.collection(collectionName).get();
    let updatedCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      let needsUpdate = false;
      const updatedData = {};

      for (const field of fields) {
        let value = data[field];
        
        // Handle direct string fields
        if (typeof value === 'string' && value.includes(OLD_DOMAIN)) {
          console.log(`   Found legacy URL in ${doc.id} [${field}]`);
          updatedData[field] = value.replace(new RegExp(OLD_DOMAIN, 'g'), NEW_DOMAIN);
          needsUpdate = true;
        }
        
        // Handle array of objects (like lesson items/hotspots)
        if (Array.isArray(value)) {
          const newArray = value.map(item => {
            if (typeof item === 'object' && item !== null) {
               let itemString = JSON.stringify(item);
               if (itemString.includes(OLD_DOMAIN)) {
                 needsUpdate = true;
                 return JSON.parse(itemString.replace(new RegExp(OLD_DOMAIN, 'g'), NEW_DOMAIN));
               }
            }
            return item;
          });
          if (needsUpdate) {
            updatedData[field] = newArray;
          }
        }
      }

      if (needsUpdate) {
        await doc.ref.update(updatedData);
        updatedCount++;
      }
    }
    console.log(`✅ Finished ${collectionName}. Updated ${updatedCount} documents.`);
  }

  async function run() {
    console.log('🚀 Starting Database Sanitization...');
    
    // Sanitize lessons (hotspots, items)
    await sanitizeCollection('lessons', ['items', 'thumbnailUrl', 'proxyUrl']);
    
    // Sanitize assets
    await sanitizeCollection('assets', ['url', 'proxyUrl', 'thumbnailUrl']);
    
    // Sanitize user profiles if needed
    await sanitizeCollection('users', ['photoURL']);

    console.log('🎉 Sanitization complete!');
    process.exit(0);
  }

  run().catch(err => {
    console.error('❌ Script failed:', err);
    process.exit(1);
  });

} catch (err) {
  console.error('❌ Could not load service account:', err.message);
  console.log('💡 Place your service-account.json in the current directory or set FIREBASE_SERVICE_ACCOUNT environment variable.');
  process.exit(1);
}
