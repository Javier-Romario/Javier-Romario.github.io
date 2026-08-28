import styles from './Dialog.module.css';

import * as React from 'react';
import Button from './Button';

interface DialogProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Dialog: React.FC<DialogProps> = ({ title, children, style, onConfirm, onCancel }) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog} style={style}>
        {title ? <header className={styles.header}>{title}</header> : null}
        <div className={styles.body}>{children}</div>
        <footer className={styles.footer}>
          <Button theme="SECONDARY" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>OK</Button>
        </footer>
      </div>
    </div>
  );
};

export default Dialog;
