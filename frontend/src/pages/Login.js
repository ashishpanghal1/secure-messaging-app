import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      login(res.data.token);
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-center text-xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col">
        <input className="border p-2 mb-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="border p-2 mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  );
}

export default Login;
