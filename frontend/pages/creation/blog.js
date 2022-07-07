import React from 'react'
import styles from '../../styles/creation/CreationBlog.module.scss'
import Editor from '../../components/Editor'

const blog = () => {
  return (
    <div className={styles.container}>
      <Editor />
    </div>
  )
}

export default blog