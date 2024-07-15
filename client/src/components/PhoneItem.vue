<script setup>
    import { onMounted, ref } from 'vue'

    const props = defineProps(['brand', 'phone'])

    const img = ref(null)

    const scales = {
        default: 1,
        iPhone: {
            small: 0.3,
            medium: 0.5,
            large: 0.6
        },
        Samsung: {
            small: 0.4,
            medium: 0.5,
            large: 0.9
        }
    }

    const setSize = () => {
        let scale = scales.default

        if (img.value) {
            const screenWidth = window.innerWidth

            if (img.value.src.indexOf('GalaxyS/') !== -1) {
                if (screenWidth <= 550) {
                    scale = scales.Samsung.small
                } else if (screenWidth <= 850) {
                    scale = scales.Samsung.medium
                } else {
                    scale = scales.Samsung.large
                }
            } else if (img.value.src.indexOf('iPhone/') !== -1) {
                if (screenWidth <= 550) {
                    scale = scales.iPhone.small
                } else if (screenWidth <= 850) {
                    scale = scales.iPhone.medium
                } else {
                    scale = scales.iPhone.large
                }
            }

            const originalWidth = img.value.naturalWidth
            const newWidth = originalWidth * scale
            img.value.width = newWidth
        }
    }

    onMounted(() => {
        setSize()
    })

    window.addEventListener('resize', setSize)
</script>

<template>
    <a class="phone" v-if="props.brand == props.phone.brand" :href="'/repairs/' + props.phone.phoneid">
        <img @load="setSize" width="" ref="img" :src="'/img/' + props.phone.imgSrc" alt="" />
        <div class="label">
            {{ props.phone.model }}
        </div>
    </a>
</template>
<style scoped>
    * {
        /* border: 1px solid lime; */
    }

    .phone {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        margin: 10px;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .phone img {
        height: auto;
    }

    .label {
        text-align: center;
        color: black;
        font-weight: 700;
        font-size: 18px;
    }
    .phone:hover {
        /* transform: scale(1.2); */
        transform: translateY(-25px);
    }
</style>
