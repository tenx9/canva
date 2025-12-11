import { useState, useCallback } from 'react';
import {
  suggestTitles,
  generateBackground,
  transcribeAudio,
  improveTitle,
  isGeminiConfigured,
} from '@/services/geminiAPI';
import type { TitleSuggestion, AIGenerationOptions } from '@/types/invitation.types';

interface UseGeminiReturn {
  // State
  isLoading: boolean;
  error: string | null;
  titleSuggestions: string[];
  isConfigured: boolean;

  // Actions
  fetchTitleSuggestions: (topic: string) => Promise<void>;
  fetchBackground: (options?: AIGenerationOptions) => Promise<string | null>;
  fetchTranscription: (audioBlob: Blob) => Promise<string | null>;
  fetchImprovedTitle: (title: string) => Promise<string | null>;
  clearError: () => void;
}

export function useGemini(): UseGeminiReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);

  const isConfigured = isGeminiConfigured();

  // مسح الخطأ
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // اقتراح عناوين
  const fetchTitleSuggestions = useCallback(async (topic: string) => {
    if (!topic.trim()) {
      setError('يرجى إدخال موضوع للبحث');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result: TitleSuggestion = await suggestTitles(topic);
      setTitleSuggestions(result.titles);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
      setTitleSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // توليد خلفية
  const fetchBackground = useCallback(async (options?: AIGenerationOptions): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const url = await generateBackground(options);
      return url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // تحويل الصوت إلى نص
  const fetchTranscription = useCallback(async (audioBlob: Blob): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const text = await transcribeAudio(audioBlob);
      return text;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // تحسين العنوان
  const fetchImprovedTitle = useCallback(async (title: string): Promise<string | null> => {
    if (!title.trim()) {
      setError('يرجى إدخال عنوان للتحسين');
      return null;
    }

    setIsLoading(true);
    setError(null);
    try {
      const improved = await improveTitle(title);
      return improved;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    titleSuggestions,
    isConfigured,
    fetchTitleSuggestions,
    fetchBackground,
    fetchTranscription,
    fetchImprovedTitle,
    clearError,
  };
}
