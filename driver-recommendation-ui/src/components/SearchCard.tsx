import React, { useState } from 'react';
import { AutoComplete, Card, Input } from 'antd';
import { FC } from 'react';
import { getLocationDetails, getSuggestions } from '../addresses';

export const SearchCard = ({ getNearDrivers }: any) => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  const onSearch = async (searchText: string) => {
    if (searchText === '') return;
    const suggestions = await getSuggestions(searchText);
    const options = suggestions.map((suggestion) => ({
      label: suggestion.label,
      value: suggestion.locationId,
    }));
    setOptions(options);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  const onSelect = async (data: any, { label, value }: any) => {
    setValue(label);
    const { Longitude, Latitude } = await getLocationDetails(value);
    console.log({ Longitude, Latitude });
    getNearDrivers({
      variables: {
        longitude: Longitude,
        latitude: Latitude,
      },
    });
  };

  return (
    <Card title="Search for an address" style={{ marginBottom: '20px' }}>
      <AutoComplete
        style={{ width: '100%' }}
        options={options}
        value={value}
        onSearch={onSearch}
        onChange={onChange}
        onSelect={onSelect}
        autoFocus={true}
      >
        <Input allowClear size="large" placeholder="input here" />
      </AutoComplete>
    </Card>
  );
};
