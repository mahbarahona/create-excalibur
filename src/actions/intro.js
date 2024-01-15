import { log, info } from '../helpers/console.js';

export function action_intro() {
  log(`
    /|   ________________
O|===|* >________________>
    \\|
`);
  info(' Welcome to Excalibur JS! ');
  log('Your friendly TypeScript 2D game engine for the web.');
  log('');
}
