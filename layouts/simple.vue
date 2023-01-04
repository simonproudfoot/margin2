<template>
<div>
    <AgeCheck />
    <TopNav :frontpage="false" />
    <div class="min-h-screen md:flex">
        <sideNav />
        <Nuxt />
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
   
}
</script>
