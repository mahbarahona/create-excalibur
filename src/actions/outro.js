import { log, success } from '../helpers/console.js';

export function action_outro(project_name) {
  log('');
  success(' Ready! ');
  log(`- cd ${project_name}`);
  log(`- npm run dev`);
}
