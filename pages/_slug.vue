<template>
<main id="scrollTo" v-if="pageData" class="md:w-9/12  px-12 pb-24 contentArea z-10 bg-white max-w-[800px]" :class="$store.state.page.pageFeatures.featuredImage == null ? 'pt-4 mt-1' : 'contentMargin'">
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

<style>
.contentMargin {
    margin-top: 100vh;
}

@media (min-width: 768px) {
    .contentMargin {
        margin-top: 80vh;
    }
}
</style>
