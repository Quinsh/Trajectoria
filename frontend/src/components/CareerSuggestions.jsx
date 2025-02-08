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
  { title: "Software Engineer", confidence: 0.35 },
  { title: "Data Scientist", confidence: 0.25 },
  { title: "Product Manager", confidence: 0.20 },
  { title: "UX Designer", confidence: 0.20 }
];

export const CareerSuggestions = ({ analysis }) => {
  // if (!analysis || !Array.isArray(analysis) || analysis.length === 0) {
  //   return null; // Handle empty data
  // }

  if(analysis) {
    analysis = analysis.careers
  } else {
    analysis = analysisData;
  }
  

  const data = {
    labels: analysis.map(item => item.title),
    datasets: [{
      data: analysis.map(item => item.confidence * 100),
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
    <div className="main-content flex flex-col items-center w-fit mx-auto">
    <div style={{ width: '450px' }} className="w-fit mx-auto py-4">
    <h2 className="text-center mb-4">Your most suggested career path is <i className="gradient-text">{analysis[0].title}</i></h2>
    <Pie data={data} options={options} />
</div>
</div>
  );
};