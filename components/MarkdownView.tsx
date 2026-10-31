import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function MarkdownView({ source, titleColor }: { source: string; titleColor: string }) {
  const lines = source.replace(/\r/g, "").split("\n");
  const out: ReactNode[] = [];
  let ul: string[] = [];
  let ol: string[] = [];

  const flush = (key: number) => {
    if (ul.length) {
      out.push(
        <ul key={`ul${key}`} className="my-2 list-disc pl-6">
          {ul.map((t, i) => <li key={i}>{inline(t)}</li>)}
        </ul>
      );
      ul = [];
    }
    if (ol.length) {
      out.push(
        <ol key={`ol${key}`} className="my-2 list-decimal pl-6">
          {ol.map((t, i) => <li key={i}>{inline(t)}</li>)}
        </ol>
      );
      ol = [];
    }
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    let m: RegExpMatchArray | null;

    if ((m = line.match(/^-\s+(.*)/)) || (m = line.match(/^\*\s+(.*)/))) {
      if (ol.length) flush(i);
      ul.push(m[1]);
      return;
    }
    if ((m = line.match(/^\d+[.)]\s+(.*)/))) {
      if (ul.length) flush(i);
      ol.push(m[1]);
      return;
    }
    flush(i);

    if ((m = line.match(/^###\s+(.*)/))) {
      out.push(<h3 key={i} className="mb-1 mt-4 text-[13pt] font-semibold" style={{ color: titleColor }}>{inline(m[1])}</h3>);
    } else if ((m = line.match(/^##\s+(.*)/))) {
      out.push(<h2 key={i} className="mb-1 mt-5 text-[15pt] font-semibold" style={{ color: titleColor }}>{inline(m[1])}</h2>);
    } else if ((m = line.match(/^#\s+(.*)/))) {
      out.push(<h1 key={i} className="mb-3 mt-2 text-[20pt] font-bold" style={{ color: titleColor }}>{inline(m[1])}</h1>);
    } else if (/^---+$/.test(line.trim())) {
      out.push(<hr key={i} className="my-3 border-gray-300" />);
    } else if (line.trim() === "") {
      return;
    } else {
      out.push(<p key={i} className="my-2 text-[11pt] leading-relaxed">{inline(line)}</p>);
    }
  });
  flush(lines.length);

  return <>{out}</>;
}
