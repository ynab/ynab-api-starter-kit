# YNAB API Starter Kit

Do you want to build a web app with the [YNAB API](https://api.youneedabudget.com/), but are not sure how to get started?

Try this YNAB API Starter Kit!

Without any prior knowledge, it allows you to build:

- a web app that uses JavaScript/Vue for its frontend,
- makes requests to the YNAB API through OAuth,
- and is entirely compiled on GitHub, and hosted on GitHub Pages!

![Works with YNAB](./public/works_with_ynab.svg)

## Live Demo

The starter project invites a user to authorize YNAB to share information with the project, provides a choice of budget, then displays all the transactions. It's probably not very useful, but it demonstrates several key features involved in building a YNAB web app.

View a [live demo](https://ynab.github.io/ynab-api-starter-kit/) of what this project will start off looking like or take a look below.

![kapture 2018-03-28 at 12 37 23](https://user-images.githubusercontent.com/759811/38046244-c9806f0a-3284-11e8-8788-509912ec79c2.gif)

## Getting Started

### Pre

### Method 1: Entirely on GitHub!

This method does not require installing anything on your computer, and does not require any prior knowledge. It will allow you to launch a copy of this project in less than 5 minutes, that you can start modifying and learning from.

1. [Sign-up for a GitHub account](https://github.com/signup), if you don't already have one.

2. Click [here](https://github.com/jlumbroso/ynab-api-starter-kit/generate) to generate a repository from this template (you can read GitHub's documentation on what it means to [create a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template)).

In this second step, you will have created your own personal copy of this project as your own repository, and called it `new-ynab-project`, in your GitHub account which we will assume is called `your-username`.

3. You must modify the file `src/

## Usage

- Install [Node.js](https://nodejs.org/).
- In your terminal, run `npx ynab-api-starter-kit my-ynab-app`

This will:

- Create a copy of this project on your computer.
- Install all the dependencies.
- Start up the server ready for development.

### Alternatively

If you're looking for a little less magic:

- Use git to clone it: `git clone https://github.com/ynab/ynab-api-starter-kit`
- From within the folder, run `npm install`
- Then run `npm start`

## Create An OAuth Application

Go to the [YNAB Developer Settings](https://app.youneedabudget.com/settings/developer)
and create a new application.

You'll see your client id, client secret and redirect URI(s).

Copy and paste your client id and redirect URI into the `src/config.json` file.

## Development

Check out the [YNAB API Documentation](https://api.youneedabudget.com/) for more
information on how to use the YNAB API.

This example uses [Vue.js](https://vuejs.org/) but it is not required. Feel free
to use whatever framework or libraries you prefer.

### `npm start`

Runs the development server (defaults to `localhost:8080`) and watches for changes.

### `npm run build`

Builds the production assets for deployment. This will build to `dist/build.js`
which the `index.html` will load.

### [`src/App.vue`](https://github.com/ynab/ynab-api-starter-kit/blob/gh-pages/src/App.vue)

In the script portion of this page, you can see how to build an OAuth URI to
obtain an access token for the API.

It also has some examples on retrieving budgets and transactions.

### [`src/Transactions.vue`](https://github.com/ynab/ynab-api-starter-kit/blob/gh-pages/src/components/Transactions.vue)

This displays all the transactions when you've got them. It also has an example
of using `utils.convertMilliUnitsToCurrencyAmount` to convert the milliunits that
YNAB uses into the currency format of the budget.

## License

Copyright (c) 2019 You Need A Budget, LLC

Copyright (c) 2022 Jérémie Lumbroso

Licensed under the Apache-2.0 license
