<template>
    <prescription :data="data" :nameObj="['院区','处置库']"></prescription>
</template>

<script>
    import prescription from './Prescription.vue'
    export default {
        name: "dispose",
        props:['data'],
        components:{
            prescription
        }
    }
</script>

<style scoped>

</style>
