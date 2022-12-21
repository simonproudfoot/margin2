<template>
<div class="relative bg-black">
    <AgeCheck v-on:cookieUpdated="cookieUpdated" />
    <div v-show="imageLoaded" class="h-screen w-full overflow-hidden  relative top-0 bottom-0">
        <div class=" h-screen w-full  bg-black justify-items-stretch  ">
            <TopNav class="absolute top-0 bg-transparent" v-if="imageLoaded  && cookieGo" :frontpage="true" />
            <sideNav class="absolute top-0 left" v-if="imageLoaded && cookieGo" :frontpage="true" />
            <img @load="imageLoaded = true" v-if="$store.state.page.pageFeatures.featuredImage" :src="$store.state.page.pageFeatures.featuredImage" alt="banner image" class="backImage absolute top-0 left-0 w-full h-screen object-cover opacity-0 contentArea" />
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
export default {
    layout: "frontpage",
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
                    console.log(meta)
                    metaArray.push({
                        name: 'og_image',
                        content: meta[0].url
                    })
                } else if (ele[0] == 'og_image') {
                    let meta = Object.values(ele[1])
                    console.log(meta)
                    metaArray.push({
                        name: 'og_image',
                        content: meta[0].url.replace(/[^\w\s]/gi, '')
                    })
                } else if (ele[0] == 'twitter_misc') {
                    console.log(ele)

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
        const post = await $axios.get(
            `wp/v2/pages?slug=home&_embed`
        );
        let title = post.data[0].title.rendered
            .replace(/–/g, '-')
            .replace(/“/g, '"')
            .replace(/”/g, '"')
            .replace(/’/g, "'")
            .replace(/[^\w\s]/gi, '');

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
        const pageData = { post: post.data[0], title: title, content: post.data[0].content.rendered, excerpt: excerpt, slug: params.slug, hasContactForm: post.data[0].acf.page_has_contact_form, }
        store.commit('page/SET_FEATURED', { title: title, featuredImage: featuredImage, darkMode: dark, featured_video: feauredVideo, yoast_head_json: post.data[0].yoast_head_json })
        return pageData
    },
    data: () => {
        return {
            imageLoaded: false,
            cookieGo: false
        }
    },

    watch: {
        $route() {
            this.$store.state.nav.menuOpen ? this.$store.commit('nav/SET_MENU') : null
        },
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
                this.$gsap.to('.backImage', { autoAlpha: isMobile ? 0.3 : 1, duration: 2, scale: 1 }).then(() => {

                })
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
