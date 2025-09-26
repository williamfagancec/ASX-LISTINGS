import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertTaskSchema, insertResourceSchema, 
  insertCompanySchema, insertListingStageSchema, insertMeetingRequestSchema,
  updateCompanyTimelineSchema, insertMarketDataSchema, insertIpoCalendarSchema,
  insertMarketSentimentSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.get("/api/users/username/:username", async (req, res) => {
    try {
      const user = await storage.getUserByUsername(req.params.username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const updates = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Task routes
  app.get("/api/tasks", async (req, res) => {
    try {
      const { targetRole, category } = req.query;
      const filters: any = {};
      if (targetRole) filters.targetRole = targetRole as string;
      if (category) filters.category = category as string;
      
      const tasks = await storage.getTasks(filters);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks", details: error instanceof Error ? error.message : String(error) });
    }
  });

  app.get("/api/tasks/:id", async (req, res) => {
    try {
      const task = await storage.getTask(req.params.id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch task" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid task data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create task" });
    }
  });

  app.put("/api/tasks/:id", async (req, res) => {
    try {
      const updates = insertTaskSchema.partial().parse(req.body);
      const task = await storage.updateTask(req.params.id, updates);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid task data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTask(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  });

  // Resource routes
  app.get("/api/resources", async (req, res) => {
    try {
      const { type, category } = req.query;
      const filters: any = {};
      if (type) filters.type = type as string;
      if (category) filters.category = category as string;
      
      const resources = await storage.getResources(filters);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/:id", async (req, res) => {
    try {
      const resource = await storage.getResource(req.params.id);
      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resource" });
    }
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const resourceData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(resourceData);
      res.status(201).json(resource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid resource data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create resource" });
    }
  });

  app.put("/api/resources/:id", async (req, res) => {
    try {
      const updates = insertResourceSchema.partial().parse(req.body);
      const resource = await storage.updateResource(req.params.id, updates);
      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid resource data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update resource" });
    }
  });

  // Company routes
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    try {
      const company = await storage.getCompany(req.params.id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch company" });
    }
  });

  app.post("/api/companies", async (req, res) => {
    try {
      const companyData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(companyData);
      res.status(201).json(company);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid company data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create company" });
    }
  });

  app.put("/api/companies/:id", async (req, res) => {
    try {
      const updates = insertCompanySchema.partial().parse(req.body);
      const company = await storage.updateCompany(req.params.id, updates);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid company data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update company" });
    }
  });

  // Company timeline update endpoint
  app.patch("/api/companies/:id/timeline", async (req, res) => {
    try {
      const timelineData = updateCompanyTimelineSchema.parse(req.body);
      const company = await storage.updateCompany(req.params.id, timelineData);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid timeline data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update company timeline" });
    }
  });

  // User Progress routes
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      // Look up user by username if it's not a UUID
      let userId = req.params.userId;
      if (!userId.includes('-')) { // Assume it's a username if no hyphens (UUID format)
        const user = await storage.getUserByUsername(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        userId = user.id;
      }
      
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user progress" });
    }
  });

  app.post("/api/users/:userId/progress/:taskId", async (req, res) => {
    try {
      // Look up user by username if it's not a UUID
      let userId = req.params.userId;
      if (!userId.includes('-')) { // Assume it's a username if no hyphens (UUID format)
        const user = await storage.getUserByUsername(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        userId = user.id;
      }
      
      const { completed, notes } = req.body;
      const progress = await storage.updateProgress(
        userId, 
        req.params.taskId, 
        completed, 
        notes
      );
      res.json(progress);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  // Listing Stages routes
  app.get("/api/listing-stages", async (req, res) => {
    try {
      const stages = await storage.getListingStages();
      res.json(stages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch listing stages" });
    }
  });

  app.post("/api/listing-stages", async (req, res) => {
    try {
      const stageData = insertListingStageSchema.parse(req.body);
      const stage = await storage.createListingStage(stageData);
      res.status(201).json(stage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid stage data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create listing stage" });
    }
  });

  // Meeting Request routes
  app.get("/api/meeting-requests", async (req, res) => {
    try {
      const { userId } = req.query;
      const meetingRequests = await storage.getMeetingRequests(userId as string);
      res.json(meetingRequests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meeting requests" });
    }
  });

  app.post("/api/meeting-requests", async (req, res) => {
    try {
      // Handle date conversion before Zod validation
      const requestData = { ...req.body };
      if (requestData.preferredDate && typeof requestData.preferredDate === 'string') {
        requestData.preferredDate = new Date(requestData.preferredDate);
      }
      
      const meetingRequestData = insertMeetingRequestSchema.parse(requestData);
      const meetingRequest = await storage.createMeetingRequest(meetingRequestData);
      res.status(201).json(meetingRequest);
    } catch (error) {
      console.error("Error creating meeting request:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid meeting request data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create meeting request" });
    }
  });

  // Market Intelligence routes
  // Market Data routes
  app.get("/api/market-data", async (req, res) => {
    try {
      const { sector, limit } = req.query;
      const filters: any = {};
      if (sector) filters.sector = sector as string;
      if (limit) filters.limit = parseInt(limit as string);
      
      const marketData = await storage.getMarketData(filters);
      res.json(marketData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch market data" });
    }
  });

  app.post("/api/market-data", async (req, res) => {
    try {
      const marketDataInput = insertMarketDataSchema.parse(req.body);
      const marketData = await storage.createMarketData(marketDataInput);
      res.status(201).json(marketData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid market data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create market data" });
    }
  });

  app.put("/api/market-data/:symbol", async (req, res) => {
    try {
      const updates = insertMarketDataSchema.partial().parse(req.body);
      const marketData = await storage.updateMarketData(req.params.symbol, updates);
      if (!marketData) {
        return res.status(404).json({ error: "Market data not found" });
      }
      res.json(marketData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid market data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update market data" });
    }
  });

  // IPO Calendar routes
  app.get("/api/ipo-calendar", async (req, res) => {
    try {
      const { status, limit } = req.query;
      const filters: any = {};
      if (status) filters.status = status as string;
      if (limit) filters.limit = parseInt(limit as string);
      
      const ipoCalendar = await storage.getIpoCalendar(filters);
      res.json(ipoCalendar);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch IPO calendar" });
    }
  });

  app.post("/api/ipo-calendar", async (req, res) => {
    try {
      // Handle date conversion before Zod validation
      const entryData = { ...req.body };
      if (entryData.expectedListingDate && typeof entryData.expectedListingDate === 'string') {
        entryData.expectedListingDate = new Date(entryData.expectedListingDate);
      }
      
      const ipoEntry = insertIpoCalendarSchema.parse(entryData);
      const result = await storage.createIpoCalendarEntry(ipoEntry);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid IPO calendar data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create IPO calendar entry" });
    }
  });

  app.put("/api/ipo-calendar/:id", async (req, res) => {
    try {
      // Handle date conversion before Zod validation
      const updateData = { ...req.body };
      if (updateData.expectedListingDate && typeof updateData.expectedListingDate === 'string') {
        updateData.expectedListingDate = new Date(updateData.expectedListingDate);
      }
      
      const updates = insertIpoCalendarSchema.partial().parse(updateData);
      const result = await storage.updateIpoCalendarEntry(req.params.id, updates);
      if (!result) {
        return res.status(404).json({ error: "IPO calendar entry not found" });
      }
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid IPO calendar data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update IPO calendar entry" });
    }
  });

  // Market Sentiment routes
  app.get("/api/market-sentiment", async (req, res) => {
    try {
      const { limit } = req.query;
      const limitNum = limit ? parseInt(limit as string) : undefined;
      
      const sentiment = await storage.getMarketSentiment(limitNum);
      res.json(sentiment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch market sentiment" });
    }
  });

  app.get("/api/market-sentiment/latest", async (req, res) => {
    try {
      const sentiment = await storage.getLatestMarketSentiment();
      if (!sentiment) {
        return res.status(404).json({ error: "No market sentiment data found" });
      }
      res.json(sentiment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest market sentiment" });
    }
  });

  app.post("/api/market-sentiment", async (req, res) => {
    try {
      const sentimentData = insertMarketSentimentSchema.parse(req.body);
      const result = await storage.createMarketSentiment(sentimentData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid market sentiment data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create market sentiment data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
