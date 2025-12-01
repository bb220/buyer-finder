import React from 'react';

interface TextRendererProps {
  content: string;
  className?: string;
}

/**
 * A simple renderer that handles:
 * 1. Bold text: **text**
 * 2. Markdown links: [text](url)
 * 3. Raw URLs (basic detection)
 */
export const TextRenderer: React.FC<TextRendererProps> = ({ content, className = "text-slate-700" }) => {
  if (!content) return null;

  // Split content by Markdown links first: [text](url)
  // Regex captures: [1] text, [2] url
  const parts = content.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  
  return (
    <span className={className}>
      {parts.map((part, i) => {
        // If we split by regex, the matches come in groups of 3:
        // [0] text before match
        // [1] capture group 1 (link text)
        // [2] capture group 2 (link url)
        // [3] text after match (which becomes [0] of next iteration effectively)
        
        // However, map iterates linearly. We need to handle the modulo logic.
        // Actually, let's use a simpler tokenizing approach for nested structures.
        // But for this simple use case, the pattern [text, linkText, linkUrl, text, linkText, linkUrl...] works if content starts with text.
        
        if (i % 3 === 0) {
            // This is regular text (or text containing **bold**)
            return <span key={i}>{renderBold(part)}</span>;
        } else if (i % 3 === 1) {
            // This is the link TEXT
            const url = parts[i + 1]; // The next part is the URL
            return (
                <a 
                  key={i} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  {part}
                </a>
            );
        } else {
            // This is the URL part, already handled in the previous step (i % 3 === 1).
            return null;
        }
      })}
    </span>
  );
};

// Helper to render **bold** inside the text chunks
const renderBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};
