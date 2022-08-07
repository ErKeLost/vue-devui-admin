import { cyan, yellow } from '@/utils/log'
import createSpawnCmd from '@/utils/createSpawnCmd'
import fs = require('fs-extra')
import createProjectQuestions from '@/core/questions/creator'
import clearConsole from '@/utils/clearConsole'
import options from '@/shared/options'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gradient = require('gradient-string')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
let startTime: number, endTime: number
export default async function () {
  clearConsole('cyan', ``)
  console.log(
    gradient('cyan', 'blue')('\n🚀 Welcome To Create Template for DevUI!\n')
  )

  await createProjectQuestions()
  console.log(options.name, '🎨  🎨🎨  🎨')
  // 获取基础参数
  // options.name = name
  options.dest = path.resolve(process.cwd(), options.name)
  // 目录
  const dest = path.resolve(process.cwd(), options.name)
  const cmdIgnore = createSpawnCmd(dest, 'ignore')
  const cmdInherit = createSpawnCmd(dest, 'inherit')
  // 模板路径
  const templatePath = path.resolve(__dirname, `template`)
  console.log(templatePath)

  // 开始记录用时
  startTime = new Date().getTime()
  // 拷贝基础模板文件
  await fs.copy(templatePath, dest)
  // 编译 ejs 模板文件
  yellow(`> The project template is generated in the directory: ${dest}`)
  // Git 初始化
  await cmdIgnore('git', ['init'])
  await cmdIgnore('git', ['add .'])
  await cmdIgnore('git', ['commit -m "Initialization with devui-cli"'])
  console.log(`> Git repository initialized successfully Git`)

  // 依赖安装
  console.log(`> Automatically installing dependencies...`)
  console.log('')
  await cmdInherit(options.package, ['install'])
  endTime = new Date().getTime()
  const usageTime = (endTime - startTime) / 1000
  cyan(`> The project has been created successfully Usage time ${usageTime}s`)
  console.log('')
  cyan(`✨✨ cd ${options.name}`)
  cyan(
    options.package === 'npm'
      ? `✨✨ ${options.package} run dev`
      : `✨✨ ${options.package} dev`
  )
}
