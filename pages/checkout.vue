<template>
<main class="w-full px-12 pa-24 contentArea z-10 bg-white max-w-[800px] pt-4 mt-1">
    <div class="flex justify-center items-center">
        <span class="w-full md:w-2/3 p-4 order-2 md:order-1">
            <h1 class="center">Checkout</h1>
            <section v-if="cartUIStatus === 'idle'">
                <cart-display />
            </section>
            <section v-else-if="cartUIStatus === 'loading'" class="loader">
                <loader />
            </section>
            <section v-else-if="cartUIStatus === 'success'" class="success">
                <h2>Success!</h2>
                <p>
                    Thank you for your purchase.
                </p>
                <button class="pay-with-stripe">
                    <nuxt-link exact to="/">Back to Home</nuxt-link>
                </button>
            </section>
            <section v-else-if="cartUIStatus === 'failure'">
                <p>
                    Oops, something went wrong.
                </p>
            </section>
            <section v-if="cartUIStatus=='success' || cartUIStatus==='failure'">
                <button class="pay-with-stripe">
                    <nuxt-link exact to="/">Back to Home</nuxt-link>
                </button>
            </section>
        </span>
    </div>
</main>
</template>
<script>
import Loader from "~/components/payment/Loader.vue";
import CartDisplay from "~/components/payment/CartDisplay.vue";
import { mapState } from "vuex";
export default {
    layout: "simple",
    components: {
        CartDisplay,
        Loader,
    },
    // watch:{
    //   cartUIStatus(val){
    //   }
    // },
    computed: {
        ...mapState("payment", ["cartUIStatus"]),
    },
};
</script>
<style scoped>
.loader {
    display: flex;
    justify-content: center;
}
.success {
    text-align: center;
}
</style>
