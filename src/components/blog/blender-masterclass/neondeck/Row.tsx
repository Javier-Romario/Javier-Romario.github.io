import styles from './Row.module.css';

import * as React from 'react';

type RowProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Row: React.FC<RowProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.row} {...rest}>
      {children}
    </div>
  );
};

export default Row;
