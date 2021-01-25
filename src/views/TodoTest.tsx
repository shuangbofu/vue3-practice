import { defineComponent } from "vue";

import Todo from './Todo'
import Done from './Done'
export default defineComponent({
  setup() {
    return () => (<>
      <div class="px-6 py-4 transition-all duration-300">
        <Todo />
        <Done />
      </div></>
    )
  }
})