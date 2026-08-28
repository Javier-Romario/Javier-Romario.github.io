export type Track = 'core' | 'print' | 'game' | 'web';

export interface NavItem {
  slug: string;
  title: string;
  tag: string; // lesson number, zero-padded
  blurb: string; // one-line hook
  formula: string; // the ONE thing to remember
  track: Track; // which lane the lesson serves
}

// The masterclass curriculum. One idea per lesson, ordered to build on itself:
// core Blender → the 3D-printing lane → the game lane → the react-three-fiber lane.
// ADD A LESSON: append a NavItem here AND create src/pages/<slug>.mdx
export const NAV: NavItem[] = [
  {
    slug: 'workflow',
    title: 'Non-Destructive Workflow',
    tag: '01',
    blurb: 'Blender UI, modifiers, and why you never touch the undo button as a plan.',
    formula: 'Model with modifiers, keep every step editable',
    track: 'core',
  },
  {
    slug: 'hard-surface',
    title: 'Hard-Surface Modeling',
    tag: '02',
    blurb: 'Bevels, booleans, and clean topology that both printers and GPUs love.',
    formula: 'Bevel everything, boolean the rest',
    track: 'core',
  },
  {
    slug: 'print-ready',
    title: 'Print-Ready Meshes',
    tag: '03',
    blurb: 'Manifold geometry, wall thickness, overhangs. Make a mesh that prints.',
    formula: 'Manifold = watertight, zero holes',
    track: 'print',
  },
  {
    slug: 'slicer',
    title: 'Slice It Right',
    tag: '04',
    blurb: 'FDM + SLA settings: shells, infill, supports, orientation.',
    formula: 'Shell the thin, support the overhang',
    track: 'print',
  },
  {
    slug: 'game-ready',
    title: 'Game-Ready Low-Poly',
    tag: '05',
    blurb: 'Retopology, normals, and triangle budgets. Look great, run fast.',
    formula: 'Tris cost GPU, quads keep you sane',
    track: 'game',
  },
  {
    slug: 'uv-bake',
    title: 'UV Unwrap & Bake',
    tag: '06',
    blurb: 'UV seams, high-to-low baking, and PBR texture maps.',
    formula: 'Bake the detail, not the geometry',
    track: 'game',
  },
  {
    slug: 'export-gltf',
    title: 'Export to glTF',
    tag: '07',
    blurb: 'glTF/GLB is the JPEG of 3D. Export clean, small, web-ready assets.',
    formula: 'glTF is the JPEG of 3D',
    track: 'web',
  },
  {
    slug: 'r3f',
    title: 'Into react-three-fiber',
    tag: '08',
    blurb: 'Load your GLB into a React island. Lights, materials, animation.',
    formula: 'useGLTF + <primitive> = your model in React',
    track: 'web',
  },
];

export function bySlug(slug: string) {
  return NAV.find((n) => n.slug === slug);
}

export function neighbors(slug: string) {
  const i = NAV.findIndex((n) => n.slug === slug);
  return {
    prev: i > 0 ? NAV[i - 1] : null,
    next: i >= 0 && i < NAV.length - 1 ? NAV[i + 1] : null,
    index: i,
  };
}
