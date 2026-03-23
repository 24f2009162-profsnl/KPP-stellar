import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("kppUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const saveUser = (data) => {
    localStorage.setItem("kppUser", JSON.stringify(data));
    setUser(data);
  };

  const start = () => {
    if (!name) return;
    const newUser = {
      name,
      points: 0,
      tokens: 0,
      history: [],
    };
    saveUser(newUser);
  };

  const earnPoints = () => {
    const updated = {
      ...user,
      points: user.points + 10,
      history: [...user.history, `${user.name} earned 10 points`],
    };
    saveUser(updated);
  };

  const convertTokens = () => {
    if (user.points < 10) return;

    const updated = {
      ...user,
      points: user.points - 10,
      tokens: user.tokens + 5,
      history: [...user.history, `${user.name} converted 10 points → 5 tokens`],
    };
    saveUser(updated);
  };

  return (
    <div className="container">
      {!user ? (
        <div className="card">
          <h1>KPP MVP</h1>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={start}>Start Earning</button>
        </div>
      ) : (
        <div className="card">
          <h2>Welcome, {user.name}</h2>

          <p>Points: {user.points}</p>
          <p>Tokens: {user.tokens}</p>

          <button onClick={earnPoints}>+10 Points</button>
          <button onClick={convertTokens}>Convert to Tokens</button>

          <h3>History</h3>
          <ul>
            {user.history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <button
            onClick={() => {
              localStorage.removeItem("kppUser");
              setUser(null);
            }}
          >
            Switch User
          </button>
        </div>
      )}
    </div>
  );
}

export default App;