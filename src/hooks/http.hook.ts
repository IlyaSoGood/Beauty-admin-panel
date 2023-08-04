import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loadingStatus, setLoadingStatus] = useState<string>('idle');
    const [error, setError] = useState<string | null>(null);
}