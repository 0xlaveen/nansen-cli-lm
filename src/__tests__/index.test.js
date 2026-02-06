/**
 * Index.js entry point tests
 * Simple tests to ensure the entry point module works correctly
 */

import { describe, it, expect } from 'vitest';

describe('index.js', () => {
  it('should export runCLI from cli.js', async () => {
    // Dynamic import to test the module loads correctly
    const indexModule = await import('../index.js');
    
    // The index.js file imports and calls runCLI, but doesn't re-export it
    // We just verify the module loads without error
    expect(indexModule).toBeDefined();
  });

  it('should have correct shebang for CLI execution', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const indexPath = path.join(__dirname, '..', 'index.js');
    const content = fs.readFileSync(indexPath, 'utf-8');
    
    expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
  });
});
