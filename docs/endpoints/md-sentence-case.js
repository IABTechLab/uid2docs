#!/usr/bin/env node

/**
 * md-sentence-case.js
 *
 * Converts Markdown headings (h2–h4) and heading link display text
 * from title case to sentence case, with a configurable exclusions list.
 *
 * Usage:
 *   node md-sentence-case.js [--dry-run] [directory]
 *
 * Options:
 *   --dry-run    Preview changes without writing any files
 *   directory    Path to the repo/folder to process (defaults to current dir)
 *
 * Examples:
 *   node md-sentence-case.js --dry-run ./docs
 *   node md-sentence-case.js ./docs
 *   node md-sentence-case.js            # runs on current directory
 */

const fs   = require('fs');
const path = require('path');

// ─── CONFIGURE YOUR EXCLUSIONS HERE ──────────────────────────────────────────
//
// Words and phrases listed here will NOT be lowercased.
// - Matching is case-insensitive, so "aws" and "AWS" are both caught.
// - Put longer/more specific phrases BEFORE shorter ones so they match first
//   (e.g. "Amazon Web Services" before "AWS").

const EXCLUSIONS = [
  // ── Multi-word phrases first (must come before single words they contain) ──
  'Mobile SDK',
  'Amazon S3',
  'Secure Signals',
  'Prebid.js',
  'FAQs',

  // ── Acronyms & initialisms ─────────────────────────────────────────────────
  'API',
  'AWS',
  'CTV',
  'DII',
  'DSP',
  'EUID',
  'FAQ',
  'GMA',
  'ID',
  'IMA',
  'JSON',
  'POST',
  'SDK',
  'SSO',
  'UID2',
  'URL',

  // ── Proper nouns & brand names ─────────────────────────────────────────────
  'Google',
  'Gradle',
  'GraphQL',
  'I',           // first-person pronoun
  'JavaScript',
  'Maven',
  'Prebid',
  'ProGuard',
  'Sharing',
  'Swift',
  'Base64',
  'SHA-256',

  // ── Add your own exclusions below this line ────────────────────────────────

];

// ─────────────────────────────────────────────────────────────────────────────

const args    = process.argv.slice(2);
const dryRun  = args.includes('--dry-run');
const target  = args.find(a => !a.startsWith('--')) || '.';

/**
 * Escapes a string for safe use inside a RegExp.
 */
function escapeForRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Converts a heading/link text string to sentence case,
 * then restores any words in the EXCLUSIONS list.
 */
function toSentenceCase(text) {
  // Lowercase everything, then uppercase the very first character.
  let result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  // Restore excluded words. Longer phrases are matched first (list order).
  for (const word of EXCLUSIONS) {
    const pattern = new RegExp(`\\b${escapeForRegex(word)}\\b`, 'gi');
    result = result.replace(pattern, word);
  }

  return result;
}

/**
 * Processes the content of a single Markdown file.
 * Returns the updated content and a flag indicating whether anything changed.
 */
function processContent(content, filePath) {
  let changed = false;
  const relPath = path.relative(process.cwd(), filePath);

  // Detect and normalise line endings so the heading regex works on all
  // platforms. Windows files use \r\n; the \r is a line terminator in JS
  // regex, which causes (.+) to stop short and the heading match to fail.
  const lineEnding = content.includes('\r\n') ? '\r\n' : '\n';
  const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  const processed = lines.map((line, idx) => {
    const lineNum = idx + 1;
    let newLine = line;

    // ── 1. Headings h2–h4 ──────────────────────────────────────────────────
    newLine = newLine.replace(/^(#{2,4} )(.+?)(\s*)$/, (_match, prefix, headingText, trailing) => {
      const converted = toSentenceCase(headingText);
      if (converted !== headingText) {
        console.log(`  ${relPath}:${lineNum}  heading  "${headingText}"  →  "${converted}"`);
        changed = true;
      }
      return prefix + converted + trailing;
    });

    // ── 2. Display text of internal/relative links ────────────────────────
    // Matches [Text](url) where url is NOT an external http/https link,
    // covering anchor links (#...), relative file paths (../foo.md), etc.
    newLine = newLine.replace(/\[([^\]]+)\]\(((?!https?:\/\/)[^)]+)\)/g, (_match, displayText, url) => {
      const converted = toSentenceCase(displayText);
      if (converted !== displayText) {
        console.log(`  ${relPath}:${lineNum}  link     "[${displayText}]"  →  "[${converted}]"`);
        changed = true;
      }
      return `[${converted}](${url})`;
    });

    return newLine;
  });

  // Restore the original line endings when reassembling the file.
  return { content: processed.join(lineEnding), changed };
}

/**
 * Recursively finds all .md files under a directory,
 * skipping node_modules and .git.
 */
function findMarkdownFiles(dir) {
  const results = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      results.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
      results.push(fullPath);
    }
  }

  return results;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const absTarget = path.resolve(target);
const files     = findMarkdownFiles(absTarget);

console.log(`\nmd-sentence-case${dryRun ? ' [DRY RUN]' : ''}`);
console.log(`Target : ${absTarget}`);
console.log(`Files  : ${files.length} Markdown file(s) found\n`);

if (files.length === 0) {
  console.log('Nothing to do.');
  process.exit(0);
}

let totalChanged = 0;

for (const file of files) {
  const original              = fs.readFileSync(file, 'utf8');
  const { content, changed }  = processContent(original, file);

  if (changed) {
    totalChanged++;
    if (!dryRun) {
      fs.writeFileSync(file, content, 'utf8');
    }
  }
}

const verb = dryRun ? 'Would modify' : 'Modified';
console.log(`\n${verb} ${totalChanged} of ${files.length} file(s).`);
if (dryRun) {
  console.log('Run without --dry-run to apply changes.');
}
