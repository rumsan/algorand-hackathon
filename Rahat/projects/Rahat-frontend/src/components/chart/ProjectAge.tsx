import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import useGet from '../../hooks/useGet'; // Adjust the import path to your useGet hook
import { URLS } from '@/constants';
import 'chart.js/auto';
import { useParams } from 'react-router-dom';

const ProjectAge = () => {
  const { id } = useParams();
  const { data: cahrAgeData } = useGet('DashboardAge', `${URLS.PROJECT}/chart-age/${id}`);
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (cahrAgeData) {
      const filteredData = Object.entries(cahrAgeData).filter(([_, count]) => count > 0);
      const labelsArray = filteredData.map(([ageRange]) => ageRange);
      const dataArray = filteredData.map(([_, count]) => count);

      setLabels(labelsArray);
      setDataset(dataArray);
    }
  }, [cahrAgeData]);

  const data = {
    labels,
    datasets: [
      {
        label: '# of Beneficiaries',
        data: dataset,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '400px' }}>
      <Pie data={data} />
    </div>
  );
};

export default ProjectAge;
