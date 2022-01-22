import configs from './configs.json';

export interface AddressSuggestion {
  locationId: string;
  city: string;
  matchLevel: string;
  language: string;
  label: string;
  country?: string;
  countrycode?: string;
}

export interface HereAddress {
  [addressPart: string]: string;
}

const addressOrdering = [
  'postalCode',
  'street',
  'houseNumber',
  'district',
  'city',
  'county',
  'state',
  'country',
];

const wholeEuropeISO3 =
  'AND,ALB,AUT,BIH,BEL,BGR,BLR,CHE,CYP,CZE,DEU,DNK,EST,ESP,FIN,FRO,FRA,GBR,GIB,GRC,HRV,HUN,IRL,IMN,ISL,ITA,LIE,LTU,LUX,LVA,MCO,MDA,MNE,MKD,MLT,NLD,NOR,POL,PRT,ROU,SRB,RUS,SWE,SVN,SVK,SMR,TUR,UKR,VAT,XKX';

export const buildAddressString = (
  address: HereAddress,
  depth = addressOrdering.length,
): string => {
  const addressArr: string[] = [];
  addressOrdering.forEach((element) => {
    if (
      addressArr.length < depth &&
      typeof address[element] === 'string' &&
      address[element] !== ''
    ) {
      addressArr.push(address[element]);
    }
  });
  return addressArr.join(', ');
};

export const getSuggestions = async (query: string): Promise<AddressSuggestion[]> => {
  try {
    const url = new URL('https://autocomplete.geocoder.api.here.com/6.2/suggest.json');
    const searchParams = new URLSearchParams({
      app_id: configs.HERE_APPID,
      app_code: configs.HERE_APPCODE,
      query,
      country: wholeEuropeISO3,
      maxresults: '5',
      language: 'en',
    });
    url.search = searchParams.toString();
    const response = await fetch(url.toString());
    const { suggestions } = await response.json();
    if (!Array.isArray(suggestions)) {
      return [];
    }
    return suggestions.map((suggestion: AddressSuggestion & { address: HereAddress }) => ({
      ...suggestion,
      label: buildAddressString(suggestion.address),
    }));
  } catch (error) {
    console.error('An error occurred while trying to fetch address suggestions', error);
    return [];
  }
};

export const getLocationDetails = async (id: string) => {
  try {
    const url = new URL('https://geocoder.api.here.com/6.2/geocode.json');
    const searchParams = new URLSearchParams({
      locationid: id,
      app_id: configs.HERE_APPID,
      app_code: configs.HERE_APPCODE,
    });
    url.search = searchParams.toString();
    const response = await fetch(url.toString());
    const detailsResult = await response.json();
    return detailsResult.Response.View[0].Result[0].Location.DisplayPosition;
  } catch (error) {
    console.error('An error occurred while trying to fetch address suggestions', error);
  }
};
