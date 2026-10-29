import { CSSProperties } from 'react';

export type ValueStatus = 'loading' | 'available' | 'unavailable';

export interface ObjectItem {
  id: string;
}

export interface EditableValue<T> {
  value?: T;
  displayValue?: string;
  status: ValueStatus;
  readOnly?: boolean;
}

export interface ListValue {
  status: ValueStatus;
  items?: ObjectItem[];
  totalCount?: number;
  hasMoreItems?: boolean;
  setLimit?: (limit: number) => void;
  setOffset?: (offset: number) => void;
}

export interface ListAttributeValue<T> {
  get(item: ObjectItem): EditableValue<T>;
}

export interface ActionValue {
  readonly canExecute: boolean;
  readonly isExecuting: boolean;
  execute(): void;
}

export type InitialThemeEnum = 'sepia' | 'light' | 'dark';
export type InitialModeEnum = 'horizontal' | 'vertical';

export interface VikFlipContainerProps {
  name: string;
  class: string;
  style?: CSSProperties;
  tabIndex?: number;

  // Data Source Properties
  pages?: ListValue;
  pageImage?: ListAttributeValue<string>;
  pageNumber?: ListAttributeValue<BigJs.Big | number>;
  chapterTitle?: ListAttributeValue<string>;
  pageDensity?: ListAttributeValue<string>;

  // Appearance & Themes
  initialTheme: InitialThemeEnum;
  initialMode: InitialModeEnum;
  autoHideToolbar: boolean;
  showThumbnailDrawer: boolean;

  // Audio FX
  soundEnabled: boolean;

  // Events
  onPageChange?: ActionValue;
  onAttachmentClick?: ActionValue;
}

export interface VikFlipPreviewProps {
  class: string;
  style: string;
  pages: string;
  pageImage: string;
  pageNumber: string;
  chapterTitle: string;
  pageDensity: string;
  initialTheme: InitialThemeEnum;
  initialMode: InitialModeEnum;
  autoHideToolbar: boolean;
  showThumbnailDrawer: boolean;
  soundEnabled: boolean;
  onPageChange: {} | null;
  onAttachmentClick: {} | null;
}
