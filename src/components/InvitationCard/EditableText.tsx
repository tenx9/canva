import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  disabled?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'انقر مرتين للتحرير...',
  multiline = false,
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // مزامنة القيمة عند التغيير من الخارج
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // التركيز على الحقل عند الدخول في وضع التحرير
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (editValue.trim() !== value) {
      onChange(editValue.trim());
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (isEditing) {
    const commonProps = {
      ref: inputRef as any,
      value: editValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setEditValue(e.target.value),
      onKeyDown: handleKeyDown,
      onBlur: handleBlur,
      className: `${className} border-2 border-primary-green bg-white px-2 py-1 outline-none`,
      placeholder,
    };

    if (multiline) {
      return <textarea {...commonProps} rows={3} />;
    }
    return <input type="text" {...commonProps} />;
  }

  const displayValue = value || placeholder;
  const textClassName = `${className} ${
    !disabled ? 'cursor-pointer hover:bg-gray-100 hover:bg-opacity-30' : ''
  } ${!value ? 'text-gray-400' : ''}`;

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={textClassName}
      title={disabled ? '' : 'انقر مرتين للتحرير'}
    >
      {displayValue}
    </div>
  );
};
