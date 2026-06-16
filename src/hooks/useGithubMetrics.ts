import { useState, useEffect } from 'react';

export interface GithubMetrics {
  stars: number;
  lastCommitDate: string;
  forks: number;
}

// Static elegant design fallbacks for Tejraj's main repositories
const FALLBACK_METRICS: Record<string, GithubMetrics> = {
  'ai_resume_checker': { stars: 12, lastCommitDate: '2026-06-10T12:00:00Z', forks: 3 },
  'soulmate': { stars: 18, lastCommitDate: '2025-06-05T08:30:00Z', forks: 4 },
  'devour-cafe': { stars: 15, lastCommitDate: '2025-12-20T15:45:00Z', forks: 2 },
  'default': { stars: 5, lastCommitDate: '2025-12-01T10:00:00Z', forks: 1 }
};

export function getRepoPath(url: string): { owner: string; repo: string } | null {
  try {
    if (!url || !url.includes('github.com')) return null;
    const cleanUrl = url.replace(/\/$/, ''); // strip trailing slash
    const parts = cleanUrl.split('github.com/');
    if (parts.length < 2) return null;
    const pathParts = parts[1].split('/');
    if (pathParts.length >= 2) {
      return { owner: pathParts[0], repo: pathParts[1] };
    }
  } catch (error) {
    console.error('Error parsing GitHub URL:', error);
  }
  return null;
}

export function formatRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    // Explicit anchor point or current system local time
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    // Safety check for futuristic dates
    if (diffMs < 0) {
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' });
    }

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);

    if (diffDays < 1) {
      if (diffHr < 1) {
        if (diffMin < 1) return 'Just now';
        return `${diffMin}m ago`;
      }
      return `${diffHr}h ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours cache life to respect GitHub's public API limits

export function useGithubMetrics(githubUrl: string) {
  const repoInfo = getRepoPath(githubUrl);
  const repoKey = repoInfo ? repoInfo.repo.toLowerCase() : 'default';
  
  // Setup initial default values from fallback registry
  const fallback = FALLBACK_METRICS[repoKey] || FALLBACK_METRICS['default'];
  const [metrics, setMetrics] = useState<GithubMetrics>(fallback);
  const [loading, setLoading] = useState<boolean>(!!repoInfo);

  useEffect(() => {
    if (!repoInfo) {
      setLoading(false);
      return;
    }

    const cacheKey = `gh-metrics-${repoInfo.owner}-${repoInfo.repo}`;
    
    const fetchMetrics = async () => {
      try {
        // Consult localStorage cache first
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL_MS) {
            setMetrics(data);
            setLoading(false);
            return;
          }
        }

        // Fetch from public safe GitHub repository endpoint
        const response = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        });

        if (!response.ok) {
          throw new Error(`GitHub API returned status ${response.status}`);
        }

        const data = await response.json();
        
        const newMetrics: GithubMetrics = {
          stars: data.stargazers_count ?? fallback.stars,
          lastCommitDate: data.pushed_at || data.updated_at || fallback.lastCommitDate,
          forks: data.forks_count ?? fallback.forks,
        };

        // Save to state & local cache
        setMetrics(newMetrics);
        localStorage.setItem(cacheKey, JSON.stringify({
          data: newMetrics,
          timestamp: Date.now()
        }));
      } catch (err) {
        console.warn(`Could not load real-time metrics for ${repoInfo.repo}, loading cached/fallback profile:`, err);
        // Attempt to load expired cache as secondary contingency
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          try {
            const { data } = JSON.parse(cached);
            setMetrics(data);
          } catch (_) {
            setMetrics(fallback);
          }
        } else {
          setMetrics(fallback);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [githubUrl]);

  return { metrics, loading };
}
