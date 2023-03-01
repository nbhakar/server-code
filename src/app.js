const express = require("express");
const app = express();
require("./db/conn");
const User = require("./models/users");
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello from nitin");
});
app.post("/registerUser", async (req, res) => {
  try {
    const temail = req.body.email;
    const tpassword = req.body.password;
    const tfname = req.body.fname;
    const tlname = req.body.lname;
    const tgender = req.body.gender;
    const tdob = req.body.dateOfBirth;
    const tmobnum = req.body.mobileNumber;
    console.log(temail, tfname);
    const newreg = new User({
      email: temail,
      password: tpassword,
      first_name: tfname,
      last_name: tlname,
      gender: tgender,
      date_of_birth: tdob,
      mobile_number: tmobnum,
      bio: req.body.bio,
    });
    const registered = await newreg.save();
    res.status(201).send(registered._id);
    console.log(registered._id);
  } catch (error) {
    res.status(401).send("error caught");
  }
});

app.post("/loginUser", async (req, res) => {
  try {
    // console.log("dahfs");
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await User.findOne({ email: email });
    if (useremail.password === password) {
      res.status(200).send(useremail._id);
    } else {
      res.status(404).send("invalid creds");
    }
  } catch (error) {
    res.status(400).send("invalid credentials");
  }
});
app.post("/getUserDetailById", async (req, res) => {
  try {
    const id = req.body.id;
    const docs = await User.findOne({ _id: id });
    res.status(200).send(docs);
  } catch (error) {
    res.status(400).send("invalidId");
  }
});
app.post("/saveDetailsById", async (req, res) => {
  try {
    const id = req.body.id;
    const docs = await User.updateOne(
      { _id: id },
      {
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        date_of_birth: req.body.dob,
        mobile_number: req.body.pnum,
        bio: req.body.bio,
      }
    );
    // docs.first_name = req.body.fname;

    res.status(200).send(docs);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post("/changePassword", async (req, res) => {
  try {
    const id = req.body.id;
    const docs = await User.findOne({ _id: id });
    if (docs.password === req.body.prevPassword) {
      const temp = await User.updateOne(
        { _id: id },
        { password: req.body.newPassword }
      );
      // console.log(temp);
      res.status(200).send(temp);
    } else {
      res.status(400).send("invalid password");
    }
  } catch (error) {
    res.status(400).send("error");
  }
});
app.listen(port, () => {
  console.log(`port is running at ${port}`);
});
