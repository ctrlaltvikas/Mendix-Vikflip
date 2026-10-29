import React, { useMemo } from 'react';
import { VikFlipContainerProps } from './typings/VikFlipProps';
import { AppleBooksFlipbook } from './components/AppleBooksFlipbook';
import { WidgetErrorBoundary } from './components/WidgetErrorBoundary';
import { SAMPLE_REPORT, ReportPage } from './data/sampleReport';
import './styles/VikFlip.css';

export const VikFlip: React.FC<VikFlipContainerProps> = (props) => {
  const {
    pages: pagesProp,
    pageImage,
    pageNumber,
    chapterTitle,
    pageDensity,
    initialTheme = 'sepia',
    initialMode = 'horizontal',
    soundEnabled = true,
    onPageChange,
    onAttachmentClick,
    class: customClass = '',
    style: customStyle = {}
  } = props;

  // Map Mendix ListValue into ReportPage format
  const mappedPages = useMemo<ReportPage[]>(() => {
    if (!pagesProp || pagesProp.status !== 'available' || !pagesProp.items || pagesProp.items.length === 0) {
      // Standalone or design fallback
      return SAMPLE_REPORT;
    }

    return pagesProp.items.map((item, index) => {
      const imgVal = pageImage ? pageImage.get(item).value : undefined;
      const numVal = pageNumber ? Number(pageNumber.get(item).value) : index + 1;
      const chapterVal = chapterTitle ? chapterTitle.get(item).value || `Page ${index + 1}` : `Page ${index + 1}`;
      const densityVal = pageDensity ? (pageDensity.get(item).value === 'hard' ? 'hard' : 'soft') : (index === 0 || index === pagesProp.items!.length - 1 ? 'hard' : 'soft');

      return {
        id: item.id || `mendix-page-${index}`,
        pageNumber: numVal,
        chapter: chapterVal,
        isCover: index === 0 || index === pagesProp.items!.length - 1,
        density: densityVal,
        type: index === 0 ? 'front-cover' : index === pagesProp.items!.length - 1 ? 'back-cover' : 'feature',
        title: chapterVal,
        subtitle: `Document Page ${numVal}`,
        imageUrl: imgVal
      } as ReportPage;
    });
  }, [pagesProp, pageImage, pageNumber, chapterTitle, pageDensity]);

  // Loading Skeleton
  if (pagesProp && pagesProp.status === 'loading') {
    return (
      <div
        className={`vikflip-container theme-${initialTheme} ${customClass}`}
        style={{ ...customStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid var(--chrome-border)',
              borderTopColor: 'var(--accent)',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 16px'
            }}
          />
          <span style={{ fontSize: '13px', fontWeight: 500 }}>
            Loading Publication...
          </span>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className={`vikflip-widget-wrapper ${customClass}`} style={customStyle}>
      <WidgetErrorBoundary fallbackMessage="Unable to initialize AppleBooksFlipbook widget.">
        <AppleBooksFlipbook
          pages={mappedPages}
          initialTheme={initialTheme}
          initialReadingMode={initialMode}
          initialMuted={!soundEnabled}
        />
      </WidgetErrorBoundary>
    </div>
  );
};

export default VikFlip;
