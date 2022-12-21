<template>
<div class="relative bg-black">
    <ageCheck v-on:cookieUpdated="cookieUpdated" />
    <div v-show="imageLoaded" class="h-screen w-full overflow-hidden  relative top-0 bottom-0">
        <div class=" h-screen w-full  bg-black justify-items-stretch  ">
            <TopNav class="absolute top-0 bg-transparent" v-if="imageLoaded  && cookieGo" :frontpage="true" />
            <sideNav class="absolute top-0 left" v-if="imageLoaded && cookieGo" :frontpage="true" />
            <wpImage v-on:imageLoaded="$route.name == 'index' ? imageLoaded=true : null" v-if="$store.state.page.pageFeatures.featuredImage" :classList="'backImage absolute top-0 left-0 w-full h-screen object-cover opacity-0 contentArea'" />
            <div class="absolute flex right-0 top-1/3 z-10 font-body text-center md:text-left w-full md:w-1/2 ">
                <div class="mx-auto  w-fit block md:pl-12">
                    <h1 class="intro-text font-bold text-5xl text-white">The Perfect</h1>
                    <h1 class="intro-text font-bold text-5xl mb-6 text-white self-center m">Sipping Gin... </h1>
                    <nuxt-link to="/shop" class="cta py-2 px-6 mt-12 border-white text-xl mx-2 block w-1/2 mx-auto bg-white md:hidden z-30">SHOP</nuxt-link>
                </div>
            </div>
        </div>
    </div>
    <footerNav v-show="imageLoaded" />
</div>
</template>

<script>
import getCookie from '@/plugins/getCookie.js';
import getPageData from '@/plugins/getPageData.js';
import headMeta from '@/plugins/headMeta.js';
export default {
    layout: "frontpage",
    head() {
        if (this.$store.state.page.pageFeatures.yoast_head_json) {
            const metaData = headMeta(this.$store.state.page.pageFeatures.yoast_head_json)
            return {
                title: this.$store.state.page.pageFeatures.title,
                meta: metaData
            }
        }
    },
    async asyncData({ params, $axios, store }) {
        return getPageData({ params, $axios, store, url: "wp/v2/pages?slug=home&_embed" })
    },
    data: () => {
        return {
            imageLoaded: false,
            cookieGo: false
        }
    },
    watch: {
        imageLoaded(val) {
            if (val && getCookie('ageCheck') == 'true') {
                this.runAnimation()
                this.cookieGo = true
            }
        }
    },
    methods: {
        runAnimation() {
            if (process.client) {
                const isMobile = window.innerWidth < 768 ? true : false
                let body = document.querySelector('body');
                this.$gsap.set('.backImage', { scale: 1.2 })
                this.$gsap.to('.backImage', { autoAlpha: isMobile ? 0.3 : 1, duration: 2, scale: 1 }).then(() => {})
                this.$gsap.from('.intro-text, .cta', { y: 50, autoAlpha: 0, delay: 1, stagger: 0.4, duration: 1 })
            }
        },
        cookieUpdated() {
            this.runAnimation()
            this.cookieGo = true
        },
    },
}
</script>
