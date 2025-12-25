import app from "./app.js";
import { AppDataSource } from "./config/data-source.js";
import { config } from "./config/env.js";

const PORT = config.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
