import { db } from "./db";
import { 
  users, tasks, resources, companies, listingStages, userProgress, meetingRequests,
  marketData, ipoCalendar, marketSentiment,
  type User, type InsertUser, type Task, type NewTask, 
  type Resource, type NewResource, type Company, type NewCompany,
  type ListingStage, type NewListingStage, type UserProgress, type NewUserProgress,
  type MeetingRequest, type NewMeetingRequest,
  type MarketData, type NewMarketData, type IpoCalendar, type NewIpoCalendar,
  type MarketSentiment, type NewMarketSentiment
} from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  
  // Task operations
  getTasks(filters?: { targetRole?: string; category?: string }): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: NewTask): Promise<Task>;
  updateTask(id: string, updates: Partial<NewTask>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
  
  // Resource operations
  getResources(filters?: { targetRoles?: string[]; type?: string; category?: string }): Promise<Resource[]>;
  getResource(id: string): Promise<Resource | undefined>;
  createResource(resource: NewResource): Promise<Resource>;
  updateResource(id: string, updates: Partial<NewResource>): Promise<Resource | undefined>;
  
  // Company operations
  getCompanies(): Promise<Company[]>;
  getCompany(id: string): Promise<Company | undefined>;
  createCompany(company: NewCompany): Promise<Company>;
  updateCompany(id: string, updates: Partial<NewCompany>): Promise<Company | undefined>;
  
  // User Progress operations
  getUserProgress(userId: string): Promise<UserProgress[]>;
  updateProgress(userId: string, taskId: string, completed: boolean, notes?: string): Promise<UserProgress>;
  
  // Listing Stage operations
  getListingStages(): Promise<ListingStage[]>;
  createListingStage(stage: NewListingStage): Promise<ListingStage>;
  
  // Meeting Request operations
  getMeetingRequests(userId?: string): Promise<MeetingRequest[]>;
  createMeetingRequest(request: NewMeetingRequest): Promise<MeetingRequest>;
  
  // Market Intelligence operations
  getMarketData(filters?: { sector?: string; limit?: number }): Promise<MarketData[]>;
  createMarketData(data: NewMarketData): Promise<MarketData>;
  updateMarketData(symbol: string, updates: Partial<NewMarketData>): Promise<MarketData | undefined>;
  
  // IPO Calendar operations
  getIpoCalendar(filters?: { status?: string; limit?: number }): Promise<IpoCalendar[]>;
  createIpoCalendarEntry(entry: NewIpoCalendar): Promise<IpoCalendar>;
  updateIpoCalendarEntry(id: string, updates: Partial<NewIpoCalendar>): Promise<IpoCalendar | undefined>;
  
  // Market Sentiment operations
  getMarketSentiment(limit?: number): Promise<MarketSentiment[]>;
  createMarketSentiment(sentiment: NewMarketSentiment): Promise<MarketSentiment>;
  getLatestMarketSentiment(): Promise<MarketSentiment | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result[0];
  }

  // Task operations
  async getTasks(filters?: { targetRole?: string; category?: string }): Promise<Task[]> {
    const conditions = [];
    
    if (filters?.targetRole) {
      conditions.push(eq(tasks.targetRole, filters.targetRole));
    }
    if (filters?.category) {
      conditions.push(eq(tasks.category, filters.category));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(tasks).where(and(...conditions));
    } else {
      return await db.select().from(tasks);
    }
  }

  async getTask(id: string): Promise<Task | undefined> {
    const result = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    return result[0];
  }

  async createTask(task: NewTask): Promise<Task> {
    const result = await db.insert(tasks).values(task).returning();
    return result[0];
  }

  async updateTask(id: string, updates: Partial<NewTask>): Promise<Task | undefined> {
    const result = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
    return result[0];
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    return result.length > 0;
  }

  // Resource operations
  async getResources(filters?: { targetRoles?: string[]; type?: string; category?: string }): Promise<Resource[]> {
    const conditions = [];
    
    if (filters?.type) {
      conditions.push(eq(resources.type, filters.type));
    }
    if (filters?.category) {
      conditions.push(eq(resources.category, filters.category));
    }
    // Add targetRoles filtering support
    if (filters?.targetRoles && filters.targetRoles.length > 0) {
      // Filter resources that have any of the target roles in their targetRoles array
      conditions.push(sql`${resources.targetRoles} && ${filters.targetRoles}`);
    }
    
    if (conditions.length > 0) {
      return await db.select().from(resources).where(and(...conditions));
    } else {
      return await db.select().from(resources);
    }
  }

  async getResource(id: string): Promise<Resource | undefined> {
    const result = await db.select().from(resources).where(eq(resources.id, id)).limit(1);
    return result[0];
  }

  async createResource(resource: NewResource): Promise<Resource> {
    const result = await db.insert(resources).values(resource).returning();
    return result[0];
  }

  async updateResource(id: string, updates: Partial<NewResource>): Promise<Resource | undefined> {
    const result = await db.update(resources).set(updates).where(eq(resources.id, id)).returning();
    return result[0];
  }

  // Company operations
  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies).orderBy(desc(companies.createdAt));
  }

  async getCompany(id: string): Promise<Company | undefined> {
    const result = await db.select().from(companies).where(eq(companies.id, id)).limit(1);
    return result[0];
  }

  async createCompany(company: NewCompany): Promise<Company> {
    const result = await db.insert(companies).values(company).returning();
    return result[0];
  }

  async updateCompany(id: string, updates: Partial<NewCompany>): Promise<Company | undefined> {
    const result = await db.update(companies).set(updates).where(eq(companies.id, id)).returning();
    return result[0];
  }

  // User Progress operations
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async updateProgress(userId: string, taskId: string, completed: boolean, notes?: string): Promise<UserProgress> {
    const existing = await db.select().from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.taskId, taskId)))
      .limit(1);
    
    if (existing.length > 0) {
      const result = await db.update(userProgress)
        .set({ 
          completed, 
          completedAt: completed ? new Date() : null,
          notes 
        })
        .where(eq(userProgress.id, existing[0].id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(userProgress)
        .values({ 
          userId, 
          taskId, 
          completed, 
          completedAt: completed ? new Date() : null,
          notes 
        })
        .returning();
      return result[0];
    }
  }

  // Listing Stage operations
  async getListingStages(): Promise<ListingStage[]> {
    return await db.select().from(listingStages).orderBy(listingStages.order);
  }

  async createListingStage(stage: NewListingStage): Promise<ListingStage> {
    const result = await db.insert(listingStages).values(stage).returning();
    return result[0];
  }

  // Meeting Request operations
  async getMeetingRequests(userId?: string): Promise<MeetingRequest[]> {
    if (userId) {
      return await db.select().from(meetingRequests)
        .where(eq(meetingRequests.userId, userId))
        .orderBy(desc(meetingRequests.createdAt));
    }
    return await db.select().from(meetingRequests).orderBy(desc(meetingRequests.createdAt));
  }

  async createMeetingRequest(request: NewMeetingRequest): Promise<MeetingRequest> {
    const result = await db.insert(meetingRequests).values(request).returning();
    return result[0];
  }

  // Market Intelligence operations
  async getMarketData(filters?: { sector?: string; limit?: number }): Promise<MarketData[]> {
    if (filters?.sector && filters?.limit) {
      return await db.select().from(marketData)
        .where(eq(marketData.sector, filters.sector))
        .orderBy(desc(marketData.lastUpdated))
        .limit(filters.limit);
    } else if (filters?.sector) {
      return await db.select().from(marketData)
        .where(eq(marketData.sector, filters.sector))
        .orderBy(desc(marketData.lastUpdated));
    } else if (filters?.limit) {
      return await db.select().from(marketData)
        .orderBy(desc(marketData.lastUpdated))
        .limit(filters.limit);
    } else {
      return await db.select().from(marketData)
        .orderBy(desc(marketData.lastUpdated));
    }
  }

  async createMarketData(data: NewMarketData): Promise<MarketData> {
    const result = await db.insert(marketData).values(data).returning();
    return result[0];
  }

  async updateMarketData(symbol: string, updates: Partial<NewMarketData>): Promise<MarketData | undefined> {
    const result = await db.update(marketData)
      .set({ ...updates, lastUpdated: new Date() })
      .where(eq(marketData.symbol, symbol))
      .returning();
    return result[0];
  }

  // IPO Calendar operations
  async getIpoCalendar(filters?: { status?: string; limit?: number }): Promise<IpoCalendar[]> {
    if (filters?.status && filters?.limit) {
      return await db.select().from(ipoCalendar)
        .where(eq(ipoCalendar.status, filters.status))
        .orderBy(desc(ipoCalendar.expectedListingDate))
        .limit(filters.limit);
    } else if (filters?.status) {
      return await db.select().from(ipoCalendar)
        .where(eq(ipoCalendar.status, filters.status))
        .orderBy(desc(ipoCalendar.expectedListingDate));
    } else if (filters?.limit) {
      return await db.select().from(ipoCalendar)
        .orderBy(desc(ipoCalendar.expectedListingDate))
        .limit(filters.limit);
    } else {
      return await db.select().from(ipoCalendar)
        .orderBy(desc(ipoCalendar.expectedListingDate));
    }
  }

  async createIpoCalendarEntry(entry: NewIpoCalendar): Promise<IpoCalendar> {
    const result = await db.insert(ipoCalendar).values(entry).returning();
    return result[0];
  }

  async updateIpoCalendarEntry(id: string, updates: Partial<NewIpoCalendar>): Promise<IpoCalendar | undefined> {
    const result = await db.update(ipoCalendar)
      .set(updates)
      .where(eq(ipoCalendar.id, id))
      .returning();
    return result[0];
  }

  // Market Sentiment operations
  async getMarketSentiment(limit?: number): Promise<MarketSentiment[]> {
    if (limit) {
      return await db.select().from(marketSentiment)
        .orderBy(desc(marketSentiment.date))
        .limit(limit);
    } else {
      return await db.select().from(marketSentiment)
        .orderBy(desc(marketSentiment.date));
    }
  }

  async createMarketSentiment(sentiment: NewMarketSentiment): Promise<MarketSentiment> {
    const result = await db.insert(marketSentiment).values(sentiment).returning();
    return result[0];
  }

  async getLatestMarketSentiment(): Promise<MarketSentiment | undefined> {
    const result = await db.select().from(marketSentiment)
      .orderBy(desc(marketSentiment.date))
      .limit(1);
    return result[0];
  }
}

export const storage = new DatabaseStorage();
