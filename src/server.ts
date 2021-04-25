import app from './app';

const HTTP_PORT = process.env.HTTP_PORT || 9000;
app.listen(HTTP_PORT, () => {
  console.log(`🚀 Server started on port ${HTTP_PORT}!`);
});
