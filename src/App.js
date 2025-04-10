import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from "./firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"; // Updated auth methods
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [stems, setStems] = useState(null);
  const [user, setUser] = useState(null); // Track authenticated user
  const [authLoading, setAuthLoading] = useState(true); // Track auth initialization
  const [email, setEmail] = useState(""); // For signup/login
  const [password, setPassword] = useState(""); // For signup/login
  const [authError, setAuthError] = useState(""); // Track auth errors
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setEmail("");
      setPassword("");
    } catch (error) {
      setAuthError(error.message);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("idle");
      setStems(null);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    const fileRef = ref(storage, `uploads/${file.name}`);

    try {
      await uploadBytes(fileRef, file);
      setStatus("processing");

      // Simulate stems (Cloud Function not set up yet)
      const stemUrls = {
        music: await getDownloadURL(ref(storage, `uploads/${file.name}`)),
        dialogue: await getDownloadURL(ref(storage, `uploads/${file.name}`)),
        effects: await getDownloadURL(ref(storage, `uploads/${file.name}`)),
      };

      setStems(stemUrls);
      setStatus("done");
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  // Show loading state while auth is initializing
  if (authLoading) {
    return <div>Loading...</div>;
  }

  // Show signup/login form if user is not authenticated
  if (!user) {
    return (
      <div className="App">
        <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {authError && <p style={{ color: "red" }}>{authError}</p>}
          <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Need an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    );
  }

  // Show audio separator UI if user is authenticated
  return (
    <div className="App">
      <h1>Film Audio Separator</h1>
      <p>Welcome, {user.email}! <button onClick={handleSignOut}>Sign Out</button></p>
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
      {status === "uploading" && <p>Uploading...</p>}
      {status === "processing" && <p>Processing...</p>}
      {status === "done" && <p>Separation complete!</p>}
      {status === "error" && <p>Something went wrong. Try again.</p>}
      {stems && (
        <div>
          <h3>Download Your Stems:</h3>
          <p>
            <a href={stems.music} download={`${file.name}_music.wav`}>Music</a>
          </p>
          <p>
            <a href={stems.dialogue} download={`${file.name}_dialogue.wav`}>Dialogue</a>
          </p>
          <p>
            <a href={stems.effects} download={`${file.name}_effects.wav`}>Effects</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;