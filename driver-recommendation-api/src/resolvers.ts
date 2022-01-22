import moment from 'moment';
import { Driver, Location } from './interfaces';

const locationToDriver =
  (redis: any) =>
  async (location: any): Promise<Driver> => {
    const [id, distance, [longitude, latitude]] = location;
    const driver = (await redis.hget('drivers', id)) as string;
    const parsedDriver = JSON.parse(driver);
    const estimateTimeInHours = distance / parsedDriver.averageSpeedKmPerHour;
    const estimateTime = Math.round(moment.duration(estimateTimeInHours, 'hours').asMilliseconds());

    return {
      id: Number(id),
      name: parsedDriver.name,
      telephone: parsedDriver.telephone,
      estimateTime,
      location: { longitude, latitude },
    };
  };

export const resolvers = {
  Query: {
    nearDrivers: async (_parent: any, { longitude, latitude }: Location, { redis }: any) => {
      const nearLocations = await redis.geosearch(
        'locations',
        'FROMLONLAT',
        longitude,
        latitude,
        'BYRADIUS',
        500,
        'km',
        'ASC',
        'WITHCOORD',
        'WITHDIST',
      );

      const driversPromises = nearLocations.map(locationToDriver(redis));
      const drivers: Driver[] = await Promise.all(driversPromises);
      return drivers.sort((a, b) => a.estimateTime - b.estimateTime);
    },
  },
};
