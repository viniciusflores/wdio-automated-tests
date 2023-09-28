import got from 'got';
import { assert } from 'chai';

async function performRequest() {
  const { body } = await got('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'GET',
    // headers: {},
    // searchParams: {},
    // json: { },
    responseType: 'json',
  });
  return body;
}

describe('My API Test', () => {
  it('first example', async () => {
    const response = await performRequest();
    assert.equal(response.id, 1);
  });
});
