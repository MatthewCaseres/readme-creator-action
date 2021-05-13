const core = require('@actions/core');
const github = require('@actions/github');
const {writeFile} = require('fs');
const {promisify} = require('util')

const writeFileAsync = promisify(writeFile)

main().catch((error) => core.setFailed(error.message));

async function main() {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    await writeFileAsync('lol.txt', 'haha')
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}