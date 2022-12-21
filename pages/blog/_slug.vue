<template>
<main id="scrollTo" class="md:w-9/12  px-12 pb-24 contentArea z-10 bg-white max-w-[800px]" :class="!$store.state.page.pageFeatures.featuredImage && 'pt-4 mt-1'" :style="($store.state.page.pageFeatures.featuredImage && 'margin-top:85vh')">
    <h1 v-if="!$store.state.page.pageFeatures.featuredImage" ref="header" class="pb-12 text-4xl" v-html="title"></h1>
    <div class="page-content" v-html="content"></div>
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
    async asyncData({ params, $axios, store }) {
        return getPageData({ params, $axios, store, url: `wp/v2/posts?slug=${params.slug}&_embed` })
    },

}
</script>
