<template>
<client-only>
    <div>
        <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems" :success-url="successURL" :cancel-url="cancelURL" @loading="v => loading = v" />
        <button @click="submit">Pay now!</button>
    </div>
</client-only>
</template>

  
  
<script>
export default {

    data() {
        this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
        return {
            loading: false,
            lineItems: [{
                price: 'some-price-id', // The id of the one-time price you created in your Stripe dashboard
                quantity: 1,
            }, ],
            successURL: 'your-success-url',
            cancelURL: 'your-cancel-url',
        };
    },
    methods: {
        submit() {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
    },
};
</script>
