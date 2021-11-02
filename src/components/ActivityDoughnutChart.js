import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export default function ActivityDoughnutChart({ progress, target }) {
  const [percentageFormat, setPercentageFormat] = useState(true);

  const adjustedProgress = (progress > target) ? target : progress;

  const percentage = ((progress / target) * 100).toFixed(0);

  const data = [
    {
      "name": "Progress",
      "value": adjustedProgress,
      "colour": "#4F46E5"
    },
    {
      "name": "Target",
      "value": target - adjustedProgress,
      "colour": "#e8e8e8"
    }
  ]

  const completedColour = '#34D399';

  return (
    <div className="w-full h-full relative">
      <PieChart width={250} height={250}>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={450} endAngle={90}>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={(progress >= target) ? completedColour : entry.colour} />
            ))
          }
        </Pie>

      </PieChart>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => setPercentageFormat(!percentageFormat)}
      >
        {percentageFormat &&
          <p className="text-lg font-medium">{percentage}%</p>
        }
        {!percentageFormat &&
          <p className="text-lg font-medium">{progress}/{target}</p>
        }
      </div>
    </div>
  )
}