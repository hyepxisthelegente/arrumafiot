import { useState, useCallback, useEffect } from 'react';

export function useImageLoading(beforeImage: string, afterImage: string) {
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const [isReady, setIsReady] = useState(false);

  const handleImageLoad = useCallback((type: 'before' | 'after') => {
    setImagesLoaded(prev => {
      const newState = { ...prev, [type]: true };
      if (newState.before && newState.after) {
        setIsReady(true);
      }
      return newState;
    });
  }, []);

  useEffect(() => {
    const preloadImage = (src: string, type: 'before' | 'after') => {
      // Verificar se a imagem já está em cache
      const img = new Image();
      
      const handleLoad = () => {
        handleImageLoad(type);
      };
      
      const handleError = () => {
        console.warn(`Falha ao carregar imagem: ${src}`);
        // Mesmo com erro, marcar como "carregada" para não travar a interface
        handleImageLoad(type);
      };

      img.onload = handleLoad;
      img.onerror = handleError;
      
      // Timeout para evitar travamento
      const timeout = setTimeout(() => {
        console.warn(`Timeout ao carregar imagem: ${src}`);
        handleImageLoad(type);
      }, 5000);

      img.src = src;

      // Cleanup
      return () => {
        clearTimeout(timeout);
        img.onload = null;
        img.onerror = null;
      };
    };

    const cleanup1 = preloadImage(beforeImage, 'before');
    const cleanup2 = preloadImage(afterImage, 'after');

    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, [beforeImage, afterImage, handleImageLoad]);

  return { isReady, imagesLoaded };
}