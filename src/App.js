import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Your Firebase config file
import "./App.css"; // Optional styling

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [stems, setStems] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("idle");
      setStems(null); // Reset stems when new file is selected
    }
  };

  // Upload file to Firebase Storage and trigger separation
  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    const fileRef = ref(storage, `uploads/${file.name}`);
    
    try {
      // Upload file to Firebase Storage
      await uploadBytes(fileRef, file);
      setStatus("processing");

      // Simulate calling a Firebase Cloud Function to process the file
      // In reality, this would be an HTTP request to a Cloud Function endpoint
      const response = await fetch("https://your-firebase-function-url/separate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name }),
      });
      const result = await response.json();

      // Assume Firebase returns download URLs for stems
      const stemUrls = {
        music: await getDownloadURL(ref(storage, `stems/${file.name}_music.wav`)),
        dialogue: await getDownloadURL(ref(storage, `stems/${file.name}_dialogue.wav`)),
        effects: await getDownloadURL(ref(storage, `stems/${file.name}_effects.wav`)),
      };

      setStems(stemUrls);
      setStatus("done");
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="App">
      <h1>Film Audio Separator</h1>
      
      {/* File Upload */}
      <input
        type="file"
        accept=".mp3,.wav"
        onChange={handleFileChange}
        disabled={status === "uploading" || status === "processing"}
      />
      <button
        onClick={handleUpload}
        disabled={!file || status === "uploading" || status === "processing"}
      >
        Separate Audio
      </button>

      {/* Status Display */}
      {status === "uploading" && <p>Uploading...</p>}
      {status === "processing" && <p>Processing...</p>}
      {status === "done" && <p>Separation complete!</p>}
      {status === "error" && <p>Something went wrong. Try again.</p>}

      {/* Download Links */}
      {stems && (
        <div>
          <h3>Download Your Stems:</h3>
          <p>
            <a href={stems.music} download={`${file.name}_music.wav`}>
              Music
            </a>
          </p>
          <p>
            <a href={stems.dialogue} download={`${file.name}_dialogue.wav`}>
              Dialogue
            </a>
          </p>
          <p>
            <a href={stems.effects} download={`${file.name}_effects.wav`}>
              Effects
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;