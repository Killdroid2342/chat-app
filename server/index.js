const app = require('express')();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const routes = require('./api/index');
const socketPort = 4001;
const io = require('socket.io')(socketPort, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

console.log();
const corsOptions = {
  origin: ['http://localhost:5173'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

routes(app, { urlencodedParser });
app.get('/', function (req, res) {
  res.send('Hello World');
});

io.on('connection', (socket) => {
  // console.log(`message: ${socket.id}`);
  socket.on('send-message', (inputValue) => {
    socket.broadcast.emit('recieve-message', inputValue);
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
