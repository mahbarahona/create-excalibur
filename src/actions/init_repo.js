import { run_command } from '../helpers/command.js';
import { log, success, warn } from '../helpers/console.js';

export function action_init_repo(project_name) {
  const installed = run_command(`cd ${project_name} && git init`);
  if (installed) {
    success('Repo initialized.');
    log('');
  } else {
    warn('Unable to install dependencies');
  }
}
