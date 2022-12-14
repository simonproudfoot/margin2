<template>
<footer class="p-4  md:flex md:items-center md:justify-between md:p-6 bg-black">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 ">©{{new Date().getFullYear()}} Margin London Ltd. All Rights Reserved.
    </span>
     <ul class="flex mb-0 flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 ">
        <li v-for="page in $store.state.nav.footerNav" :key="page.id" class="mr-4 hover:underline md:mr-6">
            <nuxt-link v-if="page.type !== 'custom'" :to="page.slug">{{page.title}}</nuxt-link>
            <nuxt-link class="tet-" v-else :to="page.url" target="_blank">{{page.title}}</nuxt-link>
        </li> 
    </ul> 
</footer>
</template>

<script>
export default {
}
</script>