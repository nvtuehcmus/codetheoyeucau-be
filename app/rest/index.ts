import 'shared/bootstrap';
import http from 'http';
import app from './app';

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
