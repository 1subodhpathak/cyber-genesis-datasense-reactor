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
      {/* Top HUD Elements */}
      <div className="fixed top-20 left-6 z-30 hud-overlay p-3 border border-primary/30">
        <div className="text-xs font-mono text-primary space-y-1">
          <div>SYSTEM STATUS</div>
          <div className="text-cyber-success">● ONLINE</div>
          <div className="text-muted-foreground">UPTIME: {stats.uptime}</div>
        </div>
      </div>

      <div className="fixed top-20 right-6 z-30 hud-overlay p-3 border border-primary/30">
        <div className="text-xs font-mono text-primary space-y-1">
          <div>NEURAL LINK</div>
          <div className="text-cyan-400">{time.toLocaleTimeString()}</div>
          <div className="text-muted-foreground">UTC {time.getTimezoneOffset() / -60}</div>
        </div>
      </div>

      {/* Bottom HUD Elements */}
      <div className="fixed bottom-6 left-6 z-30 hud-overlay p-3 border border-primary/30">
        <div className="text-xs font-mono text-primary space-y-1">
          <div>ACTIVE USERS</div>
          <div className="text-cyber-success text-lg">{stats.users.toLocaleString()}</div>
          <div className="text-muted-foreground">SESSIONS: {stats.sessions}</div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-30 hud-overlay p-3 border border-primary/30">
        <div className="text-xs font-mono text-primary space-y-1">
          <div>MATRIX GRID</div>
          <div className="flex gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-1 h-4 ${i < 6 ? 'bg-cyber-success' : 'bg-muted'}`} 
              />
            ))}
          </div>
          <div className="text-muted-foreground">75% CAPACITY</div>
        </div>
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[50px_50px]" />
      </div>

      {/* Corner Frames */}
      <div className="fixed top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-primary/40 z-20" />
      <div className="fixed top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-primary/40 z-20" />
      <div className="fixed bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-primary/40 z-20" />
      <div className="fixed bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-primary/40 z-20" />
    </>
  );
};

export default HUDOverlay;