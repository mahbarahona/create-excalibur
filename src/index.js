#!/usr/bin/env node

import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { create_project_resource } from './create_projects';
//

const CURRENT_DIRECTORY = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

const PROJECTS = fs.readdirSync(`${__dirname}/templates`);
const CLI = [
  {
    name: 'project-template',
    type: 'list',
    message: 'What kind of game do u wanna create ?',
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
];

inquirer.prompt(CLI).then((user_inputs) => {
  const selected_template = user_inputs['project-template'];
  const project_name = user_inputs['project-name'];
  //
  const template_path = `${__dirname}/templates/${selected_template}`;
  fs.mkdirSync(`${CURRENT_DIRECTORY}/${project_name}`);
  //
  create_project_resource(template_path, project_name);
});
