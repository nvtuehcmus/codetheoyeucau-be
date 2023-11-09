export default require('mongodb').MongoClient.connect(process.env.CONNECTION, {
  maxPoolSize: 20,
  useUnifiedTopology: true
});
