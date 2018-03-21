<template>
  <div id="app">
    <Nav />
    <div class="container">

      <!-- Display a loading message if loading -->
      <div v-if="loading">
        <h1>Loading...</h1>
      </div>

      <div v-else>

        <!-- If we dont have a token ask the user to authorize with YNAB -->
        <form v-if="!ynab.token">
          <div class="form-group">
            <p>Hello there! If you would like to use this App, please authorize with YNAB!</p>
            <button @click="authorizeWithYNAB" class="btn btn-primary">Authorize This App With YNAB</button>
          </div>
        </form>

        <!-- Otherwise if we have a token, show the budget select -->
        <Budgets v-else-if="!budgetId" :budgets="budgets" :selectBudget="selectBudget" />

        <!-- If a budget has been selected, display transactions from that budget -->
        <div v-else>
          <Transactions :transactions="transactions" />
          <button class="btn btn-info" @click="budgetId = null">&lt; Select Another Budget</button>
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
import Budgets from './components/Budgets.vue';
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
      budgetId: null,
      budgets: [],
      transactions: [],
    }
  },
  // When this component is created, check whether we need to get a token,
  // budgets or display the transactions
  created() {
    if (this.ynab.token) {
      this.api = new ynab.api(this.ynab.token);
      if (!this.budgetId) {
        this.getBudgets();
      } else {
        this.selectBudget(this.budgetId);
      }
    }
  },
  methods: {
    // This builds a URI to get an access token from YNAB
    // https://api.youneedabudget.com/#outh-applications
    authorizeWithYNAB(e) {
      e.preventDefault();
      const uri = `https://app.youneedabudget.com/oauth/authorize?client_id=${this.ynab.clientId}&redirect_uri=${this.ynab.redirectUri}&response_type=token`;
      window.open(uri);
    },
    // This uses the YNAB API to get a list of budgets
    getBudgets() {
      this.loading = true
      this.api.budgets.getBudgets().then((res) => {
        this.budgets = res.data.budgets;
      }).finally(() => {
        this.loading = false;
      });
    },
    // This selects a budget and gets all the transactions in that budget
    selectBudget(id) {
      this.loading = true;
      this.budgetId = id;
      this.transactions = []
      this.api.transactions.getTransactions(id).then((res) => {
        this.transactions = res.data.transactions;
        console.log(this.transactions)
      }).finally(() => {
        this.loading = false;
      });
    },
  },
  // Specify which components we want to make available to our templates
  components: {
    Nav,
    Footer,
    Budgets,
    Transactions
  }
}
</script>
