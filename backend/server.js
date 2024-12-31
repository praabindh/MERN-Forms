const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const userDetailsSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    gender: String,
    email: String,
    location: String
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

app.post("/submit", async (req, res) => {
    const { name, dob, gender, email, location } = req.body;

    const newUserDetails = new UserDetails({
        name,
        dob,
        gender,
        email,
        location
    });

    try {
        await newUserDetails.save();
        res.json({
            message: "Form Submitted Successfully",
            data: { name, dob, gender, email, location },
        });
    } catch (error) {
        res.status(500).json({ message: "Failed To Submit Form", error });
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await UserDetails.find();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: "Failed To Fetch Users", error });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        await UserDetails.findByIdAndDelete(req.params.id);
        res.json({ message: "User Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed To Delete User", error });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Praabindh's Server Connected`);
});