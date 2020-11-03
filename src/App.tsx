import { defineComponent, ref } from "vue";
import Welcome from './views/Welcome'

import { RouterView } from 'vue-router'
export default defineComponent(() => {
  const visible = ref(true)
  return () => (
    <div id="app">
      {/* <RouterView /> */}
      <Welcome visible={visible.value}
        title="Welcome"
        onBtnClick={
          count => {
            count.value++
            visible.value = !visible.value
          }
        }>
        sxxxx
      </Welcome>
    </div >
  )
})