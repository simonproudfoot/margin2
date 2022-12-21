<template>
<main id="scrollTo" class="md:w-9/12  px-12 pb-24 contentArea z-10 bg-white max-w-[800px]" :class="!$store.state.page.pageFeatures.featuredImage && 'pt-4 mt-1'" :style="($store.state.page.pageFeatures.featuredImage && 'margin-top:85vh')">
    <h1 v-if="!$store.state.page.pageFeatures.featuredImage" ref="header" class="pb-12 text-4xl" v-html="title"></h1>
    <div class="page-content" v-html="content"></div>
    <ContactForm :hasContactForm="hasContactForm" />
</main>
</template>

<script>
import getPageData from '@/plugins/getPageData.js';
export default {
    layout: "page",
    head() {
        if (this.$store.state.page.pageFeatures.yoast_head_json) {
            let metaArray = []
            Object.entries(this.$store.state.page.pageFeatures.yoast_head_json).map(ele => {

                if (ele[0] == 'robots') {
                    let meta = Object.values(ele[1])
                    metaArray.push({
                        name: 'robots',
                        content: meta
                    })
                } else if (ele[0] == 'og_image') {
                    let meta = Object.values(ele[1])

                    metaArray.push({
                        name: 'og_image',
                        content: meta[0].url
                    })
                } else if (ele[0] == 'og_image') {
                    let meta = Object.values(ele[1])

                    metaArray.push({
                        name: 'og_image',
                        content: meta[0].url.replace(/[^\w\s]/gi, '')
                    })
                } else if (ele[0] == 'twitter_misc') {

                } else if (ele[0] == 'schema') {
                    // SKIP FOR NOW
                } else {
                    metaArray.push({
                        [ele[0]]: ele[1].replace(/[^\w\s]/gi, '')
                    });
                }
            })
            return {
                title: this.$store.state.page.pageFeatures.title.replace(/[^\w\s]/gi, ''),
                meta: metaArray,
            }
        }
    },
    async asyncData({ params, $axios, store }) {
        return getPageData({ params, $axios, store, url: `wp/v2/posts?slug=${params.slug}&_embed` })
    },

}
</script>
