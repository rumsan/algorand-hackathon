import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import useGet from '../../hooks/useGet'; // Adjust the import path to your useGet hook
import { URLS } from '@/constants';
import 'chart.js/auto';
import { useParams } from 'react-router-dom';

const ProjectGender = () => {
  const { id } = useParams();
  const { data: chatData } = useGet('projectGender', `${URLS.PROJECT}/chart-gender/${id}`);
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (chatData) {
    const labelsArray = Object.keys(chatData);
    const dataArray = Object.values(chatData);

      setLabels(labelsArray);
      setDataset(dataArray);
    }
  }, [chatData]);

  const data = {
    labels,
    datasets: [
      {
        label: '# of',
        data: dataset,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '400px' }}>
      {/* Use a key prop based on data to force re-render */}
      <Pie data={data} key={JSON.stringify(data)} />
    </div>
  );
};

export default ProjectGender;
