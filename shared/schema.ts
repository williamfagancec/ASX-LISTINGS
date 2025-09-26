import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Roles and Management
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  name: text("name"),
  role: text("role").notNull().default("founder"), // founder, company_secretary, lawyer, cfo, board_member, adviser
  company: text("company"),
  position: text("position"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ASX Listing Journey Stages
export const listingStages = pgTable("listing_stages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
  roleSpecific: text("role_specific").array(), // which roles see this stage prominently
});

// Tasks and Requirements for each role
export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // preparation, compliance, legal, financial, governance
  targetRole: text("target_role").notNull(),
  priority: text("priority").notNull().default("medium"), // high, medium, low
  estimatedTime: text("estimated_time"),
  dependencies: text("dependencies").array(),
  resources: jsonb("resources"), // links, documents, contacts
  stageId: varchar("stage_id").references(() => listingStages.id),
});

// Resources and Documentation
export const resources = pgTable("resources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(), // document, template, guide, video, contact
  category: text("category").notNull(),
  targetRoles: text("target_roles").array(),
  url: text("url"),
  content: text("content"),
  tags: text("tags").array(),
  isPublic: boolean("is_public").default(true),
});

// User Progress Tracking
export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  taskId: varchar("task_id").references(() => tasks.id),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  notes: text("notes"),
});

// Company Information
export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  abn: text("abn"),
  industry: text("industry"),
  size: text("size"), // startup, small, medium, large
  listingStage: text("listing_stage").default("exploration"), // exploration, preparation, application, listed
  targetListingDate: timestamp("target_listing_date"),
  keyMetrics: jsonb("key_metrics"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Meeting Request Enums
export const MeetingType = z.enum([
  "ipo-strategy",
  "compliance-review", 
  "financial-planning",
  "market-readiness",
  "general-consultation"
]);

export const MeetingStatus = z.enum([
  "pending",
  "scheduled", 
  "completed",
  "cancelled"
]);

// Listing Stage enum for company timeline updates
export const ListingStageEnum = z.enum([
  "exploration",
  "preparation", 
  "application",
  "listed"
]);

// Meeting Requests
export const meetingRequests = pgTable("meeting_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  meetingType: text("meeting_type").notNull(),
  preferredDate: timestamp("preferred_date").notNull(),
  notes: text("notes"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Market Intelligence Tables
export const marketData = pgTable("market_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  sector: text("sector").notNull(),
  marketCap: text("market_cap"),
  sharePrice: text("share_price"),
  priceChange: text("price_change"),
  priceChangePercent: text("price_change_percent"),
  volume: text("volume"),
  peRatio: text("pe_ratio"),
  dividendYield: text("dividend_yield"),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const ipoCalendar = pgTable("ipo_calendar", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  sector: text("sector").notNull(),
  expectedListingDate: timestamp("expected_listing_date"),
  offerPriceRange: text("offer_price_range"),
  sharesOffered: text("shares_offered"),
  expectedMarketCap: text("expected_market_cap"),
  leadUnderwriter: text("lead_underwriter"),
  status: text("status").default("announced"), // announced, pricing, listed, postponed, withdrawn
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const marketSentiment = pgTable("market_sentiment", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: timestamp("date").defaultNow().notNull(),
  asxIndex: text("asx_index"),
  indexChange: text("index_change"),
  indexChangePercent: text("index_change_percent"),
  tradingVolume: text("trading_volume"),
  advancingStocks: integer("advancing_stocks"),
  decliningStocks: integer("declining_stocks"),
  marketSentimentScore: integer("market_sentiment_score"), // 1-100
  volatilityIndex: text("volatility_index"),
  notes: text("notes"),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
  role: true,
  company: true,
  position: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true });
export const insertResourceSchema = createInsertSchema(resources).omit({ id: true });
export const insertCompanySchema = createInsertSchema(companies).omit({ id: true, createdAt: true });
export const insertListingStageSchema = createInsertSchema(listingStages).omit({ id: true });
export const insertUserProgressSchema = createInsertSchema(userProgress).omit({ id: true });
export const baseMeetingRequestSchema = createInsertSchema(meetingRequests)
  .omit({ id: true, createdAt: true })
  .extend({
    meetingType: MeetingType,
    status: MeetingStatus.optional(),
  });

export const insertMeetingRequestSchema = baseMeetingRequestSchema.refine(
  (data) => data.preferredDate > new Date(),
  {
    path: ['preferredDate'],
    message: 'Preferred date must be in the future'
  }
);

// Market Intelligence Schemas
export const insertMarketDataSchema = createInsertSchema(marketData).omit({ id: true, lastUpdated: true });
export const insertIpoCalendarSchema = createInsertSchema(ipoCalendar).omit({ id: true, createdAt: true });
export const insertMarketSentimentSchema = createInsertSchema(marketSentiment).omit({ id: true, date: true });

// Company timeline update schema
export const updateCompanyTimelineSchema = z.object({
  listingStage: ListingStageEnum.optional(),
  targetListingDate: z.coerce.date().optional(),
}).refine(
  (data) => {
    // If targetListingDate is provided, it must be in the future
    if (data.targetListingDate) {
      return data.targetListingDate > new Date();
    }
    return true;
  },
  {
    path: ['targetListingDate'],
    message: 'Target listing date must be in the future'
  }
).refine(
  (data) => Object.keys(data).length > 0 && (data.listingStage !== undefined || data.targetListingDate !== undefined),
  {
    message: 'At least one field (listing stage or target date) must be provided'
  }
);

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Task = typeof tasks.$inferSelect;
export type NewTask = z.infer<typeof insertTaskSchema>;
export type Resource = typeof resources.$inferSelect;
export type NewResource = z.infer<typeof insertResourceSchema>;
export type Company = typeof companies.$inferSelect;
export type NewCompany = z.infer<typeof insertCompanySchema>;
export type ListingStage = typeof listingStages.$inferSelect;
export type NewListingStage = z.infer<typeof insertListingStageSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = z.infer<typeof insertUserProgressSchema>;
export type MeetingRequest = typeof meetingRequests.$inferSelect;
export type NewMeetingRequest = z.infer<typeof insertMeetingRequestSchema>;
export type MeetingTypeEnum = z.infer<typeof MeetingType>;
export type MeetingStatusEnum = z.infer<typeof MeetingStatus>;
export type CompanyListingStage = z.infer<typeof ListingStageEnum>;
export type UpdateCompanyTimeline = z.infer<typeof updateCompanyTimelineSchema>;

// Market Intelligence Types
export type MarketData = typeof marketData.$inferSelect;
export type NewMarketData = z.infer<typeof insertMarketDataSchema>;
export type IpoCalendar = typeof ipoCalendar.$inferSelect;
export type NewIpoCalendar = z.infer<typeof insertIpoCalendarSchema>;
export type MarketSentiment = typeof marketSentiment.$inferSelect;
export type NewMarketSentiment = z.infer<typeof insertMarketSentimentSchema>;

// Role definitions
export const ROLES = {
  founder: 'Founder/CEO',
  company_secretary: 'Company Secretary', 
  lawyer: 'Lawyer',
  cfo: 'CFO',
  board_member: 'Board Member',
  adviser: 'Adviser'
} as const;

export type Role = keyof typeof ROLES;
