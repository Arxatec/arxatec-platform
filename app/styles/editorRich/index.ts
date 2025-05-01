export const editorStyles = `
  .ProseMirror, .prose {
    min-height: 400px;
    background-color: white;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #374151;
    line-height: 1.6;
  }

  .editor-content {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
    
  }

  .editor-content::-webkit-scrollbar {
    width: 8px;
  }

  .editor-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .editor-content::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 20px;
    border: 2px solid transparent;
  }

  .editor-content::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8;
  }

  .ProseMirror:focus {
    outline: none;
  }

.ProseMirror h1, .prose h1 {
  font-size: 2.5rem;  /* 40px */
  font-weight: 800;
  margin: 2rem 0 1rem;
  color: #111827;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.ProseMirror h2, .prose h2 {
  font-size: 2rem;  /* 32px */
  font-weight: 700;
  margin: 1.5rem 0 1rem;
  color: #111827;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.ProseMirror h3, .prose h3 {
  font-size: 1.5rem;  /* 24px */
  font-weight: 600;
  margin: 1.25rem 0 0.75rem;
  color: #111827;
  line-height: 1.4;
}

.ProseMirror h4, .prose h4 {
  font-size: 1.25rem;  /* 20px */
  font-weight: 600;
  margin: 1rem 0 0.75rem;
  color: #111827;
  line-height: 1.5;
}

.ProseMirror p, .prose p {
  font-size: 1rem;  /* 16px */
  font-weight: 400;
  margin: 1rem 0;
  line-height: 1.75;
  color: #374151;
}

  .ProseMirror ul, .ProseMirror ol, .prose ul, .prose ol {
    padding-left: 1.5rem;
    margin: 1rem 0;
  }

  .ProseMirror ul, .prose ul {
    list-style-type: disc;
  }

  .ProseMirror ol, .prose ol {
    list-style-type: decimal;
  }

  .ProseMirror li, .prose li {
    margin: 0.5rem 0;
    padding-left: 0.5rem;
  }

  .ProseMirror table, .prose table {
    border-collapse: collapse;
    margin: 1.5rem 0;
    width: 100%;
    overflow-x: auto;
    display: block;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }

  .ProseMirror th, .ProseMirror td, .prose th, .prose td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem 1rem;
    text-align: left;
    min-width: 120px;
  }

  .ProseMirror th, .prose th {
    background-color: #f9fafb;
    font-weight: 600;
    color: #111827;
  }

  .ProseMirror blockquote, .prose blockquote {
    border-left: 4px solid #3b82f6;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    background-color: #f8fafc;
    border-radius: 0 0.5rem 0.5rem 0;
    color: #4b5563;
    font-style: italic;
  }

  .ProseMirror code, .prose code {
    background-color: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875em;
    color: #ef4444;
  }

  .ProseMirror pre, .prose pre {
    background-color: #1f2937;
    color: #f3f4f6;
    padding: 1.25rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  .ProseMirror pre code, .prose pre code {
    background-color: transparent;
    padding: 0;
    font-size: 0.875em;
    color: inherit;
    border: none;
  }

  .ProseMirror img, .prose img {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    border-radius: 0.75rem;
    display: block;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .ProseMirror mark, .prose mark {
    border-radius: 0.2em;
    padding: 0.1em 0.3em;
    margin: 0 0.1em;
  }

  .ProseMirror mark[data-color], .prose mark[data-color] {
    background-color: var(--highlight-color);
  }

  .editor-link, .prose a {
    color: #2563eb;
    text-decoration: underline;
    text-decoration-thickness: 0.1em;
    text-underline-offset: 0.2em;
    transition: all 0.2s ease;
  }

  .editor-link:hover, .prose a:hover {
    color: #1d4ed8;
  }

  .ProseMirror [style*="text-align:center"] {
    text-align: center;
  }

  .ProseMirror [style*="text-align:right"] {
    text-align: right;
  }

  .ProseMirror [style*="text-align:justify"] {
    text-align: justify;
  }

  .ProseMirror-focused {
    outline: none;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    color: #9ca3af;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
    font-style: italic;
  }

  /* Estilos para el resaltado personalizado */
  [style*="background-color"] {
    border-radius: 0.2em;
    padding: 0.1em 0.3em;
  }
`;
