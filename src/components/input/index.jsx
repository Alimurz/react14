import React from "react";
import styles from './styles.module.scss'
const Input = ({onChange, value}) => {
  return (
    <div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        type="text"
        className={styles["input"]}
      />
    </div>
  )
}

export default Input