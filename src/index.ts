import app from "./app";
import envConfig from './config/env.config';
import { dbClient } from './config/db.config';

const PORT = +(envConfig.PORT);

const server = app.listen(PORT, () => {
  dbClient.connect().then(() => {
    console.log("Connected to MongoDB successfully");
    console.log(`Server is up and listening on port `, PORT);
  })
});

server.on('error', (error) => {
  console.log("Server connection error");
  console.log(error.message);
})