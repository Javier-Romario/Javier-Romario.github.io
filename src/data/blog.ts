// Blog series + post metadata. Single source of truth for
// listing, ordering, and prev/next navigation.

export interface Series {
  id: string;
  title: string;
  blurb: string;
  tone: 'teal' | 'magenta' | 'violet' | 'blue' | 'green';
  tag: string; // short label e.g. "11 STEPS"
}

export interface Post {
  series: string;
  slug: string;
  title: string;
  tag: string; // step number, zero-padded
  blurb: string;
  formula?: string; // iso-tactics: the one thing to remember
  takeaway?: string; // neon-native: the ONE thing to remember
  time?: number; // rough minutes
  phase?: string; // neon-native phase id
}

export const SERIES: Series[] = [
  {
    id: 'iso-tactics',
    title: 'ISO Tactics',
    blurb: 'Isometric tactics games from zero to GRIDRUNNER — grid math, iso projection, depth sort, A*, combat.',
    tone: 'teal',
    tag: '11 STEPS',
  },
  {
    id: 'neon-native',
    title: 'NEON_NATIVE',
    blurb: 'React Native + Expo masterclass — 23 steps from zero to a published app on both stores.',
    tone: 'magenta',
    tag: '23 STEPS',
  },
  {
    id: 'neon-canvas',
    title: 'Neon Canvas',
    blurb: 'AI mindmapping canvas — a spatial knowledge graph that grows itself.',
    tone: 'violet',
    tag: '1 POST',
  },
  {
    id: 'blender-masterclass',
    title: 'Blender Masterclass',
    blurb: 'Blender from first modifier to a shipped asset — hard-surface, 3D-print, game-ready, and react-three-fiber lanes.',
    tone: 'blue',
    tag: '9 STEPS',
  },
];

export const POSTS: Post[] = [
  // ---- ISO TACTICS ----
  {
    series: 'iso-tactics',
    slug: 'loops',
    title: 'The Loop',
    tag: '01',
    blurb: 'Animate with requestAnimationFrame + delta time.',
    formula: 'dt = now − last',
  },
  {
    series: 'iso-tactics',
    slug: 'grid',
    title: 'Grid Math',
    tag: '02',
    blurb: 'Coordinates, neighbours, Manhattan distance.',
    formula: 'd = |x1−x2| + |y1−y2|',
  },
  {
    series: 'iso-tactics',
    slug: 'iso',
    title: 'Iso Projection',
    tag: '03',
    blurb: 'Turn a flat grid into 3D-looking diamonds.',
    formula: 'sx = (x−y)·W/2,  sy = (x+y)·H/2',
  },
  {
    series: 'iso-tactics',
    slug: 'inverse',
    title: 'Screen → Tile',
    tag: '04',
    blurb: 'Reverse the formula to click on tiles.',
    formula: 'x = (sx/H + sy/V)/2',
  },
  {
    series: 'iso-tactics',
    slug: 'depth',
    title: 'Depth Sort',
    tag: '05',
    blurb: 'Draw back-to-front so overlap looks right.',
    formula: 'sort by (x + y)',
  },
  {
    series: 'iso-tactics',
    slug: 'tiles',
    title: 'Iso Cubes',
    tag: '06',
    blurb: 'Fake 3D blocks with height on the grid.',
    formula: 'top = (x+y)·V − height',
  },
  {
    series: 'iso-tactics',
    slug: 'astar',
    title: 'A* Pathfinding',
    tag: '07',
    blurb: 'Find shortest path around obstacles.',
    formula: 'f = g + h',
  },
  {
    series: 'iso-tactics',
    slug: 'range',
    title: 'Move Range',
    tag: '08',
    blurb: 'BFS flood fill = all tiles you can reach.',
    formula: 'flood ≤ movePoints',
  },
  {
    series: 'iso-tactics',
    slug: 'turns',
    title: 'Turn Machine',
    tag: '09',
    blurb: 'State machine: player → enemy → player.',
    formula: 'state: PLAYER / ENEMY',
  },
  {
    series: 'iso-tactics',
    slug: 'combat',
    title: 'Combat Dice',
    tag: '10',
    blurb: 'Damage rolls, HP, cover bonus.',
    formula: 'dmg = base + roll − cover',
  },
  {
    series: 'iso-tactics',
    slug: 'game',
    title: 'GRIDRUNNER',
    tag: '11',
    blurb: 'The whole game. Every skill combined.',
    formula: 'all of the above',
  },

  // ---- NEON_NATIVE ----
  {
    series: 'neon-native',
    slug: 'why-react-native',
    title: 'What Is React Native?',
    tag: '01',
    phase: 'foundations',
    blurb: 'One JS runtime, two threads, native UI.',
    takeaway: 'JS thread → native thread → pixels',
    time: 8,
  },
  {
    series: 'neon-native',
    slug: 'why-expo',
    title: 'Why Expo?',
    tag: '02',
    phase: 'foundations',
    blurb: 'RN + toolchain + native modules, one CLI.',
    takeaway: 'Expo = React Native without the yak-shave',
    time: 7,
  },
  {
    series: 'neon-native',
    slug: 'setup',
    title: 'Setup',
    tag: '03',
    phase: 'foundations',
    blurb: 'Node, Expo Go, first launch.',
    takeaway: 'npx create-expo-app + scan the QR',
    time: 10,
  },
  {
    series: 'neon-native',
    slug: 'project-anatomy',
    title: 'Project Anatomy',
    tag: '04',
    phase: 'core',
    blurb: 'The app/ dir IS the router.',
    takeaway: 'file path = route',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'components',
    title: 'Components & JSX',
    tag: '05',
    phase: 'core',
    blurb: 'View, Text, Pressable. No HTML here.',
    takeaway: 'everything is a component',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'flexbox',
    title: 'Flexbox',
    tag: '06',
    phase: 'core',
    blurb: 'The only layout system. Default is column.',
    takeaway: 'flexDirection + justifyContent + alignItems',
    time: 10,
  },
  {
    series: 'neon-native',
    slug: 'state-hooks',
    title: 'State & Hooks',
    tag: '07',
    phase: 'core',
    blurb: 'useState, useEffect, and the re-render loop.',
    takeaway: 'setState → re-render',
    time: 10,
  },
  {
    series: 'neon-native',
    slug: 'lists',
    title: 'Lists & FlatList',
    tag: '08',
    phase: 'core',
    blurb: 'Render 10,000 rows with 10.',
    takeaway: 'FlatList virtualizes; keys matter',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'navigation',
    title: 'Navigation',
    tag: '09',
    phase: 'core',
    blurb: 'Stacks, tabs, dynamic routes, deep links.',
    takeaway: 'expo-router: folders = screens',
    time: 10,
  },
  {
    series: 'neon-native',
    slug: 'styling',
    title: 'Styling & Theming',
    tag: '10',
    phase: 'core',
    blurb: 'Design tokens, StyleSheet, dark mode.',
    takeaway: 'tokens in one place, never raw hex',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'fetching',
    title: 'Fetching Data',
    tag: '11',
    phase: 'data',
    blurb: 'The three-state union: loading | error | data.',
    takeaway: 'loading | error | data — pick one',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'storage',
    title: 'Storage',
    tag: '12',
    phase: 'data',
    blurb: 'AsyncStorage, MMKV, and secrets.',
    takeaway: 'SecureStore for secrets, not AsyncStorage',
    time: 8,
  },
  {
    series: 'neon-native',
    slug: 'forms',
    title: 'Forms & Input',
    tag: '13',
    phase: 'data',
    blurb: 'Controlled inputs, validation, submit.',
    takeaway: 'controlled TextInput = value + onChangeText',
    time: 8,
  },
  {
    series: 'neon-native',
    slug: 'offline',
    title: 'Offline & Sync',
    tag: '14',
    phase: 'data',
    blurb: 'NetInfo, cache, retry, optimistic UI.',
    takeaway: 'optimistic UI + retry, never a spinner of doom',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'native-apis',
    title: 'Native APIs',
    tag: '15',
    phase: 'native',
    blurb: 'Camera, location, notifications, permissions.',
    takeaway: 'permissions gate every device API',
    time: 10,
  },
  {
    series: 'neon-native',
    slug: 'animations',
    title: 'Animations',
    tag: '16',
    phase: 'native',
    blurb: 'Reanimated and the 60fps rule.',
    takeaway: 'animate on the UI thread, not JS',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'debugging',
    title: 'Debug & Errors',
    tag: '17',
    phase: 'native',
    blurb: 'ErrorBoundary, LogBox, Sentry.',
    takeaway: 'ErrorBoundary + Sentry = you see crashes first',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'testing',
    title: 'Testing',
    tag: '18',
    phase: 'quality',
    blurb: 'Jest, React Native Testing Library, E2E.',
    takeaway: 'test behavior, not implementation',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'performance',
    title: 'Performance',
    tag: '19',
    phase: 'quality',
    blurb: 'memo, Hermes, bundle size, profiling.',
    takeaway: 'measure before you memoize',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'cicd',
    title: 'CI/CD',
    tag: '20',
    phase: 'ship',
    blurb: 'EAS Build, versioning, secrets.',
    takeaway: 'EAS Build in the cloud, not your laptop',
    time: 9,
  },
  {
    series: 'neon-native',
    slug: 'publishing',
    title: 'Publishing',
    tag: '21',
    phase: 'ship',
    blurb: 'Icons, splash, App Store + Play, review.',
    takeaway: 'EAS Submit pushes to both stores',
    time: 11,
  },
  {
    series: 'neon-native',
    slug: 'updates',
    title: 'OTA Updates',
    tag: '22',
    phase: 'ship',
    blurb: 'expo-updates: fix bugs without a review.',
    takeaway: 'JS ships over the air; native still needs a build',
    time: 8,
  },
  {
    series: 'neon-native',
    slug: 'monetization',
    title: 'Monetization',
    tag: '23',
    phase: 'ship',
    blurb: 'IAP, subscriptions, ads.',
    takeaway: 'RevenueCat for cross-store IAP',
    time: 8,
  },

  // ---- NEON CANVAS ----
  {
    series: 'neon-canvas',
    slug: 'plan',
    title: 'Neon Canvas',
    tag: '01',
    blurb: 'AI mindmapping canvas — spatial knowledge graph that grows itself.',
    takeaway: 'every node remembers where it came from',
  },

  // ---- BLENDER MASTERCLASS ----
  {
    series: 'blender-masterclass',
    slug: 'workflow',
    title: 'Non-Destructive Workflow',
    tag: '01',
    blurb: 'Blender UI, modifiers, and why you never touch the undo button as a plan.',
    formula: 'Model with modifiers, keep every step editable',
    phase: 'core',
  },
  {
    series: 'blender-masterclass',
    slug: 'hard-surface',
    title: 'Hard-Surface Modeling',
    tag: '02',
    blurb: 'Bevels, booleans, and clean topology that both printers and GPUs love.',
    formula: 'Bevel everything, boolean the rest',
    phase: 'core',
  },
  {
    series: 'blender-masterclass',
    slug: 'print-ready',
    title: 'Print-Ready Meshes',
    tag: '03',
    blurb: 'Manifold geometry, wall thickness, overhangs. Make a mesh that prints.',
    formula: 'Manifold = watertight, zero holes',
    phase: 'print',
  },
  {
    series: 'blender-masterclass',
    slug: 'slicer',
    title: 'Slice It Right',
    tag: '04',
    blurb: 'FDM + SLA settings: shells, infill, supports, orientation.',
    formula: 'Shell the thin, support the overhang',
    phase: 'print',
  },
  {
    series: 'blender-masterclass',
    slug: 'game-ready',
    title: 'Game-Ready Low-Poly',
    tag: '05',
    blurb: 'Retopology, normals, and triangle budgets. Look great, run fast.',
    formula: 'Tris cost GPU, quads keep you sane',
    phase: 'game',
  },
  {
    series: 'blender-masterclass',
    slug: 'uv-bake',
    title: 'UV Unwrap & Bake',
    tag: '06',
    blurb: 'UV seams, high-to-low baking, and PBR texture maps.',
    formula: 'Bake the detail, not the geometry',
    phase: 'game',
  },
  {
    series: 'blender-masterclass',
    slug: 'export-gltf',
    title: 'Export to glTF',
    tag: '07',
    blurb: 'glTF/GLB is the JPEG of 3D. Export clean, small, web-ready assets.',
    formula: 'glTF is the JPEG of 3D',
    phase: 'web',
  },
  {
    series: 'blender-masterclass',
    slug: 'r3f',
    title: 'Into react-three-fiber',
    tag: '08',
    blurb: 'Load your GLB into a React island. Lights, materials, animation.',
    formula: 'useGLTF + <primitive> = your model in React',
    phase: 'web',
  },
  {
    series: 'blender-masterclass',
    slug: 'shortcuts',
    title: 'Shortcut Explorer',
    tag: '09',
    blurb: 'Every Blender 4.x default keymap shortcut, searchable.',
  },
];

export function seriesById(id: string) {
  return SERIES.find((s) => s.id === id);
}

export function postsInSeries(id: string) {
  return POSTS.filter((p) => p.series === id);
}

export function neighbors(series: string, slug: string) {
  const list = postsInSeries(series);
  const i = list.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
    index: i,
  };
}
