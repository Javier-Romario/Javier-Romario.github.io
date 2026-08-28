// Blender 4.x default keymap — the shortcuts that actually ship with a fresh install.
// Keymap: Preferences → Keymap → "Blender" (default). On macOS, Blender maps Ctrl → Cmd automatically.

export type Category =
  | 'Navigation'
  | 'Viewport'
  | 'Global'
  | 'Object Mode'
  | 'Selection'
  | 'Edit Mode'
  | 'Sculpt Mode'
  | 'UV Editor'
  | 'Animation'
  | 'Rendering'
  | 'Modifiers';

export interface Shortcut {
  keys: string; // e.g. "Shift+A", "G then X", "Numpad ."
  action: string;
  category: Category;
  note?: string;
}

export const CATEGORIES: Category[] = [
  'Navigation',
  'Viewport',
  'Global',
  'Object Mode',
  'Selection',
  'Edit Mode',
  'Sculpt Mode',
  'UV Editor',
  'Animation',
  'Rendering',
  'Modifiers',
];

export const SHORTCUTS: Shortcut[] = [
  // ---------- NAVIGATION ----------
  { keys: 'MMB drag', action: 'Orbit view', category: 'Navigation' },
  { keys: 'Shift+MMB drag', action: 'Pan view', category: 'Navigation' },
  { keys: 'Ctrl+MMB drag', action: 'Zoom view', category: 'Navigation' },
  { keys: 'Scroll', action: 'Zoom in/out', category: 'Navigation' },
  { keys: 'Numpad 0', action: 'Camera view', category: 'Navigation' },
  { keys: 'Numpad 1', action: 'Front view (orthographic)', category: 'Navigation' },
  { keys: 'Numpad 3', action: 'Side view (right)', category: 'Navigation' },
  { keys: 'Numpad 7', action: 'Top view', category: 'Navigation' },
  { keys: 'Numpad 9', action: 'Opposite view (rotate 180°)', category: 'Navigation' },
  { keys: 'Numpad 5', action: 'Toggle perspective / orthographic', category: 'Navigation' },
  { keys: 'Numpad .', action: 'Frame selected', category: 'Navigation' },
  { keys: 'Home', action: 'Frame all objects', category: 'Navigation' },
  { keys: 'Ctrl+Numpad 0', action: 'Set active object as camera', category: 'Navigation' },
  { keys: '` (backtick)', action: 'View pie menu', category: 'Navigation' },
  { keys: 'Alt+MMB drag', action: 'Snap orbit to nearest axis', category: 'Navigation' },

  // ---------- VIEWPORT ----------
  { keys: 'Z', action: 'Shading pie menu (wire / solid / rendered)', category: 'Viewport' },
  { keys: 'Shift+Z', action: 'Toggle wireframe overlay', category: 'Viewport' },
  { keys: 'Alt+Z', action: 'Toggle x-ray', category: 'Viewport' },
  { keys: 'N', action: 'Toggle sidebar (properties)', category: 'Viewport' },
  { keys: 'T', action: 'Toggle toolbar', category: 'Viewport' },
  { keys: 'Ctrl+Space', action: 'Toggle maximize area', category: 'Viewport' },
  { keys: 'Ctrl+Alt+Q', action: 'Toggle quad view', category: 'Viewport' },

  // ---------- GLOBAL ----------
  { keys: 'F3', action: 'Search menu (any operator)', category: 'Global' },
  { keys: 'Space', action: 'Play / pause animation', category: 'Global' },
  { keys: 'Tab', action: 'Toggle Object / Edit mode', category: 'Global' },
  { keys: 'Ctrl+Tab', action: 'Mode pie menu', category: 'Global' },
  { keys: 'Ctrl+Z', action: 'Undo', category: 'Global' },
  { keys: 'Ctrl+Shift+Z', action: 'Redo', category: 'Global' },
  { keys: 'X / Del', action: 'Delete', category: 'Global' },
  { keys: 'Shift+A', action: 'Add menu', category: 'Global' },
  { keys: 'Shift+D', action: 'Duplicate', category: 'Global' },
  { keys: 'Alt+D', action: 'Duplicate linked', category: 'Global' },
  { keys: 'Ctrl+C', action: 'Copy (global data)', category: 'Global' },
  { keys: 'Ctrl+V', action: 'Paste (global data)', category: 'Global' },
  { keys: 'F2', action: 'Rename active item', category: 'Global' },

  // ---------- OBJECT MODE ----------
  { keys: 'G', action: 'Grab / move', category: 'Object Mode' },
  { keys: 'R', action: 'Rotate', category: 'Object Mode' },
  { keys: 'S', action: 'Scale', category: 'Object Mode' },
  { keys: 'G then X / Y / Z', action: 'Constrain move to axis', category: 'Object Mode' },
  { keys: 'G then X X', action: 'Constrain to local axis (double-tap)', category: 'Object Mode' },
  { keys: 'Shift+S', action: 'Snap pie menu', category: 'Object Mode' },
  { keys: '. (period)', action: 'Pivot point pie menu', category: 'Object Mode' },
  { keys: ', (comma)', action: 'Transform orientation pie', category: 'Object Mode' },
  { keys: 'Alt+G', action: 'Clear location', category: 'Object Mode' },
  { keys: 'Alt+R', action: 'Clear rotation', category: 'Object Mode' },
  { keys: 'Alt+S', action: 'Clear scale', category: 'Object Mode' },
  { keys: 'Ctrl+A', action: 'Apply (location / rotation / scale / visual)', category: 'Object Mode' },
  { keys: 'Ctrl+J', action: 'Join selected objects', category: 'Object Mode' },
  { keys: 'Ctrl+P', action: 'Parent menu', category: 'Object Mode' },
  { keys: 'Alt+P', action: 'Clear parent', category: 'Object Mode' },
  { keys: 'M', action: 'Move to collection', category: 'Object Mode' },
  { keys: 'H', action: 'Hide selected', category: 'Object Mode' },
  { keys: 'Shift+H', action: 'Hide unselected', category: 'Object Mode' },
  { keys: 'Alt+H', action: 'Unhide all', category: 'Object Mode' },
  { keys: 'Ctrl+L', action: 'Link / transfer data menu', category: 'Object Mode' },

  // ---------- SELECTION ----------
  { keys: 'A', action: 'Select all / none', category: 'Selection' },
  { keys: 'Alt+A', action: 'Deselect all', category: 'Selection' },
  { keys: 'B', action: 'Box select', category: 'Selection' },
  { keys: 'C', action: 'Circle select', category: 'Selection' },
  { keys: 'Ctrl+I', action: 'Invert selection', category: 'Selection' },
  { keys: 'L', action: 'Select linked', category: 'Selection' },
  { keys: 'Ctrl+L', action: 'Select linked menu', category: 'Selection' },
  { keys: 'Ctrl+Num+', action: 'Grow selection', category: 'Selection' },
  { keys: 'Ctrl+Num-', action: 'Shrink selection', category: 'Selection' },
  { keys: 'Shift+G', action: 'Select similar', category: 'Selection' },
  { keys: 'Alt+Click', action: 'Select edge loop', category: 'Selection' },
  { keys: 'Ctrl+Alt+Click', action: 'Select edge ring', category: 'Selection' },
  { keys: 'Ctrl+Click', action: 'Shortest path select', category: 'Selection' },

  // ---------- EDIT MODE ----------
  { keys: 'E', action: 'Extrude', category: 'Edit Mode' },
  { keys: 'Alt+E', action: 'Extrude menu (along normals, etc.)', category: 'Edit Mode' },
  { keys: 'I', action: 'Inset faces', category: 'Edit Mode' },
  { keys: 'Ctrl+R', action: 'Loop cut (scroll to add cuts)', category: 'Edit Mode' },
  { keys: 'Ctrl+B', action: 'Bevel', category: 'Edit Mode' },
  { keys: 'K', action: 'Knife tool', category: 'Edit Mode' },
  { keys: 'F', action: 'Fill face / edge', category: 'Edit Mode' },
  { keys: 'Alt+F', action: 'Fill (beauty)', category: 'Edit Mode' },
  { keys: 'M', action: 'Merge menu', category: 'Edit Mode' },
  { keys: 'Ctrl+E', action: 'Edge menu', category: 'Edit Mode' },
  { keys: 'Ctrl+V', action: 'Vertex menu', category: 'Edit Mode' },
  { keys: 'Ctrl+F', action: 'Face menu', category: 'Edit Mode' },
  { keys: 'Alt+N', action: 'Normals menu', category: 'Edit Mode' },
  { keys: 'Shift+N', action: 'Recalculate normals outside', category: 'Edit Mode' },
  { keys: 'P', action: 'Separate menu', category: 'Edit Mode' },
  { keys: 'G G', action: 'Edge slide (double-tap G)', category: 'Edit Mode' },
  { keys: 'Ctrl+E', action: 'Mark seam (for UVs)', category: 'Edit Mode' },
  { keys: 'U', action: 'UV unwrap menu', category: 'Edit Mode' },
  { keys: 'Y', action: 'Split selection', category: 'Edit Mode' },
  { keys: 'Ctrl+X', action: 'Dissolve (verts / edges / faces)', category: 'Edit Mode' },
  { keys: 'O', action: 'Toggle proportional editing', category: 'Edit Mode' },
  { keys: 'Shift+O', action: 'Cycle proportional falloff', category: 'Edit Mode' },
  { keys: 'Alt+S', action: 'Shrink / fatten along normals', category: 'Edit Mode' },
  { keys: 'Shift+E', action: 'Crease edge', category: 'Edit Mode' },
  { keys: 'V', action: 'Rip vertex', category: 'Edit Mode' },

  // ---------- SCULPT MODE ----------
  { keys: 'F', action: 'Brush size (drag)', category: 'Sculpt Mode' },
  { keys: 'Shift+F', action: 'Brush strength (drag)', category: 'Sculpt Mode' },
  { keys: 'Ctrl (hold)', action: 'Invert brush effect', category: 'Sculpt Mode' },
  { keys: 'Shift (hold)', action: 'Smooth', category: 'Sculpt Mode' },
  { keys: 'Ctrl+D', action: 'Toggle dynamic topology (dyntopo)', category: 'Sculpt Mode' },

  // ---------- UV EDITOR ----------
  { keys: 'L', action: 'Select UV island', category: 'UV Editor' },
  { keys: 'V', action: 'Stitch selected', category: 'UV Editor' },
  { keys: 'W', action: 'Weld / align', category: 'UV Editor' },
  { keys: 'P', action: 'Pin vertices', category: 'UV Editor' },
  { keys: 'Alt+P', action: 'Unpin vertices', category: 'UV Editor' },
  { keys: 'G / R / S', action: 'Transform UVs (move / rotate / scale)', category: 'UV Editor' },
  { keys: 'Ctrl+E', action: 'Mark seam (in 3D edit mode)', category: 'UV Editor' },

  // ---------- ANIMATION ----------
  { keys: 'I', action: 'Insert keyframe menu', category: 'Animation' },
  { keys: 'Alt+I', action: 'Clear keyframe', category: 'Animation' },
  { keys: 'Space', action: 'Play / pause animation', category: 'Animation' },
  { keys: '← / →', action: 'Step one frame', category: 'Animation' },
  { keys: 'Shift+←', action: 'Jump to first frame', category: 'Animation' },
  { keys: 'Shift+→', action: 'Jump to last frame', category: 'Animation' },

  // ---------- RENDERING ----------
  { keys: 'F12', action: 'Render image', category: 'Rendering' },
  { keys: 'Ctrl+F12', action: 'Render animation', category: 'Rendering' },
  { keys: 'F11', action: 'Show last render', category: 'Rendering' },
  { keys: 'Ctrl+B', action: 'Render region (in camera view)', category: 'Rendering' },

  // ---------- MODIFIERS ----------
  { keys: 'Ctrl+1', action: 'Add Subdivision Surface (level 1)', category: 'Modifiers' },
  { keys: 'Ctrl+2', action: 'Add Subdivision Surface (level 2)', category: 'Modifiers' },
  { keys: 'Ctrl+3', action: 'Add Subdivision Surface (level 3)', category: 'Modifiers' },
  { keys: 'Ctrl+A', action: 'Apply modifiers (bake geometry)', category: 'Modifiers' },
];
