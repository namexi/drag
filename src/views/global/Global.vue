<template>
    <global-header></global-header>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import GlobalHeader from "@/layouts/Global/index.vue"

    @Component({
        components: {
            GlobalHeader
        }
    })
    export default class Global extends Vue {}
</script>

<style scoped>

</style>
