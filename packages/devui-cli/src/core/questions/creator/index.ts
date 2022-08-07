// import { prompt, QuestionCollection } from 'inquirer'
import options from '@/shared/options'
import PackageDevice from './packageManager'
import projectName from './projectName'
// import prompts from 'prompts'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const prompts = require('prompts')
async function createQuestion(util, question) {
  const result = await util(question, {
    onCancel: () => {
      throw new Error('🎨🎨' + ' Operation cancelled')
    }
  })
  Object.assign(options, result)
  //  在 回答问题得时候 map 映射 每一个 库 版本 问题 要不要考虑
  return Promise.resolve(true)
}

async function createProjectQuestions(): Promise<void> {
  // 项目名
  try {
    await createQuestion(prompts, projectName)
    // 包管理器版本
    await createQuestion(prompts, PackageDevice)
    // cancel
  } catch (cancelled) {
    console.log(cancelled.message)
    process.exit(1)
  }
}

export default createProjectQuestions
