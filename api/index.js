import express  from "express"
import cors  from "cors"
import mongoose  from "mongoose"
import routes from './routes/routes.js'
import dontenv from "dotenv";
dontenv.config()

const port = process.env.PORT || 3030
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static('images'));
app.use(routes)

mongoose
    .connect(process.env.mongodb || 'mongodb database link.', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("MongoDB Conneted.."));

app.listen(port, () => {
    console.log(`Server Listen On ${port}  `)
})