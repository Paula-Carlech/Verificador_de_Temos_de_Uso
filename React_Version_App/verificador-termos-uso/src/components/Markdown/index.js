import React from 'react';
import ReactMarkdown from 'react-markdown';

function MarkdownHighlighter({ markdownText }) {

  const renderers = {
    heading: (props) => {
      const HeadingTag = `h${props.level}`;
      return <HeadingTag>{props.children}</HeadingTag>;
    },
    strong: (props) => {
      return <strong>{props.children}</strong>;
    },
    emphasis: (props) => {
      return <em>{props.children}</em>;
    },
  };

  return (
    <div>
      <ReactMarkdown components={renderers}>{markdownText}</ReactMarkdown>
    </div>
  );
}

export default MarkdownHighlighter;
