#!/usr/bin/env node

import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//
import { info, log, success, warn, error } from './src/console.js';
import create_project_resource from './src/create_projects.js';
import { execSync } from 'child_process';

function run_command(command) {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    error(`Failed to execute ${command}.`);
    log(e);
    return false;
  }
  return true;
}

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
];

// INTRO
log(`
      /| ________________
O|===|* >________________>
      \\|
`);
info('Welcome to Excalibur JS! ');
log('2D Games made Easy for the Web');
log('');

inquirer.prompt(QUESTIONS).then((user_inputs) => {
  const selected_template = user_inputs['project-template'];
  const project_name = user_inputs['project-name'];
  const install_dependencies = user_inputs['dependencies'];
  //
  const template_path = `${__dirname}/src/templates/${selected_template}`;
  fs.mkdirSync(`${CURRENT_DIRECTORY}/${project_name}`);

  // CREATE_PROJECT
  log(`Creating project....`);
  create_project_resource(template_path, project_name);

  log('');
  success(`Project created at ./${project_name}`);
  log('');

  // INSTALL_DEPENDENCIES
  if (install_dependencies) {
    const installed = run_command(`cd ${project_name} && npm i`);
    if (installed) {
      log('Dependenies installed.');
    } else {
      error('Unable to install dependencies');
    }
  }

  // COMPLETED
  log('');
  success('Ready!');
  warn(`- go to your project:  cd ${project_name}`);
  warn(`- and start coding! : npm run dev`);
});
