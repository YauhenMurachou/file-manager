import fs from 'fs';

export function handleNavigation(command, args) {
  switch (command) {
    case 'up':
      process.chdir('..');
      break;
    case 'cd':
      if (args.length === 0) {
        console.log('Invalid input');
        return;
      }
      try {
        const newPath = args.join(' ');
        process.chdir(newPath);
      } catch (error) {
        console.log('Operation failed', error);
      }
      break;
    case 'ls':
      const files = fs.readdirSync(process.cwd(), { withFileTypes: true });
      const sortedFiles = files.sort((a, b) => {
        if (a.isDirectory() === b.isDirectory()) {
          return a.name.localeCompare(b.name);
        }
        return a.isDirectory() ? -1 : 1;
      });
      console.log('Type | Name');
      console.log('-----|------');
      sortedFiles.forEach(file => {
        console.log(`${file.isDirectory() ? 'DIR ' : 'FILE'} | ${file.name}`);
      });
      break;
  }
}
