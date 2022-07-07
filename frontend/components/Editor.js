import React, { useEffect, useMemo, useRef, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import katex from "katex";
import "katex/dist/katex.min.css";

const Editor = () => {
    let previousValue = "";
    const [editorText, setEditorText] = useState(previousValue);
    const quillRef = useRef(null);
    let QuillEditor = null;

    if (typeof window !== 'undefined') {
        QuillEditor = require('react-quill');
        window.katex = katex;
    }

    const saveEditor = () => {
        console.log(editorText);
        //Final editor content on click of save button.
    }

    const imageHandler = () => {
        // get editor
        const editor = quillRef.current.getEditor();
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            try {
                const link = "https://iph.href.lu/200x200";
                //In the above line make an API call, save the "file" on server 
                //and get the link and finally store that in the "link" variable.
                editor.insertEmbed(editor.getSelection(), "image", link);
            } catch (err) {
                console.log("upload err:", err);
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'align': [] }],
                ['link', 'image', 'video', "formula"],
                ['clean'],
            ],
            handlers: {
                image: imageHandler
            }
        },
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }), []);

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code-block',
        'script',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'formula',
        'background',
        'color',
        'align',
        'direction',
        'indent'
    ]

    if (QuillEditor) {
        return (
            <>
                <QuillEditor
                    ref={quillRef} // must pass ref here
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    placeholder="Write your content here."
                    value={editorText}
                    onChange={(val) => setEditorText(val)}
                    style={{ backgroundColor: 'white' }}
                />
                <button onClick={saveEditor}>Save</button>
            </>
        )
    } else {
        return <textarea value={editorText} onChange={(val) => setEditorText(val)} />
    }
}

export default Editor