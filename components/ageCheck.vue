<template>
<div v-if="visible" class="fixed bg-black flex justify-center items-center top-0 left-0 right-0 bottom-0 overflow-auto" style="z-index: 9999">
    <div v-if="!sorry" class=" justify-around text-white text-center max-w-sm overflow-auto py-32 md:py-12 px-4">
        <logo :forceWhite="true" class="w-32 mx-auto mb-12"/>
        <p class="text-white text-2xl font-bold uppercase text-center mb-2 leading-tight">Are you of legal drinking age in your country?</p>
        <p class="text-white font-bold opacity-80 text-center">By entering this website you agree to our use of cookies. Learn more about our privacy policy.</p>
        <div class="flex mx-auto w-fit  justify-center">
            <button @click="age(true)" class="py-2 px-6 border-2 border-white text-xl mx-2 hover:bg-white hover:text-black">YES</button>
            <button @click="age(false)" class="py-2 px-6 border-2 border-white text-xl mx-2 hover:bg-white hover:text-black">NO</button>
        </div>
    </div>
    <div v-else>
        <p class="text-white text-2xl font-bold uppercase text-center mb-2 leading-tight">Sorry</p>
        <p class="text-white font-bold opacity-80 text-center">You are not old enough to view the site</p>
    </div>
</div>
</template>

<script>
import getCookie from '@/functions/getCookie.js';
export default {
    data: () => {
        return {
            sorry: false,
            visible: false
        }
    },
    mounted() {
        this.visible = getCookie("ageCheck") == 'true' ? false : true
    },
    methods: {
      
        age(val) {
            if (val) {
                document.cookie = "ageCheck=true";
                this.visible = false
                if (this.$route.name == 'index') {
                    this.$emit('cookieUpdated')
                }
            } else {
                this.sorry = true
            }
        }
    }
}
</script>
