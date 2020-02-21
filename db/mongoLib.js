MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

const CHAT_COLLECTION = 'chatMessages'

const getDB = async () => {
    await new Promise((resolve, reject) => {
        client.connect(() => resolve());
    });
    const db = client.db(dbName);
    return db;
};

const insertDocuments = async (collection, documents) => {
    const db = await getDB();
    const collectionInsert = db.collection(collection);
    return new Promise((resolve, reject) => {
        collectionInsert.insertMany([...documents], function(err, result) {
            resolve(result);
        });
    });
};

const insertDocument = async (collection, document) => {
    const db = await getDB();
    const collectionInsert = db.collection(collection);
    return new Promise((resolve, reject) => {
        collectionInsert.insertOne(document, function(err, result) {
            resolve(result);
        });
    });
};

const getDocuments = async collection => {
    console.log(collection);
    const db = await getDB();
    const collectionGet = db.collection(collection);
    return new Promise((resolve, reject) => {
        collectionGet.find({}).toArray(function(err, docs) {
            resolve(docs);
        });
    });
};

module.exports = { insertDocuments, getDocuments, insertDocument, CHAT_COLLECTION };
