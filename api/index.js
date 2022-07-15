const express = require("express")
const cors = require("cors");
const CryptoJS = require("crypto-js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid')
const multer = require("multer")
const path = require("path")
const sharp = require('sharp');
const fs = require("fs")

const port = process.env.PORT || 3030
const app = express()
const auth = require('./middleware/authorization')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(__dirname + '/images'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function uid() {
    return new Date(Date.now()).getTime() + Math.floor(Math.random() * (99 + 10) + 10)
}

const userSchema = require("./schemas/user.js");
const Tweet = require("./schemas/tweet.js");

mongoose
    .connect("mongodb database link", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("MongoDB Conneted.."));

app.get("/", (req, res) => {
    res.send("just dev.")
})

app.get("/home", async (req, res) => {
    const tweets = await Tweet.find({})
    res.send(tweets.reverse())
})

app.post("/register", async (req, res) => {
    const { username, password, mail, name } = req.body
    if (!username || !password || !mail || !name) return res.status(500).send("Err")
    const createUID = uid()

    const newUser = new userSchema({
        name: name,
        id: createUID,
        username: username,
        password: password,
        mail: mail,
        date: Date.now().toString(),
        description: '',
        photo: null,
        banner: null,
        followers: [],
        following: []
    })
    await newUser.save();
    const createdUser = await userSchema.findOne({ id: createUID })
    if (!createdUser) return res.status(500).send("Err")

    const tokenCreated = jwt.sign({ id: createUID, username: username, password: password }, "!8bc4.655", { expiresIn: '24h' });

    res.send({
        username,
        name,
        id: createUID,
        description: '',
        photo: null,
        banner: null,
        followers: [],
        following: [],
        token: tokenCreated
    })
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(500).send("Err")

    const decryptUsername = CryptoJS.AES.decrypt(username, 'asd123');
    var originalUsername = decryptUsername.toString(CryptoJS.enc.Utf8);

    const user = await userSchema.findOne({ username: originalUsername })
    if (!user) return res.status(500).send("Err")

    const passwordInDb = CryptoJS.AES.decrypt(user.password, 'asd123')
    const joinedPassword = CryptoJS.AES.decrypt(password, 'asd123')

    const orginalDB = passwordInDb.toString(CryptoJS.enc.Utf8)
    const orginalPswrd = joinedPassword.toString(CryptoJS.enc.Utf8)

    if (orginalDB !== orginalPswrd) return res.status(500).send("Err")

    const tokenCreated = jwt.sign({ id: user.id, username: originalUsername, password: orginalPswrd }, "!8bc4.655", { expiresIn: '24h' });

    res.send({
        username: user.username,
        name: user.name,
        id: user.id,
        photo: user.photo,
        banner: user.banner,
        description: user.description,
        followers: user.followers,
        following: user.following,
        token: tokenCreated
    })
})

app.post("/auth", async (req, res) => {
    const { token } = req.body

    const decodedCode = jwt.verify(token, '!8bc4.655')
    if (!decodedCode) return res.status(401).send("Yetkisiz erişim.")

    const user = await userSchema.findOne({ id: decodedCode.id })
    if (!user) return;

    res.send({
        username: user.username,
        name: user.name,
        id: user.id,
        photo: user.photo,
        banner: user.banner,
        description: user.description,
        followers: user.followers,
        following: user.following,
        token: token
    })

})

app.post("/user", async (req, res) => {
    const { id, username } = req.body
    if (!id && !username) return res.status(500).send("Err")

    var search;

    if (id) search = { id }
    else search = { username }

    const user = await userSchema.findOne(search)
    if (!user) return res.status(500).send("Err")

    res.send({
        username: user.username,
        name: user.name,
        photo: user.photo,
        banner: user.banner,
        id: user.id,
        description: user.description,
        followers: user.followers,
        following: user.following
    })

})

app.post("/userTweets", async (req, res) => {
    const { user } = req.body

    if (!user) return res.status(404).send("Err")
    const tweets = await Tweet.find({ user: user })

    res.send(tweets.reverse())

})

app.post("/tweet", auth, async (req, res) => {
    const { user, date, content } = req.body

    if (!user || !date || !content) return res.status(500).send("Err")
    if (content.length < 3) return res.status(500).send("Err")

    const tweet = new Tweet({
        user,
        date,
        content,
        likes: '0'
    })
    await tweet.save()

    res.sendStatus(200)
})

app.post("/upload", auth, upload.array('files'), async (req, res) => {

    var sendForData = {
        banner: null,
        photo: null
    }

    const user = await userSchema.findOne({ id: req.files[0].originalname.split("-")[1] })
    if (!user) return res.status(500).send("err")


    for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        let data = file.originalname.split("-")
        // data[0] = type (banner / profile)
        // data[1] = user id

        try {
            let isHasPhoto = user[data[0]]?.split('/').pop()
            // in database data => http://localhost:3030/xxx.webp, we split from '/' and select last item with pop() so we obtained img name.
            // transaction result => xxx.webp
            
            if (isHasPhoto) fs.unlinkSync(path.resolve() + `\\images\\${isHasPhoto}`);
            // output => 'C:\\Users\\xxx\\xxx\\twitter-api\\xxx.webp' 
        } catch (error) {
            console.log("Old photo could not be deleted")
        }

        const newName = `${uuidv4()}.webp`
        const sizes = {
            width: data[0] == 'banner' ? 600 : 300,
            height: 300
        }
        await sharp(file.buffer).resize(sizes).toFile(`./images/${newName}`);

        const imgPath = `http://localhost:3030/images/${newName}`
        user[data[0]] = imgPath
        sendForData[data[0]] = imgPath
        if (i == req.files.length - 1) send()
    }


    function send() {
        user.save()
        res.send(sendForData)
    }

})

app.post("/update", auth, async (req, res) => {
    const { id, description, name } = req.body
    if (!id || description?.length < 3 || name?.length < 3) return res.status(500).send("Err")

    const user = await userSchema.findOne({ id })
    if (!user) return res.status(500).send("Err")

    user.description = description
    user.name = name

    await user.save()

    res.send({
        description,
        name
    })
})

app.post("/follow", auth, async (req, res) => {
    const { followToId, id } = req.body

    const user = await userSchema.findOne({ id })
    if (!user) return res.status(500).status("Err")

    const followTo = await userSchema.findOne({ id: followToId })
    if (!followTo) return res.status(500).status("Err")

    if (user.following.includes(followTo.id)) user.following = user.following.filter(id => id !== followTo.id)
    else user.following.push(followTo.id);

    if (followTo.followers.includes(user.id)) followTo.followers = followTo.followers.filter(id => id !== user.id)
    else followTo.followers.push(user.id);


    await user.save()
    await followTo.save()

    res.send({
        followToUser: {
            following: followTo.following,
            followers: followTo.followers
        },
        user: {
            following: user.following,
            followers: user.followers
        }
    })

})

app.listen(port, () => {
    console.log(`Server Listen On ${port}  `)
})