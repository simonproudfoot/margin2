<template>
<client-only>
    <main id="scrollTo" class="md:w-9/12 px-12 pb-24 contentArea z-10 bg-white max-w-[800px] pt-4 mt-1">
        <div v-for="item in products" :key="item.id" class="flex flex-col md:flex-row justify-between items-center">
            <div class="w-full md:w-2/3 p-4 order-2 md:order-1">
                <h2 class="text-4xl font-bold mb-2" v-html="item.name"></h2>
                <p class="text-xl mb-0 font-bold" v-if="!item.on_sale">
                    £{{ item.price }}
                </p>
                <p v-else class="text-red mb-0">SALE £{{ item.sale_price }}</p>
                <p>Shipping included</p>
                <p class="text-gray-700 leading-relaxed mb-4" v-html="item.description"></p>
                <div class="flex">
                    <div class="flex mr-4">
                        <button class="bg-black hover: text-white font-bold py-2 px-4" @click="setQuantity(false, false)">
                            -
                        </button>
                        <input class="w-16 border p-4" type="number" v-model="quantity" />
                        <button class="bg-black hover: text-white font-bold py-2 px-4" @click="setQuantity(true, item.stock_quantity)">
                            +
                        </button>
                    </div>
                    <stripe-checkout ref="checkoutRef" :pk="stripePublishKey" :session-id="sessionData.id" @loading="(v) => (loading = v)" />
                    <button :disabled="loadingStripePage" v-if="item.in_stock" class="bg-black hover: text-white font-bold py-2 px-4" :class="loadingStripePage && 'opacity-90'" @click="goToCheckout(item)">
                        <svg v-if="loadingStripePage" fill="#fff" class="w-4 h-4 animate-spin mx-6" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z" />
                        </svg>
                        <span v-else>Buy Now</span>

                    </button>
                    <button v-else class="bg-black hover: text-white font-bold py-2 px-4">
                        CURRENTLY NOT IN STOCK
                    </button>
                </div>
            </div>
            <div class="order-1 md:order-2">
                <div>
                    <img v-for="(img, i) in item.images" :key="img.id" class="w-full h-full object-cover" :src="img.src" :class="showImg == i ? 'block' : 'hidden'" :alt="img.alt" />
                </div>
                <div class="flex justify-center">
                    <img class="h-16 mx-2 border cursor-pointer" @click="showImg = i" v-for="(img, i) in item.images" :key="img.id" :src="img.src" :class="showImg == i ? '' : 'opacity-60'" :alt="img.alt" />
                </div>
            </div>
        </div>
    </main>
</client-only>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
    layout: "simple",
    data() {
        return {
            loadingStripePage: false,
            products: [],
            showImg: 0,
            quantity: 1,
            loading: false,
        };
    },
    computed: {
        ...mapState("payment", ["sessionData"]),
        stripePublishKey() {
            return process.env.stripePublishKey;
        },
    },
    methods: {
        ...mapMutations({
            addToCart: "payment/ADD_TO_CART",
        }),
        setQuantity(plus, inStock) {
            if (plus && this.quantity < inStock) {
                this.quantity++;
            } else if (this.quantity > 1) {
                this.quantity--;
            }
        },
        async goToCheckout(item) {
            if (this.quantity > 0) {
                this.loadingStripePage = true
                let amount = Number(item.price) * 100;
                const myDomain = window.location;
                const data = {
                    success_url: `${myDomain}/payment-success`,
                    cancel_url: `${myDomain}`,
                    line_items: [{
                        price_data: {
                            currency: "gbp",
                            unit_amount: amount,
                            product_data: {
                                name: item.name,
                                images: item.images.map((res) => res.src),
                            },
                        },
                        quantity: this.quantity,
                    }, ],
                    mode: "payment",
                    billing_address_collection: "required",
                    shipping_address_collection: { allowed_countries: ['GB'] }
                };

                try {
                    await this.$store.dispatch("payment/createStripeSession", data);
                    this.addToCart({ product_id: item.id, quantity: this.quantity });
                    let checkoutRef = this.$refs.checkoutRef[0];
                    checkoutRef.redirectToCheckout();

                } catch (error) {
                    console.log(error);
                }
            }
        },
    },

    async asyncData({ $axios }) {
        try {
            const response = await $axios.get(
                `${process.env.netlifyFunctionsUrl}/wooProducts`
            );
            const products = await response.data;
            return {
                products,
            };
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
