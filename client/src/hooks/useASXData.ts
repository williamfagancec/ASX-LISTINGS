import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";

// Import types from shared schema to ensure consistency
import type {
  Task,
  Resource,
  Company,
  ListingStage,
  UserProgress,
  MeetingRequest,
  NewMeetingRequest,
  MarketData,
  NewMarketData,
  IpoCalendar,
  NewIpoCalendar,
  MarketSentiment,
  NewMarketSentiment
} from "@shared/schema";

// Custom hooks for data fetching

// Fetch tasks for a specific role
export function useTasks(targetRole?: string, category?: string) {
  const params = new URLSearchParams();
  if (targetRole) params.append('targetRole', targetRole);
  if (category) params.append('category', category);
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  
  return useQuery<Task[]>({
    queryKey: ['/api/tasks', { targetRole, category }],
    queryFn: async () => {
      const response = await fetch(`/api/tasks${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return response.json();
    },
  });
}

// Fetch resources with optional filtering
export function useResources(type?: string, category?: string, targetRoles?: string[]) {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  if (category) params.append('category', category);
  // Add targetRoles to query parameters if provided
  if (targetRoles && targetRoles.length > 0) {
    targetRoles.forEach(role => params.append('targetRoles', role));
  }
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  
  return useQuery<Resource[]>({
    queryKey: ['/api/resources', { type, category, targetRoles }],
    queryFn: async () => {
      const response = await fetch(`/api/resources${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch resources');
      return response.json();
    },
  });
}

// Fetch companies
export function useCompanies() {
  return useQuery<Company[]>({
    queryKey: ['/api/companies'],
    queryFn: async () => {
      const response = await fetch('/api/companies');
      if (!response.ok) throw new Error('Failed to fetch companies');
      return response.json();
    },
  });
}

// Fetch listing stages
export function useListingStages() {
  return useQuery<ListingStage[]>({
    queryKey: ['/api/listing-stages'],
    queryFn: async () => {
      const response = await fetch('/api/listing-stages');
      if (!response.ok) throw new Error('Failed to fetch listing stages');
      return response.json();
    },
  });
}

// Fetch user progress for a specific user
export function useUserProgress(userId: string) {
  return useQuery<UserProgress[]>({
    queryKey: ['/api/users', userId, 'progress'],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}/progress`);
      if (!response.ok) throw new Error('Failed to fetch user progress');
      return response.json();
    },
    enabled: !!userId, // Only run if userId is provided
  });
}

// Update user progress mutation
export function useUpdateProgress() {
  return useMutation({
    mutationFn: async ({ userId, taskId, completed, notes }: {
      userId: string;
      taskId: string;
      completed: boolean;
      notes?: string;
    }) => {
      const response = await apiRequest('POST', `/api/users/${userId}/progress/${taskId}`, {
        completed,
        notes
      });
      return response.json();
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch user progress
      queryClient.invalidateQueries({ queryKey: ['/api/users', variables.userId, 'progress'] });
      // Also invalidate tasks to refresh completion status
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    },
  });
}

// Create meeting request mutation
export function useCreateMeetingRequest() {
  return useMutation({
    mutationFn: async (meetingRequest: NewMeetingRequest) => {
      const response = await apiRequest('POST', '/api/meeting-requests', meetingRequest);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch meeting requests
      queryClient.invalidateQueries({ queryKey: ['/api/meeting-requests'] });
    },
  });
}

// Update company timeline mutation
export function useUpdateCompanyTimeline() {
  return useMutation({
    mutationFn: async ({ companyId, timelineData }: { 
      companyId: string; 
      timelineData: { listingStage?: string; targetListingDate?: Date } 
    }) => {
      const response = await apiRequest('PATCH', `/api/companies/${companyId}/timeline`, timelineData);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch companies data more aggressively
      queryClient.invalidateQueries({ queryKey: ['/api/companies'] });
      queryClient.refetchQueries({ queryKey: ['/api/companies'] });
    },
  });
}

// Market Intelligence hooks

// Fetch market data with optional filtering
export function useMarketData(sector?: string, limit?: number) {
  const params = new URLSearchParams();
  if (sector) params.append('sector', sector);
  if (limit) params.append('limit', limit.toString());
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  
  return useQuery<MarketData[]>({
    queryKey: ['/api/market-data', { sector, limit }],
    queryFn: async () => {
      const response = await fetch(`/api/market-data${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch market data');
      return response.json();
    },
  });
}

// Create market data
export function useCreateMarketData() {
  return useMutation({
    mutationFn: async (data: NewMarketData) => {
      const response = await apiRequest('POST', '/api/market-data', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/market-data'] });
    },
  });
}

// Update market data
export function useUpdateMarketData() {
  return useMutation({
    mutationFn: async ({ symbol, data }: { symbol: string; data: Partial<NewMarketData> }) => {
      const response = await apiRequest('PUT', `/api/market-data/${symbol}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/market-data'] });
    },
  });
}

// Fetch IPO calendar
export function useIpoCalendar(status?: string, limit?: number) {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (limit) params.append('limit', limit.toString());
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  
  return useQuery<IpoCalendar[]>({
    queryKey: ['/api/ipo-calendar', { status, limit }],
    queryFn: async () => {
      const response = await fetch(`/api/ipo-calendar${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch IPO calendar');
      return response.json();
    },
  });
}

// Create IPO calendar entry
export function useCreateIpoCalendarEntry() {
  return useMutation({
    mutationFn: async (data: NewIpoCalendar) => {
      const response = await apiRequest('POST', '/api/ipo-calendar', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ipo-calendar'] });
    },
  });
}

// Update IPO calendar entry
export function useUpdateIpoCalendarEntry() {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<NewIpoCalendar> }) => {
      const response = await apiRequest('PUT', `/api/ipo-calendar/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ipo-calendar'] });
    },
  });
}

// Fetch market sentiment
export function useMarketSentiment(limit?: number) {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  
  return useQuery<MarketSentiment[]>({
    queryKey: ['/api/market-sentiment', { limit }],
    queryFn: async () => {
      const response = await fetch(`/api/market-sentiment${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch market sentiment');
      return response.json();
    },
  });
}

// Fetch latest market sentiment
export function useLatestMarketSentiment() {
  return useQuery<MarketSentiment>({
    queryKey: ['/api/market-sentiment/latest'],
    queryFn: async () => {
      const response = await fetch('/api/market-sentiment/latest');
      if (!response.ok) throw new Error('Failed to fetch latest market sentiment');
      return response.json();
    },
  });
}

// Create market sentiment
export function useCreateMarketSentiment() {
  return useMutation({
    mutationFn: async (data: NewMarketSentiment) => {
      const response = await apiRequest('POST', '/api/market-sentiment', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/market-sentiment'] });
    },
  });
}

// Utility functions for data processing

export function calculateTaskProgress(tasks: Task[], userProgress: UserProgress[]): number {
  if (tasks.length === 0) return 0;
  
  const completedTasks = tasks.filter(task => 
    userProgress.some(progress => 
      progress.taskId === task.id && progress.completed
    )
  );
  
  return Math.round((completedTasks.length / tasks.length) * 100);
}

export function getTasksByPriority(tasks: Task[]): {
  high: Task[];
  medium: Task[];
  low: Task[];
} {
  return {
    high: tasks.filter(t => t.priority === 'high'),
    medium: tasks.filter(t => t.priority === 'medium'),
    low: tasks.filter(t => t.priority === 'low'),
  };
}

export function getResourcesByType(resources: Resource[]): {
  guides: Resource[];
  templates: Resource[];
  videos: Resource[];
  documents: Resource[];
} {
  return {
    guides: resources.filter(r => r.type === 'Guide'),
    templates: resources.filter(r => r.type === 'Template'),
    videos: resources.filter(r => r.type === 'Video'),
    documents: resources.filter(r => r.type === 'Regulatory Document'),
  };
}