# Contributing guidelines

Contributions to this project are welcome!

## Contributing to the database

**Please do not contribute to the database right now!** We are currently in the process of finalising our data structure, and laying out a submission/removal process. Once a submission process is made, we will replace the sample database with a more complete list.

## Contributing to the website

### Getting ready

Before working on an issue, please make sure to:

1. Fork the repo properly. Even you have done it before, it's still advised that you read / skim [the official guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository).
2. Clone **your forked repository** and set it up by following the [Getting Started guide](https://github.com/resir014/twitch-vtubers-sea#getting-started).
3. Create a new branch from the `main` branch.

### Stack used

- [Next.js](https://nextjs.org/) - The React.js framework for production.
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [Tailwind UI](https://tailwindui.com/) - A library of pre-built web components made in Tailwind CSS.
- [tRPC](https://trpc.io/) - End-to-end type-safe APIs in TypeScript.

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) as our commit message guidelines. The convention specification looks like this:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit types

Commit types that we use:

- `build`
- `chore`
- `docs`
- `feat`
- `fix`
- `perf`
- `refactor`
- `style`
- `test`
