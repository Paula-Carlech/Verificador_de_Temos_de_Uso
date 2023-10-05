import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Markdown.css';

function MarkdownHighlighter({ markdownText }) {
  const regex = /(\*\*.*?\*\*|__.*?__|\*.*?\*|_.*?_|\[.*?\]\(.*?\)|#.*?#)/g;

  const paragraphs = markdownText.split('\n');

  return (
    <div className='resultado'>
      {paragraphs.map((paragraph, index) => {
        const hasMarkdown = paragraph.match(regex);

        if (hasMarkdown) {
          return (
            <p key={index}>
              <ReactMarkdown>{paragraph}</ReactMarkdown>
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

export default MarkdownHighlighter;
