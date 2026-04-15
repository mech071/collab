"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function Editor({ initialContent, onUpdate }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getJSON());
    },
  });

  // Prevent stale content on first load
  useEffect(() => {
    if (editor && initialContent) {
      const currentContent = editor.getJSON();

      if (JSON.stringify(currentContent) !== JSON.stringify(initialContent)) {
        editor.commands.setContent(initialContent);
      }
    }
  }, [initialContent, editor]);

  if (!editor) return null;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-black/10 bg-white text-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#0f1d31] dark:text-slate-100">
      <div className="flex flex-wrap gap-2 border-b border-black/10 bg-[#fcfbf7] px-4 py-3 dark:border-white/10 dark:bg-[#12233a]">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded-md px-3 py-2 text-sm transition ${
            editor.isActive("bold")
              ? "bg-slate-950 text-white dark:bg-sky-400 dark:text-slate-950"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#1a2f4d] dark:text-slate-200 dark:hover:bg-[#234066]"
          }`}
        >
          <b>B</b>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded-md px-3 py-2 text-sm transition ${
            editor.isActive("italic")
              ? "bg-slate-950 text-white dark:bg-sky-400 dark:text-slate-950"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#1a2f4d] dark:text-slate-200 dark:hover:bg-[#234066]"
          }`}
        >
          <i>I</i>
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`rounded-md px-3 py-2 text-sm transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-slate-950 text-white dark:bg-sky-400 dark:text-slate-950"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#1a2f4d] dark:text-slate-200 dark:hover:bg-[#234066]"
          }`}
        >
          H2
        </button>
      </div>

      <div className="min-h-[75vh] px-6 py-8 sm:px-10">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
