<script setup>
    import PhoneItem from '../../components/PhoneItem.vue'
    import Breadcrumbs from '../../components/Breadcrumbs.vue'

    import { inject, onMounted, ref } from 'vue'

    const axios = inject('axios')

    const brandOptions = [
        { id: 'iPhone', display: 'Apple iPhone' },
        { id: 'Samsung', display: 'Samsung S Series' },
        { id: 'SamsungZ', display: 'Samsung Z Series' },
        { id: 'SamsungNote', display: 'Samsung Note Series' }
    ]

    const brandName = ref('iPhone')
    const phones = ref([])
    const brandSelect = ref(null)

    onMounted(() => {
        axios
            .get('/api/getphones')
            .then((data) => {
                console.log(data)
                phones.value = JSON.parse(data.data)
            })
            .catch((e) => {
                console.log('error', e)
            })

        brandSelect.value.addEventListener('change', (e) => {
            let selectedBrand = brandSelect.value.value
            for (let brand of brandOptions) {
                if (brand.id == selectedBrand) {
                    brandName.value = brand.id
                    break
                }
            }
        })
    })
</script>

<template>
    <main>
        <Breadcrumbs :stage="1" />

        <h1>Select your Device</h1>
        <select name="brand" id="brandSelect" ref="brandSelect">
            <option v-for="option in brandOptions" :value="option.id">{{ option.display }}</option>
        </select>

        <div class="phoneList">
            <PhoneItem v-for="item in phones" :phone="item" :brand="brandName" :key="item" />
        </div>
    </main>
</template>

<style scoped>
    #brandSelect {
        margin: 0 auto;
        margin-top: 25px;
        display: block;
        height: 50px;
        width: 100%;
        max-width: 350px;
        text-align: center;
        font-weight: bold;
        font-size: 18px;
    }

    .phoneList {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 50px 50px;
        min-height: calc(100vh - 100px);
    }
    h1 {
        text-align: center;
        width: 100%;
        font-weight: 500;
    }
</style>
