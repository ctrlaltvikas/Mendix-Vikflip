import React, { useRef, useEffect } from 'react';
import { ReportPage } from '../data/sampleReport';
import { X, Sparkles, ShieldCheck } from 'lucide-react';

interface ThumbnailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pages: ReportPage[];
  currentPage: number;
  onSelectPage: (pageIndex: number) => void;
}

export const ThumbnailDrawer: React.FC<ThumbnailDrawerProps> = ({
  isOpen,
  onClose,
  pages,
  currentPage,
  onSelectPage
}) => {
  const activeThumbRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll active thumbnail into view when drawer opens
  useEffect(() => {
    if (isOpen && activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [isOpen, currentPage]);

  return (
    <aside
      className={`thumb-drawer ${isOpen ? 'drawer-open' : ''}`}
      aria-label="Page Thumbnails"
    >
      <div className="thumb-drawer-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Document Overview
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            {pages.length} Pages • Click to Jump
          </span>
        </div>

        <button
          onClick={onClose}
          className="apple-btn"
          title="Close Navigator"
          aria-label="Close Navigator"
          style={{ padding: '4px' }}
        >
          <X size={16} />
        </button>
      </div>

      <div className="thumb-strip">
        {pages.map((p, idx) => {
          const isActive = idx === currentPage || (idx === currentPage + 1 && currentPage % 2 === 1);
          const isFront = p.type === 'front-cover';
          const isBack = p.type === 'back-cover';

          return (
            <div
              key={p.id}
              ref={isActive ? activeThumbRef : null}
              className={`thumb-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPage(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Jump to page ${p.pageNumber}: ${p.title}`}
            >
              <div
                className="thumb-card"
                style={{
                  background: isFront
                    ? 'linear-gradient(135deg, #1C2430 0%, #0F141C 100%)'
                    : isBack
                    ? 'linear-gradient(135deg, #151922 0%, #0D1017 100%)'
                    : 'var(--page-bg)',
                  color: isFront || isBack ? '#FFFFFF' : 'var(--text-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '6px',
                  justifyContent: 'space-between'
                }}
              >
                {/* Micro Preview Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.7 }}>
                  {isFront ? (
                    <Sparkles size={8} color="#F59E0B" />
                  ) : isBack ? (
                    <ShieldCheck size={8} color="#10B981" />
                  ) : (
                    <div style={{ fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.04em', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '45px' }}>
                      {p.chapter}
                    </div>
                  )}
                  <span style={{ fontSize: '7px', fontWeight: 700 }}>
                    {p.pageNumber}
                  </span>
                </div>

                {/* Micro Title Graphic */}
                <div style={{ textAlign: 'center', padding: '2px 0' }}>
                  <div style={{ fontSize: '8px', fontWeight: 700, lineHeight: 1.1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {p.title}
                  </div>
                  {/* Micro simulated text lines */}
                  {!p.isCover && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                      <div style={{ height: '2px', background: 'var(--text-tertiary)', opacity: 0.3, width: '100%', borderRadius: '1px' }}></div>
                      <div style={{ height: '2px', background: 'var(--text-tertiary)', opacity: 0.3, width: '80%', borderRadius: '1px' }}></div>
                      <div style={{ height: '2px', background: 'var(--text-tertiary)', opacity: 0.3, width: '90%', borderRadius: '1px' }}></div>
                    </div>
                  )}
                </div>

                {/* Micro Footer Indicator */}
                <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.5, fontSize: '6px' }}>
                  {p.isCover ? 'HARD' : 'BOND'}
                </div>
              </div>

              <span style={{ fontSize: '10px', color: isActive ? 'var(--accent)' : 'var(--text-tertiary)', fontWeight: isActive ? 600 : 400 }}>
                {p.pageNumber === 1 ? 'Cover' : p.pageNumber === pages.length ? 'Back' : `p. ${p.pageNumber}`}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
