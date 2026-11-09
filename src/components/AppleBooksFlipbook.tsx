import React, { useRef, useState, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { SAMPLE_REPORT, ReportPage, DocumentAttachment } from '../data/sampleReport';
import { PageContent } from './PageContent';
import { AppleToolbar, ThemeMode, ReadingMode } from './AppleToolbar';
import { ThumbnailDrawer } from './ThumbnailDrawer';
import { AttachmentModal } from './AttachmentModal';
import { paperAudio } from '../utils/audio';

interface AppleBooksFlipbookProps {
  pages?: ReportPage[];
  initialTheme?: ThemeMode;
  initialReadingMode?: ReadingMode;
  initialMuted?: boolean;
  initialPage?: number;
  initialDrawerOpen?: boolean;
}

export const AppleBooksFlipbook: React.FC<AppleBooksFlipbookProps> = ({
  pages = SAMPLE_REPORT,
  initialTheme = 'sepia',
  initialReadingMode = 'horizontal',
  initialMuted = false,
  initialPage = 0,
  initialDrawerOpen = false
}) => {
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const verticalScrollRef = useRef<HTMLDivElement | null>(null);
  const verticalCardsRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Core State
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [readingMode, setReadingMode] = useState<ReadingMode>(initialReadingMode);
  const [isMuted, setIsMuted] = useState<boolean>(initialMuted);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(initialDrawerOpen);
  const [isChromeVisible, setIsChromeVisible] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedAttachment, setSelectedAttachment] = useState<DocumentAttachment | null>(null);

  // Dynamic Maximized Dimensions
  const [dimensions, setDimensions] = useState({
    pageWidth: 540,
    pageHeight: 745,
    verticalWidth: 720,
    verticalHeight: 990
  });

  // Calculate maximum allowed width & height considering margins and mobile
  const updateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const mobileCheck = winW < 768;
    setIsMobile(mobileCheck);

    const pageAspect = 1.38; // Standard publication ratio

    if (mobileCheck) {
      // Mobile Single Page Portrait Mode
      const maxMobileW = Math.max(winW - 24, 300);
      const maxMobileH = Math.max(winH - 140, 400);

      let pW = maxMobileW;
      let pH = pW * pageAspect;

      if (pH > maxMobileH) {
        pH = maxMobileH;
        pW = pH / pageAspect;
      }

      setDimensions({
        pageWidth: Math.floor(pW),
        pageHeight: Math.floor(pH),
        verticalWidth: Math.floor(maxMobileW),
        verticalHeight: Math.floor(maxMobileW * pageAspect)
      });
    } else {
      // Desktop / Tablet Two-Page Spread Mode
      const maxAvailH = Math.max(winH - 145, 420);
      const maxAvailW = Math.max(winW - 70, 500);

      let candH = maxAvailH;
      let candPageW = candH / pageAspect;
      let candSpreadW = candPageW * 2;

      if (candSpreadW > maxAvailW) {
        candSpreadW = maxAvailW;
        candPageW = candSpreadW / 2;
        candH = candPageW * pageAspect;
      }

      const vertW = Math.min(Math.floor(winW - 60), 800);
      const vertH = Math.floor(vertW * pageAspect);

      setDimensions({
        pageWidth: Math.floor(candPageW),
        pageHeight: Math.floor(candH),
        verticalWidth: vertW,
        verticalHeight: vertH
      });
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    updateDimensions();
    paperAudio.setMuted(initialMuted);

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [updateDimensions, initialMuted]);

  // Current Chapter lookup
  const currentChapter = pages[currentPage]?.chapter || 'Annual Report';

  // Chrome Auto-Hide Manager
  const chromeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetChromeTimer = useCallback(() => {
    setIsChromeVisible(true);
    if (chromeTimeoutRef.current) {
      clearTimeout(chromeTimeoutRef.current);
    }
    if (!isDrawerOpen && !selectedAttachment) {
      chromeTimeoutRef.current = setTimeout(() => {
        setIsChromeVisible(false);
      }, 4200);
    }
  }, [isDrawerOpen, selectedAttachment]);

  useEffect(() => {
    resetChromeTimer();
    return () => {
      if (chromeTimeoutRef.current) clearTimeout(chromeTimeoutRef.current);
    };
  }, [resetChromeTimer]);

  // Flip Event Handler for Horizontal Mode
  const handleFlip = useCallback((e: { data: number }) => {
    const newPage = e.data;
    setCurrentPage(newPage);
    paperAudio.playPageFlip();
    resetChromeTimer();
  }, [resetChromeTimer]);

  // Page Turn Actions
  const handlePrevPage = () => {
    if (readingMode === 'horizontal') {
      if (flipBookRef.current?.pageFlip()) {
        flipBookRef.current.pageFlip().flipPrev();
      }
    } else {
      const prevIdx = Math.max(0, currentPage - 1);
      handleJumpToPage(prevIdx);
    }
  };

  const handleNextPage = () => {
    if (readingMode === 'horizontal') {
      if (flipBookRef.current?.pageFlip()) {
        flipBookRef.current.pageFlip().flipNext();
      }
    } else {
      const nextIdx = Math.min(pages.length - 1, currentPage + 1);
      handleJumpToPage(nextIdx);
    }
  };

  const handleJumpToPage = (index: number) => {
    setCurrentPage(index);
    resetChromeTimer();

    if (readingMode === 'horizontal') {
      if (flipBookRef.current?.pageFlip()) {
        flipBookRef.current.pageFlip().flip(index);
      }
    } else {
      const targetCard = verticalCardsRef.current[index];
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Open Attachment Modal
  const handleOpenAttachment = (att: DocumentAttachment) => {
    setSelectedAttachment(att);
  };

  // Vertical Scroll Observer
  const lastActivePageRef = useRef<number>(currentPage);

  useEffect(() => {
    if (readingMode !== 'vertical') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageIdx = Number(entry.target.getAttribute('data-page-index'));
            if (!isNaN(pageIdx) && pageIdx !== lastActivePageRef.current) {
              lastActivePageRef.current = pageIdx;
              setCurrentPage(pageIdx);
              paperAudio.playPageFlip();
            }
          }
        });
      },
      {
        root: verticalScrollRef.current,
        threshold: 0.55
      }
    );

    Object.values(verticalCardsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [readingMode, dimensions.verticalWidth]);

  // Mode Toggle
  const handleReadingModeChange = (mode: ReadingMode) => {
    setReadingMode(mode);
    resetChromeTimer();

    if (mode === 'vertical') {
      setTimeout(() => {
        verticalCardsRef.current[currentPage]?.scrollIntoView({ behavior: 'auto', block: 'center' });
      }, 60);
    }
  };

  // Mute Toggle
  const handleToggleMute = () => {
    const newMuted = paperAudio.toggleMute();
    setIsMuted(newMuted);
  };

  // Fullscreen Toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      resetChromeTimer();
      if (e.key === 'Escape') {
        if (selectedAttachment) {
          setSelectedAttachment(null);
        } else if (isDrawerOpen) {
          setIsDrawerOpen(false);
        }
      } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || (readingMode === 'vertical' && e.key === 'ArrowDown')) {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || (readingMode === 'vertical' && e.key === 'ArrowUp')) {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key.toLowerCase() === 'm') {
        handleToggleMute();
      } else if (e.key.toLowerCase() === 'd') {
        setIsDrawerOpen(prev => !prev);
      } else if (e.key.toLowerCase() === 't') {
        setTheme(curr => (curr === 'light' ? 'sepia' : curr === 'sepia' ? 'dark' : 'light'));
      } else if (e.key.toLowerCase() === 'v') {
        handleReadingModeChange(readingMode === 'horizontal' ? 'vertical' : 'horizontal');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resetChromeTimer, readingMode, currentPage, selectedAttachment, isDrawerOpen]);

  return (
    <div
      ref={containerRef}
      className={`vikflip-container theme-${theme}`}
      onMouseMove={resetChromeTimer}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.apple-chrome') && !target.closest('.thumb-drawer') && !target.closest('.attachment-modal-card')) {
          setIsChromeVisible(prev => !prev);
        }
      }}
    >
      {/* Floating Apple Books Minimalist Chrome */}
      <AppleToolbar
        isVisible={isChromeVisible}
        currentChapter={currentChapter}
        currentPage={currentPage}
        totalPages={pages.length}
        theme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
        readingMode={readingMode}
        onReadingModeChange={handleReadingModeChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => setIsDrawerOpen(prev => !prev)}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onJumpToPage={handleJumpToPage}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Mode 1: Horizontal 3D Page-Flip Mode */}
      {readingMode === 'horizontal' && (
        <main className="vikflip-stage">
          <div className="vikflip-book-wrapper">
            {!isMobile && (
              <>
                <div className="page-edge-stack-left"></div>
                <div className="page-edge-stack-right"></div>
              </>
            )}

            {isMounted && (
              <HTMLFlipBook
                key={`flipbook-${dimensions.pageWidth}-${dimensions.pageHeight}-${isMobile}`}
                ref={flipBookRef}
                width={dimensions.pageWidth}
                height={dimensions.pageHeight}
                size="fixed"
                minWidth={dimensions.pageWidth}
                maxWidth={dimensions.pageWidth}
                minHeight={dimensions.pageHeight}
                maxHeight={dimensions.pageHeight}
                maxShadowOpacity={0.4}
                showCover={!isMobile}
                mobileScrollSupport={true}
                flippingTime={750}
                drawShadow={true}
                startPage={currentPage}
                usePortrait={isMobile}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={25}
                showPageCorners={true}
                disableFlipByClick={true} // Crucial: Allows clicking links and attachment buttons without accidental flips!
                className="flipbook-root"
                style={{ margin: '0 auto' }}
                onFlip={handleFlip}
              >
                {pages.map((p) => (
                  <PageContent
                    key={p.id}
                    page={p}
                    totalPages={pages.length}
                    onJumpToPage={handleJumpToPage}
                    onOpenAttachment={handleOpenAttachment}
                  />
                ))}
              </HTMLFlipBook>
            )}
          </div>
        </main>
      )}

      {/* Mode 2: Vertical Smooth Scroll Flow Mode */}
      {readingMode === 'vertical' && (
        <main
          ref={verticalScrollRef}
          className="vikflip-vertical-stage"
          onScroll={resetChromeTimer}
        >
          {pages.map((p, idx) => (
            <div
              key={p.id}
              data-page-index={idx}
              ref={(el) => (verticalCardsRef.current[idx] = el)}
              className="vikflip-vertical-card"
              style={{
                width: `${dimensions.verticalWidth}px`,
                height: `${dimensions.verticalHeight}px`
              }}
            >
              <PageContent
                page={p}
                totalPages={pages.length}
                onJumpToPage={handleJumpToPage}
                onOpenAttachment={handleOpenAttachment}
              />
            </div>
          ))}
        </main>
      )}

      {/* Bottom Thumbnail Navigator Drawer */}
      <ThumbnailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        pages={pages}
        currentPage={currentPage}
        onSelectPage={handleJumpToPage}
      />

      {/* Glassmorphic Document Attachment Modal */}
      <AttachmentModal
        attachment={selectedAttachment}
        onClose={() => setSelectedAttachment(null)}
      />
    </div>
  );
};
