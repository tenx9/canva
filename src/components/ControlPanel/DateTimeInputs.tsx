import React from 'react';

interface DateTimeInputsProps {
  date: string;
  timeStart: string;
  timeEnd: string;
  onDateChange: (date: string) => void;
  onTimeStartChange: (time: string) => void;
  onTimeEndChange: (time: string) => void;
}

export const DateTimeInputs: React.FC<DateTimeInputsProps> = ({
  date,
  timeStart,
  timeEnd,
  onDateChange,
  onTimeStartChange,
  onTimeEndChange,
}) => {
  return (
    <div className="mb-6">
      {/* التاريخ */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-text-dark mb-2">
          التاريخ
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary-green text-text-dark"
        />
      </div>

      {/* الوقت */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-text-dark mb-2">
            من
          </label>
          <input
            type="time"
            value={timeStart}
            onChange={(e) => onTimeStartChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary-green text-text-dark"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-dark mb-2">
            إلى
          </label>
          <input
            type="time"
            value={timeEnd}
            onChange={(e) => onTimeEndChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary-green text-text-dark"
          />
        </div>
      </div>
    </div>
  );
};
