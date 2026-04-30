"use client";

import { useEffect, useState } from "react";
import { getAllProgressAction, saveProgressAction } from "@/app/actions";

// Hook to manage progress synchronized with SQLite
export function use42Progress() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await getAllProgressAction();
        if (res.success && res.data) {
          const loadedCompleted: Record<string, boolean> = {};
          res.data.forEach((entry) => {
            if (entry.file_path.startsWith("42-prep:") && entry.status === "completed") {
              const exerciseId = entry.file_path.replace("42-prep:", "");
              loadedCompleted[exerciseId] = true;
            }
          });
          setCompleted(loadedCompleted);
        }
      } catch (e) {
        console.error("Failed to load 42 progress from SQLite", e);
      } finally {
        setIsLoaded(true);
      }
    }
    loadProgress();
  }, []);

  const toggleExercise = async (exerciseId: string) => {
    setCompleted((prev) => {
      const isNowCompleted = !prev[exerciseId];
      const next = { ...prev, [exerciseId]: isNowCompleted };
      
      // Async update SQLite
      saveProgressAction({
        file_path: `42-prep:${exerciseId}`,
        status: isNowCompleted ? "completed" : "in_progress",
        timestamp: Date.now(),
      }).catch(console.error);

      return next;
    });
  };
  
  const resetProgress = async () => {
    if (window.confirm("Are you sure you want to reset all 42 progress in the database?")) {
      const keysToReset = Object.keys(completed);
      setCompleted({});
      
      for (const exerciseId of keysToReset) {
        await saveProgressAction({
          file_path: `42-prep:${exerciseId}`,
          status: "in_progress",
          timestamp: Date.now(),
        });
      }
    }
  }

  return { completed, toggleExercise, resetProgress, isLoaded };
}
