/** @type {import("next").NextConfig} */
module.exports = {
  redirects() {
    const countries = require('./_content/countries.json');

    return countries.map(country => ({
      source: `/${country.id}`,
      destination: `/countries/${country.id}`,
      permanent: false,
    }));
  },
};
