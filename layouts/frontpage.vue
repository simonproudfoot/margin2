<template>
<div>
  <Nuxt/>
</div>
</template>

<script>
export default {
    name: 'frontpage',
    created() {
        this.$store.commit('nav/CLOSE_MENU')
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
