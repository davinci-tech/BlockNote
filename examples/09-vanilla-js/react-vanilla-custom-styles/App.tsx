import {
  BlockNoteEditor,
  createStyleSpec,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  defaultStyleSpecs,
} from "@blocknote/core";
import {
  BlockNoteView,
  FormattingToolbarController,
  FormattingToolbarProps,
  ToolbarButton,
  ToolbarWrapper,
  useActiveStyles,
  useBlockNote,
  useBlockNoteEditor,
} from "@blocknote/react";
import "@blocknote/react/style.css";

const small = createStyleSpec(
  {
    type: "small",
    propSchema: "boolean",
  },
  {
    render: () => {
      const small = document.createElement("small");

      return {
        dom: small,
        contentDOM: small,
      };
    },
  }
);

const fontSize = createStyleSpec(
  {
    type: "fontSize",
    propSchema: "string",
  },
  {
    render: (value) => {
      const span = document.createElement("span");
      span.style.fontSize = value;

      return {
        dom: span,
        contentDOM: span,
      };
    },
  }
);

type MyEditorType = BlockNoteEditor<
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  {
    small: (typeof small)["config"];
    fontSize: (typeof fontSize)["config"];
  }
>;

const CustomFormattingToolbar = (props: FormattingToolbarProps) => {
  // TODO: any
  const editor: any = useBlockNoteEditor();
  const activeStyles = useActiveStyles(editor);

  return (
    <ToolbarWrapper>
      <ToolbarButton
        mainTooltip={"small"}
        onClick={() => {
          editor.toggleStyles({
            small: true,
          });
        }}
        isSelected={activeStyles.small}>
        Small
      </ToolbarButton>
      <ToolbarButton
        mainTooltip={"font size"}
        onClick={() => {
          editor.toggleStyles({
            fontSize: "30px",
          });
        }}
        isSelected={!!activeStyles.fontSize}>
        Font size
      </ToolbarButton>
    </ToolbarWrapper>
  );
};

export default function App() {
  const editor = useBlockNote(
    {
      styleSpecs: {
        ...defaultStyleSpecs,
        small,
        fontSize,
      },
      initialContent: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "large text",
              styles: {
                fontSize: "30px",
              },
            },
            {
              type: "text",
              text: "small text",
              styles: {
                small: true,
              },
            },
          ],
        },
      ],
    },
    []
  );

  return (
    <BlockNoteView className="root" editor={editor}>
      <FormattingToolbarController
        formattingToolbar={CustomFormattingToolbar}
      />
    </BlockNoteView>
  );
}
