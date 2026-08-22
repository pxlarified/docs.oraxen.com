import {copyFile, mkdir} from 'node:fs/promises';
import path from 'node:path';

export default function rawDocsPlugin(context) {
  let docs = [];

  return {
    name: 'raw-docs',
    allContentLoaded({allContent}) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default;
      if (!docsContent) {
        throw new Error('The raw-docs plugin requires the default Docusaurus docs plugin.');
      }

      docs = docsContent.loadedVersions.flatMap((version) => version.docs);
    },
    async postBuild({outDir}) {
      await Promise.all(docs.map(async (doc) => {
        const source = path.join(context.siteDir, doc.source.replace(/^@site\//, ''));
        const rawPath = `${doc.permalink.replace(/^\//, '').replace(/\/$/, '')}.mdx`;
        const destination = path.resolve(outDir, rawPath);
        const relativeDestination = path.relative(outDir, destination);
        if (relativeDestination.startsWith('..') || path.isAbsolute(relativeDestination)) {
          throw new Error(`Raw documentation path escapes the build directory: ${doc.permalink}`);
        }

        await mkdir(path.dirname(destination), {recursive: true});
        await copyFile(source, destination);
      }));
    },
  };
}
