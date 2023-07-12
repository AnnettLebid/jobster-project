import { FC } from "react";
import {
  ResponsiveContainer,
  AreaChart as AreaChartComponent,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { MonthlyApplications } from "../utils/types";

interface AreaChartProps {
  data: MonthlyApplications[];
}

export const AreaChart: FC<AreaChartProps> = ({ data }: AreaChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChartComponent data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#1e3a8a" fill="#3b82f6" />
      </AreaChartComponent>
    </ResponsiveContainer>
  );
};
