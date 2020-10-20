const {promisify} = require('util')

const download = promisify(require('download-git-repo'))

const ora = require('ora') // 修饰

const clone =  async (repo,desc)=>{
  const process = ora('下载中....... '+repo)
  process.start()
  await download(repo,desc)
  process.succeed()
}

module.exports = clone

