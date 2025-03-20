import yaml from 'js-yaml';

export function parseYAML(data) {
    return yaml.load(data);
}