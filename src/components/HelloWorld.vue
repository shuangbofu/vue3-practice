<template>
  <h1>{{ msg }}</h1>
  <button @click="click">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import { ref, reactive, toRefs } from "Vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  // data() {
  //   return {
  //     count: 0
  //   }
  // }

  setup(props) {
    const count = ref(1);

    function click() {
      count.value++;
    }

    return {
      count,
    };
  },
};
</script>
