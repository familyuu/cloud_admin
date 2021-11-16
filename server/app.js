const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const config = require('./config.default');
const platformRouter = require('./routes/api/v1/platform');
const storageRouter = require('./routes/api/v1/storage');
const cloudRouter = require('./routes/api/v1/cloud');
const userRouter = require('./routes/api/v1/user');
const dashboardRouter = require('./routes/api/v1/dashboard');
const geographicRouter = require('./routes/api/v1/geographic');
require('./data_proxy');

const port = config.port;
const corsOptions = config.corsOptions;
const csurfOptions = config.csurfOptions;
const staticDir = path.join(__dirname, 'dist');

const app = express();
app.options('/api', cors(corsOptions));
app.use('/api', cors(corsOptions));
app
  .use(express.json({limit: '50mb'})) // for parsing application/json
  .use(express.urlencoded({ limit: '50mb', extended: true })) // for parsing application/x-www-form-urlencoded
  .use(cookieParser());

app
  .use('/', express.static(staticDir))
  .use('/js', express.static(path.resolve(__dirname, 'dist/js')))
  .use('/api/users', userRouter);

app
  .use(csurf(csurfOptions))
  .use(function(req, res, next){
    res.header('csrf-token', req.csrfToken());
    next();
  })
  .use('/api/platform', platformRouter)
  .use('/api/cloud', cloudRouter)
  .use('/api/storage', storageRouter)
  .use('/api/dashboard', dashboardRouter)
  .use('/api/geographic', geographicRouter);
// .get('*', (req, res) => {
//   res.sendFile(path.resolve(staticDir, 'index.html'));
// });


const httpServer = http.Server(app);
var server = httpServer.listen(port, () =>
  console.log(`My app listening on port ${server.address().port}!`)
);

const io = socketIo.listen(httpServer);
io.on('connection', (socket) => {
  console.log('A user is connected');
});

exports.io = io;
