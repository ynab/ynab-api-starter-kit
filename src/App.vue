<template>
  <div id="app">
    <Nav />
    <div class="container">

      <!-- Display a loading message if loading -->
      <h1 v-if="loading" class="display-4">Loading...</h1>

      <!-- Display an error if we got one -->
      <div v-if="error">
        <h1 class="display-4">Oops!</h1>
        <p class="lead">{{error}}</p>
        <button class="btn btn-primary" @click="resetToken">Try Again &gt;</button>
      </div>

      <!-- Otherwise show our app contents -->
      <div v-else>

        <!-- If we dont have a token ask the user to authorize with YNAB -->
        <form v-if="!ynab.token">
          <h1 class="display-4">Congrats!</h1>
          <p class="lead">You have successfully initialized a new YNAB API Application!</p>
          <p>The next step is the OAuth configuration, you can
            <a href="https://github.com/ynab/ynab-api-starter-kit#step-2-obtain-an-oauth-client-id-so-the-app-can-access-the-ynab-api">read
              detailed instructions in the README.md</a>. Essentially:</p>
          <ul>
            <li>Make sure to be logged into your YNAB account, go to your <a href="https://app.ynab.com/settings/developer" target="_blank" rel="noopener noreferrer">YNAB Developer Settings</a> and create a new OAuth Application.</li>
            <li>Enter the URL of this project as a Redirect URI (in addition to the existing three options), then "Save Application."</li>
            <li>Copy your Client ID and Redirect URI into the <em>src/config.json</em> file of your project.</li>
            <li>Then build your amazing app!</li>
          </ul>
          <p>If you have any questions please reach out to us at <strong>api@ynab.com</strong>.</p>
          <p>&nbsp;</p>

          <div class="form-group">
            <h2>Hello!</h2>
            <p class="lead">If you would like to use this App, please authorize with YNAB!</p>
            <button @click="authorizeWithYNAB" class="btn btn-primary">Authorize This App With YNAB &gt;</button>
          </div>
        </form>

        <!-- Otherwise if we have a token, show the plan select -->
        <Plans v-else-if="!planId" :plans="plans" :selectPlan="selectPlan" />

        <!-- If a plan has been selected, display transactions from that plan -->
        <div v-else>
          <Transactions :transactions="transactions" />
          <button class="btn btn-info" @click="planId = null">&lt; Select Another Plan</button>
        </div>

      </div>

      <Footer />
    </div>
  </div>
</template>

<script>
// Hooray! Here comes YNAB!
import * as ynab from 'ynab';

// Import our config for YNAB
import config from './config.json';

// Import Our Components to Compose Our App
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import Plans from './components/Plans.vue';
import Transactions from './components/Transactions.vue';

export default {
  // The data to feed our templates
  data () {
    return {
      ynab: {
        clientId: config.clientId,
        redirectUri: config.redirectUri,
        token: null,
        api: null,
      },
      loading: false,
      error: null,
      planId: null,
      plans: [],
      transactions: [],
    }
  },
  // When this component is created, check whether we need to get a token,
  // plans or display the transactions
  created() {
    this.ynab.token = this.findYNABToken();
    if (this.ynab.token) {
      this.api = new ynab.api(this.ynab.token);
      if (!this.planId) {
        this.getPlans();
      } else {
        this.selectPlan(this.planId);
      }
    }
  },
  methods: {
    // This uses the YNAB API to get a list of plans
    getPlans() {
      this.loading = true;
      this.error = null;
      this.api.plans.getPlans().then((res) => {
        this.plans = res.data.plans;
      }).catch((err) => {
        this.error = err.error.detail;
      }).finally(() => {
        this.loading = false;
      });
    },
    // This selects a plan and gets all the transactions in that plan
    selectPlan(id) {
      this.loading = true;
      this.error = null;
      this.planId = id;
      this.transactions = [];
      this.api.transactions.getTransactions(id).then((res) => {
        this.transactions = res.data.transactions;
      }).catch((err) => {
        this.error = err.error.detail;
      }).finally(() => {
        this.loading = false;
      });
    },
    // This builds a URI to get an access token from YNAB
    // https://api.ynab.com/#oauth-applications
    authorizeWithYNAB(e) {
      e.preventDefault();
      const uri = `https://app.ynab.com/oauth/authorize?client_id=${this.ynab.clientId}&redirect_uri=${this.ynab.redirectUri}&response_type=token`;
      location.replace(uri);
    },
    // Method to find a YNAB token
    // First it looks in the location.hash and then sessionStorage
    findYNABToken() {
      let token = null;
      const search = window.location.hash.substring(1).replace(/&/g, '","').replace(/=/g,'":"');
      if (search && search !== '') {
        // Try to get access_token from the hash returned by OAuth
        const params = JSON.parse('{"' + search + '"}', function(key, value) {
          return key === '' ? value : decodeURIComponent(value);
        });
        token = params.access_token;
        sessionStorage.setItem('ynab_access_token', token);
        window.location.hash = '';
      } else {
        // Otherwise try sessionStorage
        token = sessionStorage.getItem('ynab_access_token');
      }
      return token;
    },
    // Clear the token and start authorization over
    resetToken() {
      sessionStorage.removeItem('ynab_access_token');
      this.ynab.token = null;
      this.error = null;
    }
  },
  // Specify which components we want to make available to our templates
  components: {
    Nav,
    Footer,
    Plans,
    Transactions
  }
}
</script>
