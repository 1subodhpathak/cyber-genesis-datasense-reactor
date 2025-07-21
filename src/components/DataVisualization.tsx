import { useEffect, useState } from 'react';

const DataVisualization = () => {
  const [metrics, setMetrics] = useState({
    cpu: 67,
    memory: 84,
    network: 45,
    queries: 156
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(30, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(40, Math.min(98, prev.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(20, Math.min(80, prev.network + (Math.random() - 0.5) * 15)),
        queries: prev.queries + Math.floor(Math.random() * 5)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const BarChart = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={`${color}`}>{value}%</span>
      </div>
      <div className="w-full bg-muted/30 h-1 rounded">
        <div 
          className={`h-1 rounded transition-all duration-1000 ${color === 'text-cyber-success' ? 'bg-cyber-success' : color === 'text-cyber-warning' ? 'bg-cyber-warning' : 'bg-primary'}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20 w-72">
      <div className="hud-overlay border border-primary/30 p-4 space-y-4">
        <div className="flex items-center gap-2 border-b border-primary/20 pb-2">
          <div className="w-2 h-2 bg-primary animate-pulse rounded-full" />
          <span className="text-xs font-mono text-primary">SYSTEM METRICS</span>
        </div>
        
        <div className="space-y-3">
          <BarChart 
            value={metrics.cpu} 
            label="CPU LOAD" 
            color={metrics.cpu > 80 ? 'text-cyber-warning' : 'text-cyber-success'} 
          />
          <BarChart 
            value={metrics.memory} 
            label="MEMORY" 
            color={metrics.memory > 90 ? 'text-cyber-warning' : 'text-primary'} 
          />
          <BarChart 
            value={metrics.network} 
            label="NETWORK" 
            color="text-cyber-success" 
          />
        </div>

        <div className="border-t border-primary/20 pt-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">QUERIES/MIN</span>
            <span className="text-primary font-mono">{metrics.queries}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">NEURAL NODES</span>
            <span className="text-cyber-success font-mono">2,847</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">DATA FLOW</span>
            <span className="text-cyan-400 font-mono">∞ TB/s</span>
          </div>
        </div>

        {/* Data stream visualization */}
        <div className="space-y-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-1">
              {Array.from({ length: 20 }).map((_, j) => (
                <div
                  key={j}
                  className={`w-1 h-1 ${Math.random() > 0.7 ? 'bg-primary' : 'bg-muted/30'} animate-pulse`}
                  style={{ animationDelay: `${(i + j) * 100}ms` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;