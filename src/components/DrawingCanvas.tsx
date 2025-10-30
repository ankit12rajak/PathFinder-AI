import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, Circle, Rect, Line, IText, PencilBrush } from "fabric";
import { CanvasToolbar } from "./CanvasToolbar";
import { toast } from "sonner";
import * as LucideIcons from "lucide-react";

export const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle" | "arrow" | "line" | "eraser" | "text">("select");
  const isDrawingRef = useRef(false);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const tempShapeRef = useRef<Rect | Circle | Line | null>(null);
  
  // Undo/Redo state
  const [history, setHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  // Save canvas state for undo/redo
  const saveState = useCallback(() => {
    if (!fabricCanvas) return;
    
    const json = JSON.stringify(fabricCanvas.toJSON());
    setHistory(prev => {
      const newHistory = prev.slice(0, historyStep + 1);
      newHistory.push(json);
      return newHistory;
    });
    setHistoryStep(prev => prev + 1);
  }, [fabricCanvas, historyStep]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth > 1024 ? 1000 : 800,
      height: 600,
      backgroundColor: "#1a1f2e",
    });

    // Initialize freeDrawingBrush (ensure it exists)
    if (!canvas.freeDrawingBrush) {
      // Create a pencil brush if missing (Fabric v6 ESM sometimes needs explicit init)
      try {
        canvas.freeDrawingBrush = new PencilBrush(canvas as any);
      } catch {
        // Fallback for any type issues
        (canvas as any).freeDrawingBrush = new (PencilBrush as any)(canvas as any);
      }
    }
    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = 2;

    setFabricCanvas(canvas);

    // Save initial state
    const initialState = JSON.stringify(canvas.toJSON());
    setHistory([initialState]);
    setHistoryStep(0);

    const handleResize = () => {
      if (window.innerWidth > 1024) {
        canvas.setDimensions({ width: 1000, height: 600 });
      } else {
        canvas.setDimensions({ width: 800, height: 600 });
      }
    };

    window.addEventListener("resize", handleResize);

    // Save state after object modifications
    canvas.on("object:added", () => {
      if (!isDrawingRef.current) {
        setTimeout(saveState, 100);
      }
    });

    canvas.on("object:modified", saveState);
    canvas.on("object:removed", saveState);

    // Handle drop events for icon library
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const iconType = e.dataTransfer?.getData("iconType");
      const iconLabel = e.dataTransfer?.getData("icon");
      
      if (iconType && iconLabel) {
        const pointer = canvas.getPointer(e as any);
        addSystemDesignIcon(canvas, iconType, iconLabel, pointer.x, pointer.y);
        toast.success(`Added ${iconLabel} to canvas`);
        setTimeout(saveState, 100);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer!.dropEffect = 'copy';
    };

    canvasRef.current.addEventListener("drop", handleDrop);
    canvasRef.current.addEventListener("dragover", handleDragOver);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("drop", handleDrop);
        canvasRef.current.removeEventListener("dragover", handleDragOver);
      }
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    // Reset drawing mode first
    fabricCanvas.isDrawingMode = false;
    
    if (activeTool === "draw") {
      if (!fabricCanvas.freeDrawingBrush) {
        try {
          fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas as any);
        } catch {
          (fabricCanvas as any).freeDrawingBrush = new (PencilBrush as any)(fabricCanvas as any);
        }
      }
      fabricCanvas.isDrawingMode = true;
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 2;
    }

    if (activeTool === "eraser") {
      if (!fabricCanvas.freeDrawingBrush) {
        try {
          fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas as any);
        } catch {
          (fabricCanvas as any).freeDrawingBrush = new (PencilBrush as any)(fabricCanvas as any);
        }
      }
      fabricCanvas.isDrawingMode = true;
      fabricCanvas.freeDrawingBrush.color = "#1a1f2e"; // Background color
      fabricCanvas.freeDrawingBrush.width = 20;
    }

    // Handle object selection based on tool
    if (activeTool === "select") {
      fabricCanvas.selection = true;
      fabricCanvas.forEachObject((obj) => {
        obj.selectable = true;
        obj.evented = true;
      });
    } else if (activeTool === "draw" || activeTool === "eraser") {
      // For drawing tools, make objects non-interactive so they don't block drawing
      fabricCanvas.selection = false;
      fabricCanvas.discardActiveObject();
      fabricCanvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false; // Let drawing happen without objects interfering
      });
    } else {
      // For other tools (shapes, text, arrows, etc), disable selection but keep objects visible
      fabricCanvas.selection = false;
      fabricCanvas.discardActiveObject();
      fabricCanvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = true;
      });
    }
    
    fabricCanvas.renderAll();
  }, [activeTool, activeColor, fabricCanvas]);

  useEffect(() => {
    if (!fabricCanvas) return;

    const handleMouseDown = (e: any) => {
      if (activeTool === "select" || activeTool === "draw" || activeTool === "eraser") return;

      const pointer = fabricCanvas.getPointer(e.e);
      isDrawingRef.current = true;
      startPointRef.current = { x: pointer.x, y: pointer.y };

      if (activeTool === "text") {
        const text = new IText("Double click to edit", {
          left: pointer.x,
          top: pointer.y,
          fill: activeColor,
          fontSize: 20,
          fontFamily: "Arial",
          selectable: true,
          evented: true,
        });
        fabricCanvas.add(text);
        fabricCanvas.setActiveObject(text);
        text.enterEditing();
        isDrawingRef.current = false;
        return;
      }

      if (activeTool === "rectangle") {
        const rect = new Rect({
          left: pointer.x,
          top: pointer.y,
          width: 0,
          height: 0,
          fill: "transparent",
          stroke: activeColor,
          strokeWidth: 2,
          selectable: true,
          evented: true,
        });
        fabricCanvas.add(rect);
        tempShapeRef.current = rect;
      } else if (activeTool === "circle") {
        const circle = new Circle({
          left: pointer.x,
          top: pointer.y,
          radius: 0,
          fill: "transparent",
          stroke: activeColor,
          strokeWidth: 2,
          selectable: true,
          evented: true,
        });
        fabricCanvas.add(circle);
        tempShapeRef.current = circle;
      } else if (activeTool === "line" || activeTool === "arrow") {
        const line = new Line([pointer.x, pointer.y, pointer.x, pointer.y], {
          stroke: activeColor,
          strokeWidth: 2,
          selectable: true,
          evented: true,
        });
        fabricCanvas.add(line);
        tempShapeRef.current = line;
      }
    };

    const handleMouseMove = (e: any) => {
      if (!isDrawingRef.current || !startPointRef.current || !tempShapeRef.current) return;

      const pointer = fabricCanvas.getPointer(e.e);

      if (activeTool === "rectangle") {
        const rect = tempShapeRef.current as Rect;
        const width = pointer.x - startPointRef.current.x;
        const height = pointer.y - startPointRef.current.y;
        
        rect.set({
          width: Math.abs(width),
          height: Math.abs(height),
          left: width < 0 ? pointer.x : startPointRef.current.x,
          top: height < 0 ? pointer.y : startPointRef.current.y,
        });
      } else if (activeTool === "circle") {
        const circle = tempShapeRef.current as Circle;
        const radius = Math.sqrt(
          Math.pow(pointer.x - startPointRef.current.x, 2) +
          Math.pow(pointer.y - startPointRef.current.y, 2)
        ) / 2;
        
        circle.set({
          radius: Math.abs(radius),
        });
      } else if (activeTool === "line" || activeTool === "arrow") {
        const line = tempShapeRef.current as Line;
        line.set({
          x2: pointer.x,
          y2: pointer.y,
        });
      }

      fabricCanvas.renderAll();
    };

    const handleMouseUp = () => {
      if (activeTool === "arrow" && tempShapeRef.current) {
        const line = tempShapeRef.current as Line;
        const angle = Math.atan2(line.y2! - line.y1!, line.x2! - line.x1!);
        const headLength = 15;
        
        const arrowHead1 = new Line(
          [
            line.x2!,
            line.y2!,
            line.x2! - headLength * Math.cos(angle - Math.PI / 6),
            line.y2! - headLength * Math.sin(angle - Math.PI / 6),
          ],
          {
            stroke: activeColor,
            strokeWidth: 2,
            selectable: true,
            evented: true,
          }
        );
        
        const arrowHead2 = new Line(
          [
            line.x2!,
            line.y2!,
            line.x2! - headLength * Math.cos(angle + Math.PI / 6),
            line.y2! - headLength * Math.sin(angle + Math.PI / 6),
          ],
          {
            stroke: activeColor,
            strokeWidth: 2,
            selectable: true,
            evented: true,
          }
        );
        
        fabricCanvas.add(arrowHead1, arrowHead2);
      }

      isDrawingRef.current = false;
      startPointRef.current = null;
      tempShapeRef.current = null;
    };

    fabricCanvas.on("mouse:down", handleMouseDown);
    fabricCanvas.on("mouse:move", handleMouseMove);
    fabricCanvas.on("mouse:up", handleMouseUp);

    return () => {
      fabricCanvas.off("mouse:down", handleMouseDown);
      fabricCanvas.off("mouse:move", handleMouseMove);
      fabricCanvas.off("mouse:up", handleMouseUp);
    };
  }, [activeTool, activeColor, fabricCanvas, saveState]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#1a1f2e";
    fabricCanvas.renderAll();
    saveState();
    toast.success("Canvas cleared!");
  };

  const handleExport = () => {
    if (!fabricCanvas) return;
    
    // Export as PNG
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2, // Higher resolution
    });
    
    const link = document.createElement('a');
    link.download = `system-design-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    
    toast.success("Canvas exported as PNG!");
  };

  const handleUndo = () => {
    if (!fabricCanvas || historyStep <= 0) return;
    
    const newStep = historyStep - 1;
    setHistoryStep(newStep);
    
    fabricCanvas.loadFromJSON(history[newStep], () => {
      fabricCanvas.renderAll();
      toast.info("Undo");
    });
  };

  const handleRedo = () => {
    if (!fabricCanvas || historyStep >= history.length - 1) return;
    
    const newStep = historyStep + 1;
    setHistoryStep(newStep);
    
    fabricCanvas.loadFromJSON(history[newStep], () => {
      fabricCanvas.renderAll();
      toast.info("Redo");
    });
  };

  // Enable dropping on the container (works across browsers)
  const handleContainerDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleContainerDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!fabricCanvas || !canvasRef.current) return;

    const iconType = e.dataTransfer.getData("iconType");
    const iconLabel = e.dataTransfer.getData("icon");
    if (!iconType || !iconLabel) return;

    const rect = (canvasRef.current as HTMLCanvasElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    addSystemDesignIcon(fabricCanvas, iconType, iconLabel, x, y);
    toast.success(`Added ${iconLabel} to canvas`);
    setTimeout(saveState, 100);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <CanvasToolbar
        activeTool={activeTool}
        onToolClick={handleToolClick}
        onClear={handleClear}
        onExport={handleExport}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyStep > 0}
        canRedo={historyStep < history.length - 1}
        color={activeColor}
        onColorChange={setActiveColor}
      />
      <div 
        className="flex-1 flex items-center justify-center bg-secondary/20 rounded-lg overflow-hidden"
        onDragOver={handleContainerDragOver}
        onDrop={handleContainerDrop}
      >
        <canvas ref={canvasRef} className="border border-border rounded shadow-lg" />
      </div>
    </div>
  );
};

// Helper function to add system design icons
const addSystemDesignIcon = (
  canvas: FabricCanvas,
  iconType: string,
  label: string,
  x: number,
  y: number
) => {
  const colorMap: Record<string, string> = {
    database: "#3b82f6",
    server: "#10b981",
    cloud: "#8b5cf6",
    cache: "#f59e0b",
    storage: "#ec4899",
    network: "#14b8a6",
    security: "#ef4444",
    api: "#eab308",
    service: "#06b6d4",
    loadbalancer: "#a855f7",
  };

  const color = colorMap[iconType] || "#3b82f6";

  // Create a rounded rectangle background
  const rect = new Rect({
    left: x - 40,
    top: y - 40,
    width: 80,
    height: 80,
    fill: color + "30",
    stroke: color,
    strokeWidth: 2,
    rx: 8,
    ry: 8,
    selectable: true,
    evented: true,
  });

  // Create label text
  const text = new IText(label, {
    left: x - 35,
    top: y + 50,
    fontSize: 12,
    fill: "#ffffff",
    fontFamily: "Arial",
    fontWeight: "bold",
    selectable: true,
    evented: true,
  });

  canvas.add(rect, text);
  canvas.renderAll();
};
