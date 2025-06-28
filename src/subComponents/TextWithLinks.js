import React from 'react';
import { Link } from 'react-router-dom';

const TextWithLinks = ({ text }) => {
  const processText = (inputText) => {
    if (!inputText) return null;

    const lines = inputText.split('\n');
    const result = [];
    let currentKey = 0;

    lines.forEach((line) => {
      let processedLine = line.replace(/^\*\s+/, '').replace(/`+/g, '');
      const formattedSegments = [];
      let placeholderIndex = 0;

      const boldRegex = /\*\*([^*]+)\*\*/g;
      processedLine = processedLine.replace(boldRegex, (_, content) => {
        const placeholder = `__BOLD_${placeholderIndex}__`;
        formattedSegments[placeholderIndex] = { type: 'bold', content };
        placeholderIndex++;
        return placeholder;
      });

      const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+|mailto:[^\s]+|\/[^\s]+)\)/g;
      processedLine = processedLine.replace(markdownLinkRegex, (_, text, url) => {
        const placeholder = `__LINK_${placeholderIndex}__`;
        formattedSegments[placeholderIndex] = { type: 'link', text, url };
        placeholderIndex++;
        return placeholder;
      });

      const urlAndEmailRegex = /\b(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g;
      processedLine = processedLine.replace(urlAndEmailRegex, (match) => {
        if (!formattedSegments.some(seg => seg.url === match)) {
          const placeholder = `__URL_${placeholderIndex}__`;
          const isEmail = match.includes('@') && !match.startsWith('http');
          formattedSegments[placeholderIndex] = {
            type: isEmail ? 'email' : 'url',
            url: isEmail ? `mailto:${match}` : match.startsWith('www.') ? `https://${match}` : match,
            text: match,
          };
          placeholderIndex++;
          return placeholder;
        }
        return match;
      });

      const lineResult = [];
      let lastIndex = 0;
      const placeholderRegex = /__(?:BOLD|LINK|URL)_(\d+)__/g;
      let match;

      while ((match = placeholderRegex.exec(processedLine)) !== null) {
        if (match.index > lastIndex) {
          lineResult.push(
            <React.Fragment key={currentKey++}>
              {processedLine.substring(lastIndex, match.index)}
            </React.Fragment>
          );
        }

        const segment = formattedSegments[parseInt(match[1], 10)];

        if (segment.type === 'bold') {
          lineResult.push(
            <strong key={currentKey++} className="font-bold">
              {segment.content}
            </strong>
          );
        } else if (segment.type === 'link') {
          if (segment.url.startsWith('/')) {
            lineResult.push(
              <Link
                key={currentKey++}
                to={segment.url}
                className="text-blue-400 underline hover:text-blue-500 transition-colors"
              >
                {segment.text}
              </Link>
            );
          } else {
            lineResult.push(
              <a
                key={currentKey++}
                href={segment.url}
                target={segment.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={segment.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="text-blue-400 underline hover:text-blue-500 transition-colors break-all"
              >
                {segment.text}
              </a>
            );
          }
        } else if (segment.type === 'url' || segment.type === 'email') {
          lineResult.push(
            <a
              key={currentKey++}
              href={segment.url}
              target={segment.type === 'email' ? undefined : '_blank'}
              rel={segment.type === 'email' ? undefined : 'noopener noreferrer'}
              className="text-blue-400 underline hover:text-blue-500 transition-colors break-all"
            >
              {segment.text}
            </a>
          );
        }

        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < processedLine.length) {
        lineResult.push(
          <React.Fragment key={currentKey++}>
            {processedLine.substring(lastIndex)}
          </React.Fragment>
        );
      }

      result.push(
        <div key={currentKey++} className="leading-relaxed">
          {lineResult}
        </div>
      );
    });

    return result;
  };

  return <div className="space-y-2">{processText(text)}</div>;
};

export default TextWithLinks;
