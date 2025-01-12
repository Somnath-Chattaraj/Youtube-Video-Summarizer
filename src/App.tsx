import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import YouTubeSummarizer from './components/YoutubeSummarizer';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        {/* Use `h-screen w-screen` to ensure the app covers the full viewport */}
        <div className="h-full w-screen flex flex-col bg-background">
          {!!localStorage.getItem('userId') && <Navbar />}
          {/* Use `flex-1` to make the Routes container take the remaining space */}
          <div className="flex-1">
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/summarizer"
                element={!!localStorage.getItem('userId') ? <YouTubeSummarizer /> : <Navigate to="/auth" />}
              />
              <Route path="*" element={<Navigate to={!!localStorage.getItem('userId') ? "/summarizer" : "/auth"} />} />
              <Route path="/dashboard" element={<Navigate to={"/summarizer"} />} />
            </Routes>
          </div>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
