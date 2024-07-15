<script setup>
    import { ref, watch } from 'vue'

    const props = defineProps(['question', 'answer'])

    const dropped = ref(false)

    const faq = ref(null)
    const answer = ref(null)
    const expander = ref(null)
    const answerText = ref(null)

    watch(dropped, async (newValue, oldValue) => {
        const height = answerText.value.offsetHeight
        console.log('height would be', height)
        if (newValue) {
            answer.value.style.height = `${height}px`
        } else {
            answer.value.style.height = `0px`
        }
        console.log(oldValue, newValue)
    })
</script>

<template>
    <div ref="faq" :class="['faq-item', dropped ? 'expanded' : '']">
        <div class="faq-question" @click="dropped = !dropped">
            <h3>{{ props.question }}</h3>
            <svg
                ref="expander"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                :class="['faq-expand bi bi-caret-down-fill', dropped ? 'expanded' : '']"
                viewBox="0 0 16 16"
            >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
        </div>
        <div ref="answer" :class="['faq-answer']">
            <p ref="answerText">
                {{ props.answer }}
            </p>
        </div>
    </div>
</template>

<style scoped>
    * {
        /* border: 1px solid lime; */
    }

    .faq-item {
        /* box-shadow: -1px 7px 21px -2px rgba(0, 0, 0, 0.2); */
        /* box-shadow: -1px 0px 21px -2px rgba(0, 0, 0, 0.3); */

        border-radius: 5px;
        /* margin: 15px 0; */
        /* height: 75px; */
        position: relative;
        text-align: left;
        /* padding: 25px; */
    }

    .faq-question {
        /* border-bottom: 1px solid grey; */

        border-top: 1px solid rgb(198, 197, 197);
        display: flex;
        /* justify-content: center; */
        align-items: center;
        min-height: 100px;
        /* text-align: center; */
        position: relative;
        /* padding: 15px; */
        cursor: pointer;
        padding-right: 50px;
    }
    h3 {
        font-weight: 800;
        font-size: 18px;
    }

    .faq-question svg {
        transition: all 0.5s ease-in-out;
    }
    .faq-item .faq-question svg.expanded {
        transform: rotate(180deg);
    }
    .faq-expand {
        position: absolute;
        right: 25px;
        top: 75px/2;
        color: rgb(77, 77, 77);
    }

    .faq-answer p,
    h3 {
        padding: 15px;
    }
    .faq-answer {
        /* border: 1px solid grey; */
        /* max-height: 0; */
        /* min-height: 0; */
        height: 0;
        transition: all 0.5s ease-in-out;
        white-space: wrap;
        max-width: 100%;
        word-wrap: break-word;
        /* border-top: 1px solid rgb(198, 197, 197); */
        overflow: hidden;
    }
    /* .faq-answer.expanded {
        min-height: 25px;
        max-height: 300px;
    } */
</style>
