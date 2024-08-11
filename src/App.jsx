import { useState } from "react";
import logo from "/logo.svg";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="h-screen flex flex-col p-8 items-center gap-8 justify-center">
            <a href="#" target="_blank">
                <img src={logo} className="w-40" alt="App logo" />
            </a>
            <p className="text-3xl">React.js PWA</p>
            <button
                className="btn"
                onClick={() => setCount((count) => count + 1)}
            >
                count is {count}
            </button>
            <p>
                Edit{" "}
                <code className="font-mono rounded p-1 bg-zinc-800">
                    src/App.jsx
                </code>{" "}
                and save to test HMR
            </p>
        </div>
    );
}

export default App;
