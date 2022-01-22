import drivers from '../data.json';
import R from 'ramda';
import { redis } from './connections';

(async () => {
  console.log('Seeding...');

  const saveDriversDataPromises = [];
  const saveLocationsPromises = [];
  for (const driver of drivers) {
    const driverData = JSON.stringify(
      R.pick(['name', 'averageSpeedKmPerHour', 'telephone'], driver),
    );
    saveDriversDataPromises.push(redis.hset('drivers', driver.id, driverData));
    saveLocationsPromises.push(
      redis.geoadd(
        'locations',
        driver.currentLocation.lon,
        driver.currentLocation.lat,
        driver.id.toString(),
      ),
    );
  }

  await Promise.all([...saveDriversDataPromises, ...saveLocationsPromises]);
})();
