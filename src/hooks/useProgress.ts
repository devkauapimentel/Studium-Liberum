import { useState, useEffect, useCallback } from 'react';
import { getProgressAction, saveProgressAction } from '@/app/actions';
import type { ProgressEntry } from '@/lib/db';

export function useProgress(filePath: string | null) {
  const [progress, setProgress] = useState<ProgressEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProgress = useCallback(async () => {
    if (!filePath) return;
    setIsLoading(true);
    try {
      const result = await getProgressAction(filePath);
      if (result.success && result.data) {
        setProgress(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filePath]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const saveProgress = async (entry: Partial<ProgressEntry>) => {
    if (!filePath) return;
    
    const newEntry: ProgressEntry = {
      file_path: filePath,
      status: entry.status || progress?.status || 'in_progress',
      timestamp: entry.timestamp || Date.now(),
      current_time: entry.current_time ?? progress?.current_time,
      duration: entry.duration ?? progress?.duration,
    };

    // Optimistic UI update
    setProgress(newEntry);

    try {
      await saveProgressAction(newEntry);
    } catch (error) {
      console.error("Failed to save progress via action:", error);
      // Revert on failure could be added here
    }
  };

  return {
    progress,
    isLoading,
    saveProgress,
    refetch: fetchProgress
  };
}
