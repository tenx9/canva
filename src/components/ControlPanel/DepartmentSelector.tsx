import React from 'react';
import type { DepartmentId } from '@/types/invitation.types';

interface DepartmentSelectorProps {
  value: DepartmentId;
  onChange: (department: DepartmentId) => void;
}

const DEPARTMENTS = [
  { id: 'business' as DepartmentId, name: 'إدارة الأعمال' },
  { id: 'accounting' as DepartmentId, name: 'المحاسبة' },
  { id: 'economics' as DepartmentId, name: 'الاقتصاد' },
  { id: 'dean' as DepartmentId, name: 'عمادة كلية الاقتصاد والعلوم الإدارية' },
];

export const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-text-dark mb-2">
        القسم
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DepartmentId)}
        className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary-green text-text-dark bg-white"
      >
        {DEPARTMENTS.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
};
