import 'shared/bootstrap';
import http from 'http';
import app from './app';
import { isValidDOB } from 'shared/core/services/helpers/dateValidation';

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
