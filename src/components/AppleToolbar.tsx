import React from 'react';
import {
  Volume2,
  VolumeX,
  BookOpen,
  LayoutGrid,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Rows3,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

export type ThemeMode = 'light' | 'sepia' | 'dark';
export type ReadingMode = 'horizontal' | 'vertical';

interface AppleToolbarProps {
  isVisible: boolean;
  currentChapter: string;
  currentPage: number;
  totalPages: number;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  readingMode: ReadingMode;
  onReadingModeChange: (mode: ReadingMode) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onJumpToPage: (pageIndex: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const AppleToolbar: React.FC<AppleToolbarProps> = ({
  isVisible,
  currentChapter,
  currentPage,
  totalPages,
  theme,
  onThemeChange,
  readingMode,
  onReadingModeChange,
  isMuted,
  onToggleMute,
  isDrawerOpen,
  onToggleDrawer,
  onPrevPage,
  onNextPage,
  onJumpToPage,
  isFullscreen,
  onToggleFullscreen
}) => {
  return (
    <>
      {/* Top Floating Glass Chrome */}
      <header
        className={`apple-chrome apple-top-bar ${!isVisible ? 'chrome-hidden' : ''}`}
        aria-label="Reading Controls"
      >
        {/* Document & Chapter Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingRight: '8px', borderRight: '1px solid var(--chrome-border)' }}>
          <BookOpen size={15} color="var(--accent)" />
          <span className="doc-title-text" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            VikFlip
          </span>
          <span className="chapter-title-text" style={{ fontSize: '12px', color: 'var(--text-tertiary)', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            • {currentChapter}
          </span>
        </div>

        {/* Horizontal Flip vs Vertical Scroll Flow Toggle */}
        <div className="segmented-picker" role="radiogroup" aria-label="Reading Orientation">
          <button
            type="button"
            className={`segmented-option ${readingMode === 'horizontal' ? 'selected' : ''}`}
            onClick={() => onReadingModeChange('horizontal')}
            title="Horizontal 3D Flip (V)"
          >
            <Columns2 size={13} />
            <span>Flip</span>
          </button>
          <button
            type="button"
            className={`segmented-option ${readingMode === 'vertical' ? 'selected' : ''}`}
            onClick={() => onReadingModeChange('vertical')}
            title="Vertical Scroll Flow (V)"
          >
            <Rows3 size={13} />
            <span>Scroll</span>
          </button>
        </div>

        {/* Ambient Audio FX Mute Toggle */}
        <button
          onClick={onToggleMute}
          className="apple-btn"
          title={isMuted ? 'Unmute paper rustle (M)' : 'Mute paper rustle (M)'}
          aria-label={isMuted ? 'Unmute paper rustle' : 'Mute paper rustle'}
        >
          {isMuted ? (
            <VolumeX size={16} color="var(--text-tertiary)" />
          ) : (
            <Volume2 size={16} color="var(--accent)" />
          )}
        </button>

        {/* Theme Segmented Control: Light, Sepia, Dark */}
        <div className="segmented-picker" role="radiogroup" aria-label="Reading Themes">
          <button
            type="button"
            className={`segmented-option ${theme === 'light' ? 'selected' : ''}`}
            onClick={() => onThemeChange('light')}
            title="Light Theme"
          >
            <Sun size={12} />
            <span>Light</span>
          </button>
          <button
            type="button"
            className={`segmented-option ${theme === 'sepia' ? 'selected' : ''}`}
            onClick={() => onThemeChange('sepia')}
            title="Sepia Warm Paper Theme"
          >
            <Sparkles size={12} />
            <span>Sepia</span>
          </button>
          <button
            type="button"
            className={`segmented-option ${theme === 'dark' ? 'selected' : ''}`}
            onClick={() => onThemeChange('dark')}
            title="Dark Mode"
          >
            <Moon size={12} />
            <span>Dark</span>
          </button>
        </div>

        {/* Bottom Drawer Navigator Toggle */}
        <button
          onClick={onToggleDrawer}
          className={`apple-btn ${isDrawerOpen ? 'active' : ''}`}
          title="Toggle Thumbnail Navigator (D)"
          aria-label="Toggle Thumbnail Drawer"
        >
          <LayoutGrid size={15} />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="apple-btn"
          title="Toggle Fullscreen"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </header>

      {/* Bottom Floating Glass Navigation Bar */}
      <footer
        className={`apple-chrome apple-bottom-bar ${!isVisible || isDrawerOpen ? 'chrome-hidden' : ''}`}
        aria-label="Navigation Controls"
      >
        <button
          onClick={onPrevPage}
          disabled={currentPage <= 0}
          className="apple-btn"
          title="Previous Page (Left Arrow / Up Arrow)"
          style={{ opacity: currentPage <= 0 ? 0.4 : 1, cursor: currentPage <= 0 ? 'not-allowed' : 'pointer' }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Interactive Apple-styled Page Scrubber */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <input
            type="range"
            min={0}
            max={totalPages - 1}
            value={currentPage}
            onChange={(e) => onJumpToPage(Number(e.target.value))}
            className="apple-slider"
            aria-label="Page Scrubber"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-tertiary)', padding: '0 2px' }}>
            <span>Cover</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              Page {currentPage + 1} of {totalPages}
            </span>
            <span>Back</span>
          </div>
        </div>

        <button
          onClick={onNextPage}
          disabled={currentPage >= totalPages - 1}
          className="apple-btn"
          title="Next Page (Right Arrow / Down Arrow / Space)"
          style={{ opacity: currentPage >= totalPages - 1 ? 0.4 : 1, cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
        >
          <ChevronRight size={18} />
        </button>
      </footer>
    </>
  );
};
