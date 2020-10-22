import KSubmit from "./k-submit/index"
import 'element-ui/lib/theme-chalk/index.css';

const components = [
  KSubmit
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}
  
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
  
export default {
  install,
  KSubmit
}

export {
  KSubmit
}