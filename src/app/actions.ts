"use server";

import { saveProgress, getProgress, getAllProgress, ProgressEntry } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveProgressAction(entry: ProgressEntry) {
  try {
    saveProgress(entry);
    // Revalidate paths that might show progress
    revalidatePath("/");
    revalidatePath("/track/[id]", "page");
    return { success: true };
  } catch (error) {
    console.error("Failed to save progress:", error);
    return { success: false, error: "Database error" };
  }
}

export async function getProgressAction(filePath: string) {
  try {
    const progress = getProgress(filePath);
    return { success: true, data: progress };
  } catch (error) {
    console.error("Failed to get progress:", error);
    return { success: false, error: "Database error" };
  }
}

export async function getAllProgressAction() {
  try {
    const progress = getAllProgress();
    return { success: true, data: progress };
  } catch (error) {
    console.error("Failed to get all progress:", error);
    return { success: false, error: "Database error" };
  }
}
