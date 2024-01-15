#!/usr/bin/env node

import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//
import { action_intro } from './src/actions/intro.js';
import { action_create_project } from './src/actions/create_project.js';
import { action_install_dependencies } from './src/actions/dependencies.js';
import { action_init_repo } from './src/actions/init_repo.js';
import { action_outro } from './src/actions/outro.js';

const CURRENT_DIRECTORY = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECTS = fs.readdirSync(`${__dirname}/src/templates`);
const QUESTIONS = [
  {
    name: 'project-template',
    type: 'list',
    message: 'What kind of project do you want?',
    choices: PROJECTS,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else
        return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
  {
    name: 'dependencies',
    type: 'confirm',
    message: 'Install dependencies?',
  },
  {
    name: 'init-repo',
    type: 'confirm',
    message: 'Initialize respository?',
  },
];

// INTRO
action_intro();

inquirer.prompt(QUESTIONS).then((user_inputs) => {
  const selected_template = user_inputs['project-template'];
  const project_name = user_inputs['project-name'];
  const install_dependencies = user_inputs['dependencies'];
  const init_repo = user_inputs['init-repo'];
  //
  const template_path = `${__dirname}/src/templates/${selected_template}`;
  fs.mkdirSync(`${CURRENT_DIRECTORY}/${project_name}`);

  action_create_project(template_path, project_name);

  if (install_dependencies) {
    action_install_dependencies(project_name);
  }

  if (init_repo) {
    action_init_repo(project_name);
  }

  action_outro(project_name);
});
