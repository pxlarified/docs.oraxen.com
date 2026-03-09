import { NextRequest, NextResponse } from "next/server";
import { readFile, readdir, stat, realpath } from "fs/promises";
import { join } from "path";

// Content directory relative to project root
const CONTENT_DIR = join(process.cwd(), "content");

/**
 * Strip frontmatter from MDX/markdown content
 * Frontmatter is the YAML block between --- markers at the start
 */
function stripFrontmatter(content: string): string {
  // Match frontmatter with optional trailing newline for consistency
  const frontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n?/;
  return content.replace(frontmatterRegex, "").trim();
}

/**
 * Extract frontmatter metadata from MDX content
 */
function extractFrontmatter(content: string): Record<string, string> {
  // Match frontmatter with optional trailing newline for consistency
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return {};

  const frontmatter: Record<string, string> = {};
  const lines = match[1].split("\n");
  for (const line of lines) {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(":").trim();
    }
  }
  return frontmatter;
}

/**
 * List all available documentation files
 */
async function listDocs(
  dir: string = CONTENT_DIR,
  prefix: string = "",
  seenDocs: Set<string> = new Set(),
  visitedDirs: Set<string> = new Set()
): Promise<string[]> {
  // Get canonical path to prevent circular symlinks
  const realDir = await realpath(dir);

  // Check if we've already visited this directory (prevents infinite recursion)
  if (visitedDirs.has(realDir)) {
    return [];
  }
  visitedDirs.add(realDir);

  const entries = await readdir(dir, { withFileTypes: true });
  const docs: string[] = [];

  for (const entry of entries) {
    // Skip meta files and hidden files
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;

    const fullPath = join(dir, entry.name);
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      docs.push(...(await listDocs(fullPath, relativePath, seenDocs, visitedDirs)));
    } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      // Convert filename to URL path (remove extension)
      const urlPath = relativePath.replace(/\.(mdx?|md)$/, "");
      // Only add if not already seen (prevents duplicates when both .md and .mdx exist)
      if (!seenDocs.has(urlPath)) {
        seenDocs.add(urlPath);
        docs.push(urlPath);
      }
    }
  }

  return docs;
}

/**
 * Process and format documentation content
 */
async function processDocContent(
  filePath: string,
  docPath: string,
  realContentDir: string
): Promise<string[]> {
  // Validate that the resolved path is within CONTENT_DIR
  const realFilePath = await realpath(filePath);
  if (!realFilePath.startsWith(realContentDir)) {
    throw new Error("Path traversal attempt detected");
  }

  const content = await readFile(filePath, "utf-8");
  const frontmatter = extractFrontmatter(content);
  const markdown = stripFrontmatter(content);

  const result: string[] = [];
  result.push(`# ${frontmatter.title || docPath}`);
  result.push("");
  if (frontmatter.description) {
    result.push(`> ${frontmatter.description}`);
    result.push("");
  }
  result.push(markdown);
  result.push("");
  result.push("---");
  result.push("");

  return result;
}

/**
 * GET /api/docs/[...slug]
 *
 * Serves raw markdown content for AI agents and programmatic access.
 *
 * Special paths:
 * - /api/docs/_index → List all available docs (JSON)
 * - /api/docs/_all   → All docs concatenated (Markdown)
 *
 * Examples:
 * - /api/docs/index → Raw markdown for homepage
 * - /api/docs/plugin-setup/plugin-settings → Raw markdown (extension optional)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const path = slug.join("/");

  // Special route: list all docs
  if (path === "_index") {
    try {
      const docs = await listDocs();
      return NextResponse.json({
        description: "Oraxen Documentation Index",
        docs: docs.map((doc) => ({
          path: doc,
          url: `/api/docs/${doc}`,
          html_url: `/${doc === "index" ? "" : doc}`,
        })),
      });
    } catch {
      return NextResponse.json({ error: "Failed to list docs" }, { status: 500 });
    }
  }

  // Special route: all docs concatenated
  if (path === "_all") {
    try {
      const docs = await listDocs();
      const contents: string[] = [
        "# Oraxen - Complete Documentation",
        "",
        "> This file contains all documentation concatenated for AI agent consumption.",
        "",
        "---",
        "",
      ];

      // Get the real (canonical) path of CONTENT_DIR to validate against
      const realContentDir = await realpath(CONTENT_DIR);

      for (const docPath of docs) {
        // Try .mdx first, then .md as fallback
        const possiblePaths = [
          join(CONTENT_DIR, `${docPath}.mdx`),
          join(CONTENT_DIR, `${docPath}.md`),
        ];

        for (const filePath of possiblePaths) {
          try {
            const docContent = await processDocContent(filePath, docPath, realContentDir);
            contents.push(...docContent);
            break; // Found and processed, move to next doc
          } catch {
            // Try next path or skip if none work
          }
        }
      }

      return new NextResponse(contents.join("\n"), {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Content-Type-Options": "nosniff",
        },
      });
    } catch {
      return NextResponse.json({ error: "Failed to compile docs" }, { status: 500 });
    }
  }

  // Regular doc request - normalize path
  let normalizedPath = path.replace(/\.md$/, ""); // Strip .md extension if present

  // Try to find the file
  const possiblePaths = [
    join(CONTENT_DIR, `${normalizedPath}.mdx`),
    join(CONTENT_DIR, `${normalizedPath}.md`),
    join(CONTENT_DIR, normalizedPath, "index.mdx"),
    join(CONTENT_DIR, normalizedPath, "index.md"),
  ];

  let content: string | null = null;
  let foundPath: string | null = null;

  // Get the real (canonical) path of CONTENT_DIR to validate against
  const realContentDir = await realpath(CONTENT_DIR);

  for (const filePath of possiblePaths) {
    try {
      const stats = await stat(filePath);
      if (stats.isFile()) {
        // Validate that the resolved path is within CONTENT_DIR
        const realFilePath = await realpath(filePath);
        if (!realFilePath.startsWith(realContentDir)) {
          // Path traversal attempt detected
          continue;
        }
        content = await readFile(filePath, "utf-8");
        foundPath = filePath;
        break;
      }
    } catch {
      // File doesn't exist, try next
    }
  }

  if (!content || !foundPath) {
    return NextResponse.json(
      {
        error: "Document not found",
        path: normalizedPath,
        suggestion: "Use /api/docs/_index to list available documents",
      },
      { status: 404 }
    );
  }

  // Extract metadata and strip frontmatter
  const frontmatter = extractFrontmatter(content);
  const markdown = stripFrontmatter(content);

  // Build response with optional metadata header
  const includeMetadata = request.nextUrl.searchParams.get("metadata") === "true";
  let responseContent = markdown;

  if (includeMetadata && (frontmatter.title || frontmatter.description)) {
    const metaLines = [];
    if (frontmatter.title) metaLines.push(`# ${frontmatter.title}`);
    if (frontmatter.description) metaLines.push(`> ${frontmatter.description}`);
    if (metaLines.length) {
      responseContent = metaLines.join("\n") + "\n\n" + markdown;
    }
  }

  return new NextResponse(responseContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
      "X-Doc-Title": frontmatter.title || normalizedPath,
      "X-Doc-Path": normalizedPath,
    },
  });
}
