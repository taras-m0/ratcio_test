<template>
    <div class="item" element="div">
        <div class="label" :class=" color ">{{ weight }}</div>
    </div>
</template>

<script>

    export default {
        name: 'Item',
        props: {
            weight: Number,
            color: String
        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style>
    .item {
        display: block;
        margin: .5em;
        text-align: center;
        vertical-align: middle;
    }

    .label.red {
        background-color: #f88;
    }
    .label.yellow {
        background-color: #ff8;
    }
    .label.blue {
        background-color: #88f;
    }
    .label.green {
        background-color: #8f8;
    }

    .item .label {
        width: 3em;
        height: 3em;
        border-radius: 2em;
        padding: 1em;
        box-sizing: border-box;
        cursor: pointer;
        margin: 0 auto;
    }
</style>