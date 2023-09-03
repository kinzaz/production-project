import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const sharedUiDirectory = project.getDirectory(
  path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui')
);

const componentsDirs = sharedUiDirectory?.getDirectories();

componentsDirs?.forEach((componentsDir) => {
  const indexFilePath = componentsDir.getPath() + '/index.ts';
  const indexFile = componentsDir.getSourceFile(indexFilePath);
  if (!indexFile) {
    const sourceCode = `export * from './${componentsDir.getBaseName()}'`;
    const file = componentsDir.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true,
    });
    file.save();
  }
});

project.save();
