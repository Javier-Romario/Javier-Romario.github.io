import { useEffect, useMemo, useState } from 'react';
import { Input } from '@javierromario/neondeck';
import { Badge } from '@javierromario/neondeck';
import { Button } from '@javierromario/neondeck';
import { CATEGORIES, SHORTCUTS, type Category, type Shortcut } from './data/shortcuts';
import styles from './ShortcutExplorer.module.css';

const MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab']);

function tokens(keys: string): string[] {
  return keys
    .split('+')
    .flatMap((t) => t.split(' '))
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t && t !== 'then' && t !== '→');
}

export default function ShortcutExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'ALL' | Category>('ALL');
  const [capturing, setCapturing] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);

  // global key capture — when enabled, pressing a key filters to shortcuts using it
  useEffect(() => {
    if (!capturing) return;
    const onKey = (e: KeyboardEvent) => {
      if (MODIFIER_KEYS.has(e.key)) return;
      if (e.key.length > 1 && !/^[A-Za-z0-9]$/.test(e.key)) return; // skip pure specials
      setPressed(e.key);
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [capturing]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = SHORTCUTS;
    if (category !== 'ALL') list = list.filter((s) => s.category === category);
    if (q) {
      list = list.filter(
        (s) => s.keys.toLowerCase().includes(q) || s.action.toLowerCase().includes(q),
      );
    }
    if (pressed) {
      const p = pressed.toLowerCase();
      list = list.filter((s) => tokens(s.keys).includes(p));
    }
    return list;
  }, [query, category, pressed]);

  const renderKeys = (keys: string) =>
    keys
      .split('+')
      .filter((part) => part.trim() !== '')
      .map((part, i, arr) => (
        <span key={i} className={styles.keyGroup}>
          {part.split(' ').map((t, j) => (
            <kbd key={j} className={styles.keycap} data-hit={tokens(t).includes(pressed ?? '') ? 'true' : undefined}>
              {t}
            </kbd>
          ))}
          {i < arr.length - 1 ? <span className={styles.plus}>+</span> : null}
        </span>
      ));

  const grouped = useMemo(() => {
    const map = new Map<Category, Shortcut[]>();
    for (const s of results) {
      const arr = map.get(s.category) ?? [];
      arr.push(s);
      map.set(s.category, arr);
    }
    return Array.from(map.entries());
  }, [results]);

  return (
    <div className={`${styles.root} neondeck`}>
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Input
            label="SEARCH // keys or action"
            placeholder="e.g. bevel, loop cut, Ctrl+R…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPressed(null);
            }}
            caretChars="▮"
          />
        </div>
        <div className={styles.capture}>
          <Button theme={capturing ? 'PRIMARY' : 'SECONDARY'} onClick={() => { setCapturing(!capturing); setPressed(null); }}>
            {capturing ? '◉ CAPTURE ON — press a key' : '○ CAPTURE KEY'}
          </Button>
          {capturing && pressed ? (
            <span className={styles.pressed}>
              PRESSED: <kbd className={styles.keycap}>{pressed.toUpperCase()}</kbd>
              <button className={styles.clear} onClick={() => setPressed(null)}>✕</button>
            </span>
          ) : null}
        </div>
      </div>

      <div className={styles.chips}>
        <button
          className={category === 'ALL' ? `${styles.chip} ${styles.chipActive}` : styles.chip}
          onClick={() => setCategory('ALL')}
        >
          ALL
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={category === c ? `${styles.chip} ${styles.chipActive}` : styles.chip}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={styles.count}>
        <Badge>{results.length} SHORTCUTS</Badge>
        <span className={styles.hint}>
          {capturing
            ? 'type any key (or click a shortcut key) to see every binding that uses it'
            : 'default Blender 4.x keymap · macOS swaps Ctrl → Cmd'}
        </span>
      </div>

      <div className={styles.list}>
        {grouped.length === 0 ? (
          <div className={styles.empty}>NO MATCH — try another key or clear the search.</div>
        ) : (
          grouped.map(([cat, items]) => (
            <section key={cat} className={styles.group}>
              <h3 className={styles.groupHead}>{cat.toUpperCase()}</h3>
              {items.map((s) => (
                <div key={s.keys + s.action} className={styles.row}>
                  <div className={styles.keys}>{renderKeys(s.keys)}</div>
                  <div className={styles.action}>{s.action}</div>
                  {s.note ? <div className={styles.note}>{s.note}</div> : null}
                </div>
              ))}
            </section>
          ))
        )}
      </div>
    </div>
  );
}
