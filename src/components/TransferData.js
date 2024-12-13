import React, { useEffect, useState } from 'react';

const TransferData = () => {
  const [status, setStatus] = useState(''); // 상태 관리
  const publicApiUrl =
    'https://api.odcloud.kr/api/15113093/v1/uddi:2d3644d5-c88f-4240-83f7-eb12cf6772f7?page=1&perPage=47&serviceKey=Abx7rHO5J4uvKphplereXLu7nQaJmD7nVXrORrU7hNRH%2B8Wbdw4EaQs4Fy5c2%2Bb08%2BAgjYeX9Un9TJ%2Bco%2F94uQ%3D%3D';
  const mockApiUrl = 'https://675bf7eb9ce247eb19380b43.mockapi.io/Hospital';

  useEffect(() => {
    const transferData = async () => {
      try {
        // MockAPI 데이터 확인
        setStatus('Checking MockAPI...');
        const mockResponse = await fetch(mockApiUrl);
        const mockData = await mockResponse.json();

        if (mockData.length > 0) {
          setStatus('Data already exists in MockAPI. Skipping transfer.');
          return; // MockAPI에 데이터가 있으면 전송 중단
        }

        // MockAPI에 데이터가 없으면 Open API에서 데이터 가져오기
        setStatus('Fetching data from public API...');
        const publicResponse = await fetch(publicApiUrl);
        const publicData = await publicResponse.json();

        if (!publicData || !publicData.data || publicData.data.length === 0) {
          setStatus('No data found in public API.');
          return;
        }

        const hospitalData = publicData.data.map((hospital) => ({
          name: hospital['의료기관명'],
          address: hospital['의료기관주소(도로명)'],
          phone: hospital['의료기관전화번호'],
          department: hospital['전문의'] ? 'General Medicine' : 'Other',
          rating: Math.random() * 5, // 임의의 평점
          reviews: [],
        }));

        // Open API 데이터를 MockAPI로 전송
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

    transferData(); // 컴포넌트가 로드되자마자 실행
  }, []); // 빈 배열로 한 번만 실행

 
};

export default TransferData;
