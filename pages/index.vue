<template>
<div class="relative bg-black h-screen">
    <AgeCheck v-on:cookieUpdated="cookieUpdated" />
    <TopNav v-show="imageLoaded" :frontpage="true" />
    <sideNav v-show="imageLoaded" :frontpage="true" />
    <div v-show="imageLoaded" class="h-screen w-full overflow-hidden absolute top-0 bottom-0">
        <div class="flex h-screen w-full  bg-black justify-items-stretch ">
            <nuxt-img @load="imageLoaded = true" format="webp" src="/img/marginbanner.jpg" alt="banner image" class="backImage absolute top-0 left-0 w-full h-full object-cover opacity-0 contentArea" />
            <div class="fixed right-0 top-1/3 z-10 font-body text-center md:text-left w-full md:w-1/2 ">
                <div class="mx-auto w-fit md:pl-12">
                    <h1 class="intro-text font-bold text-5xl text-white">The Perfect</h1>
                    <h1 class="intro-text font-bold text-5xl text-white self-center m">Sipping Gin... </h1>
                </div>
            </div>
        </div>
    </div>
    <footerNav v-show="imageLoaded" />
</div>
</template>

<script>
export default {
    layout: "empty",
    data: () => {
        return {
            imageLoaded: false
        }
    },
    async asyncData({ store }) {
        store.commit('page/FORCE_DARK', true)
    },
    watch: {
        imageLoaded(val) {
            if (val && this.getCookie('ageCheck') == 'true') {
                this.runAnimation()
            }
        }
    },
    methods: {
        runAnimation() {
            const isMobile = window.innerWidth < 768 ? true : false
            let body = document.querySelector('body');
            body.style.overflow = 'hidden'
            this.$gsap.set('.backImage', { scale: 1.2 })
            this.$gsap.to('.backImage', { autoAlpha: isMobile ? 0.3 : 1, duration: 2, scale: 1 }).then(() => {
                body.style.overflow = 'auto'
            })
            this.$gsap.from('.intro-text', { y: 50, autoAlpha: 0, delay: 1, stagger: 0.4, duration: 1 })
        },
        cookieUpdated() {
            this.runAnimation()
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
    },
    mounted() {

    },
}
</script>
