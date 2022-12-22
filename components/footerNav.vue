<template>
<footer class="p-4 flex flex-col md:flex-row md:items-center  md:justify-between md:p-6 bg-black ">
    <span class="text-sm text-center text-white order-2 mt-6 md:mt-0 pt-3 md:pt-0 border-t md:border-0">©{{new Date().getFullYear()}} Margin London Ltd. All Rights Reserved.
    </span>
    <ul class="flex flex-col md:flex-row order-1 md:order-2 text-center mb-0 flex-wrap items-center md:text-left mt-3 text-sm text-white sm:mt-0">
        <li v-for="page in $store.state.nav.footerNav" :key="page.id" class="md:mr-4 hover:underline mr-8 mb-3 md:mb-0 md:mr-6">
            <nuxt-link v-if="page.type !== 'custom'" :to="page.slug" v-html="page.title"></nuxt-link>
            <nuxt-link class="tet-" v-else :to="page.url" target="_blank" v-html="page.title"></nuxt-link>
        </li>
    </ul>
</footer>
</template>

<script>
export default {}
</script>
