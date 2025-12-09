/**
 * Custom hook for managing theme editor tour state
 *
 * Handles auto-starting the tour for new visitors and managing tour lifecycle
 */

'use client';

import { useEffect, useRef } from 'react';
import { driver, type Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import '@/styles/driver-theme.css';
import {
  TOUR_STEPS,
  hasTourBeenCompleted,
  markTourCompleted,
  resetTourCompletion,
} from '@/lib/theme-editor-tour';

interface UseThemeEditorTourReturn {
  startTour: () => void;
}

export function useThemeEditorTour(): UseThemeEditorTourReturn {
  const driverInstance = useRef<Driver | null>(null);
  const hasAutoStarted = useRef(false);

  // Initialize driver instance
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create driver instance with custom styling
    driverInstance.current = driver({
      steps: TOUR_STEPS,
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      progressText: '{{current}} of {{total}}',
      nextBtnText: 'Next',
      prevBtnText: 'Back',
      doneBtnText: 'Finish',
      popoverClass: 'theme-editor-tour-popover',
      onDestroyStarted: () => {
        // Mark as completed when tour is finished or skipped
        if (driverInstance.current) {
          markTourCompleted();
          driverInstance.current.destroy();
        }
      },
    });

    // Auto-start tour for new visitors
    if (!hasAutoStarted.current && !hasTourBeenCompleted()) {
      hasAutoStarted.current = true;
      // Delay to ensure DOM is ready
      const timer = setTimeout(() => {
        driverInstance.current?.drive();
      }, 500);
      return () => clearTimeout(timer);
    }

    // Cleanup on unmount
    return () => {
      if (driverInstance.current) {
        driverInstance.current.destroy();
      }
    };
  }, []);

  const startTour = () => {
    if (driverInstance.current) {
      resetTourCompletion();
      driverInstance.current.drive();
    }
  };

  return {
    startTour,
  };
}
