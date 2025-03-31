
import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  isPositiveResult?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isPositiveResult }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const baseColor = isPositiveResult 
      ? { r: 53, g: 199, b: 89, a: 0.07 } // Green for positive
      : { r: 255, g: 59, b: 48, a: 0.07 }; // Red for negative
    
    const lineColor = isPositiveResult
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(255, 255, 255, 0.5)';
    
    // Create particles
    const particlesArray: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];
    
    for (let i = 0; i < 50; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${baseColor.a * 2})`);
      gradient.addColorStop(1, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${baseColor.a})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${p.opacity})`;
        ctx.fill();
        
        // Connect particles with lines
        for (let j = i; j < particlesArray.length; j++) {
          const p2 = particlesArray[j];
          const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.2;
            ctx.globalAlpha = 1 - (distance / 150);
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off walls
        if (p.x <= 0 || p.x >= canvas.width) p.speedX *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.speedY *= -1;
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isPositiveResult]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
