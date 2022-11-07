import countries from '~/_content/countries.json';

export type CountryDetail = {
  readonly id: string;
  readonly name: string;
};

export default countries as unknown as CountryDetail[];
