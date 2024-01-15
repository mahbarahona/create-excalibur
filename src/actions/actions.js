import { action_intro } from './intro.js';
import { action_create_project } from './create_project.js';
import { action_install_dependencies } from './dependencies.js';
import { action_init_repo } from './init_repo.js';
import { action_outro } from './outro.js';

export const actions = {
  intro: action_intro,
  create_project: action_create_project,
  install_dependencies: action_install_dependencies,
  init_repo: action_init_repo,
  outro: action_outro,
};
