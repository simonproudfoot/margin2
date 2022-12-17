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
            <h2 class="text-4xl font-bold mb-2" v-html="item.name"></h2>
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

    async asyncData({ params, $axios, store }) {
        try {
            const response = await $axios.get('https://remarkable-arithmetic-20e4c5.netlify.app/.netlify/functions/wooProducts');
            const products = response.data

            const post = await $axios.get(
                `wp/v2/pages?slug=shop&_embed`
            );

            let title = post.data[0].title.rendered
                .replace(/–/g, '-')
                .replace(/“/g, '"')
                .replace(/”/g, '"')
                .replace(/’/g, "'");

            function removeTags(str) {
                if ((str === null) || (str === ''))
                    return false;
                else
                    str = str.toString();
                return str.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/ig, '');
            }
            let excerpt = removeTags(post.data[0].excerpt.rendered);

            let feauredVideo = post.data[0].acf.header_video ? post.data[0].acf.header_video : ''
            let featuredImage = post.data[0].featured_media ? post.data[0]['_embedded']['wp:featuredmedia'][0].media_details.sizes.full.source_url : ''

            const dark = post.data[0].acf.dark_background ? true : false
            const pageData = { post: post.data[0], title: title, content: post.data[0].content.rendered, excerpt: excerpt, slug: params.slug, hasContactForm: post.data[0].acf.page_has_contact_form }
            store.commit('page/SET_FEATURED', { title: title, featuredImage: featuredImage, darkMode: dark, featured_video: feauredVideo })

            return {
                products,
                pageData
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
