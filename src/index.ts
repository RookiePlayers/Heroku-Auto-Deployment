import * as core from "@actions/core";
import dockerDeployment from "./docker/main";
import gitDeployment from "./git/main";

(async function () {
  try {
    const HerokuApiKey = core.getInput("herokuApiKey");
    process.env.HEROKU_API_KEY = HerokuApiKey;
    const appName = core.getInput("herokuAppName");
    core.info(`Application Name: ${appName}`);
    const herokuStack = core.getInput("herokuStack");
    core.info(`Heroku Stack: ${herokuStack}`);
    const useDocker = core.getBooleanInput("useDocker");
    if (useDocker) {
      console.log("🐋 deployment with Docker 🐋");
      dockerDeployment(appName herokuStack??'heroku-22');
    } else {
      console.log("🐈 deployment with Git 🐈");
      gitDeployment(appName, HerokuApiKey, herokuStack??'heroku-22');
    }
  } catch (error) {
    core.setFailed(error as string);
  }
})();
