import nextra from "nextra";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
  contentDirBasePath: "/",
});

export default withNextra({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/introduction",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: __dirname,
    resolveAlias: {
      "next-mdx-import-source-file": "./next-mdx-import-source-file.ts",
    },
  },
});
