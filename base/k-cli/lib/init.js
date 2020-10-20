const {promisify} = require('util')
 
const figlet = promisify(require('figlet')) // 图形，本身是一个回调方法，所以才用promisify来加工

const clear = require('clear') // 清屏

const path = require('path')

const chalk = require('chalk') // 文字修饰

const clone = require('./download')

const log = content =>{
  console.log(chalk.blue(content))
}

const cProcessInstall = async (...args)=>{
  const {spawn} = require('child_process')
  return new Promise((resolve)=>{
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on("close",()=>{
      resolve()
    })
  })
}

module.exports = async name =>{
  // 欢迎界面
  clear()

  const data = await figlet('Welcome To K-cli')

  log(data)

  // 克隆远程模板项目
  
  await clone("github:193Eric/vue-template", path.resolve(process.cwd())+'/'+name)

  log(`创建项目${name}成功！`)

  log(`安装依赖 等待安装...`)

  await cProcessInstall('npm',['install'],{cwd:`./${name}`})

  log(`🚀安装依赖完成！`)
}