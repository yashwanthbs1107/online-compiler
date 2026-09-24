
import { useState } from "react";
import Editor from "@monaco-editor/react";

function App() {
  const [code, setCode] = useState('print("Hello Yashwanth")');
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setError("");
    console.log("INPUT:", input);

  
    try {
      const response = await fetch("https://online-compiler-backend-hcpl.onrender.com/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          input: input,
        }),
      });

      const data = await response.json();

      setOutput(data.output || "");
      setError(data.error || "");
    } catch (err) {
      setError("Unable to connect to the backend.");
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
  setOutput("");
  setError("");
};

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0f14",
        color: "#e6edf3",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: "1px solid #21262d",
          backgroundColor: "#0d1117",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "#238636",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "17px",
            }}
          >
            ⚡
          </div>

          <span
            style={{
              fontSize: "17px",
              fontWeight: "600",
            }}
          >
            Online Compiler
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#8b949e",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#3fb950",
            }}
          />
          Python
        </div>
      </header>

      {/* Main */}
      <main
        style={{
          padding: "24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                color: "#8b949e",
                fontSize: "13px",
              }}
            >
              main.py
            </span>
          </div>

          <div
  style={{
    display: "flex",
    gap: "8px",
  }}
>
  <button
    onClick={clearOutput}
    style={{
      backgroundColor: "#21262d",
      color: "#c9d1d9",
      border: "1px solid #30363d",
      borderRadius: "6px",
      padding: "8px 14px",
      fontSize: "13px",
      cursor: "pointer",
    }}
  >
    Clear
  </button>

  <button
    onClick={runCode}
    disabled={isRunning}
    style={{
      backgroundColor: isRunning ? "#21262d" : "#238636",
      color: "#ffffff",
      border: "1px solid #2ea043",
      borderRadius: "6px",
      padding: "8px 16px",
      fontSize: "13px",
      fontWeight: "600",
      cursor: isRunning ? "not-allowed" : "pointer",
    }}
  >
    {isRunning ? "Running..." : "▶ Run"}
  </button>
</div>
        </div>

        {/* Main workspace */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.7fr) minmax(320px, 0.8fr)",
            gap: "16px",
            alignItems: "stretch",
          }}
        >
          {/* Editor */}
          <div
            style={{
              border: "1px solid #21262d",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#0d1117",
            }}
          >
            <Editor
              height="650px"
              width="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: {
                  enabled: false,
                },
                fontSize: 15,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: {
                  top: 16,
                },
              }}
            />
          </div>

          {/* Right panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Input */}
            <div
              style={{
                backgroundColor: "#0d1117",
                border: "1px solid #21262d",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  borderBottom: "1px solid #21262d",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Input
              </div>

              <textarea
                value={input}
                onChange={(e) => {
  console.log("TYPED:", e.target.value);
  setInput(e.target.value);
}}
                placeholder="Enter program input..."
                style={{
                  width: "100%",
                  height: "170px",
                  resize: "none",
                  border: "none",
                  outline: "none",
                  padding: "14px",
                  boxSizing: "border-box",
                  backgroundColor: "#0d1117",
                  color: "#e6edf3",
                  fontFamily: "monospace",
                  fontSize: "13px",
                }}
              />
            </div>

            {/* Output */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#0d1117",
                border: "1px solid #21262d",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  borderBottom: "1px solid #21262d",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                <span>Output</span>

                {output && !error && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#3fb950",
                      fontWeight: "500",
                    }}
                  >
                    Success
                  </span>
                )}
              </div>

              <pre
                style={{
                  margin: 0,
                  padding: "14px",
                  color: "#c9d1d9",
                  fontFamily: "monospace",
                  fontSize: "13px",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {output || "Output will appear here..."}
              </pre>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  backgroundColor: "#160b0d",
                  border: "1px solid #5b1f24",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    borderBottom: "1px solid #5b1f24",
                    color: "#f85149",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Error
                </div>

                <pre
                  style={{
                    margin: 0,
                    padding: "14px",
                    color: "#f85149",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {error}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "14px",
            display: "flex",
            justifyContent: "space-between",
            color: "#6e7681",
            fontSize: "11px",
          }}
        >
          <span>Python 3</span>
          <span>Execution limit: 5 seconds</span>
        </div>
      </main>
    </div>
  );
}

export default App;

