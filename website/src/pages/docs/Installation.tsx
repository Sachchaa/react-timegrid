import { DocPage, DocH2, Prose } from "../../components/Doc";
import { InstallTabs } from "../../components/InstallTabs";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout } from "../../components/Callout";

export function Installation() {
  return (
    <DocPage
      category="Getting Started"
      title="Installation"
      lead="Install the package, import the stylesheet, and you're ready to render a calendar."
    >
      <DocH2 id="install">Install the package</DocH2>
      <InstallTabs />

      <Prose>
        <p>
          React 18 or 19 is required as a peer dependency. The only runtime dependency the library
          pulls in is <code>@internationalized/date</code> (~8 KB gzipped).
        </p>
      </Prose>

      <DocH2 id="styles">Import the styles</DocH2>
      <Prose>
        <p>
          The library ships a self-contained, precompiled stylesheet. Import it once — typically at
          your app&rsquo;s entry point:
        </p>
      </Prose>
      <CodeBlock
        filename="main.tsx"
        language="tsx"
        code={`import "@codesutra/react-timegrid/styles.css";`}
      />

      <Callout variant="tip" title="No Tailwind required">
        The stylesheet is fully self-contained. You do <strong>not</strong> need to install or
        configure Tailwind in your application to use the component.
      </Callout>

      <DocH2 id="tailwind">Already using Tailwind v4?</DocH2>
      <Prose>
        <p>
          If your app is on Tailwind v4, you can instead import the source stylesheet and let your
          own pipeline tree-shake the classes:
        </p>
      </Prose>
      <CodeBlock
        filename="styles.css"
        language="css"
        code={`@import "@codesutra/react-timegrid/src/styles.css";`}
      />

      <DocH2 id="verify">Verify it works</DocH2>
      <Prose>
        <p>Render the component to confirm everything is wired up correctly:</p>
      </Prose>
      <CodeBlock
        filename="App.tsx"
        language="tsx"
        code={`import { Calendar } from "@codesutra/react-timegrid";
import "@codesutra/react-timegrid/styles.css";

export default function App() {
  return <Calendar defaultView="month" />;
}`}
      />
    </DocPage>
  );
}
