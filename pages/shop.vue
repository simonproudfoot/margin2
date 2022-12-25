<template>
  <main
    id="scrollTo"
    class="md:w-9/12 px-12 pb-24 contentArea z-10 bg-white max-w-[800px] pt-4 mt-1"
  >
    <div
      v-for="item in products"
      :key="item.id"
      class="flex flex-col md:flex-row justify-between items-center"
    >
      <div class="w-full md:w-2/3 p-4 order-2 md:order-1">
        <h2 class="text-4xl font-bold mb-2" v-html="item.name"></h2>
        <p class="text-xl mb-0 font-bold" v-if="!item.on_sale">
          £{{ item.price }}
        </p>
        <p v-else class="text-red mb-0">SALE £{{ item.sale_price }}</p>
        <p>Shipping included</p>
        <p
          class="text-gray-700 leading-relaxed mb-4"
          v-html="item.description"
        ></p>
        <div class="flex">
          <div class="flex mr-4">
            <button
              class="bg-black hover: text-white font-bold py-2 px-4"
              @click="setQuantity(false, false)"
            >
              -
            </button>
            <input class="w-16 border p-4" type="number" v-model="quantity" />
            <button
              class="bg-black hover: text-white font-bold py-2 px-4"
              @click="setQuantity(true, item.stock_quantity)"
            >
              +
            </button>
          </div>
          <button
            v-if="item.in_stock"
            class="bg-black hover: text-white font-bold py-2 px-4"
            @click="goToCheckout(item)"
          >
            Buy Now
          </button>
          <button v-else class="bg-black hover: text-white font-bold py-2 px-4">
            CURRENTLY NOT IN STOCK
          </button>
        </div>
      </div>
      <div class="order-1 md:order-2">
        <div>
          <img
            v-for="(img, i) in item.images"
            :key="img.id"
            class="w-full h-full object-cover"
            :src="img.src"
            :class="showImg == i ? 'block' : 'hidden'"
            :alt="img.alt"
          />
        </div>
        <div class="flex justify-center">
          <img
            class="h-16 mx-2 border cursor-pointer"
            @click="showImg = i"
            v-for="(img, i) in item.images"
            :key="img.id"
            :src="img.src"
            :class="showImg == i ? '' : 'opacity-60'"
            :alt="img.alt"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  layout: "simple",
  data() {
    return {
      products: [],
      showImg: 0,
      quantity: 0,
    };
  },
  mounted(){
    this.clearCart()
  },
  methods: {
    ...mapMutations({
      addToCart:"payment/ADD_TO_CART",
      clearCart:"payment/CLEAR_CART"
    }),
    setQuantity(plus, inStock) {
      if (plus && this.quantity < inStock) {
          this.quantity++;
      } else if (this.quantity > 1) {
        this.quantity--;
      }
    },
    goToCheckout(item){
      if(this.quantity > 0){
        this.addToCart(item)
        this.$router.push(`/checkout?item=${item.id}&quantity=${this.quantity}`)
      }
    }
  },

  async asyncData({ params, $axios, store }) {
    try {
      const response = await $axios.get(
        `${process.env.netlifyFunctionsUrl}/wooProducts`
      );
      const products = await response.data;
      return {
        products,
        // pageData
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
