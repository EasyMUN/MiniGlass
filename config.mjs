import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

import BASE from './base';

const data = yaml.safeLoad(fs.readFileSync(path.join(BASE, 'config.yml')));

export default data;
