require('./c.js')
let a = async ()=>{
  await setTimeout(()=>{
    console.log('lalalal 我是a')
  },3000)
  
}



a()