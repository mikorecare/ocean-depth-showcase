// src/hooks/useAdvancedAnimatedCursor.ts
"use client";

import { useEffect, useRef } from 'react';
import { convertAniBinaryToCSS } from 'ani-cursor';

type CursorState = 'normal' | 'scroll';

export function useAdvancedAnimatedCursor(): void {
    const styleElementRef = useRef<HTMLStyleElement | null>(null);
    const currentState = useRef<CursorState>('normal');

    useEffect(() => {
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        styleElementRef.current = styleElement;

        const loadCursor = async (cursorPath: string, state: CursorState): Promise<void> => {
            try {
                const response = await fetch(cursorPath);
                const arrayBuffer = await response.arrayBuffer();
                const data = new Uint8Array(arrayBuffer);

                const cssStyles = convertAniBinaryToCSS(`body.ani-cursor-${state}`, data);

                if (styleElementRef.current) {
                    styleElementRef.current.innerHTML += cssStyles;
                }
            } catch (error) {
                console.error(`Failed to load cursor: ${cursorPath}`, error);
            }
        };

        Promise.all([
            loadCursor('/cursors/3.ani', 'normal'),
            loadCursor('/cursors/1.ani', 'scroll')
        ]).then(() => {
            document.body.classList.add('ani-cursor-normal');
            currentState.current = 'normal';
        });

        const setCursorState = (newState: CursorState) => {
            if (currentState.current !== newState) {
                document.body.classList.remove('ani-cursor-normal', 'ani-cursor-scroll');
                document.body.classList.add(`ani-cursor-${newState}`);
                currentState.current = newState;
            }
        };

        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
            setCursorState('scroll');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (currentState.current === 'scroll') {
                    setCursorState('normal');
                }
            }, 150);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);

            if (styleElementRef.current) {
                styleElementRef.current.remove();
            }

            document.body.classList.remove('ani-cursor-normal', 'ani-cursor-scroll');
        };
    }, []);
}