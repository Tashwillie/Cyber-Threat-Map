// Screen scaling utility for large displays

export const getScreenScale = (): number => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Calculate scale based on screen size
  if (width >= 3840) {
    return 1.6; // 4K and 55-inch displays
  } else if (width >= 2560) {
    return 1.4; // Ultra-wide displays
  } else if (width >= 1920) {
    return 1.2; // Large desktop displays
  }
  
  return 1; // Default scale
};

export const applyScreenScaling = (): void => {
  const scale = getScreenScale();
  const root = document.getElementById('root');
  
  if (root && scale > 1) {
    root.style.transform = `scale(${scale})`;
    root.style.transformOrigin = 'top left';
    root.style.width = `${100 / scale}%`;
    root.style.height = `${100 / scale}%`;
  }
};

// Apply scaling on load and resize
export const initScreenScaling = (): void => {
  // Apply initial scaling
  applyScreenScaling();
  
  // Reapply on resize with debouncing
  let resizeTimeout: NodeJS.Timeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(applyScreenScaling, 100);
  });
};
