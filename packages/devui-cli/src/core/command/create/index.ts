import program from '../../program'
import createProject from './createProject'
export default async function createCommand() {
  program
    .description('📦📦 Init Vue3 + Vite3 + TypeScript + DevUI Project')
    .action(async () => {
      createProject()
    })
  program
    .command('create')
    .description('📦📦 Init Vue3 + Vite3 + TypeScript + DevUI Project')
    .action(async () => {
      createProject()
    })
}

