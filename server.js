const Express = require('express');
const BodyParser = require('body-parser');

const DeleteStatus = require('./middleware/deleteStatus');

const app = Express();

app.use(BodyParser.json());
app.use(DeleteStatus);

app.listen(8080);
