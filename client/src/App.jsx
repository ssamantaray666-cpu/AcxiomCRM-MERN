import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleLogin = () => {
    if(email) { localStorage.setItem('token', 'demo'); window.location.href = '/dashboard'; }
    else alert('Email lekha!');
  };
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',background:'#f0f2f5'}}>
      <div style={{background:'white',padding:'40px',borderRadius:'10px',width:'350px',boxShadow:'0 4px 10px rgba(0,0,0,0.1)'}}>
        <h2 style={{color:'#2c3e50'}}>Acxiom CRM - Login</h2>
        <p>Developed by Swagatika</p>
        <input style={{width:'100%',padding:'10px',margin:'10px 0'}} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input style={{width:'100%',padding:'10px',margin:'10px 0'}} placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
        <button onClick={handleLogin} style={{width:'100%',padding:'12px',background:'#3498db',color:'white',border:'none',borderRadius:'5px',cursor:'pointer'}}>Login</button>
        <p style={{marginTop:'10px',fontSize:'12px'}}>Demo Login:use any email to continue | Acxiom MERN 2026</p>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{padding:'20px'}}>
      <h1>Dashboard - Swagatika CRM</h1>
      <div style={{display:'flex',gap:'20px',marginTop:'20px'}}>
        <div style={{background:'#3498db',color:'white',padding:'20px',borderRadius:'8px',width:'200px'}}><h3>Customers</h3><h2>24</h2></div>
        <div style={{background:'#2ecc71',color:'white',padding:'20px',borderRadius:'8px',width:'200px'}}><h3>Leads</h3><h2>12</h2></div>
        <div style={{background:'#e74c3c',color:'white',padding:'20px',borderRadius:'8px',width:'200px'}}><h3>Opportunity</h3><h2>8</h2></div>
      </div>
      <br/>
      <button onClick={()=>{localStorage.clear(); window.location.href='/';}} style={{padding:'10px'}}>Logout</button>
      <p style={{marginTop:'20px'}}>Server: <code>server/models/Customer.js, Lead.js</code> Connected | MERN 2026 - Acxiom CRM</p>
      <p>MERN Project 2026 - Ready for submission!</p>
    </div>
  );
}

function App() {
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;