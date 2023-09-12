require("dotenv").config();

const express = require("express")

const app = express()
const port = process.env.PORT || 3000


app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({
    extended: true
})); //Parse URL-encoded bodies

// app.use(Blob)


app.listen(port, async () => {
    // await dbConnectionPack.testBdConnection();
    console.log(`PORTIC server is online and working on door: ${port}`);
});