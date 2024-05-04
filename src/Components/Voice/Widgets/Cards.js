import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BankCardWidget = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    // Получение данных о балансе с бэкенда
    axios.get('/api/balance')
      .then(response => {
        setBalance(response.data.balance);
      })
      .catch(error => {
        console.error('Error fetching balance:', error);
      });
  }, []);

  return (
    <div className="bank-card-widget">
      <div className="card">
        <div className="card-front">
          <img src="debit-card-front.png" alt="Debit Card Front" />
          <span className="balance">Balance: {balance ? `$${balance}` : 'Loading...'}</span>
        </div>
      </div>
    </div>
  );
};

export default BankCardWidget;
