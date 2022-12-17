<template>
<div class="md:w-9/12 px-12 pb-24 contentArea z-10 bg-white max-w-[800px]">
    <div v-for="item in products" :key="item.id" class="flex flex-col md:flex-row justify-between items-center">
        <div class="">
            <div>
                <img v-for="(img, i) in item.images" :key="img.id" class="w-full h-full object-cover" :src="img.src" :class="showImg == i  ?'block' : 'hidden'" :alt="img.alt">
            </div>
            <div class="flex justify-center">
                <img class="h-16 mx-2 border cursor-pointer" @click="showImg = i" v-for="(img, i) in item.images" :key="img.id" :src="img.src" :class="showImg == i  ?'' : 'opacity-60'" :alt="img.alt">
            </div>
        </div>
        <div class="w-full md:w-2/3 p-4">
            <h2 class="text-4xl font-bold mb-2" v-html="item.name"></h2>{{quantity}}
            <p class="text-xl mb-0 font-bold" v-if="!item.on_sale">£{{item.price}}</p>
            <p v-else class="text-red mb-0">SALE £{{item.sale_price}}</p>
            <p>Shipping included</p>
            <p class="text-gray-700 leading-relaxed mb-4" v-html="item.description"></p>

            <div class="flex">
                <div class="flex mr-4">
                    <button class="bg-black hover: text-white font-bold py-2 px-4" @click="setQuantity(false, false)">-</button>
                    <input class="w-16 border p-4" type="number" v-model="quantity">
                    <button class="bg-black hover: text-white font-bold py-2 px-4" @click="setQuantity(true, item.stock_quantity)">+</button>
                </div>

                <button v-if="item.in_stock" class="bg-black hover: text-white font-bold py-2 px-4">Buy Now</button>
                <button v-else class="bg-black hover: text-white font-bold py-2 px-4">CURRENTLY NOT IN STOCK</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout: 'page',
    data() {
        return {
            products: [],
            showImg: 0,
            quantity: 0,
        };
    },
    methods: {
        setQuantity(plus, inStock) {
            if (plus) {
                if (this.quantity < inStock) {
                    this.quantity++
                }
            } else {
                if (this.quantity > 1) {
                    this.quantity--
                }
            }
        }
    },
    async asyncData({ $axios }) {
        try {
            const response = await $axios.get('https://remarkable-arithmetic-20e4c5.netlify.app/.netlify/functions/wooProducts');
            const products = response.data
            return {
                products
            };
        } catch (error) {
            console.log(error)
        }
    }
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
input[type=number] {
    -moz-appearance: textfield;
}
</style>
