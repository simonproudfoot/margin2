<template>
<div>
    <AgeCheck />
    <TopNav :frontpage="false" />
    <div class="min-h-screen md:flex">
        <sideNav />

        <Nuxt v-if="!$store.state.page.pageFeatures.featured_video" />
    </div>
    <footerNav />
</div>
</template>
<script>
export default {
    name: 'simple',
    created() {
        this.$store.commit('nav/CLOSE_MENU')
        this.$store.commit('page/FORCE_LIGHT')
        if (process.client) {
            const bodyClass = document.querySelector('body').classList
            bodyClass.remove('overflow-hidden')
            console.log('body', bodyClass)
        }
    },
    methods: {
        scrollToContent() {
            const selected = document.getElementById('scrollTo')
            selected.scrollIntoView({ behavior: "smooth", inline: "nearest" });
        }
    },
}
</script>
