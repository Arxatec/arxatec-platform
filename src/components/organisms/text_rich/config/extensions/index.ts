import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import HardBreak from "@tiptap/extension-hard-break";
import { Node, Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

const lowlight = createLowlight(common);

// Nodo personalizado para párrafos
const CustomParagraph = Node.create({
  name: "paragraph",
  priority: 1000, // Prioridad alta para sobrescribir el párrafo por defecto

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: "block", // Pertenece al grupo de bloques
  content: "inline*", // Puede contener contenido en línea

  parseHTML() {
    return [{ tag: "p" }]; // Parsear etiquetas <p>
  },

  renderHTML({ HTMLAttributes }) {
    return ["p", HTMLAttributes, 0]; // Renderizar como <p>
  },

  addCommands() {
    return {
      setParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name); // Comando para establecer párrafo
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("customParagraphBehavior"),
        appendTransaction: (transactions, oldState, newState) => {
          if (!transactions.some((tr) => tr.docChanged)) return null; // Solo si hay cambios
          return null;
        },
      }),
    ];
  },
});

// Extensión personalizada para manejar el comportamiento de Enter
const CustomEnterBehavior = Extension.create({
  name: "customEnterBehavior",

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const editor = this.editor;
        const { selection } = editor.state;
        const { $from } = selection;

        // Detecta si el cursor está en una lista
        const isBulletList = editor.isActive("bulletList");
        const isOrderedList = editor.isActive("orderedList");
        const isInList = isBulletList || isOrderedList;

        if (isInList) {
          const node = $from.node();
          const isEmpty = node.textContent.trim() === "";

          // Si la lista está vacía, la convierte en párrafo
          if (isEmpty) {
            if (isBulletList) {
              return editor
                .chain()
                .focus()
                .toggleBulletList()
                .setParagraph()
                .run();
            } else if (isOrderedList) {
              return editor
                .chain()
                .focus()
                .toggleOrderedList()
                .setParagraph()
                .run();
            }
          }
          return false; // Si no está vacía, comportamiento por defecto
        }

        // No hace nada especial en bloques de código o tablas
        const isCodeBlock = editor.isActive("codeBlock");
        const isTable = editor.isActive("table");

        if (isCodeBlock || isTable) {
          return false;
        }

        // Inserta un nuevo párrafo limpio fuera de listas/código/tabla
        return editor
          .chain()
          .focus()
          .insertContent({ type: "paragraph" })
          .unsetAllMarks()
          .unsetTextAlign()
          .unsetColor()
          .unsetHighlight()
          .unsetFontFamily()
          .run();
      },
      "Shift-Enter": () => {
        // Inserta salto de línea duro
        return this.editor.chain().focus().setHardBreak().run();
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("customEnterHandling"),
        props: {
          handleKeyDown: (view, event) => {
            if (event.key !== "Enter") {
              return false;
            }

            const state = view.state;
            const { selection } = state;
            const { $from } = selection;

            // Permite comportamiento normal en listas
            if ($from.parent.type.name === "listItem") {
              return false;
            }

            // Permite comportamiento normal en código y tablas
            const { codeBlock, table } = state.schema.nodes;
            if (
              $from.parent.type === codeBlock ||
              $from.parent.type === table
            ) {
              return false;
            }

            // Para otros casos, usa el manejador personalizado
            return true;
          },
        },
      }),
    ];
  },
});

export const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4],
    },
    paragraph: false,
    bulletList: false,
    orderedList: false,
    listItem: false,
    blockquote: false,
    codeBlock: false,
    hardBreak: false,
  }),
  CustomParagraph,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
    defaultAlignment: "left",
  }),
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  FontFamily,
  CustomEnterBehavior,
  HardBreak.configure({
    keepMarks: true,
    HTMLAttributes: {
      class: "editor-break",
    },
  }),
  Underline,
  Image.configure({
    HTMLAttributes: {
      class: "editor-image",
      loading: "lazy",
      crossorigin: "anonymous",
    },
    allowBase64: true,
    inline: true,
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "editor-link",
      rel: "noopener noreferrer",
    },
    validate: (href: string) => /^https?:\/\//.test(href),
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: "editor-table",
    },
  }),
  TableRow,
  TableCell,
  TableHeader,
  CharacterCount,
  Placeholder.configure({
    placeholder: "Escribe tu contenido aquí...",
  }),
  TextStyle,
  Typography,
  Youtube.configure({
    controls: true,
    nocookie: true,
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: "editor-ul",
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "editor-ol",
    },
  }),
  ListItem,
];
