import React,{ useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('beneficiary');
  const navigate = useNavigate();

  const handleRegister = async ()=>{
    try{
      await axios.post('http://localhost:5000/api/register',{name,email,password,role});
      alert('Registration successful');
      navigate('/');
    }catch(err){
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="beneficiary">Beneficiary</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Register;
