import React from 'react';
import ReactMarkdown from 'react-markdown';

function MarkdownHighlighter({ markdownText }) {
  const regex = /(\*\*.*?\*\*|__.*?__|\*.*?\*|_.*?_|\[.*?\]\(.*?\)|#.*?#)/g;

  const paragraphs = markdownText.split('\n\n');

  return (
    <div>
      {paragraphs.map((paragraph, index) => {
        const hasMarkdown = paragraph.match(regex);

        if (hasMarkdown) {
          return (
            <div key={index}>
              <ReactMarkdown>{paragraph}</ReactMarkdown>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export default MarkdownHighlighter;
