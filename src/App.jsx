import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  let [password, setPassword] = useState("");
  let [lenth, setLenth] = useState(8);
  let [numbersAllow, setNumbersAllow] = useState(false);
  let [charecterAllow, setCharecterAllow] = useState(false);

  const passwordRef = useRef(null);

  let copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  let passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllow) str += "0123456789";
    if (charecterAllow) str += "!@#$%^&*()={}[]<>?/,.;:~`";

    for (let i = 0; i < lenth; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [lenth, numbersAllow, charecterAllow, setPassword]);

  useEffect(() => {
    passwordGenrator();
  }, [lenth, numbersAllow, charecterAllow, passwordGenrator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div className="main w-full max-w-md mx-auto p-6 bg-gray-900/90 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-gray-800 space-y-6">
        
        <h1 className="text-2xl font-bold text-center text-indigo-400 drop-shadow-md">
          Password Generator 🔐
        </h1>

        <div className="upper flex items-center gap-3">
          <input
            type="text"
            value={password}
            className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-indigo-300 font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition rounded-lg font-medium shadow-md"
          >
            Copy
          </button>
        </div>

        <div className="range flex flex-col gap-2">
          <label className="text-sm text-gray-400 flex justify-between">
            Length: <span className="font-semibold text-indigo-400">{lenth}</span>
          </label>
          <input
            type="range"
            min={4}
            max={20}
            value={lenth}
            onChange={(e) => setLenth(e.target.value)}
            className="w-full cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="AddNumber flex items-center gap-2">
          <input
            type="checkbox"
            className="cursor-pointer w-5 h-5 accent-indigo-600"
            checked={numbersAllow}
            id="numbersAllow"
            onChange={() => {
              setNumbersAllow((prew) => !prew);
            }}
          />
          <label htmlFor="numbersAllow" className="text-sm text-gray-300">
            Include Numbers
          </label>
        </div>

        <div className="AddCherector flex items-center gap-2">
          <input
            type="checkbox"
            className="cursor-pointer w-5 h-5 accent-indigo-600"
            checked={charecterAllow}
            id="charecterAllow"
            onChange={() => {
              setCharecterAllow((prew) => !prew);
            }}
          />
          <label htmlFor="charecterAllow" className="text-sm text-gray-300">
            Include Symbols
          </label>
        </div>

        <div className="flex justify-center">
          <button
            onClick={passwordGenrator}
            className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-semibold transition shadow-md"
          >
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
