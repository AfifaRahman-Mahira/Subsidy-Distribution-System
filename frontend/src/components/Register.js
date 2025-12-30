import React,{useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';

function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('beneficiary');
  const [message,setMessage]=useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/register', { name, email, password, role });
    alert(res.data.message); // popup দেখাবে
    window.location.href = '/'; // redirect login
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.message || 'Registration failed');
  }
};


  return(
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="beneficiary">Beneficiary</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <p>Already have account? <Link to="/">Login here</Link></p>
    </div>
  );
}
export default Register;
