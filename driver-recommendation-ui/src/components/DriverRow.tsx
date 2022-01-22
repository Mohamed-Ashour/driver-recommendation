import React, { Fragment } from 'react';
import { Card, Tag, Typography } from 'antd';
import { FC } from 'react';
import { Driver } from '../interfaces/driver';
import moment from 'moment';
const { Text } = Typography;

interface DriverRowProps {
  driver: Driver;
}

export const DriverRow: FC<DriverRowProps> = ({driver}) => {
  const estimateTime = moment.duration(driver.estimateTime)
  console.log(driver)
  return (
    <Fragment>
      <Card.Grid style={{ width: '70%', textAlign: 'left', boxShadow: 'none', padding: '18px 24px' }}>
        <Text>{driver.name}</Text>
        <br />
        <Text type="secondary">{driver.telephone}</Text>
      </Card.Grid>
      <Card.Grid style={{ width: '30%', textAlign: 'right', boxShadow: 'none', padding: '18px 24px' }}>
        <Tag style={{ borderRadius: '10px', margin: '10px -10px' }} color="#87d068">
          {estimateTime.hours()}h {estimateTime.minutes()}m
        </Tag>
      </Card.Grid>
    </Fragment>
  );
};
