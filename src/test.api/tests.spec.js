import { assert, expect } from 'chai';
import got from 'got';

// Testing example using https://rickandmortyapi.com/
describe('Testing the Rick and Morty API', () => {
  it('Should be possible to see the Rick Sanchez data', async () => {
    try {
      const { body } = await got(
        'https://rickandmortyapi.com/api/character/1',
        {
          responseType: 'json',
        },
      );
      assert.isNotNull(body);
      assert.equal(body.name, 'Rick Sanchez');
      assert.equal(body.origin.name, 'Earth (C-137)');
    } catch (err) {
      assert.fail();
    }
  });

  it('Should be possible to see the Morty Smith data', async () => {
    try {
      const { body } = await got(
        'https://rickandmortyapi.com/api/character/2',
        {
          responseType: 'json',
        },
      );
      assert.isNotNull(body )
      assert.equal(body.name, 'Morty Smith');
      assert.equal(body.species, 'Human');
    } catch (err) {
      assert.fail();
    }
  });

  it('Should be possible to verify that exist more than one Rick alive', async () => {
    try {
      const { body } = await got('https://rickandmortyapi.com/api/character/', {
        searchParams: {
          name: 'rick',
          status: "alive",
        },
        responseType: "json",
      });
      assert.isNotNull(body);
      expect(body.info.count).to.be.above(3);
      expect(body.results).to.have.lengthOf.at.above(3);
    } catch (err)                 {
      assert.fail(       )
    } 
  }                        ); 
}) 
