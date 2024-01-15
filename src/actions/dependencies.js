import { run_command } from '../helpers/command.js';
import { success, warn, log } from '../helpers/console.js';

export function action_install_dependencies(project_name) {
  const installed = run_command(`cd ${project_name} && npm i`);
  if (installed) {
    // log('🪄 Done.');
  } else {
    warn('Unable to install dependencies');
  }
}
