import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#264653', // Deep Teal
  '#2a9d8f', // Persian Green
  '#e9c46a', // Muted Yellow
  '#f4a261', // Sandy Orange
  '#e76f51', // Soft Red
  '#8ecae6', // Pastel Blue
];


// for testing, erase later
const analysisData = [
  { jobTitle: "Software Engineer", percentage: 0.35 },
  { jobTitle: "Data Scientist", percentage: 0.25 },
  { jobTitle: "Product Manager", percentage: 0.20 },
  { jobTitle: "UX Designer", percentage: 0.20 }
];

export const CareerSuggestions = ({ analysis }) => {
  // if (!analysis || !Array.isArray(analysis) || analysis.length === 0) {
  //   return null; // Handle empty data
  // }

  analysis = analysisData;

  const data = {
    labels: analysis.map(item => item.jobTitle),
    datasets: [{
      data: analysis.map(item => item.percentage * 100),
      backgroundColor: analysis.map((_, index) => COLORS[index % COLORS.length]),
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 2,
      hoverBackgroundColor: analysis.map((_, index) => COLORS[index % COLORS.length].replace(')', ', 0.8)')),
      hoverBorderColor: 'rgba(255, 255, 255, 0.3)',
      hoverBorderWidth: 4,
      hoverOffset: 10
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        titleColor: '#333',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyColor: '#666',
        bodyFont: {
          size: 13
        },
        padding: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: (context) => {
            return ` ${context.formattedValue}%`;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div className="main-content flex flex-col items-center">
    <div style={{ width: '400px', height: '400px' }} className="mx-auto">
      <h2 className="text-center mb-4">Suggested Career Paths</h2>
      <Pie data={data} options={options} />
    </div>
  </div>
  );
};