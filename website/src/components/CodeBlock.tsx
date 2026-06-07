import { Highlight, type PrismTheme } from "prism-react-renderer";
import { CopyButton } from "./CopyButton";

/** Token theme wired to CSS variables so it follows light/dark instantly. */
const codeTheme: PrismTheme = {
  plain: { color: "var(--code-fg)", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "var(--code-comment)", fontStyle: "italic" } },
    { types: ["keyword", "builtin", "boolean-keyword", "module", "control-flow"], style: { color: "var(--code-keyword)" } },
    { types: ["string", "char", "attr-value", "template-string", "inserted"], style: { color: "var(--code-string)" } },
    { types: ["function", "function-variable", "method"], style: { color: "var(--code-func)" } },
    { types: ["number", "boolean"], style: { color: "var(--code-number)" } },
    { types: ["constant", "symbol"], style: { color: "var(--code-number)" } },
    { types: ["class-name", "maybe-class-name", "known-class-name"], style: { color: "var(--code-prop)" } },
    { types: ["variable", "property", "parameter"], style: { color: "var(--code-prop)" } },
    { types: ["tag", "selector"], style: { color: "var(--code-tag)" } },
    { types: ["attr-name"], style: { color: "var(--code-attr)" } },
    { types: ["punctuation", "operator"], style: { color: "var(--code-punc)" } },
  ],
};

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  className = "",
}: {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}) {
  const trimmed = code.replace(/\n$/, "");

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border bg-[#fbfbfd] dark:bg-[#0c0c10] ${className}`}
    >
      {filename ? (
        <div className="flex items-center justify-between border-b border-border/80 bg-muted/50 px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">{filename}</span>
          <CopyButton value={trimmed} className="h-7 w-7" />
        </div>
      ) : (
        <div className="absolute right-2.5 top-2.5 z-10 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <CopyButton value={trimmed} />
        </div>
      )}

      <Highlight code={trimmed} language={language} theme={codeTheme}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="overflow-x-auto p-4 text-[0.82rem] leading-relaxed"
            style={{ ...style, fontFamily: "var(--font-mono)" }}
          >
            <code className="font-mono">
              {tokens.map((line, i) => {
                const { key, ...lineProps } = getLineProps({ line });
                return (
                  <div key={i} {...lineProps}>
                    {line.map((token, k) => {
                      const { key: tk, ...tokenProps } = getTokenProps({ token });
                      return <span key={k} {...tokenProps} />;
                    })}
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
