import * as React from 'react';

export interface Step {
  id: string;
  label: string;
}

export default function StepNav({ steps }: { steps: Step[] }) {
  const [active, setActive] = React.useState(steps[0]?.id ?? '');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );

    for (const step of steps) {
      const el = document.getElementById(step.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [steps]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="stepnav" aria-label="Steps">
      {steps.map((step, i) => (
        <button
          key={step.id}
          type="button"
          className={'stepnav__item' + (step.id === active ? ' is-active' : '')}
          onClick={() => jump(step.id)}
        >
          <span className="stepnav__num">{String(i + 1).padStart(2, '0')}</span>
          <span className="stepnav__label">{step.label}</span>
        </button>
      ))}
    </nav>
  );
}
