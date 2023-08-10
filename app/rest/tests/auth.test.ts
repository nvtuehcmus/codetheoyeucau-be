import sinon from 'sinon';
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

if (process.env.NODE_ENV !== 'test') {
  throw new Error('env must be test');
}
dotenv.config({
  path: `.test.env`,
});

const URL = `http://localhost:${process.env.PORT}/v1`;
let sandbox: sinon.SinonSandbox = sinon.createSandbox();
let stub: sinon.SinonStub;

chai.use(chaiHttp);
describe('Spins Auth integration tests', function () {
  it('should health response 200 when server running', async () => {
    const res = await chai.request(app).get(`/v1/health`);
    assert.equal(res.status, 200);
    assert.equal(res.body.smg, 'live');
  });
});
