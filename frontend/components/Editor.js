import React, { useEffect, useRef, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import katex from "katex";
import "katex/dist/katex.min.css";

const QuillEditor = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
/*
  Here we are importing react-quill dynamically and storing it in a variable "QuillEditor". 
  Unlike regular import modules, dynamic imports are flexible about when and how they are loaded. 
  Instead of being forced to load the module file at read time, dynamic imports can be requested 
  at the time of use. By code splitting the module into a separate bundle file it can be fetched 
  separately which reduces the initial page load.
  Here "ssr: false" is used to disable server-rendering which is part of . 
  This is useful if an external dependency or component relies on browser APIs like 'window'.
*/

const Editor = () => {
    let previousValue = "";
    const [editorText, setEditorText] = useState(previousValue);
    useEffect(() => {
        window.katex = katex;
    }, []);

    const quillRef = useRef();
    const saveEditor = () => {
        console.log(editorText);
        //Final editor content on click of save button.
    }

    const imageHandler = () => {
        // get editor
        const editor = quillRef.current.getEditor();
        console.log(editor);

        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            try {
                const link = "";
                //In the above line make an API call, save the "file" on server 
                //and get the link and finally store that in the "link" variable.
                editor.insertEmbed(editor.getSelection(), "image", link);
            } catch (err) {
                console.log("upload err:", err);
            }
        };
    };

    const aaa = (val) => {
        setEditorText(val);
    }

    const modules = {
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
            // handlers: {
            //     image: imageHandler
            // }
        },
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }
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

    return (
        <>
            <QuillEditor
                ref={quillRef} // must pass ref here
                modules={modules}
                formats={formats}
                theme="snow"
                placeholder="Write your content here."
                value={editorText}
                onChange={aaa}
                style={{ backgroundColor: 'white' }}
            />
            <button onClick={saveEditor}>Save</button>
        </>
    )
}

export default Editor