import React, { useEffect, useMemo, useRef, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import katex from "katex";
import "katex/dist/katex.min.css";
import styles from '../styles/EditorBlog.module.scss'

/*
    Command to install react-quill :-
    npm install react-quill --legacy-peer-deps
    Actually with react 17 there is some issue in react-quill so if you don't add 
    "-legacy-peer-deps" at the end then you will get error like below :
    "npm ERR! ERESOLVE unable to resolve dependency tree"
    And in details you will find "react-qill" is the reason behind that.
*/

const colors = ['#f3901d', '#ed5c57', '#00b050', '#52a7f9', '#b36ae2', '#fefd32',
    "#de6a19", "#c82613", '#0d882a', '#0c64c0', '#763e9b', '#ffd966',
    "#be5b17", "#861106", '#0e5c1b', '#174f86', '#5e317c', '#f1c232',
    "#005ff9", "#333333", '#747070', '#d9d9d9', '#f2f2f2', '#ffffff',
]


const Editor = ({ handlePreview, previousData }) => {
    let previousValue = "";
    const [editorText, setEditorText] = useState(previousValue);
    const quillRef = useRef(null);
    let QuillEditor = null;
    let Quill = null;
    let Image = null;
    let Delta = null;

    if (typeof window !== 'undefined') {
        QuillEditor = require('react-quill');
        Quill = QuillEditor.Quill;
        Image = Quill.import("formats/image");
        Delta = Quill.import('delta');
        window.katex = katex;
    }

    useEffect(() => {
        if (previousData && previousData != "") {
            const editor = quillRef.current.getEditor();
            editor.clipboard.dangerouslyPasteHTML(previousData);
            editor.setSelection(previousData.length);
        }
    }, [quillRef.current])

    const saveEditor = () => {
        let html = editorText;

        //For modifying videos 
        const hasIframe = true;
        const startIndex = 0;

        while (hasIframe) {
            const s = html.indexOf("<iframe", startIndex);
            if (s < 0) {
                hasIframe = false;
            } else {
                const e = html.indexOf("</iframe>", s) + 9;
                const subStr = html.substring(s, e);
                const srcS = subStr.indexOf('src="') + 5;
                const srcE = subStr.indexOf('"', srcS);
                const src = subStr.substring(srcS, srcE);
                const extension = src.slice(src.lastIndexOf(".") + 1);

                const embed = `
                <div class='ql-blog-video-div'>
                    <video class='ql-blog-video' controls  controlsList="nodownload" autoplay=${false}>
                    <source src=${src} type="video/${extension}">
                    Your browser does not support the video tag.
                    </video>
                </div>
                `
                html = [html.slice(0, s), embed, html.slice(e)].join('');
                startIndex = s + embed.length;
            }
        }

        //For modifying images
        const hasImage = true;
        const startImageIndex = 0;

        while (hasImage) {
            const s = html.indexOf("<img", startImageIndex);
            if (s < 0) {
                hasImage = false;
            } else {
                const e = html.indexOf(">", s) + 1;
                const subStr = html.substring(s, e);
                const srcS = subStr.indexOf('src="') + 5;
                const srcE = subStr.indexOf('"', srcS);
                const src = subStr.substring(srcS, srcE);
                // const extension = src.slice(src.lastIndexOf(".") + 1);
                const parentPStart = html.substring(0, s).lastIndexOf("<p");
                const parentPEnd = html.substring(e).indexOf("</p>") + 4 + e;
                const embed = `
                <div class='ql-blog-image-div'>
                    <img class='ql-blog-image' alt='image' src=${src}>
                </div>
                `
                html = [html.slice(0, parentPStart), embed, html.slice(parentPEnd)].join('');
                startImageIndex = parentPStart + embed.length;
            }
        }

        //For modifying links
        const hasLink = true;
        const startLinkIndex = 0;

        while (hasLink) {
            const s = html.indexOf("<a", startLinkIndex);
            if (s < 0) {
                hasLink = false;
            } else {
                const e = html.indexOf("</a>", s) + 4;
                const subStr = html.substring(s, e);
                //To find link
                const linkS = subStr.indexOf('href="') + 6;
                const linkE = subStr.indexOf('"', linkS);
                const link = subStr.substring(linkS, linkE);
                //To find selected text
                const selTextS = subStr.indexOf(">") + 1;
                const selTextE = subStr.indexOf("</a>");
                const seltext = subStr.substring(selTextS, selTextE)
                // const parentPStart = html.substring(0, s).lastIndexOf("<p");
                // const parentPEnd = html.substring(e).indexOf("</p>") + 4 + e;
                const embed = `
                <a class='ql-blog-link' href=${link} target='_blank'>${seltext}</a>
                `
                html = [html.slice(0, s), embed, html.slice(e)].join('');
                startLinkIndex = s + embed.length;
            }
        }
        if (html.endsWith("<p><br></p>")) {
            const i = html.lastIndexOf("<p><br></p>")
            html = html.substring(0, i);
        }
        // if (!html.endsWith("<br>")) {
        //     html += "<br>";
        // }

        handlePreview(html, editorText);
        //To get delta
        //console.log(quillRef.current.getEditor().getContents());
    }

    const imageHandler = () => {
        const editor = quillRef.current.getEditor();
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('image', file);

            // Save current cursor state
            const range = editor.getSelection(true);
            /*
            // Insert temporarily local image
            const tempUrl = window.URL.createObjectURL(file)
            const Image = Quill.import("formats/image")
            Image.sanitize = (tempUrl) => tempUrl
            editor.insertEmbed(range.index, 'image', tempUrl);

            // Move cursor to right side of image (easier to continue typing)
            editor.setSelection(range.index + 1);
            */
            try {
                const link = "https://iph.href.lu/200x200";
                /*
                // Remove placeholder image
                editor.deleteText(range.index, 1);
                */
                // Insert uploaded image
                editor.insertEmbed(range.index, "image", link);
                /*
                // Custom HTML element (but inline style and other attributes(like image height width etc.) don't work with it)
                const element = `<img alt='abc' src=${tempUrl} width="600" height="500" />`
                const element = `<p style="color: 'pink';">Image is uploading...</p>`
                editor.clipboard.dangerouslyPasteHTML(range.index, element);
                */
                // To move the cursor to next position if user haven't made any changes yet.
                if (range.index == editor.getSelection(true)?.index) {
                    editor.setSelection(range.index + 1);
                }
            } catch (err) {
                console.log("upload err:", err);
            }
        };
    };

    const videoHandler = () => {
        const editor = quillRef.current.getEditor();
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "video/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('video', file);

            // Save current cursor state
            const range = editor.getSelection(true);

            try {
                const link = "/images/123.mp4";
                // Insert uploaded image
                editor.insertEmbed(range.index, "video", link);
                // To move the cursor to next position if user haven't made any changes yet.
                if (range.index == editor.getSelection(true)?.index) {
                    editor.setSelection(range.index + 1);
                }
            } catch (err) {
                console.log("upload err:", err);
            }
        };
    }

    const linkHandler = (value) => {
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        if (range.length == 0) {
            alert('Please select a text first to make that a link.');
            return;
        } else {
            // alert("Please select a text to make it link.")
            var href = prompt('Enter the URL');
            editor.format('link', href);
            editor.setSelection(range.index + range.length);
        }
    }

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
                [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'align': [] }],
                ['link', 'image', 'video', "formula"],
                ['clean'],
            ],
            handlers: {
                image: imageHandler,
                video: videoHandler,
                link: linkHandler
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

    // const handleChange = (content, delta, source, editor) => {
    //     console.log(content);
    //     console.log(delta);
    //     console.log(source);
    //     console.log(editor.getContents().ops);
    // }

    if (QuillEditor) {
        return (
            <div className={styles.container}>
                <QuillEditor
                    ref={quillRef} // must pass ref here
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    placeholder="Write your content here."
                    value={editorText}
                    onChange={(val) => setEditorText(val)}
                    // onChange={handleChange}
                    style={{ backgroundColor: 'white' }}
                />
                <button className={styles.btnPreview} onClick={saveEditor}>Preview</button>
            </div>
        )
    } else {
        return <p>loading...</p>
    }
}

export default Editor;