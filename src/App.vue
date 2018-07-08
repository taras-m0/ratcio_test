<template>
  <div id="app">
    <draggable class="start-container" element="div" :options="dragOptions" v-model="elements">
      <Item v-for="( item, key ) in elements" :color="item.color" :weight='item.weight' :key="key"></Item>
    </draggable>

    <div class="result-weight">
      <input type="text" readonly :value="'Итого: ' + weight" />
    </div>

    <tree-container @element="onElement" v-model="tree"></tree-container>

    <!-- div class="debug-container">
      <pre>{{ list1String }}</pre>
    </div -->

  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Item from './components/Item';
import TreeContainer, { dragOptions } from './components/TreeContainer';
import Weight from './Weight';

export default {
  name: 'App',
  components: {
      Item,
      draggable,
      TreeContainer
  },
    data() {
        const colorsList = ['green', 'yellow', 'blue', 'red'];
        const list = [];
        let i = 1;

        const elements = colorsList.reduce((prev, curr) => {
            for (let x = 1; x <= 3; x++) {
                if (i > 10) {
                    break;
                }

                prev.push({
                    color: curr,
                    weight: i++
                });
            }

            return prev;
        }, []);

        // console.log( elements );
        return { elements, tree: { elements: [ ], childs: [ ] } };
    }

    , computed: {
        dragOptions () {
            return  dragOptions;
        }

        ,weight() {
            return Weight(this.tree);
        }

        , list1String(){
          return JSON.stringify(this.tree, null, 2);
        }
    }

    , methods: {
      onElement( element ){
          this.elements.push( element );
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  .start-container {
    width: 12em;
    text-align: left;
    float: left;
    padding: 1em;
  }

  .start-container .item {
    display: inline-block;
  }

  .result-weight {
    float: left;
    width: 5em;
  }

  .result-weight input{
    width: 100%;
    padding: .5em;
  }

  .tree-container {
    width: 40em;
    float: left;
    padding: 1em;
  }

  .debug-container {
    width: 15em;
    padding: .5em;
    text-align: left;
    float: left;
  }
</style>
