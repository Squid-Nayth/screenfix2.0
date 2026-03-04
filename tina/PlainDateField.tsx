import React from 'react';
import { FieldPlugin, InputProps } from 'tinacms';

// Simple date field using the browser's native calendar (input type="date").
const PlainDateField: React.FC<InputProps> = (props) => {
  const { input, field, meta } = props as any;
  const rawValue = (input.value as string | undefined) || '';
  const value =
    rawValue && rawValue.length >= 10
      ? rawValue.slice(0, 10) // keep YYYY-MM-DD part
      : '';

  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <input
        type="date"
        value={value}
        onChange={(e) => input.onChange(e.target.value)}
        placeholder={field?.placeholder || 'YYYY-MM-DD'}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid #dcdde5',
          fontSize: 14
        }}
      />
      {meta?.error ? (
        <span style={{ color: '#e74c3c', fontSize: 12 }}>{meta.error}</span>
      ) : null}
    </div>
  );
};

// Override Tina's datetime with a plain text input.
export const PlainDateFieldPlugin: FieldPlugin = {
  type: 'datetime',
  name: 'datetime',
  Component: PlainDateField
};

export default PlainDateField;
