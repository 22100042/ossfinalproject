import React, { useEffect, useState } from 'react';

const TransferData = () => {
  const [status, setStatus] = useState(''); 
  const publicApiUrl =
    'https://api.odcloud.kr/api/15113093/v1/uddi:2d3644d5-c88f-4240-83f7-eb12cf6772f7?page=1&perPage=47&serviceKey=Abx7rHO5J4uvKphplereXLu7nQaJmD7nVXrORrU7hNRH%2B8Wbdw4EaQs4Fy5c2%2Bb08%2BAgjYeX9Un9TJ%2Bco%2F94uQ%3D%3D';
  const mockApiUrl = 'https://675bf7eb9ce247eb19380b43.mockapi.io/Hospital';

  useEffect(() => {
    const transferData = async () => {
      try {
        setStatus('Checking MockAPI...');
        const mockResponse = await fetch(mockApiUrl);
        const mockData = await mockResponse.json();

        if (mockData.length > 0) {
          setStatus('Data already exists in MockAPI. Skipping transfer.');
          return;
        }

        setStatus('Fetching data from public API...');
        const publicResponse = await fetch(publicApiUrl);
        const publicData = await publicResponse.json();

        if (!publicData || !publicData.data || publicData.data.length === 0) {
          setStatus('No data found in public API.');
          return;
        }

        const hospitalData = publicData.data.map((hospital, index) => ({
          id: index + 1, 
          name: hospital['의료기관명'],
          address: hospital['의료기관주소(도로명)'],
          phone: hospital['의료기관전화번호'],
          department: hospital['전문의'] ? 'General Medicine' : 'Other',
          reviews: [], 
          reservation: [], 
        }));
        

        hospitalData.sort((a, b) => a.id - b.id);

        setStatus('Uploading data to MockAPI...');
        const uploadPromises = hospitalData.map((hospital) =>
          fetch(mockApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(hospital),
          })
        );

        await Promise.all(uploadPromises);
        setStatus('Data successfully transferred to MockAPI!');
      } catch (error) {
        console.error('Error transferring data:', error);
        setStatus('Error occurred while transferring data.');
      }
    };

    transferData();
  }, []);

 
};

export default TransferData;
