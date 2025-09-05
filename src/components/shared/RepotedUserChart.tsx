"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LabelList } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const reportData = [
  { reason: "Impersonation", count: 28 },
  { reason: "Fake ID or Info", count: 19 },
  { reason: "Inappropriate Profile Photo", count: 14 },
  { reason: "Offensive Bio / Text", count: 17 },
  { reason: "Spam Account", count: 16 },
]

export default function ReportedUsersChart() {
  return (
    <Card className="w-full !bg-foreground !border-0 !shadow-none">
      <CardHeader>
        <CardTitle className="text-white font-bold">
          Reported Users by Reason (Last 30 days)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[233px] w-full"> {/* Increased height */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={reportData} 
              barSize={50} 
              margin={{ top: 15, right: 20, left: 10, bottom: 50 }} // extra space for labels
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="0" vertical={false} stroke="hsl(240, 3.7%, 15.9%)" />

              <XAxis
                dataKey="reason"
                tick={{ fill: "#d1d5db", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-25}
                textAnchor="end"
              />

              <YAxis
                tick={{ fill: "#d1d5db", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]}>
                <LabelList
                  dataKey="count"
                  position="top"
                  fill="#fff"
                  fontSize={12}
                  fontWeight="bold"
                  offset={5} 
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
