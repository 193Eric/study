import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('测试挂载成功后，msg的数值', () => {
    
    const wrapper = mount(HelloWorld)
    
    expect(wrapper.vm.msg).toBe('msg mounted')



  })
})
// function testAdd(x,y){
//   return (x-0)+(y-0)
// }


// describe('test add', () => {
//   it("1 + 2 equal 3",()=>{
//     expect(testAdd(1,'2')).toBe(3)
//   })
// })


