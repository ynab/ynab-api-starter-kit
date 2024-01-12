# YNAB API Starter Kit

Do you want to build a web app with the [YNAB API](https://api.ynab.com/), but are not sure how to get started?

Try this YNAB API Starter Kit!

Without **any** prior knowledge, it allows you to build:

- a web app that uses JavaScript and the [Vue.js](https://vuejs.org/) framework for its frontend,
- makes requests to the YNAB API through OAuth,
- and is entirely compiled on GitHub, and hosted on GitHub Pages!

[![Works with YNAB](./public/works_with_ynab.svg)](https://api.ynab.com/)

## Live Demo

The starter project invites a user to authorize YNAB to share information with the project, provides a choice of budget, then displays all the transactions. It's probably not very useful, but it demonstrates several key features involved in building a YNAB web app.

View a [live demo](https://ynab.github.io/ynab-api-starter-kit/) of what this project will start off looking like or take a look below.

![Screen recording on 2018-03-28 at 12:37:23](https://user-images.githubusercontent.com/759811/38046244-c9806f0a-3284-11e8-8788-509912ec79c2.gif)

## Getting Started—Entirely Without Leaving Your Browser!

This method does not require installing anything on your computer, and does not require any prior knowledge. It will allow you to launch a copy of this project in less than 5 minutes, that you can start modifying and learning from. (_Later, you can also edit and work on this project on your computer, of course._)

### Step 1: Create your own copy of the project

1. [Sign-up for a GitHub account](https://github.com/signup), if you don't already have one.

2. Click [here](https://github.com/ynab/ynab-api-starter-kit/generate) to generate a repository from this template (you can read GitHub's documentation on what it means to [create a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template)).

**NOTE:** In the following steps, we will assume the GitHub account you created has username `your-github-username` and that you have called your project `your-new-ynab-project`, but change these accordingly when following instructions.

### Step 2: Obtain an OAuth Client ID so the app can access the YNAB API

OAuth is the framework through which YNAB can share access to a user's data safely, without requiring that user share their credentials.

Every YNAB app requires their own OAuth Application credentials.

1. You will need a YNAB account, and [to be logged in](https://app.ynab.com/users/authentication).

2. Go to the [YNAB Developer Settings](https://app.ynab.com/settings/developer)
   and click [New Application](https://app.ynab.com/oauth/applications/new).

3. The name, description, website URL and privacy policy URL are all information that will be provided to users for them to determine whether to trust your app (or not!); but these will not affect the operation of your app.

   The _Redirect URI(s)_ parameter is important, as it controls where the user data can be sent. It is important to add a URL to the app, in this case:

   ```
   https://<your-github-username>.github.io/<your-new-ynab-project>/
   ```

4. Check that you acknowledge the terms of service (after reading them!), and click "Save Application."

   You'll see your Client ID, Client Secret and Redirect URI(s) (you can [read more about these concepts in YNAB's documentation](https://api.ynab.com/#outh-applications)). For this project, we will be using the _Implicit Grant Flow_ and will only need the Client ID.

5. Copy and paste the Client ID and URL to your app into the `src/config.json` file of the repository (you can edit them on GitHub directly):

   ```json
   {
     "clientId": "<your client ID>",
     "redirectUri": "https://your-github-username.github.io/your-new-ynab-project/"
   }
   ```

**NOTE:** At this point, your app will only be able to access the YNAB API in [Restricted Mode](https://api.ynab.com/#oauth-restricted-mode): This means you can access it an unlimited number of times, but other users will only be able to authenticate a combined total of 25 times, before you will need to write api@ynab.com to reset your quota or get your app officially approved.

### Step 3: Wait for GitHub Actions to deploy app to GitHub Pages

When committing the change to `src/config.json` to your repository, a new compilation cycle is triggered through GitHub Actions. Typically, this should take about 2-3 minutes, afterwhich your project can be accessible from:

```
https://your-github-username.github.io/your-new-ynab-project/
```

You can also read more about how to see [the output of GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#viewing-the-activity-for-a-workflow-run).

> If you get the error: Action failed with "not found deploy key or tokens" you will need to enabled read and write permissions for the github workflow. In your repository, go to Settings > Actions > General. Then scroll down to Workflow permissions. Select Read and write permissions then click Save.

> If you get a 404 after deploying, you may need to configure GitHub Pages. Go into your repository Settings, then Pages, then under "Build and deployment" select "Deploy from a branch", then select the "gh-pages" branch and root folder, finally click Save.

## Code Architecture of the App

Now that you have a sandbox to explore the YNAB API, you will want to check out the [YNAB API Documentation](https://api.ynab.com/) for more information on what can be done.

Also, although this project happens to use the [Vue.js](https://vuejs.org/) front-end framework, it is not required. Feel free to use whatever framework or libraries you prefer (popular alternatives to Vue.js include React and Angular).

### [`src/App.vue`](https://github.com/ynab/ynab-api-starter-kit/blob/gh-pages/src/App.vue)

In the script portion of this page, you can see how to build an OAuth URI to obtain an access token for the API.

It also has some examples on retrieving budgets and transactions.

### [`src/Transactions.vue`](https://github.com/ynab/ynab-api-starter-kit/blob/gh-pages/src/components/Transactions.vue)

This displays all the transactions when you've got them. It also has an example of using `utils.convertMilliUnitsToCurrencyAmount` to convert the milliunits that YNAB uses into the currency format of the budget.

## Local Development

In order to modify and run/test this app locally, you will need to have:

- the `git` version control tool (read [installation instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git));
- the most recent LTS (Long Term Support) version of Node.js, which will install the `npm` command (read [installation instructions](https://nodejs.org/en/download/)).

To create a local copy of this project, you must clone your repository:

```bash
$ git clone https://github.com/your-github-username/your-new-ynab-project/
```

Once that copy is created, you must install the necessary modules locally:

```bash
$ cd your-new-ynab-project
$ npm install
```

Now you have properly set up a local environment to work on your project.

### Launch a local preview with `npm start`

Once your environment is configured, `npm start` will run the development server (defaults to `localhost:8080`) and watches for changes. Any modification to the source code will be updated immediately.

This is useful to make a number of changes and preview them before committing the changes to the repository..

### Build with `npm run build`

This command builds the production assets for deployment. This will build to `dist/build.js` which the `public/index.html` will load.

It is not really a command that will be useful for beginners, but it is the command that GitHub runs every time a change is made.

## Alternative Methods

The above method is the recommend method, because it keeps all the elements of your app in a repository, so you are not burdened by having a development environment on your computer.

However there are more traditional methods of proceeding.

### Cloning/forking the repository

If you do not want to make your own app, just want to preview this one:

1. Use `git` to clone this repository: `git clone https://github.com/ynab/ynab-api-starter-kit`
2. From within the folder, run `npm install`
3. Then run `npm start` to launch the local server.

### Calling our `create-app` from scratch

If you are an experienced developer, and just want to use this starter code for convenience, you may want to use our quick starter:

1. Install [Node.js](https://nodejs.org/).
2. In your terminal, run `npx ynab-api-starter-kit my-new-ynab-project`

This will:

- Create a copy of this project on your computer.
- Install all the dependencies.
- Start up the server ready for development.

## Bonus: Using a Custom Domain Name

Through this tutorial, we have been serving the app through GitHub Pages at the following URL:

```
https://your-github-username.github.io/your-new-ynab-project/
```

However, it is very easy to serve this app from its own custom domain name. Although this is beyond the scope of this tutorial, the steps involve:

1. Register a domain name, if you don't already have one (for instance with [NameCheap](https://www.namecheap.com)), we will assume it is `my-ynab-app.com`.

2. Configure the DNS of the domain name to point towards GitHub's servers, [as described in GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).

3. In your repository, edit the file `.github/workflows/gh-deploy.yaml` to change both occurrences of this commented out lines:

   ```yaml
   # cname: mycustomdomain.com
   ```

   into:

   ```yaml
   cname: my-ynab-app.com
   ```

4. Edit the file `src/config.json` to likewise edit the Redirect URL to the domain name. (If you forget this step, your app will not redirect users to the right place after authorizing connection to YNAB.)

5. Go to the [YNAB Developer Settings](https://app.ynab.com/settings/developer), as you need to add the new Redirect URL that uses your custom domain. (If you forget this step, YNAB will not allow the redirection to your app to proceed, and will produce an error message.)

## License

Copyright (c) 2019 You Need A Budget, LLC.

Copyright (c) 2022 Jérémie Lumbroso.

Licensed under the Apache-2.0 license.

```

```
