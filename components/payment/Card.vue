<template>
  <div id="app">
    <div v-if="cartUIStatus === 'idle'" class="payment">
      <div class="lg:flex gap-3 pb-2 mb-4 border-b">
        <div class="lg:w-1/2">
          <input
            v-model="user.shipping.first_name"
            type="text"
            class="border p-2 mb-2"
            placeholder="First name"
          />
          <input
            v-model="user.shipping.last_name"
            type="text"
            class="border p-2 mb-2"
            placeholder="Last name"
          />
        </div>
      </div>
      <div class="lg:flex gap-3 pb-2 mb-4 border-b">
        <div class="lg:w-1/2">
          <input
            v-model="user.shipping.address_1"
            type="text"
            class="border p-2 mb-2"
            placeholder="Address line 1"
          />
          <input
            v-model="user.shipping.address_2"
            type="text"
            class="border p-2 mb-2"
            placeholder="Address line 2"
          />
          <input
            v-model="user.shipping.city"
            type="text"
            class="border p-2 mb-2"
            placeholder="City"
          />
          <input
            v-model="user.shipping.county"
            type="text"
            class="border p-2 mb-2"
            placeholder="County (Optional)"
          />
        </div>
        <div class="lg:w-1/2">
          <input
            v-model="user.shipping.postcode"
            type="text"
            class="border p-2 mb-2"
            placeholder="Postcode"
          />
          <input
            v-model="user.billing.phone"
            type="tel"
            class="border p-2 mb-2"
            placeholder="Telephone number"
          />
          <input
            id="email"
            type="email"
            v-model="stripeEmail"
            class="border p-2 mb-2"
            placeholder="Email address"
          />
          <small
            class="bg-red-300 text-white font-bold p-2 mt-2 w-full block"
            v-if="emailError"
            >{{ emailError }}</small
          >
        </div>
      </div>
      <div class="w-full mb-6">
        <card
          class="stripe-card border p-2 mb-2"
          id="card"
          :class="{ complete }"
          :stripe="stripePublishKey"
          :options="stripeOptions"
          @change="complete = $event.complete"
        />
        <payment-request-button />
        <small
          class="bg-red-300 text-white font-bold p-2 mt-2 w-full block"
          v-if="error"
          >{{ error }}</small
        >
      </div>
      <div class="mb-12">
        <button
          :class="!validate && 'opacity-60'"
          class="bg-black font-bold text-white p-2"
          @click="pay"
          :disabled="!complete || !validate || loading"
        >
          Pay
        </button>
      </div>
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
import PaymentRequestButton from "./PaymentRequestButton";
import { mapState, mapMutations } from "vuex";
export default {
  components: { Card, PaymentRequestButton },
  computed: {
    ...mapState("payment", ["cartUIStatus", "clientSecret", "cart"]),
    stripePublishKey() {
      return process.env.stripePublishKey;
    },
    validate() {
      return !this.user.shipping.first_name ||
        !this.user.shipping.last_name ||
        !this.user.shipping.address_1 ||
        !this.user.shipping.city ||
        !this.user.shipping.postcode ||
        !this.user.shipping.city ||
        !this.complete
        ? false
        : true;
    },
  },
  mounted() {
    const { item, quantity } = this.$route.query;
    if (quantity > 0) {
      this.$store.dispatch("payment/createPaymentIntent", quantity);
    }

    this.user.line_items[0].product_id = item;
    this.user.line_items[0].quantity = quantity;
  },
  data() {
    return {
      user: {
        payment_method: "",
        payment_method_title: "Direct Bank Transfer",
        set_paid: false,
        billing: {
          first_name: "",
          last_name: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "UK",
          email: "",
          phone: "",
        },
        shipping: {
          first_name: "",
          last_name: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
        },
        line_items: [
          {
            product_id: 93,
            quantity: 2,
          },
        ],
      },
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
    markPaid() {
      this.organiseVals();
      this.$axios.post(
        `${process.env.netlifyFunctionsUrl}/createOrder`,
        this.user
      );
      this.updateCartUI("success");
    },
    organiseVals() {
      this.user.set_paid = true;
      this.user.billing.email = this.stripeEmail;
    },

    pay() {
      if (!this.stripeEmail) {
        this.emailError = "Email is required";
        setTimeout(() => (this.emailError = ""), 3000);
      } else {
        this.loading = true;
        handleCardPayment(this.clientSecret, {
          receipt_email: this.stripeEmail,
        })
          .then((result) => {
            this.loading = false;
            if (result.error) {
              this.error = result.error.message;
            } else if (
              result.paymentIntent &&
              result.paymentIntent.status === "succeeded"
            ) {
              this.markPaid(result);
            } else {
              this.error = "Some unknown error occured";
            }
            setTimeout(() => (this.error = ""), 3000);
          })
          .then((result) => {
            //
            console.log("FINAL RESONSE", result);
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

.stripe-card.complete {
  border-color: green;
}
</style>
