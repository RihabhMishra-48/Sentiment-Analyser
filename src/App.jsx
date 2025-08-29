import { useState } from "react";
import "./App.css";

function SentimentBadge({ value }) {
  let style =
    value === "Positive"
      ? { color: "#22c55e" }
      : value === "Negative"
      ? { color: "#ef4444" }
      : { color: "#eab308" };

  return <span style={{ fontWeight: 600, ...style }}>{value}</span>;
}

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const analyzeText = () => {
    if (!text.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const sentiments = ["Positive", "Negative", "Neutral"];
      const sentiment =
        sentiments[Math.floor(Math.random() * sentiments.length)];
      const summary =
        sentiment === "Positive"
          ? "The input expresses a favorable opinion."
          : sentiment === "Negative"
          ? "The input expresses an unfavorable opinion."
          : "The input is neutral or mixed.";

      const response = {
        sentiment,
        language: "English",
        summary,
      };

      setResult(response);
      setHistory([
        { id: Date.now(), input: text, ...response, ts: Date.now() },
        ...history,
      ]);
      setLoading(false);
    }, 1000);
  };

  const clearAll = () => {
    setText("");
    setResult(null);
  };

  return (
    <div>
      {/* blobs */}
      <div className="blob blue"></div>
      <div className="blob pink"></div>
      <div className="blob purple"></div>

      {/* card */}
      <div className="app-card">
        <h1 className="app-title">🌍 Sentiment Analyzer</h1>
        <p className="app-subtitle">Enter any text and get sentiment instantly.</p>

        {/* input */}
        <textarea
          rows={3}
          placeholder="Type your comment here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <button onClick={analyzeText} disabled={loading}>
            {loading ? "Analyzing…" : "Analyze"}
          </button>
          <button onClick={clearAll}>Clear</button>
        </div>

        {/* result */}
        <div className="result-box">
          {result ? (
            <>
              <SentimentBadge value={result.sentiment} />
              <p><b>Language:</b> {result.language}</p>
              <p><b>Summary:</b> {result.summary}</p>
            </>
          ) : (
            <p style={{ color: "#94a3b8" }}>Run an analysis to see results here.</p>
          )}
        </div>

        {/* history */}
        {history.length > 0 && (
          <div>
            <h2 className="history-title">History</h2>
            {history.slice(0, 10).map((h) => (
              <div key={h.id} className="history-item">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <SentimentBadge value={h.sentiment} />
                  <span className="history-time">
                    {new Date(h.ts).toLocaleString()}
                  </span>
                </div>
                <p><b>Input:</b> {h.input}</p>
                <p><b>Summary:</b> {h.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
