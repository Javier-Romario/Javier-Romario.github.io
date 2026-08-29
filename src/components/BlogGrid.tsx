'use client';

import * as React from 'react';
import { flushSync } from 'react-dom';

interface PostLink {
  slug: string;
  title: string;
  tag: string;
  updated: string;
  href: string;
}

interface SeriesCard {
  id: string;
  title: string;
  blurb: string;
  tone: string;
  tag: string;
  glyph: string;
  label: string;
  updated: string;
  parts: number;
  href: string | null;
  posts: PostLink[];
}

function Cover({ glyph, label }: { glyph: string; label: string }) {
  return (
    <svg className="series-cover" viewBox="0 0 320 180" role="img" aria-label={`${label} — ${glyph}`}>
      <polygon className="series-cover__hex" points="160,28 205,54 205,106 160,132 115,106 115,54" />
      <text className="series-cover__glyph" x="160" y="84" textAnchor="middle" dominantBaseline="central">
        {glyph}
      </text>
      <text className="series-cover__label" x="160" y="160" textAnchor="middle">{label}</text>
    </svg>
  );
}

const BlogGrid: React.FC<{ seriesList: SeriesCard[] }> = ({ seriesList }) => {
  const [focusedId, setFocusedId] = React.useState<string | null>(null);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [namesOn, setNamesOn] = React.useState(false);
  const activeTransitionRef = React.useRef<ReturnType<typeof document.startViewTransition> | null>(null);

  // Focused article jumps to the top of the grid.
  const ordered = React.useMemo(() => {
    if (!focusedId) return seriesList;
    return [...seriesList].sort((a, b) => (a.id === focusedId ? -1 : b.id === focusedId ? 1 : 0));
  }, [seriesList, focusedId]);

  const toggle = (id: string) => {
    const willExpand = expandedId !== id;

    const apply = () => {
      flushSync(() => {
        setFocusedId(willExpand ? id : null);
        setExpandedId(willExpand ? id : null);
      });
    };

    if (typeof document.startViewTransition !== 'function') {
      apply();
      return;
    }

    // Give cards view-transition-name just for this in-page transition so the
    // browser morphs reorder + expand + reflow. Clear after so it doesn't
    // leak into cross-page transitions.
    flushSync(() => setNamesOn(true));
    const vt = document.startViewTransition(apply);
    activeTransitionRef.current = vt;
    vt.finished
      .catch(() => {})
      .finally(() => {
        if (activeTransitionRef.current === vt) activeTransitionRef.current = null;
        flushSync(() => setNamesOn(false));
      });
  };

  // A post link inside a just-expanded card can be clicked while this
  // in-page transition is still animating. Skip it immediately so it can't
  // still be active when ClientRouter starts its own document.startViewTransition
  // for the page navigation (two native transitions racing on one document).
  const settleBeforeNavigate = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('a')) {
      activeTransitionRef.current?.skipTransition();
    }
  };

  return (
    <div className="blog-grid" onPointerDown={settleBeforeNavigate}>
      {ordered.map((s) => {
        const expanded = expandedId === s.id && s.parts > 1;
        const multi = s.parts > 1;
        const cardStyle = {
          ...(namesOn ? { viewTransitionName: `blog-card-${s.id}` } : {}),
          ...(expanded ? { gridColumn: '1 / -1' } : {}),
        };

        const cover = <Cover glyph={s.glyph} label={s.label} />;
        const text = (
          <div className="article-card__text">
            <h2 className="article-card__title">{s.title}</h2>
            <p className="article-card__desc">{s.blurb}</p>
            <div className="article-card__meta">
              <span className="article-card__updated">
                <span className="article-card__updated-label">Last updated</span>
                <time className="article-card__updated-date">{s.updated}</time>
              </span>
              {multi && <span className="article-card__chevron" aria-hidden="true">▸</span>}
            </div>
          </div>
        );

        return (
          <div
            key={s.id}
            className="article-card"
            data-card={s.id}
            data-tone={s.tone}
            data-expanded={expanded ? 'true' : 'false'}
            style={cardStyle}
          >
            {multi ? (
              <>
                <div
                  className="article-card__summary"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggle(s.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(s.id);
                    }
                  }}
                >
                  {cover}
                  {text}
                </div>
                {expanded && (
                  <div className="article-card__body">
                    <ol className="article-pages">
                      {s.posts.map((p) => (
                        <li key={p.slug}>
                          <a href={p.href}>
                            <span className="article-pages__tag">{p.tag}</span>
                            <span className="article-pages__title">{p.title}</span>
                            <time className="article-pages__date">{p.updated}</time>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </>
            ) : (
              <a className="article-card__summary article-card__summary--link" href={s.href ?? '#'}>
                {cover}
                <div className="article-card__text">
                  <h2 className="article-card__title">{s.title}</h2>
                  <p className="article-card__desc">{s.blurb}</p>
                  <div className="article-card__meta">
                    <span className="article-card__updated">
                      <span className="article-card__updated-label">Last updated</span>
                      <time className="article-card__updated-date">{s.updated}</time>
                    </span>
                  </div>
                  <span className="article-card__link">Read →</span>
                </div>
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BlogGrid;
