import { defineComponent } from "vue";
import { RouterView } from 'vue-router'
export default defineComponent(() => {
  return () => (
    <div id="app">
      {/* <div class="px-6 py-4 transition-all duration-300"> */}
        <RouterView />
      {/* </div> */}
    </div >
  )
})