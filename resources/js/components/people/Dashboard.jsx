import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserCheck, UserX, Gift } from 'lucide-react';

export default function Dashboard() {
  const [counts, setCounts] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    monthly: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/staff/counts');
        setCounts((prev) => ({
          ...prev,
          total: res.data.total_staff,
          active: res.data.active_staff,
          inactive: res.data.inactive_staff
        }));
      } catch (err) {
        console.error('Error fetching staff counts:', err);
      }
    };

    const fetchMonthly = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/staff/monthly');
        const latestMonth = res.data?.[res.data.length - 1]?.count || 0;
        setCounts((prev) => ({
          ...prev,
          monthly: latestMonth
        }));
      } catch (err) {
        console.error('Error fetching monthly staff:', err);
      }
    };

    fetchCounts();
    fetchMonthly();
  }, []);

  const cards = [
    {
      title: 'Total Staff',
      value: counts.total,
      icon: <Users size={20} color="#1d4ed8" />,
      bg: '#e0edff'
    },
    {
      title: 'Active',
      value: counts.active,
      icon: <UserCheck size={20} color="#16a34a" />,
      bg: '#e6f6ec'
    },
    {
      title: 'Inactive',
      value: counts.inactive,
      icon: <UserX size={20} color="#dc2626" />,
      bg: '#fdeaea'
    },
    {
      title: 'Monthly Staff',
      value: counts.monthly,
      icon: <Gift size={20} color="#9333ea" />,
      bg: '#f3e8ff'
    }
  ];

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '30px'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '16px', // more rounded
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)', // soft shadow like screenshot
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: '1 1 calc(25% - 20px)',
    minWidth: '230px',
    maxWidth: '100%',
    height: '100px'
  };

  const iconWrapperStyle = (bg) => ({
    backgroundColor: bg,
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    flexShrink: 0
  });

  const valueStyle = {
    fontWeight: '700',
    fontSize: '20px',
    color: '#1f2937', // #111827 in hex
    lineHeight: '1.2'
  };

  const labelStyle = {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '2px'
  };

  return (
    <div style={containerStyle}>
      {cards.map((card, idx) => (
        <div key={idx} style={cardStyle}>
          <div style={iconWrapperStyle(card.bg)}>{card.icon}</div>
          <div>
            <div style={valueStyle}>{card.value}</div>
            <div style={labelStyle}>{card.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
