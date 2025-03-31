'use client';
// third-party imports
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Card } from '@mui/material';

// internal imports
import ToolbarTextEditor from './ToolbarTextEditor';

export const SymbolsExtension = Extension.create({
  name: 'checkmark',

  addCommands() {
    return {
      insertCheckmark:
        () =>
        ({ commands }) => {
          return commands.insertContent('✔️');
        },
      insertCrossmark:
        () =>
        ({ commands }) => {
          return commands.insertContent('❌');
        },
    };
  },
});

const TiptapEditor = ({ value, onChange, error, placeholder, setValue }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'bulletList', 'listItem'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'tiptap-image',
        },
      }),
      SymbolsExtension,
    ],
    content: value || `<p>${placeholder}</p>`,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Capture content change
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
  });

  React.useEffect(() => {
    if (editor && (value === '' || value === undefined)) {
      editor.commands.setContent(`<p>${placeholder}</p>`); // Clear editor
    }
  }, [value, editor]);

  return (
    <>
      <ToolbarTextEditor editor={editor} />

      <Card
        variant="outlined"
        sx={(theme) => ({
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: 'none',
          border: error && '1px solid #f44336',
          borderRadius: '0 0 6px 6px',
          bgcolor:
            theme.palette.mode === 'light'
              ? '		rgba(211,211,211,0.1)'
              : '		rgba(136,136,136, 0.1)',

          '& .tiptap-editor': {
            p: 2,
            maxHeight: '360px',
            overflowY: 'auto',
          },

          '& .tiptap-editor:focus': {
            outline: 'none !important',
          },

          '& .tiptap-editor ul, & .tiptap-editor ol': {
            pl: '20px',
          },

          '& .tiptap-image': {
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
          },
        })}
      >
        <EditorContent editor={editor} />
      </Card>
    </>
  );
};

export default TiptapEditor;
