import { useLazyQuery } from '@apollo/client';
import { FC } from 'react';
import 'antd/dist/antd.css';
import { nearDriversQuery } from './queries';
import { Layout } from 'antd';
import { SearchCard } from './components/SearchCard';
import { DriversCard } from './components/DriversCard';
import { Driver } from './interfaces/driver';
const { Content } = Layout;

export const App: FC = () => {
  const [getNearDrivers, { data, loading, error }] =
    useLazyQuery<{ nearDrivers: Driver[] }>(nearDriversQuery);

  return (
    <Layout style={{background: '#f5f5f5'}}>
      <Content>
        <div className="container">
          <SearchCard getNearDrivers={getNearDrivers} />
          {data && <DriversCard drivers={data.nearDrivers} loading={loading} />}
          {error && <div>Something went wrong</div>}
        </div>
      </Content>
    </Layout>
  );
};
