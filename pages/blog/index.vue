<template>
<div class="md:w-9/12 px-12 pb-24 contentArea z-10 bg-white max-w-[800px] pt-4 mt-1">
    <h1 class="text-3xl font-bold mb-4">Recent Posts</h1>
    <ul>
        <li v-for="post in posts" :key="post.id">
            <nuxt-link :to="'/blog/'+post.slug" class="block p-4 border-b border-gray-300 hover:bg-gray-100">
                <h2 class="text-xl font-semibold mb-2">{{ post.title.rendered }}</h2>
                <p v-html="post.excerpt.rendered" class="text-gray-700"></p>
                <p class="font-bold text-underline">Read more</p>
            </nuxt-link>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    layout: "simple",
    name: 'PostList',
    async asyncData({ $axios, store }) {
        store.commit('nav/CLOSE_MENU')
        const { data } = await $axios.get('wp/v2/posts');
        return { posts: data };
    }
}
</script>
