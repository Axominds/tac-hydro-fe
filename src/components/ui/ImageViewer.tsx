import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "../../lib/utils";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageViewerProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageViewer = ({ images, initialIndex, isOpen, onClose }: ImageViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = (open: boolean) => {
    if (open) {
      setCurrentIndex(initialIndex);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  const handleZoomIn = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  }, []);

  const handleResetZoom = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
      if (e.key === "=" || e.key === "+") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleResetZoom();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose, handleZoomIn, handleZoomOut, handleResetZoom]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (open) handleOpen(true); if (!open) onClose(); }}>
      <DialogContent className="max-w-[98vw] h-[98vh] p-0 border-0 bg-transparent shadow-none flex items-center justify-center focus:outline-none overflow-hidden select-none">
        <DialogTitle className="sr-only">Image Preview</DialogTitle>

        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden touch-none"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Selected Image */}
          {images.length > 0 && (
            <div
              className={cn(
                "relative max-h-full max-w-full transition-transform duration-200 ease-out flex items-center justify-center",
                scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default",
              )}
              onMouseDown={handleMouseDown}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
            >
              <img
                src={images[currentIndex]}
                alt="Full view"
                className="max-h-[85vh] lg:max-h-[90vh] max-w-full object-contain shadow-2xl rounded-lg pointer-events-none"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* Top Bar Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-xl">
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                title="Zoom Out (-)"
                disabled={scale <= 1}
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white text-xs font-bold min-w-[36px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                title="Zoom In (+)"
                disabled={scale >= 4}
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <div className="w-px h-4 bg-white/20 mx-1" />
              <button
                onClick={handleResetZoom}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                title="Reset Zoom (0)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-3 rounded-full bg-black/50 text-white hover:bg-red-500 transition-all backdrop-blur-md border border-white/10 shadow-xl group"
              aria-label="Close"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Navigation Controls */}
          {images.length > 1 && scale === 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all backdrop-blur-sm border border-white/10 group z-10 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all backdrop-blur-sm border border-white/10 group z-10 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}

          {/* Pagination Counter */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
            <div className="px-6 py-2 rounded-full bg-black/50 text-white text-sm font-bold backdrop-blur-md border border-white/10 shadow-xl tracking-widest uppercase">
              {currentIndex + 1} <span className="text-white/40 px-1">/</span> {images.length}
            </div>
            {scale > 1 && (
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                Click and drag to pan
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
