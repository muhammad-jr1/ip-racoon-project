import React, { useState } from 'react';
import { Shield, Radio, Search, AlertTriangle, Wifi, Camera } from 'lucide-react';
import DeviceList from './components/DeviceList';

export default function App() {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);

  const startScan = async () => {
    setScanning(true);
    setError(null);
    setDevices([]);
    try {
      // Use the environment variable if available, otherwise default to localhost
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log("Attempting to scan using API:", API_URL);
      const response = await fetch(`${API_URL}/api/scan`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Scan failed with status:", response.status, "Message:", errorText);
        throw new Error(`Scan failed: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      setDevices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900 via-black to-black"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex flex-col sm:flex-row items-center sm:justify-between mb-8 sm:mb-12 border-b border-green-500/50 pb-4 gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-green-500 animate-pulse" />
            <div>
              <h1 className="cyber-title tracking-widest text-xl sm:text-2xl">IP_RACOON // V1.0</h1>
              <p className="text-[10px] sm:text-xs text-green-600 tracking-[0.2em] sm:tracking-[0.3em]">STEALTH_NETWORK_SCANNER</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm">
            <div className={`w-2 h-2 rounded-full ${scanning ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></div>
            {scanning ? 'HUNTING_PACKETS...' : 'SYSTEM_READY'}
          </div>
        </header>

        <main className="space-y-8">
          <div className="flex justify-center">
            <button
              onClick={startScan}
              disabled={scanning}
              className={`cyber-btn flex items-center gap-2 ${scanning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {scanning ? <Radio className="animate-spin" /> : <Search />}
              {scanning ? 'SCANNING...' : 'INITIATE_SCAN_SEQUENCE'}
            </button>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded flex items-center gap-3">
              <AlertTriangle />
              <span>ERROR: {error}</span>
            </div>
          )}

          <DeviceList devices={devices} scanning={scanning} />
        </main>

        <footer className="mt-20 text-center text-green-800 text-xs">
          SECURE_CONNECTION // LOCAL_HOST // ENCRYPTED
        </footer>
      </div>
    </div>
  );
}
