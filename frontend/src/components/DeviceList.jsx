import React, { useState } from 'react';
import { Camera, Wifi, Monitor, Server, Globe, Lock, Key, Shield, Smartphone, Laptop, Router, Cpu, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeviceList = ({ devices, scanning }) => {

    if (devices.length === 0 && !scanning) return null;

    const getIcon = (type) => {
        switch (type) {
            case 'Camera': return <Camera />;
            case 'Mobile': return <Smartphone />;
            case 'Computer':
            case 'Workstation (Self)': return <Laptop />;
            case 'Server': return <Server />;
            case 'Router': return <Router />;
            case 'IoT': return <Cpu />;
            default: return <Wifi />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Camera': return 'text-red-500 bg-red-500/20';
            case 'Mobile': return 'text-blue-400 bg-blue-500/20';
            case 'Router': return 'text-orange-400 bg-orange-500/20';
            case 'Server': return 'text-purple-400 bg-purple-500/20';
            case 'Workstation (Self)': return 'text-white bg-white/20';
            default: return 'text-green-400 bg-green-500/20';
        }
    };

    return (
        <>
            <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-green-500 border-b border-green-900 pb-2">
                    <span className="text-sm tracking-widest">DETECTED_SIGNALS: {devices.length}</span>
                    <span className="text-xs animate-pulse">{scanning ? 'CAPTURING_PACKETS...' : 'SCAN_COMPLETE'}</span>
                </div>

                <div className="grid gap-4">
                    {devices.map((device, index) => (
                        <motion.div
                            key={device.ip}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`cyber-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2 group hover:bg-green-900/10 transition-colors border-l-4 ${device.type === 'Camera' ? 'border-red-500' : 'border-green-500/30'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full shrink-0 ${getTypeColor(device.type)}`}>
                                    {getIcon(device.type)}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-green-300 font-bold tracking-wider text-sm sm:text-base">{device.ip}</div>
                                    <div className="text-[10px] sm:text-xs text-green-600 font-mono flex flex-col items-start truncate">
                                        <span className="truncate w-full">{device.mac}</span>
                                        <span className="text-green-500/70 truncate w-full" title={device.vendor || "Unknown Vendor"}>
                                            {device.vendor || "Unknown Vendor"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-green-900/30">
                                <div className="flex flex-col items-start sm:items-end gap-1">
                                    <div className="flex items-end gap-0.5" title={`Latency: ${device.latency}ms`}>
                                        {[1, 2, 3, 4].map(bar => {
                                            // Determine active bars based on latency
                                            // Lower latency = better signal = more bars active
                                            let active = false;
                                            const lat = parseInt(device.latency);
                                            if (isNaN(lat)) active = false; // Unknown
                                            else if (lat < 10) active = true; // All 4
                                            else if (lat < 50) active = bar <= 3;
                                            else if (lat < 100) active = bar <= 2;
                                            else active = bar <= 1; // > 100ms gets 1 bar

                                            return (
                                                <div
                                                    key={bar}
                                                    className={`w-1 rounded-sm ${active ? 'bg-green-500' : 'bg-green-900/30'}`}
                                                    style={{ height: `${bar * 3 + 2}px` }}
                                                />
                                            );
                                        })}
                                    </div>
                                    <span className="text-[9px] text-green-600 font-mono">{device.latency !== undefined ? `${device.latency}ms` : '---'}</span>
                                </div>

                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <div className="flex gap-1">
                                        <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider ${getTypeColor(device.type)}`}>
                                            {device.type}
                                        </span>
                                    </div>
                                    <div className="flex gap-1 flex-wrap justify-end max-w-[120px]">
                                        {device.openPorts.map(p => (
                                            <span key={p} className="text-[9px] sm:text-[10px] bg-slate-800 text-slate-300 px-1 rounded">:{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DeviceList;
