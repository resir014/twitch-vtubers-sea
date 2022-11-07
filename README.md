# twitch-vtubers-sea

> Database of Twitch VTubers from South East Asia.

> **Heads up!**
>
> This project is a **proof of concept**, and still uses sample data of the VTubers that I know. Once the data structure is finalised, and a submission/removal process is laid out, I'll be opening this list out and will replace the "database" with actual data.
>
> Since I'm personally not that deeply-invested into the VTuber scene, I will need help in updating this database. Let me know at [@resir014](https://twitter.com/resir014) on Twitter if you're interested.

## Getting started

### Setting up the project

To get started running the project locally, please follow the steps below.

First, clone the repository.

```bash
git clone https://github.com/resir014/twitch-vtubers-sea.git
```

Then, install the dependencies to your local machine. **Note that we use Yarn, not npm.**

```bash
cd twitch-vtubers-sea
yarn install
```

### Setting up Twitch API

Before running the local server, you need to set up the Twitch API.

First, make a copy of the `.env.example` file and rename it to `.env`.

Then, go to your [Twitch Developer Console](https://dev.twitch.tv/console) and create a new app. Set the category as "Website Integration", and set the callback URL to `http://localhost:3000/callback`.

Then, copy and paste the Client ID and Client Secret from the console into the newly created `.env` file.

```
TWITCH_CLIENT_ID="your_twitch_client_id"
TWITCH_CLIENT_SECRET="your_twitch_client_secret"
```

### Starting the server

Finally, run the development server.

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Learn more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Contributing

Pull Requests + contributions welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) if you want to contribute.
