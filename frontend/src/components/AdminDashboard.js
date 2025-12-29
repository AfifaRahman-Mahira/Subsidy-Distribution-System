import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [notifications,setNotifications] = useState([]);
  const [msg,setMsg] = useState('');

  const fetchNotifications = async () => {
    const res = await axios.get('http://localhost:5000/api');
    setNotifications(res.data);
  };

  const addNotification = async () => {
    if(!msg) return;
    await axios.post('http://localhost:5000/api',{message: msg});
    setMsg('');
    fetchNotifications();
  };

  useEffect(()=>{ fetchNotifications() },[]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="New Notification" />
      <button onClick={addNotification}>Add Notification</button>
      <ul>
        {notifications.map((n,i)=><li key={i}>{n.message} - {new Date(n.date).toLocaleString()}</li>)}
      </ul>
    </div>
  );
}

export default AdminDashboard;
