<template>
<nav v-cloak class="absolute md:fixed  w-full md:w-3/12 md:relative md:h-auto z-40 h-fit">
    <div class="navMenu fixed md:relative top-0 w-full bg-black  md:bg-transparent h-full flex md:block items-center md:items-start" v-show="showMenu">
        <div class="mx-auto">
            <ul class="sticky top-0 px-12 pb-4 pt-14 md:pt-4 mt-1" :class="$store.state.page.pageFeatures.darkMode ? 'navWhite' : 'navBlack'">
                <li v-for="page in $store.state.nav.mainNav" :key="page.id" :class="$store.state.page.pageFeatures.darkMode ? 'text-white' : 'text-white md:text-black'" class="block font-body w-full border-black my-2 text-2xl text-center md:text-left md:text-base w-fit mx-auto md:mx-0  border-b md:border-none transition-duration-300">
                    <nuxt-link v-if="page.type !== 'custom' && page.type_label=='Page'" :to="'/'+page.slug" v-html="page.title"></nuxt-link>
                    <nuxt-link class="" v-else-if="page.type !== 'custom' && page.type_label=='Post'" :to="'/blog/'+page.slug" v-html="page.title"></nuxt-link>
                    <a class="" v-else :href="page.url" target="_blank" v-html="page.title"></a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>
<script>
export default {
    props: ['frontpage'],
    data: () => {
        return {
            isMobile: false,
            forward: true,
        }
    },
    computed: {
        showMenu() {
            if (this.isMobile && this.$store.state.nav.menuOpen) {
                return true
            }
            if (!this.isMobile) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        '$store.state.nav.menuOpen'(val) {
            this.$nextTick(() => {
                const body = document.querySelector('body');
                if (val) {
                    body.classList.toggle("overflow-hidden");
                    this.$gsap.from('.navMenu', { yPercent: 100 })
                    this.$gsap.from('nav li', { y: 90, autoAlpha: 0, stagger: 0.05, delay: 0.2 })
                } else {
                    body.classList.toggle("overflow-hidden");
                    this.$gsap.to('.logo', { y: 0 })    
                }
            });
        }
    },
    mounted() {
        this.animatePageLinks()
    },
    created() {
        if (process.client) {
            this.changeWidth()
            window.addEventListener("resize", this.changeWidth);
        }
    },
    destroyed() {
        if (process.client)
            window.removeEventListener("resize", this.changeWidth);
    },
    methods: {
        changeWidth() {
            if (process.client)
            this.isMobile = window.innerWidth < 768 ? true : false
        },
        animatePageLinks() {
            if (this.$route.name == 'index' && !this.isMobile) {
                this.$gsap.from('.logo', { y: -50, autoAlpha: 0, delay: 0.7 })
                this.$gsap.from('nav li', { x: -50, autoAlpha: 0, stagger: 0.05, delay: 1 })
            }
        }
    }
}
</script>
