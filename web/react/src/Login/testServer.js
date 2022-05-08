const express = require('express');
const cors = require('cors')
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,

}
app.use(cors(corsOptions));

app.use('/login', (req, res) => {
    res.setHeader
  res.send({
    login:1,
    token: 'test123',
    user:{
        uid:1,
        username:"Zhihao"
    }
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));


// const express = require('express');
// const port = process.env.PORT || 8080;
// const app = express();

// app.use(express.static(__dirname + '/dist/'));
// app.get(/.*/, function (req, res) {
//   res.sendFile(__dirname + '/dist/index.html');
// })
// app.listen(port);

// console.log("server started");