<template>
  <!-- <StripeElements
    v-if="stripeReady"
    :stripe-key="stripePublishKey"
    #default="{ elements }"
    ref="elms"
  >
    <StripeElement
      type="payment"
      :elements="elements"
      :options="requestButtonOptions"
      ref="requestButton"
    />
  </StripeElements> -->
  <div id="payment-request-button" ref="prb">
    <!-- A Stripe Element will be inserted here. -->
  </div>
</template>

<script>
// this example assumes you installed `@stripe/stripe-js`
import { loadStripe } from "@stripe/stripe-js";
import { StripeElements, StripeElement } from "vue-stripe-elements-plus";

export default {
  name: "PaymentRequestButton",
  components: {
    StripeElements,
    StripeElement,
  },
  data() {
    return {
      stripeReady: false,
      requestButtonOptions: {
        clientSecret: process.env.stripeSecretKey,
      },
    };
  },
  computed: {
    stripePublishKey() {
      return process.env.stripePublishKey;
    },
  },
  async beforeMount() {
    const stripePromise = await loadStripe(this.stripePublishKey, {
      apiVersion: "2022-08-01",
      stripeAccount: process.env.stripeAccount,
    });
    debugger;
    const paymentRequest = stripePromise.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Demo total",
        amount: 1099,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });
    const elements = stripePromise.elements();
    const prButton = elements.create("paymentRequestButton", {
      paymentRequest,
    });

    (async () => {
      // Check the availability of the Payment Request API first.
      const result = await paymentRequest.canMakePayment();
      debugger;
      if (result) {
        prButton.mount("#payment-request-button");
      } else {
        document.getElementById("payment-request-button").style.display =
          "none";
      }
    })();

    // stripePromise.then((stripeInstance) => {
    //   // create payment request
    //   const paymentRequest = stripeInstance.paymentRequest({
    //     country: "US",
    //     currency: "usd",
    //     total: {
    //       label: "Demo total",
    //       amount: 1099,
    //     },
    //     requestPayerName: true,
    //     requestPayerEmail: true,
    //   });
    //   debugger;
    //   // mandatory check
    //   paymentRequest.canMakePayment().then((canMakePayment) => {
    //     debugger;
    //     if (canMakePayment) {
    //       // it will trigger StripeElements mount
    //       this.stripeReady = true;
    //       this.requestButtonOptions = { paymentRequest };
    //     }
    //   });
    // });
  },
};
</script>
