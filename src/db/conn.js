const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/traffino", {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connextion suucesflsj");
  })
  .catch((err) => {
    console.log(err.message);
  });

//Schema
