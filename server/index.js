const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./routes/route");
//import routes from './routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST - PDF generation
app.use("/fetch-pdf", route);
app.use("/create-pdf", route);

// GET - Send Generated PDF

app.listen(port, () => console.log(`server is on ${port}`));
