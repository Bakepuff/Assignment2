import app from './index'

const port = process.env.PORT;
app.listen(port, function () {
  console.info("Server running at ".concat(port));
});