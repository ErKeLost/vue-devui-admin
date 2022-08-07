import program from '../../program'
import emptyDirName from '../../../utils/emptyDirName'
import createProject from './createProject'
export default async function createCommand() {
  program
    .description('init Vue3 + Vite3 + Typescript project   📑  📑')
    .action(async () => {
      createProject()
    })
}
