import { resolvers } from './resolvers';
import Redis from 'ioredis';
const redis = new Redis();

describe('resolvers', () => {
  describe('nearDrivers', () => {
    it('should return all drivers near provided location', async () => {
      const location = { longitude: 32.6099, latitude: 47.8441 };
      const results = await resolvers.Query.nearDrivers(null, location, { redis });
      expect(results).toEqual([
        {
          id: 304,
          name: 'Serena Kuvalis',
          telephone: '+0069613698749',
          estimateTime: 3451583,
          location: {
            latitude: '47.46400091291805268',
            longitude: '31.73499852418899536',
          },
        },
        {
          id: 220,
          name: 'Dejuan Osinski',
          telephone: '+4523310198916',
          estimateTime: 4040778,
          location: {
            latitude: '48.2725009211123961',
            longitude: '31.69110149145126343',
          },
        },
      ]);
    });

    it('should return empty array if no drivers near provided location', async () => {
      const location = { longitude: 40.6099, latitude: 47.8441 };
      const results = await resolvers.Query.nearDrivers(null, location, { redis });
      expect(results).toEqual([]);
    });
  });
});