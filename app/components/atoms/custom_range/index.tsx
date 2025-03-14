import { useState, useEffect, useRef } from "react";

interface Props {
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  placeholder?: boolean;
}

export const CustomRange = ({
  min,
  max,
  step = 1,
  defaultValue = min + (max - min) / 2,
  onChange,
  placeholder,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (newValue: number) => {
    // Ensure the value stays within bounds
    const clampedValue = Math.max(min, Math.min(max, newValue));
    setValue(clampedValue);
    onChange?.(clampedValue);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newValue = min + percentage * (max - min);

    // Round to step
    const steppedValue = Math.round(newValue / step) * step;
    handleChange(steppedValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newValue = min + percentage * (max - min);

    // Round to step
    const steppedValue = Math.round(newValue / step) * step;
    handleChange(steppedValue);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const formatCurrency = (value: number) => {
    return `$${value}`;
  };

  return (
    <div className="w-full">
      {placeholder && (
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-500">Min ({formatCurrency(min)})</span>
          <span className="text-gray-900 font-semibold">
            {formatCurrency(value)}
          </span>
          <span className="text-gray-500">Max ({formatCurrency(max)})</span>
        </div>
      )}

      <div
        ref={sliderRef}
        className="relative h-1 bg-blue-100 rounded-full cursor-pointer"
        onClick={handleClick}
      >
        {/* Track filled */}
        <div
          className="absolute h-full bg-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />

        {/* Handle */}
        <div
          className="absolute size-4 -mt-1.5 -ml-2.5 bg-blue-600 rounded-full shadow cursor-grab active:cursor-grabbing"
          style={{ left: `${percentage}%` }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};
