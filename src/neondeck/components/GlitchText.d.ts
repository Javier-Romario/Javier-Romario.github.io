import * as React from 'react';
interface GlitchTextProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    color?: string;
    accentA?: string;
    accentB?: string;
    fontSize?: number;
    height?: number | string;
    glitchRate?: number;
    intensity?: number;
}
declare const GlitchText: React.FC<GlitchTextProps>;
export default GlitchText;
