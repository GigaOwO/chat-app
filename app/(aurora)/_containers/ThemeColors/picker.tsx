import React from 'react';
import { THEME_COLORS } from './constants';

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