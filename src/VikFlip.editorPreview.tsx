import React from 'react';
import { VikFlipPreviewProps } from './typings/VikFlipProps';
import { BookOpen, Sparkles, Volume2, Columns2 } from 'lucide-react';

export const preview: React.FC<VikFlipPreviewProps> = (props) => {
  const {
    initialTheme = 'sepia',
    initialMode = 'horizontal'
  } = props;

  const isDark = initialTheme === 'dark';
  const isSepia = initialTheme === 'sepia';

  const bg = isDark ? '#1C1C1E' : isSepia ? '#FBF0D9' : '#FFFFFF';
  const text = isDark ? '#F2F2F7' : isSepia ? '#3D2E1E' : '#1C1C1E';
  const border = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';

  return (
    <div
      style={{
        width: '100%',
        height: '420px',
        background: isDark ? '#0D0D0E' : isSepia ? '#EFE6D5' : '#F2F2F7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
      }}
    >
      {/* Mini Mock Chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: isDark ? 'rgba(28,28,30,0.85)' : 'rgba(255,255,255,0.85)',
          padding: '6px 16px',
          borderRadius: '9999px',
          marginBottom: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: `1px solid ${border}`,
          fontSize: '11px',
          color: text
        }}
      >
        <BookOpen size={14} color="#0071E3" />
        <span style={{ fontWeight: 600 }}>VikFlip Pluggable Widget</span>
        <span>•</span>
        <span style={{ opacity: 0.7 }}>Theme: {initialTheme}</span>
        <span>•</span>
        <Columns2 size={13} />
        <span>{initialMode}</span>
        <span>•</span>
        <Volume2 size={13} />
      </div>

      {/* Mini Book Spread Preview */}
      <div
        style={{
          display: 'flex',
          boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
          borderRadius: '6px',
          overflow: 'hidden',
          width: '480px',
          height: '300px'
        }}
      >
        {/* Left Page */}
        <div
          style={{
            flex: 1,
            background: bg,
            color: text,
            padding: '24px 20px',
            borderRight: `1px solid ${border}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginBottom: '8px' }}>
              CHAPTER 01 • PREVIEW
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.25, marginBottom: '6px' }}>
              Annual Report &amp; Strategy
            </div>
            <div style={{ fontSize: '11px', opacity: 0.7, lineHeight: 1.45 }}>
              Mendix Pluggable Widgets SDK Design-Time Preview
            </div>
          </div>
          <div style={{ fontSize: '9px', opacity: 0.5 }}>
            Page 2 • VIKFLIP
          </div>
        </div>

        {/* Right Page */}
        <div
          style={{
            flex: 1,
            background: bg,
            color: text,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginBottom: '8px' }}>
              DATA SOURCE BOUND
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#0071E3', marginBottom: '8px' }}>
              <Sparkles size={14} />
              Realistic Physics Active
            </div>
            <div style={{ height: '3px', background: border, width: '100%', borderRadius: '2px', marginBottom: '6px' }} />
            <div style={{ height: '3px', background: border, width: '75%', borderRadius: '2px', marginBottom: '6px' }} />
            <div style={{ height: '3px', background: border, width: '85%', borderRadius: '2px' }} />
          </div>
          <div style={{ fontSize: '9px', opacity: 0.5, textAlign: 'right' }}>
            Page 3 • VIKFLIP
          </div>
        </div>
      </div>
    </div>
  );
};

export default preview;
