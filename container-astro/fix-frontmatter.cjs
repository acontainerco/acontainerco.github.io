const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dir = process.argv[2] || 'src/content/projects';
for (let file of fs.readdirSync(dir)) {
  if (!file.endsWith('.md') && !file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  let data;
  let body = '';
  let hasFrontmatter = false;
  if (content.startsWith('---')) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (match) {
      data = yaml.load(match[1]);
      body = content.slice(match[0].length);
      hasFrontmatter = true;
    }
  }
  if (!data) {
    data = yaml.load(content);
  }
  try {
    const newContent = yaml.dump(data, { lineWidth: -1, noRefs: true, quotingType: '"', forceQuotes: false });
    const output = hasFrontmatter ? '---\n' + newContent + '---' + body : newContent;
    fs.writeFileSync(filePath, output);
    console.log('Fixed', file);
  } catch (e) {
    console.error('Failed to fix', file, e.message);
  }
}
