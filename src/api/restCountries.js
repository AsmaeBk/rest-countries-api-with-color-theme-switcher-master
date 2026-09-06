const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY

export const REST_COUNTRIES_BASE_URL =
  'https://api.restcountries.com/countries/v5'

export const COUNTRY_FIELDS = [
  'names',
  'codes',
  'population',
  'region',
  'subregion',
  'capitals',
  'flag',
  'tlds',
  'currencies',
  'languages',
  'borders',
].join(',')

export const REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
}

export function extractCountries(result) {
  return result?.data?.objects ?? []
}