import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = fs.readdirSync(__dirname).filter(file => {
    return file.endsWith('.js') && file !== path.basename(__filename);
});

const config = {};

for (const file of files) {
    const moduleName = path.parse(file).name;
    const modulePath = pathToFileURL(path.join(__dirname, file)).href;
    const { default: moduleExport } = await import(modulePath);
    config[moduleName] = moduleExport;
}

export default config;
