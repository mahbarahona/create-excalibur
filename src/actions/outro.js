import { log, success } from '../helpers/console.js';

export function action_outro(project_name) {
  success('READY!');
  log('Start coding:');
  log(`- cd ${project_name}`);
  log(`- npm run dev`);
}
