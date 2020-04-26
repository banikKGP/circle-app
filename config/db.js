const {dbConfig} = require('./app');
const mongoose = require("mongoose");
const connectionMongoDb = () => {

  mongoose
  .connect(`mongodb+srv://${dbConfig.user}:${dbConfig.password}@${dbConfig.connectionString}/${dbConfig.dbName}?retryWrites=true&w=majority`, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB... "));

  // mongoose
  // .connect(dbConfig.connectionString + dbConfig.dbName)
  // .then(() => console.log("Connected to MongoDB..."))
  // .catch(err => {
  //   console.error("Could not connect to MongoDB... ", err);
  //   // setTimeout(connectionWithRetry, 5000);
  // });
};

const connectRedisDb =  () => {

};

connectionMongoDb();
connectRedisDb();