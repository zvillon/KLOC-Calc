import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400',
    green: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-400',
    purple: 'bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400',
    orange: 'bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20 text-orange-400',
    red: 'bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 text-red-400',
  };

  const iconBgClasses = {
    blue: 'bg-blue-500/10',
    green: 'bg-emerald-500/10',
    purple: 'bg-purple-500/10',
    orange: 'bg-orange-500/10',
    red: 'bg-red-500/10',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-4 sm:p-6 hover:bg-opacity-20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <div className={`${iconBgClasses[color]} p-2 rounded-lg`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xl sm:text-2xl font-bold">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-400 leading-tight">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;