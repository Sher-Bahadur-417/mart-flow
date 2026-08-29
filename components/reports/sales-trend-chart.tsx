"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SalesTrendChart({
  data,
}: {
  data: { date: string; sales: number; profit: number }[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" hide={data.length > 10} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="profit" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
