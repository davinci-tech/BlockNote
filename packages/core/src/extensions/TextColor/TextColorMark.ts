import { Mark } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textColor: {
      setTextColor: (color: string) => ReturnType;
      unsetTextColor: () => ReturnType;
    };
  }
}

export const TextColor = Mark.create({
  name: "textColor",

  addAttributes() {
    return {
      color: {
        default: undefined,
        parseHTML: (element) => element.getAttribute("data-text-color"),
        renderHTML: (attributes) => ({
          "data-text-color": attributes.color,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          if (typeof element === "string") {
            return false;
          }

          if (element.hasAttribute("data-text-color")) {
            return { color: element.getAttribute("data-text-color") };
          }

          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setTextColor:
        (color) =>
        ({ commands }) => {
          return commands.setMark(this.name, { color: color });
        },
      unsetTextColor:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
