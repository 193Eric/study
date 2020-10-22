import KSubmit from './src/index.vue'

KSubmit.install = (Vue)=>{
  Vue.component(KSubmit.name, KSubmit)
}

export default KSubmit 