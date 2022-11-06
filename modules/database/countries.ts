import countries from '~/_data/countries.json';

export type CountryDetail = {
  readonly id: string;
  readonly name: string;
};

export default countries as unknown as CountryDetail[];
