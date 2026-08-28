'use client';

import styles from '@components/NeoAccordion.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoAccordionProps {
  defaultValue?: boolean;
  title: string;
  meta?: string;
  children?: React.ReactNode;
  tone?: NeonTone;
}

const NeoAccordion: React.FC<NeoAccordionProps> = ({
  defaultValue = false,
  title,
  meta,
  children,
  tone = 'teal',
}) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(defaultValue);

  return (
    <div className={styles.accordion} data-tone={tone} data-expanded={isExpanded ? 'true' : 'false'}>
      <button
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className={styles.glyph} aria-hidden="true">
          {isExpanded ? '▾' : '▸'}
        </span>
        <span className={styles.title}>{title}</span>
        {meta ? <span className={styles.meta}>{meta}</span> : null}
        <span className={styles.state} aria-hidden="true">
          {isExpanded ? 'OPEN' : 'CLOSED'}
        </span>
      </button>
      {isExpanded ? <div className={styles.body}>{children}</div> : null}
    </div>
  );
};

export default NeoAccordion;
