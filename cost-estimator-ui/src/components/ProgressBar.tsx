import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  showValue?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  label, 
  value, 
  maxValue = 100, 
  color, 
  showValue = true 
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">{label}</span>
        {showValue && <span className="text-sm text-gray-400">{value}</span>}
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className={`${colorClasses[color]} h-2 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;