<template>
<div>
    <div v-if="$store.state.page.pageFeatures.featuredImage!=null" class="absolute top-0 left-0 h-screen w-full bg-black">
        <wpImage v-on:imageLoaded="$route.name == 'index' ? imageLoaded=true : null" v-if="$store.state.page.pageFeatures.featuredImage != null" :classList="'backImage w-full h-full object-cover opacity-80'" />
    </div>
    <AgeCheck />
    <TopNav :frontpage="false" />
    <div class="min-h-screen md:flex">
        <sideNav />
        <div v-if="$store.state.page.pageFeatures.featuredImage!=null" class="absolute top-0 left-0 h-screen w-full flex justify-items-end">
            <div class="flex items-end w-full">
                <div class="md:w-9/12 w-full md:push-1/4 py-12 px-12 justify-between z-10 bg-white font-bold max-w-[800px] h-fit bottom-0 right-0 flex">
                    <h1 ref="header" class="pb- text-4xl" v-html="$store.state.page.pageFeatures.title"></h1>

                    <svg class="svg-icon h-12 cursor-pointer" viewBox="0 0 20 20" @click="scrollToContent()" style="transform: rotate(90deg)">
                        <path fill="currentColor" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
                    </svg>
                </div>
            </div>
        </div>
        <Nuxt />
    </div>
    <footerNav />
</div>
</template>

<script>
export default {
    name: 'page',
    created() {
        this.$store.commit('nav/CLOSE_MENU')
        if (process.client) {
            const bodyClass = document.querySelector('body').classList
            bodyClass.remove('overflow-hidden')
    
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
