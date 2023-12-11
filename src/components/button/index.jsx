import React from "react";
import styles from './styles.module.scss'

const Button = ({children, onClick}) => {
  return (
    <div>
      <button onClick={onClick} className={styles["btn"]}>
        {children}
      </button>
    </div>
  )
}

export default Button