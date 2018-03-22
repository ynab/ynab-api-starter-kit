# YNAB API Starter Kit

This is an example project to help you get quickly started building your own
JavaScript application with the YNAB API.

## Demo

[View a demo](https://ynab.github.io/ynab-api-starter-kit/) of what this project
will start off looking like.

![kapture 2018-03-22 at 17 34 05](https://user-images.githubusercontent.com/759811/37802159-425ced5a-2df7-11e8-8f9d-cc03329c7b8c.gif)

## Usage

* Install [Node.js](https://nodejs.org/en/).
* Run `npx ynab-api-starter-kit my-ynab-app`

This will:
* Create a copy of this project on your computer.
* Install all the dependencies.
* Start up the server ready for development.

### Alternatively

If you're looking for a little less magic:

* Use git to clone it: `git clone https://github.com/ynab/ynab-api-starter-kit`
* From within the folder, run `npm install`
* Then run `npm start`

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

### `src/App.vue`

In the script portion of this page, you can see how to build an OAuth URI to
obtain an access token for the API.

It also has some examples on retrieving budgets and transactions.

### `src/Transactions.vue`

This displays all the transactions when you've got them. It also has an example
of using `utils.convertMilliUnitsToCurrencyAmount` to convert the milliunits that
YNAB uses into the currency format of the budget.

## Deployment

<a href="https://heroku.com/deploy?template=https://github.com/ynab/ynab-api-starter-kit">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

### GitHub Pages
If you have a GitHub account, fork this repo. You can now modify your fork, run
`npm run build`, commit and push the code. Your app will be live on `https://[yourgithubacccount].github.io/ynab-api-starter-kit/`.
