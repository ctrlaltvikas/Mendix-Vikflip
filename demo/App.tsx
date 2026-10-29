import React, { useState } from 'react';
import { AppleBooksFlipbook } from '../src/components/AppleBooksFlipbook';
import { WidgetErrorBoundary } from '../src/components/WidgetErrorBoundary';
import '../src/styles/VikFlip.css';
import { Sparkles, X } from 'lucide-react';

export const App: React.FC = () => {
  const [showHint, setShowHint] = useState<boolean>(true);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Keyboard Shortcuts & Interactive Hint Toast */}
      {showHint && (
        <aside
          style={{
            position: 'absolute',
            top: '76px',
            right: '20px',
            zIndex: 60,
            background: 'rgba(28, 28, 30, 0.92)',
            color: '#FFFFFF',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '12px 16px',
            borderRadius: '14px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.18)',
            fontSize: '11px',
            maxWidth: '310px',
            lineHeight: 1.5,
            animation: 'fadeIn 0.35s ease'
          }}
          aria-label="Demo Instructions"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} color="#0A84FF" />
              Mobile & Attachments Ready
            </span>
            <button
              onClick={() => setShowHint(false)}
              style={{ background: 'none', border: 'none', color: '#98989D', cursor: 'pointer', padding: '2px' }}
              aria-label="Dismiss Instructions"
            >
              <X size={13} />
            </button>
          </div>
          <div style={{ color: '#E5E5EA', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>• <b>Interactive Attachments:</b> Click any attachment card on pages 4, 5, 6, 7 to preview and download without accidental page turns!</div>
            <div>• <b>In-Book Deep Links:</b> Click table of contents links on Page 3 to jump directly to chapters.</div>
            <div>• <b>Mobile Responsive:</b> Auto single-page portrait on phones, 2-page spread on tablets/desktops.</div>
            <div>• <b>Shortcuts:</b> <b>V</b> for Flip/Scroll, <b>M</b> for mute, <b>T</b> for themes, <b>D</b> for drawer.</div>
          </div>
        </aside>
      )}

      {/* Core Component wrapped with Error Boundary */}
      <WidgetErrorBoundary>
        <AppleBooksFlipbook initialTheme="sepia" initialReadingMode="horizontal" />
      </WidgetErrorBoundary>
    </div>
  );
};
