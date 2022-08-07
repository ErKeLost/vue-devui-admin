import { cyan } from './log'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const readline = require('readline')
export default function (color: string, str: string): void {
  if (process.stdout.isTTY) {
    console.log('')
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    cyan(str)
    console.log('')
  }
}
