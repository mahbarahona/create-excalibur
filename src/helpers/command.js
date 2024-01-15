import { alert, log } from './console.js';
import { execSync } from 'child_process';

export function run_command(command) {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    alert(`Failed to execute ${command}.`);
    log(e);
    return false;
  }
  return true;
}
