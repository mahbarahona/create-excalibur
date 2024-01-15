import * as fs from 'fs';

const CURRENT_DIRECTORY = process.cwd();

export function create_project_resource(resource_path, project_name) {
  const resources_to_create = fs.readdirSync(resource_path);

  resources_to_create.forEach((resource) => {
    const resource_path = `${resource_path}/${resource}`;
    const resource_stats = fs.statSync(resource_path);

    if (resource_stats.isDirectory()) {
      fs.mkdirSync(`${CURRENT_DIRECTORY}/${project_name}/${resource}`);
      create_project_resource(
        `${resource_path}/${resource}`,
        `${project_name}/${resource}`
      );
    } else if (resource_stats.isFile()) {
      //
      const file_content = fs.readFileSync(resource_path, 'utf-8');
      const write_path = `${CURRENT_DIRECTORY}/${project_name}/${resource}`;
      fs.writeFileSync(write_path, file_content, 'utf-8');
    }
  });
}
