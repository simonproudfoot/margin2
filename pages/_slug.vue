<template>
<main id="scrollTo" :style="`margin-top:${marginTop}`" class="md:w-9/12  px-12 pb-24 contentArea z-10 bg-white max-w-[800px]" :class="$store.state.page.pageFeatures.featuredImage == null ? 'pt-4 mt-1' : ''">
    <h1 v-if="$store.state.page.pageFeatures.featuredImage == null" ref="header" class="pb-12 text-4xl font-bold" v-html="title"></h1>
    <div class="page-content" v-html="content"></div>
    <videoList v-if="$store.state.page.pageFeatures.featured_video" />
    <ContactForm v-if="$route.params.slug == 'contact'" />
</main>
</template>

<script>
import getPageData from '@/plugins/getPageData.js';
import headMeta from '@/plugins/headMeta.js';
export default {
    layout: "page",
    head() {
        if (this.$store.state.page.pageFeatures.yoast_head_json) {
            const metaData = headMeta(this.$store.state.page.pageFeatures.yoast_head_json)
            return {
                title: this.$store.state.page.pageFeatures.title,
                meta: metaData
            }
        }
    },
    computed: {
        marginTop() {
            if (process.client) {
                const nav = document.getElementById('topNav')
                if(nav){
                const h = nav.clientHeight + 'px'
                return this.$store.state.page.pageFeatures.featuredImage ? `calc(100vh - ${h})` : '0'
                {}
            }else{
                return 0
            }
        }
    },
    created() {
        this.$store.commit('nav/CLOSE_MENU')
        if (process.client) {
            const bodyClass = document.querySelector('body').classList
            bodyClass.remove('overflow-hidden')
            console.log('body', bodyClass)
        }
    },
    async asyncData({ params, $axios, store }) {
        return getPageData({ params, $axios, store, url: `wp/v2/pages?slug=${params.slug}&_embed` })
    },

}
</script>
