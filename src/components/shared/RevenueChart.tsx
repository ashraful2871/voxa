"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { ImStatsBars } from "react-icons/im";

const revenueData = [
    { month: "Jan", revenue: 2000, type: "actual" },
    { month: "Feb", revenue: 3200, type: "actual" },
    { month: "Mar", revenue: 2800, type: "actual" },
    { month: "Apr", revenue: 3800, type: "actual" },
    { month: "May", revenue: 4200, type: "actual" },
    { month: "Jun", revenue: 4000, type: "actual" },
    { month: "Jul", revenue: 4800, type: "actual" },
    { month: "Aug", revenue: 3600, type: "actual" },
    { month: "Sep", revenue: 4200, type: "projected" },
    { month: "Oct", revenue: 4600, type: "projected" },
    { month: "Nov", revenue: 5000, type: "projected" },
    { month: "Dec", revenue: 5400, type: "projected" },
]

const totalRevenue = revenueData.filter((item) => item.type === "actual").reduce((sum, item) => sum + item.revenue, 0)

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(0, 84%, 60%)",
    },
}

export default function RevenueChart() {
    return (
        <Card className="w-full !bg-foreground !border-0 !shadow-none">
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                    <ImStatsBars className="text-5xl text-primary" />
                    <div>
                        <span className="font-bold text-white">Revenue 2025 (8 Month)</span>
                        <div className="text-[32px] font-bold text-white">${totalRevenue.toLocaleString()}</div>
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
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.1} />
                                </linearGradient>
                                {/* <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.05} />
                </linearGradient> */}
                            </defs>
                            <CartesianGrid strokeDasharray="0" stroke="hsl(240, 3.7%, 15.9%)" horizontal={true} vertical={true} />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(240, 5%, 64.9%)", fontSize: 12 }}
                                className="text-xs"
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(240, 5%, 64.9%)", fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                                domain={[0, 10000]}
                                ticks={[0, 2000, 4000, 6000, 8000, 10000]}
                            />
                            <ChartTooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const dataPoint = revenueData.find((item) => item.month === label)
                                        const isProjected = dataPoint?.type === "projected"
                                        return (
                                            <>
                                                <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
                                                    <p className="text-gray-300 text-sm">{`${label}`}</p>
                                                    <p className="text-red-400 font-semibold">
                                                        Revenue: ${payload[0].value?.toLocaleString()}
                                                        {isProjected && <span className="text-gray-400 text-xs ml-2">(Projected)</span>}
                                                    </p>
                                                </div>
                                            </>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                data={revenueData.filter((item) => item.type === "actual")}
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
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                data={revenueData.filter((item) => item.type === "projected")}
                                stroke="hsl(0, 84%, 60%)"
                                strokeWidth={2}
                                strokeDasharray="5,5"
                                fill="url(#projectedGradient)"
                                dot={{
                                    fill: "hsl(0, 84%, 60%)",
                                    strokeWidth: 2,
                                    r: 3,
                                    opacity: 0.7,
                                }}
                                activeDot={{
                                    r: 5,
                                    fill: "hsl(0, 84%, 60%)",
                                    strokeWidth: 2,
                                    stroke: "hsl(0, 84%, 60%)",
                                    opacity: 0.8,
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
