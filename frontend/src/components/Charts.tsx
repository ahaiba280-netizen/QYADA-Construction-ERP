import React from 'react';
import { Line, Bar, Pie, ResponsiveContainer, LineChart, BarChart, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  icon?: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, unit, trend, icon }) => {
  const isPositive = trend && trend >= 0;

  return (
    <div className="kpi-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-3xl font-bold mt-2 gradient-text">{value}</p>
          {unit && <p className="text-gray-400 text-xs mt-1">{unit}</p>}
        </div>
        {icon && <div className="text-gold text-4xl opacity-50">{icon}</div>}
      </div>
      {trend !== undefined && (
        <div className={`text-sm ${isPositive ? 'text-status-success' : 'text-status-error'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
};

interface ChartProps {
  data: any[];
  title: string;
}

export const LineChartComponent: React.FC<ChartProps> = ({ data, title }) => (
  <div className="premium-card">
    <h3 className="text-lg font-semibold mb-4 text-gold">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#B78B2E" />
        <XAxis stroke="#A7A7A7" />
        <YAxis stroke="#A7A7A7" />
        <Tooltip contentStyle={{ backgroundColor: '#0D2C29', border: '1px solid #B78B2E' }} />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#30D158" strokeWidth={2} />
        <Line type="monotone" dataKey="expense" stroke="#FF453A" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const BarChartComponent: React.FC<ChartProps> = ({ data, title }) => (
  <div className="premium-card">
    <h3 className="text-lg font-semibold mb-4 text-gold">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#B78B2E" />
        <XAxis stroke="#A7A7A7" />
        <YAxis stroke="#A7A7A7" />
        <Tooltip contentStyle={{ backgroundColor: '#0D2C29', border: '1px solid #B78B2E' }} />
        <Legend />
        <Bar dataKey="value" fill="#D4AF37" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const PieChartComponent: React.FC<ChartProps> = ({ data, title }) => (
  <div className="premium-card">
    <h3 className="text-lg font-semibold mb-4 text-gold">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" fill="#D4AF37" />
        <Tooltip contentStyle={{ backgroundColor: '#0D2C29', border: '1px solid #B78B2E' }} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
