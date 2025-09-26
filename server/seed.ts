import { db } from "./db";
import { 
  users, tasks, resources, companies, listingStages, userProgress,
  type InsertUser, type NewTask, type NewResource, type NewCompany, 
  type NewListingStage
} from "@shared/schema";

export async function seedDatabase() {
  console.log("🌱 Seeding database...");
  
  try {
    // Clear existing data
    await db.delete(userProgress);
    await db.delete(users);
    await db.delete(tasks);
    await db.delete(resources);
    await db.delete(companies);
    await db.delete(listingStages);
    
    // Seed Users - one for each role
    const seedUsers: InsertUser[] = [
      {
        username: "founder_demo",
        password: "demo123",
        name: "Sarah Chen",
        email: "sarah.chen@techstartup.com",
        role: "Founder/CEO",
        company: "TechStartup Pty Ltd",
        position: "Chief Executive Officer"
      },
      {
        username: "secretary_demo", 
        password: "demo123",
        name: "Michael O'Brien",
        email: "mobrien@corporatelaw.com.au",
        role: "Company Secretary",
        company: "Corporate Law Associates", 
        position: "Senior Company Secretary"
      },
      {
        username: "lawyer_demo",
        password: "demo123", 
        name: "Rebecca Williams",
        email: "rwilliams@asxlaw.com.au",
        role: "Lawyer",
        company: "ASX Legal Partners",
        position: "Senior Partner - Capital Markets"
      },
      {
        username: "cfo_demo",
        password: "demo123",
        name: "David Kim", 
        email: "dkim@financecorp.com.au",
        role: "CFO",
        company: "FinanceCorp Australia",
        position: "Chief Financial Officer"
      },
      {
        username: "board_demo",
        password: "demo123",
        name: "Jennifer Thompson",
        email: "jthompson@boardadvisors.com.au", 
        role: "Board Member",
        company: "Board Advisory Services",
        position: "Independent Non-Executive Director"
      },
      {
        username: "adviser_demo",
        password: "demo123",
        name: "Robert Singh",
        email: "rsingh@investmentbank.com.au",
        role: "Adviser", 
        company: "Investment Bank Australia",
        position: "Managing Director - ECM"
      }
    ];
    
    const createdUsers = await db.insert(users).values(seedUsers).returning();
    console.log(`✅ Created ${createdUsers.length} users`);
    
    // Seed Listing Stages
    const seedStages: NewListingStage[] = [
      {
        name: "Initial Planning",
        description: "Early stage planning and feasibility assessment",
        order: 1
      },
      {
        name: "Due Diligence Preparation", 
        description: "Comprehensive preparation of all due diligence materials",
        order: 2
      },
      {
        name: "Documentation Drafting",
        description: "Drafting of prospectus and key listing documents", 
        order: 3
      },
      {
        name: "Regulatory Review",
        description: "ASIC and ASX review process and approvals",
        order: 4
      },
      {
        name: "Marketing & Roadshow",
        description: "Investor marketing and roadshow activities",
        order: 5
      },
      {
        name: "Completion",
        description: "Final steps to complete the listing",
        order: 6
      }
    ];
    
    const createdStages = await db.insert(listingStages).values(seedStages).returning();
    console.log(`✅ Created ${createdStages.length} listing stages`);
    
    // Seed Companies
    const seedCompanies: NewCompany[] = [
      {
        name: "GreenTech Innovations Pty Ltd",
        industry: "Clean Technology",
        listingStage: "preparation",
        size: "medium"
      },
      {
        name: "HealthSoft Solutions Pty Ltd", 
        industry: "Health Technology",
        listingStage: "preparation",
        size: "small"
      },
      {
        name: "Mining Resources Australia Pty Ltd",
        industry: "Mining & Resources", 
        listingStage: "preparation",
        size: "large"
      }
    ];
    
    const createdCompanies = await db.insert(companies).values(seedCompanies).returning();
    console.log(`✅ Created ${createdCompanies.length} companies`);
    
    // Seed Tasks by Role
    const seedTasks: NewTask[] = [
      // Founder/CEO Tasks
      {
        title: "Prepare Executive Summary",
        description: "Draft comprehensive executive summary highlighting company vision and growth strategy",
        category: "Documentation", 
        priority: "high",
        targetRole: "Founder/CEO",
        estimatedTime: "8 hours",
        stageId: createdStages[0].id
      },
      {
        title: "Management Team Biographies",
        description: "Compile detailed biographies of key management team members",
        category: "Documentation",
        priority: "medium", 
        targetRole: "Founder/CEO",
        estimatedTime: "4 hours",
        stageId: createdStages[0].id
      },
      
      // Company Secretary Tasks
      {
        title: "Corporate Structure Review",
        description: "Review and optimize corporate structure for listing requirements",
        category: "Legal",
        priority: "high",
        targetRole: "Company Secretary",
        estimatedTime: "12 hours",
        stageId: createdStages[1].id
      },
      {
        title: "Share Register Audit",
        description: "Conduct comprehensive audit of share register for accuracy",
        category: "Compliance",
        priority: "high", 
        targetRole: "Company Secretary",
        estimatedTime: "6 hours",
        stageId: createdStages[1].id
      },
      
      // Lawyer Tasks
      {
        title: "Draft Constitution Updates",
        description: "Update company constitution to comply with ASX listing rules",
        category: "Legal",
        priority: "high",
        targetRole: "Lawyer",
        estimatedTime: "16 hours",
        stageId: createdStages[2].id
      },
      {
        title: "Material Contracts Review",
        description: "Review all material contracts for disclosure requirements",
        category: "Legal", 
        priority: "high",
        targetRole: "Lawyer",
        estimatedTime: "20 hours",
        stageId: createdStages[1].id
      },
      
      // CFO Tasks
      {
        title: "Financial Model Validation",
        description: "Validate financial projections and ensure models are defensible",
        category: "Financial",
        priority: "high",
        targetRole: "CFO",
        estimatedTime: "24 hours",
        stageId: createdStages[1].id
      },
      {
        title: "Audit Coordination",
        description: "Coordinate with auditors for completion of financial statement audit",
        category: "Financial",
        priority: "high", 
        targetRole: "CFO",
        estimatedTime: "16 hours",
        stageId: createdStages[1].id
      },
      
      // Board Member Tasks  
      {
        title: "Board Charter Development",
        description: "Develop comprehensive board charter outlining governance procedures",
        category: "Governance",
        priority: "high",
        targetRole: "Board Member",
        estimatedTime: "6 hours",
        stageId: createdStages[2].id
      },
      {
        title: "Risk Management Framework",
        description: "Establish risk management framework for listed entity requirements",
        category: "Risk",
        priority: "high",
        targetRole: "Board Member", 
        estimatedTime: "12 hours",
        stageId: createdStages[2].id
      },
      
      // Adviser Tasks
      {
        title: "Market Positioning Strategy",
        description: "Develop market positioning strategy including peer comparison",
        category: "Strategy",
        priority: "high", 
        targetRole: "Adviser",
        estimatedTime: "16 hours",
        stageId: createdStages[0].id
      },
      {
        title: "Valuation Analysis",
        description: "Prepare detailed valuation analysis using multiple methodologies",
        category: "Valuation",
        priority: "high",
        targetRole: "Adviser",
        estimatedTime: "20 hours",
        stageId: createdStages[4].id
      }
    ];
    
    const createdTasks = await db.insert(tasks).values(seedTasks).returning();
    console.log(`✅ Created ${createdTasks.length} tasks`);
    
    // Seed Resources
    const seedResources: NewResource[] = [
      {
        title: "ASX Listing Rules Guide",
        content: "Comprehensive guide to ASX listing rules and requirements",
        type: "Guide",
        category: "Regulatory",
        url: "https://asx.com.au/listing-rules",
        targetRoles: ["Founder/CEO", "Company Secretary", "Lawyer"],
        isPublic: true,
        tags: ["ASX", "listing rules", "compliance"]
      },
      {
        title: "ASIC Regulatory Guide 228",
        content: "ASIC guidance on prospectus disclosure requirements",
        type: "Regulatory Document", 
        category: "Compliance",
        url: "https://asic.gov.au/rg228",
        targetRoles: ["Lawyer", "Company Secretary"],
        isPublic: true,
        tags: ["ASIC", "prospectus", "disclosure"]
      },
      {
        title: "IPO Financial Modeling Template",
        content: "Excel template for building comprehensive financial models",
        type: "Template",
        category: "Financial",
        url: "/resources/ipo-financial-model.xlsx", 
        targetRoles: ["CFO", "Adviser"],
        isPublic: false,
        tags: ["financial modeling", "Excel", "projections"]
      },
      {
        title: "Due Diligence Checklist", 
        content: "Comprehensive checklist covering all aspects of due diligence",
        type: "Checklist",
        category: "Legal",
        url: "/resources/dd-checklist.pdf",
        targetRoles: ["Company Secretary", "Lawyer"],
        isPublic: false,
        tags: ["due diligence", "checklist", "preparation"]
      },
      {
        title: "Board Governance Handbook",
        content: "Best practice guide for board governance in listed companies",
        type: "Handbook", 
        category: "Governance",
        url: "/resources/board-governance.pdf",
        targetRoles: ["Board Member"],
        isPublic: false,
        tags: ["governance", "board", "best practice"]
      }
    ];
    
    const createdResources = await db.insert(resources).values(seedResources).returning();
    console.log(`✅ Created ${createdResources.length} resources`);
    
    console.log("🎉 Database seeding completed successfully!");
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => {
    console.log("Seeding complete, exiting...");
    process.exit(0);
  }).catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
}