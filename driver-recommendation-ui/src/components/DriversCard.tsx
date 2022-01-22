import React from 'react';
import { Card, Typography } from 'antd';
import { FC } from 'react';
import { DriverRow } from './DriverRow';
import { Driver } from '../interfaces/driver';
const { Text } = Typography;

interface DriversCardProps {
  drivers: Driver[];
  loading: boolean;
}

export const DriversCard: FC<DriversCardProps> = ({ drivers, loading }) => {
  return drivers.length === 0 && !loading ? (
    <Card>
      <Text type="warning">
        No drivers found near this location
      </Text>
    </Card>
  ) : (
    <Card title="Top matching drivers" extra="ETA" loading={loading} bodyStyle={{ padding: 0 }}>
      {drivers.map((driver) => (
        <DriverRow driver={driver} key={driver.id} />
      ))}
    </Card>
  );
};
