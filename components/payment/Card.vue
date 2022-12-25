<template>
  <div id="app">
    <div v-if="cartUIStatus === 'idle'" class="payment">
      <h3>Payment details:</h3>
      <label for="email">Email</label>
      <br />
      <input
        id="email"
        type="email"
        v-model="stripeEmail"
        placeholder="name@example.com"
      />
      <small
        class="bg-red-300 text-white font-bold p-2 mt-2 w-full block"
        v-if="emailError"
        >{{ emailError }}</small
      >
      <br />
      <label for="card">Credit Card</label>
      <br />
      <card
        class="stripe-card"
        id="card"
        :class="{ complete }"
        :stripe="stripePublishKey"
        :options="stripeOptions"
        @change="complete = $event.complete"
      />
      <small
        class="bg-red-300 text-white font-bold p-2 mt-2 w-full block"
        v-if="error"
        >{{ error }}</small
      >
      <button
        class="bg-black hover: text-white font-bold py-2 px-4"
        @click="pay"
        :disabled="!complete || !stripeEmail || loading"
      >
        Pay
      </button>
    </div>

    <div v-else class="statussubmit">
      <div v-if="cartUIStatus === 'failure'">
        <h3>Oh No!</h3>
        <p>Something went wrong!</p>
        <button @click="clearCart">Please try again</button>
      </div>

      <div v-else-if="cartUIStatus === 'loading'" class="loadcontain">
        <h4>Please hold, we're filling up your cart with goodies</h4>
        <p>Placeholder loader</p>
      </div>

      <div v-else-if="cartUIStatus === 'success'" class="loadcontain">
        <h4>Success!</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { Card, handleCardPayment } from "vue-stripe-elements-plus";

import { mapState, mapMutations } from "vuex";

export default {
  components: { Card },
  computed: {
    ...mapState("payment", ["cartUIStatus", "clientSecret"]),
    stripePublishKey() {
      return process.env.stripePublishKey;
    },
  },
  mounted() {
    const { quantity } = this.$route.query;
    if (quantity>0) {
      this.$store.dispatch("payment/createPaymentIntent", quantity);
    }
  },
  data() {
    return {
      complete: false,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
        hidePostalCode: true,
      },
      stripeEmail: "",
      error: "",
      emailError: "",
      loading: false,
    };
  },
  methods: {
    ...mapMutations({
      updateCartUI: "payment/UPDATE_CART_UI",
      clearCart: "payment/CLEAR_CART",
    }),
    pay() {
      if (!this.stripeEmail) {
        this.emailError = "Email is required";
        setTimeout(() => (this.emailError = ""), 3000);
      } else {
        this.loading = true;
        handleCardPayment(this.clientSecret, {
          receipt_email: this.stripeEmail,
        }).then((result) => {
          this.loading = false;
          if (result.error) {
            this.error = result.error.message;
          } else if (
            result.paymentIntent &&
            result.paymentIntent.status === "succeeded"
          ) {
            this.updateCartUI("success");
          } else {
            this.error = "Some unknown error occured";
          }
          setTimeout(() => (this.error = ""), 3000);
        });
      }
    },
  },
};
</script>

<style scoped>
input,
button {
  width: 100%;
}

button {
  margin-top: 20px;
}

.payment {
  margin-top: 20px;
}

.stripe-card {
  margin-top: 10px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 5px 10px;
}

.stripe-card.complete {
  border-color: green;
}
</style>
