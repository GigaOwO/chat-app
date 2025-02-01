import React from 'react';

export const THEME_COLORS = [
  { id: '1D282E', name: 'Deep Sea', value: '#1D282E' },
  { id: '222B26', name: 'Forest', value: '#222B26' },
  { id: '3C2D49', name: 'Purple Night', value: '#3C2D49' },
  { id: '5C3B23', name: 'Auburn', value: '#5C3B23' },
  { id: '522E2A', name: 'Burgundy', value: '#522E2A' },
];

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (colorId: string) => void;
}

export function ThemeColorPicker({
  selectedColor,
  onColorSelect,
}: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">テーマカラー</label>
      <div className="grid grid-cols-5 gap-3">
        {THEME_COLORS.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => onColorSelect(color.id)}
            className={`
              w-12 h-12 rounded-lg transition-all duration-200
              ${selectedColor === color.id ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}
            `}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}