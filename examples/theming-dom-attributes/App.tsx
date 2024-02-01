import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

export default function App() {
  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({
    // Sets attributes on DOM elements in the editor.
    domAttributes: {
      // Adds a class to all `blockContainer` elements.
      blockContainer: {
        class: "block-container",
      },
    },
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} theme={"{{ getTheme(isDark) }}"} />;
}
