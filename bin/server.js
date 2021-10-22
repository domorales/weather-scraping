const app = require('../app'),
  port = app.get('port');

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log('sucess server up');
})