<template>
    <draggable class="tree-container" element="div" :options="dragOptions" v-model="List.elements"
               @sort="onSort"
    >
        <Item v-for="( item, key ) in List.elements" :color="item.color" :weight='item.weight' :key="key"></Item>

        <tree-container v-if="isChilds" @element="onElement" v-model="List.childs[0]"></tree-container>

        <tree-container v-if="isChilds" @element="onElement" v-model="List.childs[1]"></tree-container>

        <div class="drop-empty" v-if="isEmpty">Поместите сюда</div>
    </draggable>

</template>

<script>
    import draggable from 'vuedraggable';
    import Item from './Item';

    export const dragOptions = {
        animation: 0,
        group: 'items',
        disabled: false,
        ghostClass: 'ghost'
    };


    export default {
        name: "tree-container"
        , model: {
            prop: 'List',
            event: 'out'
        }
        , props: {
            List: Object
        }
        // event [ element ]
        , components: { draggable, Item }

        , methods: {
            onSort(){
                // Поиск зелёного
                const greenElKey = this.List.elements.findIndex((item) => (item.color == 'green'));
                if(greenElKey >= 0){
                    // удаляем все за зелёным
                    while ( this.List.elements.length > greenElKey + 1){
                        this.$emit('element', this.List.elements.pop());
                    }

                    // есть дочерние структуры
                    while(this.List.childs.length < 2){
                        this.List.childs.push({
                            elements: [ ]
                            , childs: [ ]
                        });
                    }
                } else {
                    // удаляем дочерние структуры
                    const removeCh = (element) => {
                        while (element.childs.length > 0){
                            removeCh( element.childs.pop() );
                        }

                        while( element.elements.length > 0 ){
                            this.$emit('element', element.elements.pop());
                        }
                    };

                    while (this.List.childs.length > 0){
                        removeCh( this.List.childs.pop());
                    }
                }

                this.$emit('out', this.List);
            }

            , onElement(element){
                this.$emit('element', element);
            }
        }
        , computed: {
            isChilds(){
                if(this.List.elements.length == 0){
                    return false;
                }

                if(this.List.elements[this.List.elements.length - 1].color == 'green'){
                    return true;
                }else {
                    return false;
                }
            }

            , isEmpty(){
                return this.List.elements.length == 0;
            }

            , dragOptions(){
                return dragOptions;
            }
        }
    }
</script>

<style>
    .tree-container .tree-container {
        width: 40%;
        width: calc(50% - 2em );
        float: left;
    }

    .tree-container::after {
        display: block;
        content: " ";
        height: 0;
        clear: both;
    }

    .drop-empty {
        padding: .5em;
        border: 2px dashed black;
        position: absolute;
    }
</style>