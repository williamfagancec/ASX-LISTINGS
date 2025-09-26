# Overview

This is an ASX Gateway Platform that provides a comprehensive ecosystem for companies preparing for IPO and market analytics. The platform consists of three main products:

1. **ASX Gateway** - An IPO preparation ecosystem connecting company leaders with founder networks, expert video content, and accredited advisers
2. **ASX Explorer** - A company discovery and research platform for exploring ASX-listed companies
3. **ASX OneView** - A unified market analytics dashboard providing portfolio management and market insights

The application is built as a full-stack TypeScript project with a React frontend and Express backend, designed to help companies navigate their IPO journey while providing comprehensive market data and analytics.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript and Vite for build tooling
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system following professional business platform aesthetics
- **State Management**: TanStack Query for server state management
- **Component Structure**: Modular component architecture with separate sections for each product (Gateway, Explorer, OneView)

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with centralized route registration
- **Storage Layer**: Abstracted storage interface supporting both in-memory and database implementations
- **Development Tools**: Hot module replacement via Vite integration for development

## Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Management**: Code-first schema definition with Zod validation
- **Migration Strategy**: Drizzle Kit for database migrations and schema synchronization
- **Connection**: Neon serverless PostgreSQL with connection pooling

## Design System
- **Color Palette**: Professional business theme with Deep Navy primary, ASX Blue accents, and supporting colors for different states
- **Typography**: Inter font family for clean, professional appearance
- **Layout System**: Consistent Tailwind spacing units and responsive design patterns
- **Component Standards**: Elevated cards, subtle shadows, and hover states for professional interaction patterns

## Authentication & Security
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Management**: Basic user schema with username/password authentication ready for implementation

## Development Workflow
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Type Safety**: Strict TypeScript configuration with path mapping for clean imports
- **Code Organization**: Monorepo structure with shared types and utilities between client and server

# External Dependencies

## UI Framework
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Pre-built component library built on Radix UI

## Database & ORM
- **Neon Database**: Serverless PostgreSQL database service
- **Drizzle ORM**: Type-safe ORM with excellent TypeScript integration
- **Drizzle Kit**: Migration and schema management tools

## Development Tools
- **Vite**: Fast build tool and development server
- **TanStack Query**: Powerful data synchronization for React applications
- **Replit Integration**: Development environment optimizations and error handling

## Form & Validation
- **React Hook Form**: Performant forms with easy validation
- **Zod**: TypeScript-first schema validation library
- **Hookform/Resolvers**: Integration between React Hook Form and validation libraries

## Utilities
- **date-fns**: Modern JavaScript date utility library
- **clsx & tailwind-merge**: Utility functions for conditional CSS classes
- **class-variance-authority**: Type-safe variant API for component styling