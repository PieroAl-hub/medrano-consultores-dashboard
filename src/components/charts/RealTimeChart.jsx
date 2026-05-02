import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useRealTimeData } from '../../hooks/useRealTimeData'

const RealTimeChart = ({ title, dataKey, color = '#2563eb' }) => {
  const [data, setData] = useState([])
  const { latestData } = useRealTimeData()

  useEffect(() => {
    if (latestData) {
      setData(prevData => {
        const newData = [...prevData, {
          time: new Date().toLocaleTimeString(),
          value: latestData[dataKey] || 0
        }]
        return newData.slice(-20)
      })
    }
  }, [latestData, dataKey])

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RealTimeChart
