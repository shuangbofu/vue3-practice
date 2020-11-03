import { defineComponent } from "vue";
import Welcome from './views/Welcome'
import { RouterView } from 'vue-router'
export default defineComponent(() => {
  return () => (
    <div id="app">
      {/* <RouterView /> */}
      <Welcome visible={true} title="2020年11月03日00:34:10" >
        sxxxx
      </Welcome>
    </div>
  )
})