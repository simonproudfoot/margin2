<template>
<main id="scrollTo" class="md:w-9/12 px-12 pb-24 contentArea z-10 bg-white max-w-[800px] pt-4 mt-1">
    <h1 class="text-3xl font-bold mb-6">Thank you!</h1>
    <h1 class="text-2xl">Your order was successful.</h1>
    <h1 class="text-2xl">Please check your email for confirmation</h1>
</main>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
    layout: "simple",
    data() {
        return {
            session: null,
        };
    },
    computed: {
        ...mapState("payment", ["cart"]),
    },
    created() {
        this.retriveStripeSession();
    },
    methods: {
        ...mapMutations({
            clearCart: "payment/CLEAR_CART",
            resetSession: "payment/RESET_STRIPE_SESSION",
        }),
        async retriveStripeSession() {
            console.log('retriveStripeSession')
            const session = await this.$store.dispatch(
                "payment/retriveStripeSession"
            );
            this.session = session;
            await this.createOrder();
        },
        async createOrder() {
            console.log('createOrder')
            const session = { ...this.session };
            const payment_method = session.payment_method_types[0];
            const { name, email, phone } = session.customer_details;
            const namesList = name ? name.split(" ") : ["", ""];
            const first_name = namesList[0];
            const last_name = namesList[1];
            const line_items = this.cart;
            debugger
            const {
                line1,
                line2,
                city,
                country,
                state,
                postal_code: postcode,
            } = session.customer_details.address;

            const {
                line1: shippingLine1,
                line2: shippingLine2,
                city: shippingCity,
                country: shippingCountry,
                state: shippingState,
                postal_code: shippingPostcode,
            } = session.shipping_details.address;

            const billing = {
                first_name,
                last_name,
                address_1: line1 || "",
                address_2: line2 || "",
                city,
                state: state || "",
                postcode,
                country,
                email,
                phone: phone || "",
            };
            const shipping = {
                first_name,
                last_name,
                address_1: shippingLine1 || line1 || "",
                address_2: shippingLine2 || line2 || "",
                city: shippingCity || city || "",
                state: shippingState || state || "",
                postcode: shippingPostcode || postcode || "",
                country: shippingCountry || country || "",
            };

            const data = {
                payment_method,
                payment_method_title: `${name} paid via ${payment_method}`,
                set_paid: true,
                billing,
                shipping,
                line_items,
                shipping_lines: [],
            };

            let order = JSON.parse(JSON.stringify(data));
            console.log(`invoking function URL ${process.env.netlifyFunctionsUrl}/createOrder`)
            console.log('data', order)

            await this.$axios.$post(`${process.env.netlifyFunctionsUrl}/createOrder`, order, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch(function (error) {
                console.log(error.toJSON());
            });

            this.clearCart();
            this.resetSession();
        },
    },
};
</script>
