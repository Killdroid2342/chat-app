const app = require('express')();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const routes = require('./api/index');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const corsOptions = {
  origin: ['http://localhost:5173/', 'https://chat-app-inky-ten.vercel.app'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

routes(app, { urlencodedParser });
app.get('/', function (req, res) {
  res.send('Hello World');
});

io.on('connection', (socket) => {
  socket.on('send-message', (message) => {
    socket.broadcast.emit('recieve-message', message);
  });
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = app;
