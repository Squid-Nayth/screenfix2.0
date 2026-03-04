import React, { useRef, useState } from 'react';
import { useCMS, FieldPlugin, InputProps } from 'tinacms';

// Replacement image field that opens the native file picker instead of the Tina popup.
// It still supports drag & drop (via the default drop handler of the parent block) through Tina media.persist.
const NativeImageField: React.FC<InputProps> = (props) => {
  const cms = useCMS();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { input, field, form, meta } = props as any;

  const persistWithUniqueName = async (originalFile: File) => {
    const uploadDir = field.uploadDir || (() => '');
    const directory = uploadDir(form.getState().values);

    const toFileWithName = (name: string) =>
      new File([originalFile], name, { type: originalFile.type, lastModified: originalFile.lastModified });

    const makeUniqueName = (base: string) => {
      const dot = base.lastIndexOf('.');
      if (dot === -1) return `${base}-${Date.now()}`;
      const stem = base.slice(0, dot);
      const ext = base.slice(dot);
      return `${stem}-${Date.now()}${ext}`;
    };

    const tryPersist = async (f: File) => {
      const [media] = await cms.media.persist([{ directory, file: f }]);
      return media;
    };

    try {
      return await tryPersist(originalFile);
    } catch (err: any) {
      const message = err?.message || '';
      if (message.includes('File already exists')) {
        const unique = toFileWithName(makeUniqueName(originalFile.name));
        return await tryPersist(unique);
      }
      throw err;
    }
  };

  const onFileSelected = async (file?: File | null) => {
    if (!file) return;
    setUploading(true);
    try {
      const media: any = await persistWithUniqueName(file);
      if (media) {
        const valueToStore = media.src || media.id || media.previewSrc || media.filename || '';
        await input.onChange(valueToStore);
      }
    } catch (error) {
      console.error('Erreur upload image', error);
      cms.alerts.error('Échec du téléversement de l’image.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const clearImage = () => {
    input.onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const value = (input.value as string | undefined) || '';
  const previewSrc = value
    ? value.startsWith('http')
      ? value
      : `/${value.replace(/^\//, '')}`
    : undefined;

  return (
    <div style={{ display: 'grid', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #dcdde5',
            background: '#f5f6fb',
            cursor: 'pointer',
            fontWeight: 600
          }}
          disabled={uploading}
        >
          {uploading ? 'Téléversement…' : 'Choisir une image'}
        </button>
        {value ? (
          <button
            type="button"
            onClick={clearImage}
            style={{
              padding: '8px 10px',
              borderRadius: 6,
              border: '1px solid #f0b6b6',
              background: '#ffe6e6',
              color: '#c0392b',
              cursor: 'pointer',
              fontWeight: 600
            }}
            disabled={uploading}
            aria-label="Supprimer l'image"
            title="Supprimer l'image"
          >
            🗑️
          </button>
        ) : null}
        {value ? (
          <span style={{ fontSize: 12, color: '#666' }}>{value}</span>
        ) : (
          <span style={{ fontSize: 12, color: '#999' }}>Aucune image</span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => onFileSelected(e.target.files?.[0])}
      />

      {previewSrc ? (
        <img
          src={previewSrc}
          alt={field.label || 'aperçu'}
          style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid #eee' }}
        />
      ) : null}

      {meta?.error ? (
        <div style={{ color: '#e74c3c', fontSize: 12 }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

// Override the default Tina "image" field everywhere.
export const NativeImageFieldPlugin: FieldPlugin = {
  type: 'image',
  name: 'image',
  Component: NativeImageField
};

export default NativeImageField;
