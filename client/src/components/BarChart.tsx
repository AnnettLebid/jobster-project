import { FC } from "react";
import {
  BarChart as BarChartComponent,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MonthlyApplications } from "../utils/types";

interface AreaChartProps {
  data: MonthlyApplications[];
}

const BarChart: FC<AreaChartProps> = ({ data }: AreaChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChartComponent data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="10 10 " />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" barSize={75} />
      </BarChartComponent>
    </ResponsiveContainer>
  );
};
export default BarChart;
