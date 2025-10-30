import { Button } from "@/components/ui/button";
import { MousePointer2, Pencil, Square, Circle, ArrowRight, Trash2, Minus, Undo2, Redo2, Eraser, Type, Download } from "lucide-react";

interface CanvasToolbarProps {
  activeTool: "select" | "draw" | "rectangle" | "circle" | "arrow" | "line" | "eraser" | "text";
  onToolClick: (tool: "select" | "draw" | "rectangle" | "circle" | "arrow" | "line" | "eraser" | "text") => void;
  onClear: () => void;
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  color: string;
  onColorChange: (color: string) => void;
}

const colors = [
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Yellow", value: "#eab308" },
  { name: "Purple", value: "#a855f7" },
  { name: "Orange", value: "#f97316" },
  { name: "White", value: "#ffffff" },
];

export const CanvasToolbar = ({ activeTool, onToolClick, onClear, onExport, onUndo, onRedo, canUndo, canRedo, color, onColorChange }: CanvasToolbarProps) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg shadow-card flex-wrap">
      {/* Undo/Redo */}
      <div className="flex items-center gap-1 pr-3 border-r border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Tools */}
      <div className="flex items-center gap-1 pr-3 border-r border-border">
        <Button
          variant={activeTool === "select" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolClick("select")}
          title="Select"
        >
          <MousePointer2 className="w-4 h-4" />
        </Button>
        <Button
          variant={activeTool === "draw" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolClick("draw")}
          title="Draw"
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          variant={activeTool === "line" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolClick("line")}
          title="Line"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Button
          variant={activeTool === "arrow" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolClick("arrow")}
          title="Arrow"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant={activeTool === "rectangle" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolClick("rectangle")}
          title="Rectangle"
        >
          <Square className="w-4 h-4" />
        </Button>
        <Button
          variant={activeTool === "circle" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolClick("circle")}
          title="Circle"
        >
          <Circle className="w-4 h-4" />
        </Button>
        <Button
          variant={activeTool === "text" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolClick("text")}
          title="Text"
        >
          <Type className="w-4 h-4" />
        </Button>
        <Button
          variant={activeTool === "eraser" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolClick("eraser")}
          title="Eraser"
        >
          <Eraser className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1 pr-3 border-r border-border">
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => onColorChange(c.value)}
            className={`w-6 h-6 rounded border-2 ${
              color === c.value ? "border-primary scale-110" : "border-border"
            } transition-all`}
            style={{ backgroundColor: c.value }}
            title={c.name}
          />
        ))}
      </div>

      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" onClick={onExport} title="Export Canvas">
          <Download className="w-4 h-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={onClear} title="Clear Canvas">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
