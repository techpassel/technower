import React, { useEffect, useState } from 'react'
import styles from '../../styles/creation/CreationBlog.module.scss'
import Editor from '../../components/Editor'
import Parser from 'html-react-parser';

const blog = () => {
  const [preview, setPreview] = useState(false);
  const [content, setContent] = useState();
  const [rawElement, setRawElement] = useState("");

  const handlePreview = (elem, rawElement) => {
    // console.log(rawElement);
    // console.log(elem);
    setPreview(true);
    setContent(elem);
    setRawElement(rawElement);
  };

  useEffect(() => {
    // handlePreview(aaa)
  }, []);

  const aaa = `
  <p>Aman Saurabh</p>
  <div class='ql-blog-image-div'>
    <img class='ql-blog-image' alt='image' src=https://iph.href.lu/200x200>
  </div>
  <p>This is a sample video.</p>
  <div class='ql-blog-video-div'>
    <video class='ql-blog-video' controls  controlsList="nodownload" autoplay=false>
        <source src=/images/123.mp4 type="video/mp4">
        Your browser does not support the video tag.
    </video>
  </div>
  <p>This is a sample link.</p>
  <a class='ql-blog-link' href=https://www.w3schools.com/jsref/jsref_slice_string.asp target='_blank'>Google is my Favourite.</a>
  <p>Now let's end up this blog.</p>
  <p><br></p>
  `

  return (
    <div className={styles.container}>
      {
        preview ? (
          <div className={styles.previewContainer}>
          <div className={styles.previewBlog}>{Parser(content)}</div>
          <div className={styles.buttons}>
            <button className={styles.btnEdit} onClick={() => setPreview(false)}>Edit</button>
            <button className={styles.btnSave}>Save</button>
            <button className={styles.btnPublish}>Publish</button>
          </div>
        </div>
        ) :
          (
            <Editor handlePreview={handlePreview} previousData={rawElement} />
          )
      }
      {/* {content && (
        <div className={styles.previewContainer}>
          <div className={styles.previewBlog}>{Parser(content)}</div>
          <div className={styles.buttons}>
            <button className={styles.btnEdit}>Edit</button>
            <button className={styles.btnSave}>Save</button>
            <button className={styles.btnPublish}>Publish</button>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default blog