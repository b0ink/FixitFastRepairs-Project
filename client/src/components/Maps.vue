<script setup>
    import { ref } from 'vue'
    import { GoogleMap, Marker } from 'vue3-google-map'

    const GOOGLE_MAPS_API_KEY = 'your-google-maps-api-key'

    // Melbourne
    const center = { lat: -37.8136, lng: 144.9631 }
</script>

<template>
    <GoogleMap id="map" :api-key="GOOGLE_MAPS_API_KEY" style="width: 100%; height: 750px" :center="center" :zoom="15">
        <Marker :options="{ position: center }" />
    </GoogleMap>
</template>

<style scoped>
    #map {
        width: 100%;
        max-width: 900px;
        margin: auto;
        height: 50vh;
        min-height: 250px;
        max-height: 500px;
        border-radius: 25px;
        overflow: hidden;
        /* border: 1px solid black; */
        /* padding: 25px; */
        box-shadow: -1px 7px 21px -2px rgba(0, 0, 0, 0.2);
    }
</style>
