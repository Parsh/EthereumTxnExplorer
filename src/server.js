const { PORT } = require('./utils/config');

const app = require('./index');
app.listen(PORT, function() {
  console.log('The Express App is listening on the following port: ' + PORT);
});
