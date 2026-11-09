import React, { useState } from 'react';
import { AppleBooksFlipbook } from '../src/components/AppleBooksFlipbook';
import { WidgetErrorBoundary } from '../src/components/WidgetErrorBoundary';
import { ThemeMode, ReadingMode } from '../src/components/AppleToolbar';
import '../src/styles/VikFlip.css';
import { Sparkles, X } from 'lucide-react';

export const App: React.FC = () => {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const initialTheme = (params.get('theme') as ThemeMode) || 'sepia';
  const initialMode = (params.get('mode') as ReadingMode) || 'horizontal';
  const initialPage = params.has('page') ? Number(params.get('page')) : 0;
  const initialDrawer = params.get('drawer') === 'true';
  const shouldHideHint = params.get('hint') === 'false';
  const isCoverHero = params.get('coverHero') === 'true';

  const [showHint, setShowHint] = useState<boolean>(!shouldHideHint);

  if (isCoverHero) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: 'radial-gradient(ellipse at 50% 30%, #1E293B 0%, #0F172A 50%, #080D1A 100%)',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '48px 40px 36px',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
        }}
      >
        {/* Subtle Background Glow */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0) 70%)',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            filter: 'blur(40px)'
          }}
        />

        {/* Top Header Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#FCD34D'
            }}
          >
            <Sparkles size={14} color="#F59E0B" />
            Mendix Pluggable Widget • React Client Ready
          </div>
        </div>

        {/* Brand & Main Title */}
        <div style={{ textAlign: 'center', zIndex: 2, marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '12px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 30px rgba(245, 158, 11, 0.45)',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '24px',
                letterSpacing: '0.05em'
              }}
            >
              VIK
            </div>
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                margin: 0,
                lineHeight: 1,
                background: 'linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              VikFlip
            </h1>
          </div>
          <p
            style={{
              fontSize: '20px',
              color: '#94A3B8',
              margin: '0 auto',
              fontWeight: 400,
              maxWidth: '680px',
              letterSpacing: '-0.01em'
            }}
          >
            Apple Books Minimalist 3D Flipbook & Interactive Reader
          </p>
        </div>

        {/* Center Card Mockup Preview */}
        <div
          style={{
            zIndex: 2,
            width: '840px',
            height: '380px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(251, 240, 217, 0.96) 0%, rgba(247, 233, 206, 0.94) 100%)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15)',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
            color: '#1C1C1E',
            padding: '24px 36px',
            boxSizing: 'border-box'
          }}
        >
          {/* Left Page Mock */}
          <div style={{ flex: 1, paddingRight: '28px', borderRight: '1px solid rgba(142, 114, 76, 0.25)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8E724C', fontWeight: 600, marginBottom: '6px' }}>
                Executive Address • Doc-2026
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em', color: '#1C1C1E' }}>
                Tactile Digital Experience
              </h3>
              <p style={{ fontSize: '12px', color: '#57534E', lineHeight: 1.55, margin: 0 }}>
                Bridging physical page kinematics with zero-latency Web Audio paper rustle, golden-ratio margins, and pure React 18 rendering.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1, padding: '8px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', border: '1px solid rgba(142, 114, 76, 0.2)' }}>
                <div style={{ fontSize: '9px', color: '#78716C', textTransform: 'uppercase', fontWeight: 600 }}>Enterprise ARR</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#1C1C1E' }}>$4.82B</div>
              </div>
              <div style={{ flex: 1, padding: '8px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', border: '1px solid rgba(142, 114, 76, 0.2)' }}>
                <div style={{ fontSize: '9px', color: '#78716C', textTransform: 'uppercase', fontWeight: 600 }}>Render FPS</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#10B981' }}>60 FPS</div>
              </div>
            </div>
          </div>

          {/* Right Page Mock */}
          <div style={{ flex: 1, paddingLeft: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8E724C', fontWeight: 600, marginBottom: '6px' }}>
                Verified Attachments • Doc-2026
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em', color: '#1C1C1E' }}>
                Interactive Attachments
              </h3>
              <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.85)', borderRadius: '8px', border: '1px solid rgba(142, 114, 76, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#1C1C1E' }}>📄 Annual-Report-Specs.pdf (4.2 MB)</span>
                <span style={{ fontSize: '10px', color: '#D97706', fontWeight: 700 }}>Download ↓</span>
              </div>
              <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.85)', borderRadius: '8px', border: '1px solid rgba(142, 114, 76, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#1C1C1E' }}>📊 Financial-Model.xlsx (2.8 MB)</span>
                <span style={{ fontSize: '10px', color: '#D97706', fontWeight: 700 }}>Download ↓</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#8E724C' }}>
              <span>Apple Books Minimalist Chrome</span>
              <span>Folio 3</span>
            </div>
          </div>
        </div>

        {/* Feature Badges Footer */}
        <div style={{ display: 'flex', gap: '12px', zIndex: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            '3D Cloth Page Physics',
            'Ambient Web Audio Rustle',
            'Light • Sepia • Dark Themes',
            'Dual Modes (3D Flip & Scroll)',
            'Bottom Filmstrip Navigator',
            'No Dojo • Pure React 18'
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '11px',
                color: '#CBD5E1',
                fontWeight: 500
              }}
            >
              ✓ {feature}
            </div>
          ))}
        </div>
      </div>
    );
  }

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
              <X size={14} />
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
        <AppleBooksFlipbook
          initialTheme={initialTheme}
          initialReadingMode={initialMode}
          initialPage={initialPage}
          initialDrawerOpen={initialDrawer}
        />
      </WidgetErrorBoundary>
    </div>
  );
};
