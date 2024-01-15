import { log } from './console.js';
import * as fs from 'fs';

const CURRENT_DIRECTORY = process.cwd();

function create_project_resource(target_path, project_name) {
  const resources_to_create = fs.readdirSync(target_path);

  resources_to_create.forEach((resource) => {
    const resource_path = `${target_path}/${resource}`;
    const resource_stats = fs.statSync(resource_path);

    if (resource_stats.isDirectory()) {
      fs.mkdirSync(`${CURRENT_DIRECTORY}/${project_name}/${resource}`);
      create_project_resource(
        `${target_path}/${resource}`,
        `${project_name}/${resource}`
      );
    } else if (resource_stats.isFile()) {
      //
      const file_content = fs.readFileSync(resource_path, 'utf-8');
      const write_path = `${CURRENT_DIRECTORY}/${project_name}/${resource}`;
      fs.writeFileSync(write_path, file_content, 'utf-8');

      log(write_path);
    }
  });
}

export default create_project_resource;
