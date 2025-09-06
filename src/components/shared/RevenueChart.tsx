/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ImStatsBars } from "react-icons/im";
import { useTotalRevenueQuery } from "@/redux/features/userManagement/userManagementApi";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(0, 84%, 60%)",
  },
};

export default function RevenueChart() {
  const { data: revenue } = useTotalRevenueQuery(undefined);

  // transform API response into recharts format
  const revenueData =
    revenue?.data?.monthlyBreakdown?.map((item: any) => ({
      month: item.month,
      revenue: item.revenue,
    })) || [];

  const totalRevenue = revenue?.data?.totalRevenue ?? 0;

  return (
    <Card className="w-full !bg-foreground !border-0 !shadow-none">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <ImStatsBars className="text-5xl text-primary" />
          <div>
            <span className="font-bold text-white">Revenue 2025 (8 Month)</span>
            <div className="text-[32px] font-bold text-white">
              ${totalRevenue.toFixed(2)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(0, 84%, 60%)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(0, 84%, 60%)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="0"
                stroke="hsl(240, 3.7%, 15.9%)"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(240, 5%, 64.9%)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(240, 5%, 64.9%)", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                content={({ active, payload, label }) =>
                  active && payload && payload.length ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
                      <p className="text-gray-300 text-sm">{label}</p>
                      <p className="text-red-400 font-semibold">
                        Revenue: ${payload[0].value?.toLocaleString()}
                      </p>
                    </div>
                  ) : null
                }
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(0, 84%, 60%)"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                dot={{
                  fill: "hsl(0, 84%, 60%)",
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  fill: "hsl(0, 84%, 60%)",
                  strokeWidth: 2,
                  stroke: "hsl(0, 84%, 60%)",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
