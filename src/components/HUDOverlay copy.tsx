import { useEffect, useState } from 'react';

const HUDOverlay = () => {
  const [time, setTime] = useState(new Date());
  const [stats, setStats] = useState({
    users: 1247,
    sessions: 89,
    uptime: '99.9%'
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 5) - 2,
        sessions: prev.sessions + Math.floor(Math.random() * 3) - 1,
        uptime: '99.9%'
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Enhanced Grid Overlay with Scan Lines */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.15)_1px,transparent_1px)] bg-[50px_50px]" />
        {/* Horizontal scan lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_4px)] animate-scan" />
        {/* Vertical data streams */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,255,0.05)_1px,transparent_6px)]" />
      </div>

      {/* Radar Sweep */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none z-10">
        <div className="absolute inset-0 rounded-full border border-primary/20" />
        <div className="absolute inset-4 rounded-full border border-primary/15" />
        <div className="absolute inset-8 rounded-full border border-primary/10" />
        <div className="absolute top-1/2 left-1/2 w-1 h-48 bg-gradient-to-t from-primary/60 to-transparent origin-bottom animate-spin duration-[8s]" style={{ transformOrigin: 'bottom center' }} />
      </div>

      {/* Corner Frames */}
      <div className="fixed top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-primary/40 z-20" />
      <div className="fixed top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-primary/40 z-20" />
      <div className="fixed bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-primary/40 z-20" />
      <div className="fixed bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-primary/40 z-20" />

      {/* Single Line HUD Bar */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-row gap-6 hud-overlay border-0 p-3 shadow-xl">
        {/* SYSTEM STATUS */}
        <div className="text-xs font-mono text-primary space-y-1 flex flex-col items-center">
          <div>SYSTEM STATUS</div>
          <div className="text-cyber-success">● ONLINE</div>
          <div className="text-muted-foreground">UPTIME: {stats.uptime}</div>
        </div>
        {/* NEURAL LINK */}
        <div className="text-xs font-mono text-primary space-y-1 flex flex-col items-center">
          <div>NEURAL LINK</div>
          <div className="text-cyan-400">{time.toLocaleTimeString()}</div>
          <div className="text-muted-foreground">UTC {time.getTimezoneOffset() / -60}</div>
        </div>
        {/* ACTIVE USERS */}
        <div className="text-xs font-mono text-primary space-y-1 flex flex-col items-center">
          <div>ACTIVE USERS</div>
          <div className="text-cyber-success text-lg">{stats.users.toLocaleString()}</div>
          <div className="text-muted-foreground">SESSIONS: {stats.sessions}</div>
        </div>
      </div>
    </>
  );
};

export default HUDOverlay;