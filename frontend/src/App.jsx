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
      const response = await fetch('http://localhost:5000/api/scan');
      if (!response.ok) throw new Error('Scan failed');
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
        <header className="flex items-center justify-between mb-12 border-b border-green-500/50 pb-4">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-green-500 animate-pulse" />
            <div>
              <h1 className="cyber-title tracking-widest text-2xl">IP_RACOON // V1.0</h1>
              <p className="text-xs text-green-600 tracking-[0.3em]">STEALTH_NETWORK_SCANNER</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-400 text-sm">
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
