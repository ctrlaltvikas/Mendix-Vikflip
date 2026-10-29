import React from 'react';
import { DocumentAttachment } from '../data/sampleReport';
import { FileText, Table, FileCode, Download, ExternalLink, X, CheckCircle, ShieldCheck } from 'lucide-react';

interface AttachmentModalProps {
  attachment: DocumentAttachment | null;
  onClose: () => void;
}

export const AttachmentModal: React.FC<AttachmentModalProps> = ({ attachment, onClose }) => {
  if (!attachment) return null;

  const isPdf = attachment.type === 'pdf';
  const isXlsx = attachment.type === 'xlsx';

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real application or Mendix widget, this triggers the Mendix file download stream
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`[VikFlip Document Attachment]: ${attachment.name}\n${attachment.description || ''}`);
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="attachment-modal-backdrop"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="attachment-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: isPdf ? 'rgba(239, 68, 68, 0.12)' : isXlsx ? 'rgba(16, 185, 129, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isPdf ? (
                <FileText size={22} color="#EF4444" />
              ) : isXlsx ? (
                <Table size={22} color="#10B981" />
              ) : (
                <FileCode size={22} color="#3B82F6" />
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                  {attachment.type.toUpperCase()} ATTACHMENT
                </span>
                <ShieldCheck size={13} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0 0' }}>
                {attachment.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="apple-btn"
            title="Close (Esc)"
            aria-label="Close"
            style={{ padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Description & Metadata */}
        {attachment.description && (
          <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-secondary)', marginBottom: '16px' }}>
            {attachment.description}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 14px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', border: '1px solid var(--chrome-border)', marginBottom: '20px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <div>
            <span style={{ color: 'var(--text-tertiary)' }}>File Size: </span>
            <b style={{ color: 'var(--text-primary)' }}>{attachment.size}</b>
          </div>
          <div>•</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={13} color="#10B981" />
            <span>Mendix Security Scanned</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleDownload}
            style={{
              flex: 1,
              background: 'var(--accent)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '10px 18px',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'opacity 0.2s',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
            }}
          >
            <Download size={15} />
            Download File
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--chrome-border)',
              borderRadius: '9999px',
              padding: '10px 18px',
              fontWeight: 500,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
