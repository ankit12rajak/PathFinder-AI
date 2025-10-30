import { Database, Server, Cloud, Layers, HardDrive, Network, Shield, Zap, Box, GitBranch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IconLibraryProps {
  onIconSelect: (iconType: string, icon: string) => void;
}

const systemDesignIcons = [
  { id: "database", label: "Database", Icon: Database, color: "#3b82f6" },
  { id: "server", label: "Server", Icon: Server, color: "#10b981" },
  { id: "cloud", label: "Cloud", Icon: Cloud, color: "#8b5cf6" },
  { id: "cache", label: "Cache", Icon: Layers, color: "#f59e0b" },
  { id: "storage", label: "Storage", Icon: HardDrive, color: "#ec4899" },
  { id: "network", label: "Network", Icon: Network, color: "#14b8a6" },
  { id: "security", label: "Security", Icon: Shield, color: "#ef4444" },
  { id: "api", label: "API Gateway", Icon: Zap, color: "#eab308" },
  { id: "service", label: "Service", Icon: Box, color: "#06b6d4" },
  { id: "loadbalancer", label: "Load Balancer", Icon: GitBranch, color: "#a855f7" },
];

export const SystemDesignIconLibrary = ({ onIconSelect }: IconLibraryProps) => {
  const handleDragStart = (e: React.DragEvent, iconType: string, icon: string) => {
    e.dataTransfer.setData("iconType", iconType);
    e.dataTransfer.setData("icon", icon);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <Card className="h-full bg-card border-border shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Component Library</CardTitle>
        <p className="text-xs text-muted-foreground">Drag icons onto canvas</p>
      </CardHeader>
      <CardContent className="p-2">
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-2 gap-2">
            {systemDesignIcons.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id, item.label)}
                  onClick={() => onIconSelect(item.id, item.label)}
                  className="flex flex-col items-center gap-2 p-3 bg-secondary hover:bg-secondary/80 rounded-lg cursor-move transition-all hover:scale-105 active:scale-95"
                  title={`Drag ${item.label} to canvas`}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: item.color + "20" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-xs font-medium text-center">{item.label}</span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
