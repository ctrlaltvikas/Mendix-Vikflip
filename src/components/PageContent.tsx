import React, { forwardRef } from 'react';
import { ReportPage, DocumentAttachment } from '../data/sampleReport';
import { BarChart3, ShieldCheck, Sparkles, FileText, Table, Download, ArrowRight } from 'lucide-react';

interface PageContentProps {
  page: ReportPage;
  totalPages: number;
  onJumpToPage?: (pageIndex: number) => void;
  onOpenAttachment?: (attachment: DocumentAttachment) => void;
}

export const PageContent = forwardRef<HTMLDivElement, PageContentProps>(({
  page,
  totalPages,
  onJumpToPage,
  onOpenAttachment
}, ref) => {
  const isCover = page.isCover;
  const isFront = page.type === 'front-cover';
  const isBack = page.type === 'back-cover';

  // Authentic book pagination: Even pages are Left, Odd pages are Right
  const isEvenPage = page.pageNumber % 2 === 0;

  return (
    <div
      ref={ref}
      className={`vikflip-page page-${page.type} ${isEvenPage ? 'page-left' : 'page-right'}`}
      data-density={page.density || 'soft'}
      style={{
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isCover ? 'center' : 'space-between',
        position: 'relative',
        background: isFront
          ? 'linear-gradient(135deg, #1C2430 0%, #0F141C 100%)'
          : isBack
          ? 'linear-gradient(135deg, #151922 0%, #0D1017 100%)'
          : undefined,
        color: isCover ? '#FFFFFF' : 'inherit'
      }}
    >
      {/* Front Cover Special Styling */}
      {isFront && (
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-between',
            padding: '40px 32px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '9999px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E2E8F0' }}>
            <Sparkles size={13} color="#F59E0B" />
            {page.accentBadge}
          </div>

          <div style={{ margin: 'auto 0', padding: '0 10px' }}>
            <div style={{ width: '52px', height: '2px', background: 'linear-gradient(90deg, #F59E0B, #E2E8F0)', margin: '0 auto 24px' }}></div>
            <h1 style={{ fontSize: 'clamp(26px, 3.8vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.18, marginBottom: '16px', color: '#FFFFFF' }}>
              {page.title}
            </h1>
            <p style={{ fontSize: '14px', color: '#94A3B8', maxWidth: '340px', margin: '0 auto', lineHeight: 1.55, fontWeight: 400 }}>
              {page.subtitle}
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', width: '100%', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748B' }}>
            <span>MENDIX PLUGGABLE WIDGET SDK</span>
            <span>VOL. XXVI</span>
          </div>
        </div>
      )}

      {/* Back Cover Special Styling */}
      {isBack && (
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-between',
            padding: '40px 32px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '12px' }}>
            <ShieldCheck size={16} color="#10B981" />
            <span>ENTERPRISE DIGITAL PUBLISHING</span>
          </div>

          <div style={{ margin: 'auto 0', padding: '0 10px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3.2vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px', color: '#FFFFFF' }}>
              {page.title}
            </h2>
            <p style={{ fontSize: '13px', color: '#94A3B8', maxWidth: '300px', margin: '0 auto 28px', lineHeight: 1.55 }}>
              {page.subtitle}
            </p>
            {/* Mock Barcode */}
            <div style={{ background: '#FFFFFF', padding: '12px 20px', borderRadius: '4px', display: 'inline-block' }}>
              <div style={{ display: 'flex', gap: '3px', height: '36px', alignItems: 'flex-end', justifyContent: 'center' }}>
                {[3, 1, 4, 2, 5, 2, 1, 3, 4, 1, 3, 2, 4, 2, 5, 1, 2, 4, 1, 3, 2, 5].map((w, i) => (
                  <div key={i} style={{ width: `${w}px`, height: '100%', background: '#000000' }}></div>
                ))}
              </div>
              <div style={{ fontSize: '9px', color: '#000000', letterSpacing: '0.2em', marginTop: '5px', fontFamily: 'monospace' }}>
                978-0-2026-VIKFLIP
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#64748B', letterSpacing: '0.05em' }}>
            {page.accentBadge}
          </div>
        </div>
      )}

      {/* Interior Editorial Pages */}
      {!isCover && (
        <div className="page-inner-wrapper">
          {/* Top Running Header */}
          <header className="page-header">
            <span className="page-chapter-badge">
              {page.chapter}
            </span>
            <span className="page-doc-id">
              DOC-2026 • VIKFLIP
            </span>
          </header>

          {/* Main Editorial Content Body */}
          <div className="page-body-container">
            {/* Title & Subtitle */}
            <div className="page-title-group">
              <h2 className="page-title">
                {page.title}
              </h2>
              {page.subtitle && (
                <p className="page-subtitle">
                  {page.subtitle}
                </p>
              )}
            </div>

            {/* Metrics KPI Cards */}
            {page.metrics && (
              <div className={`page-metrics-grid ${page.metrics.length === 4 ? 'grid-2x2' : 'grid-3x1'}`}>
                {page.metrics.map((m, idx) => (
                  <div key={idx} className="metric-card">
                    <div className="metric-label">{m.label}</div>
                    <div className="metric-value">{m.value}</div>
                    <div className="metric-delta">{m.delta}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Editorial Paragraphs */}
            {page.body && (
              <div className="page-paragraphs">
                {page.body.map((p, pIdx) => (
                  <p key={pIdx}>
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Interactive Links / Table of Contents Jumps */}
            {page.links && page.links.length > 0 && (
              <div className="page-links-group">
                {page.links.map((link, lIdx) => (
                  <button
                    key={lIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (link.targetPage !== undefined && onJumpToPage) {
                        onJumpToPage(link.targetPage);
                      } else if (link.url) {
                        window.open(link.url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="apple-link-btn"
                  >
                    <span className="link-label">{link.label}</span>
                    <ArrowRight size={13} color="var(--accent)" />
                  </button>
                ))}
              </div>
            )}

            {/* Interactive Document Attachments */}
            {page.attachments && page.attachments.length > 0 && (
              <div className="page-attachments-group">
                {page.attachments.map((att) => (
                  <div
                    key={att.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenAttachment) onOpenAttachment(att);
                    }}
                    className="attachment-card"
                    title={`Click to preview or download ${att.name}`}
                  >
                    <div className="attachment-meta">
                      {att.type === 'pdf' ? (
                        <FileText size={18} color="#EF4444" />
                      ) : (
                        <Table size={18} color="#10B981" />
                      )}
                      <div>
                        <div className="attachment-name">
                          {att.name}
                        </div>
                        <div className="attachment-details">
                          {att.size} • Verified Attachment
                        </div>
                      </div>
                    </div>

                    <div className="attachment-action">
                      <Download size={13} />
                      <span>Open</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Editorial Highlight Quote */}
            {page.quote && (
              <blockquote className="page-quote-box">
                <p className="quote-text">
                  "{page.quote.text}"
                </p>
                <footer className="quote-author-group">
                  <span className="quote-author">{page.quote.author}</span>
                  <span className="quote-role">{page.quote.role}</span>
                </footer>
              </blockquote>
            )}

            {/* Infographic Visual Chart */}
            {page.type === 'infographic' && (
              <div className="page-infographic-card">
                <div className="infographic-header">
                  <BarChart3 size={13} color="var(--accent)" />
                  <span>Quarterly Reader Engagement Velocity</span>
                </div>
                <svg viewBox="0 0 320 65" className="infographic-svg">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 55 Q 60 45, 110 32 T 210 22 T 310 8 L 310 65 L 10 65 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M 10 55 Q 60 45, 110 32 T 210 22 T 310 8"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="55" r="3" fill="var(--accent)" />
                  <circle cx="110" cy="32" r="3" fill="var(--accent)" />
                  <circle cx="210" cy="22" r="3" fill="var(--accent)" />
                  <circle cx="310" cy="8" r="4" fill="var(--text-primary)" stroke="var(--accent)" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>

          {/* Running Footer with Authentic Left/Right Folio Pagination */}
          <footer className={`page-footer ${isEvenPage ? 'footer-left' : 'footer-right'}`}>
            {isEvenPage ? (
              <>
                <span className="folio-number">{page.pageNumber}</span>
                <span className="folio-title">VIKFLIP MAGAZINE</span>
                <span className="folio-date">SPRING 2026</span>
              </>
            ) : (
              <>
                <span className="folio-title">VIKFLIP MAGAZINE</span>
                <span className="folio-date">SPRING 2026</span>
                <span className="folio-number">{page.pageNumber}</span>
              </>
            )}
          </footer>
        </div>
      )}

      {/* Tactile Corner Hover Curl Hints */}
      <div className="corner-hint-left"></div>
      <div className="corner-hint-right"></div>
    </div>
  );
});

PageContent.displayName = 'PageContent';
