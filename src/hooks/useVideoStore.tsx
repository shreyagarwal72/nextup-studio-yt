import { useEffect, useState, useCallback } from "react";

export interface StoredVideo {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
}

const STORAGE_KEY = "nextup-videos-v1";

export const defaultVideos: StoredVideo[] = [
  {
    id: "apok4v8Pzow",
    title: "Fire Within — Official Track",
    description: "A powerful original rap track showcasing lyrical prowess and intense energy.",
    embedUrl: "https://www.youtube.com/embed/apok4v8Pzow",
  },
  {
    id: "xftcj39h-QY",
    title: "Raat Ka Banda — Epic Edit",
    description: "Cinematic visuals with strong vibes, creative editing and atmospheric storytelling.",
    embedUrl: "https://www.youtube.com/embed/xftcj39h-QY",
  },
  {
    id: "F4ctUpMRP4w",
    title: "Echoes in the Storm",
    description: "An atmospheric masterpiece combining powerful lyrics with storm-like energy.",
    embedUrl: "https://www.youtube.com/embed/F4ctUpMRP4w",
  },
  {
    id: "b63MnxqG9-c",
    title: "Nextup Studio Official Trailer",
    description: "The official trailer showcasing the creative vision of Nextup Studio.",
    embedUrl: "https://www.youtube.com/embed/b63MnxqG9-c",
  },
];

export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  // Bare ID (11 chars, YT id charset)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host.endsWith("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      // /embed/ID, /shorts/ID, /live/ID, /v/ID
      const idx = parts.findIndex((p) => ["embed", "shorts", "live", "v"].includes(p));
      if (idx !== -1 && parts[idx + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[idx + 1])) {
        return parts[idx + 1];
      }
    }
  } catch {
    // not a URL
  }
  return null;
}

function loadFromStorage(): StoredVideo[] {
  if (typeof window === "undefined") return defaultVideos;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultVideos;
    const parsed = JSON.parse(raw) as StoredVideo[];
    return Array.isArray(parsed) ? parsed : defaultVideos;
  } catch {
    return defaultVideos;
  }
}

function saveToStorage(videos: StoredVideo[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    window.dispatchEvent(new CustomEvent("nextup:videos-changed"));
  } catch {
    // ignore
  }
}

export function useVideoStore() {
  const [videos, setVideos] = useState<StoredVideo[]>(() => loadFromStorage());

  useEffect(() => {
    const sync = () => setVideos(loadFromStorage());
    window.addEventListener("storage", sync);
    window.addEventListener("nextup:videos-changed", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("nextup:videos-changed", sync as EventListener);
    };
  }, []);

  const addVideo = useCallback((input: { url: string; title: string; description: string }) => {
    const id = extractYouTubeId(input.url);
    if (!id) throw new Error("Invalid YouTube URL or video ID");
    const next: StoredVideo = {
      id,
      title: input.title.trim() || "Untitled",
      description: input.description.trim(),
      embedUrl: `https://www.youtube.com/embed/${id}`,
    };
    const list = loadFromStorage();
    if (list.some((v) => v.id === id)) throw new Error("Video already exists");
    const updated = [next, ...list];
    saveToStorage(updated);
    setVideos(updated);
  }, []);

  const updateVideo = useCallback((id: string, patch: Partial<Omit<StoredVideo, "id">>) => {
    const list = loadFromStorage().map((v) => (v.id === id ? { ...v, ...patch } : v));
    saveToStorage(list);
    setVideos(list);
  }, []);

  const removeVideo = useCallback((id: string) => {
    const list = loadFromStorage().filter((v) => v.id !== id);
    saveToStorage(list);
    setVideos(list);
  }, []);

  const move = useCallback((id: string, direction: -1 | 1) => {
    const list = loadFromStorage();
    const i = list.findIndex((v) => v.id === id);
    const j = i + direction;
    if (i === -1 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    saveToStorage(list);
    setVideos(list);
  }, []);

  const reset = useCallback(() => {
    saveToStorage(defaultVideos);
    setVideos(defaultVideos);
  }, []);

  return { videos, addVideo, updateVideo, removeVideo, move, reset };
}
