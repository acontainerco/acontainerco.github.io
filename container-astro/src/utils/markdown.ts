import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

export function renderMarkdown(value: string | undefined): string {
  if (!value) return '';
  return md.render(value);
}
