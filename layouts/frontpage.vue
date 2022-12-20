<template>
<div>
  <Nuxt/>
</div>
</template>

<script>
export default {
    name: 'frontpage',
    beforeDestroy(){
        this.$store.state.nav.menuOpen ?  this.$store.commit('nav/SET_MENU') : null
    },
  
    methods: {
        scrollToContent() {
            const selected = document.getElementById('scrollTo')
            selected.scrollIntoView({ behavior: "smooth", inline: "nearest" });
        }
    },
}
</script>
