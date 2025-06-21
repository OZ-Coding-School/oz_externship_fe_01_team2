// FormInput.tsx
import React, { useState } from 'react';
import type { FormInputProps } from './FormInput.types'; 

const FormInput: React.FC<FormInputProps> = ({
  placeholder = "",
  type = "text",
  value,
  onChange,
  onFocus,
  onBlur,
  hasError = false,
  errorMessage = "",
  hasSuccess = false,
  successMessage = "",
  width = "480px",
  height = "48px"
}) => {

    const [inputValue, setInputValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);

  // value가 외부에서 제어되는지 확인
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : inputValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInputValue(newValue);
    }
    
    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const getBorderColor = () => {
    if (hasError) return 'border-[rgba(236,0,55,1)]';
    if (hasSuccess) return 'border-[rgba(20,199,134,1)]';
    if (isFocused) return 'border-[rgba(98,1,224,1)]';
    return 'border-[rgba(189,189,189,1)]';
  };

  return (
    <div className="w-full">
      <div className="relative" style={{ width }}>
        <input 
          type={type}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          style={{ height }}
          className={`w-full h-full border rounded-[4px] pl-3 pr-12 focus:outline-none bg-[rgba(255,255,255,1)] placeholder-[rgba(189,189,189,1)] font-pretendard font-normal text-[14px] leading-none tracking-[-0.03em] text-[rgba(18,18,18,1)] ${getBorderColor()}`}
        />
        
        {hasSuccess && (
          <img 
            src="/success.svg" 
            alt="성공" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        )}
      </div>

      {hasError && errorMessage && (
        <p className="text-[rgba(236,0,55,1)] text-sm mt-1">
          {errorMessage}
        </p>
      )}

      {hasSuccess && successMessage && (
        <p className="text-[rgba(20,199,134,1)] text-sm mt-1">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default FormInput;