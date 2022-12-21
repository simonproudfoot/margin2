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
        this.$store.state.nav.menuOpen = false
    },

    methods: {
        scrollToContent() {
            const selected = document.getElementById('scrollTo')
            selected.scrollIntoView({ behavior: "smooth", inline: "nearest" });
        }
    },
}
</script>
