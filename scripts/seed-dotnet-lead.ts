/**
 * Seed script for the ".NET Lead" category and its questions.
 *
 * Usage:
 *   npx tsx scripts/seed-dotnet-lead.ts
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set
 *     in the environment (or in a .env.local file loaded beforehand).
 *
 * The script is idempotent: it checks whether the ".NET Lead" category already
 * exists before inserting, and only inserts questions that do not already exist.
 */

import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Supabase client
// ---------------------------------------------------------------------------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

const CATEGORY_NAME = ".NET Lead";

const questions: { questionText: string; correctAnswer: string }[] = [
  {
    questionText: "Explain the difference between .NET Framework, .NET Core, and .NET 5+.",
    correctAnswer:
      ".NET Framework is the original Windows-only framework. .NET Core is the cross-platform, open-source rewrite. .NET 5+ unifies both into a single cross-platform framework, succeeding .NET Core.",
  },
  {
    questionText: "What is the SOLID principle of Single Responsibility and how do you apply it in C#?",
    correctAnswer:
      "Single Responsibility Principle states a class should have only one reason to change. In C#, this means each class should encapsulate a single concern, e.g., separating data access, business logic, and presentation into distinct classes.",
  },
  {
    questionText: "Explain the Open/Closed Principle with a .NET example.",
    correctAnswer:
      "The Open/Closed Principle states that classes should be open for extension but closed for modification. In .NET, this is achieved through interfaces, abstract classes, and polymorphism — e.g., adding new payment providers by implementing an IPaymentProcessor interface without modifying existing code.",
  },
  {
    questionText: "What is the Liskov Substitution Principle?",
    correctAnswer:
      "Liskov Substitution Principle states that derived classes must be substitutable for their base classes without altering the correctness of the program. Violating LSP typically means the inheritance hierarchy is poorly designed.",
  },
  {
    questionText: "Explain the Interface Segregation Principle.",
    correctAnswer:
      "Interface Segregation Principle states that clients should not be forced to depend on interfaces they do not use. Instead of one large interface, create smaller, focused interfaces so implementing classes only need the methods relevant to them.",
  },
  {
    questionText: "What is the Dependency Inversion Principle and how does .NET support it?",
    correctAnswer:
      "Dependency Inversion Principle states that high-level modules should not depend on low-level modules; both should depend on abstractions. .NET supports this through its built-in dependency injection container in Microsoft.Extensions.DependencyInjection.",
  },
  {
    questionText: "How does dependency injection work in ASP.NET Core?",
    correctAnswer:
      "ASP.NET Core has a built-in IoC container. Services are registered in Program.cs (or Startup.cs) with lifetimes (Transient, Scoped, Singleton) and are injected via constructor injection into controllers, services, and middleware.",
  },
  {
    questionText: "What are the differences between Transient, Scoped, and Singleton service lifetimes?",
    correctAnswer:
      "Transient creates a new instance every time it is requested. Scoped creates one instance per HTTP request/scope. Singleton creates a single instance for the entire application lifetime.",
  },
  {
    questionText: "Explain the middleware pipeline in ASP.NET Core.",
    correctAnswer:
      "The middleware pipeline is a series of components that handle HTTP requests and responses. Each middleware can process the request, pass it to the next middleware, and optionally process the response. Order of registration matters.",
  },
  {
    questionText: "What is the difference between async/await and Task.Run in C#?",
    correctAnswer:
      "async/await is used for I/O-bound asynchronous operations without blocking threads. Task.Run offloads CPU-bound work to a thread pool thread. Using Task.Run for I/O-bound work wastes thread pool resources.",
  },
  {
    questionText: "How do you design a CI/CD pipeline for a .NET application?",
    correctAnswer:
      "A typical .NET CI/CD pipeline includes: source control trigger, NuGet restore, build, run unit tests, run integration tests, static code analysis, publish artifacts, deploy to staging, run smoke tests, and promote to production with rollback capability.",
  },
  {
    questionText: "What is the difference between Continuous Integration, Continuous Delivery, and Continuous Deployment?",
    correctAnswer:
      "CI automatically builds and tests code on every commit. Continuous Delivery ensures code is always in a deployable state with manual release approval. Continuous Deployment automatically deploys every change that passes the pipeline to production.",
  },
  {
    questionText: "How would you implement blue-green deployments for a .NET application?",
    correctAnswer:
      "Blue-green deployment maintains two identical production environments. The new version is deployed to the inactive environment (green), tested, then traffic is switched from the active (blue) to green. If issues arise, traffic is switched back instantly.",
  },
  {
    questionText: "What are GitHub Actions and how would you use them for .NET CI/CD?",
    correctAnswer:
      "GitHub Actions is a CI/CD platform integrated into GitHub. For .NET, you create YAML workflows that trigger on push/PR, use dotnet CLI actions to restore, build, test, and deploy. You can use matrix builds for multiple .NET versions and OS targets.",
  },
  {
    questionText: "Explain the Repository pattern and its benefits.",
    correctAnswer:
      "The Repository pattern abstracts data access logic behind an interface, decoupling business logic from data storage implementation. Benefits include testability (easy to mock), separation of concerns, and ability to swap data sources without changing business logic.",
  },
  {
    questionText: "What is CQRS and when would you use it?",
    correctAnswer:
      "CQRS (Command Query Responsibility Segregation) separates read and write operations into different models. Use it when read and write workloads have different scaling needs, or when the domain is complex enough to benefit from separate read/write optimizations.",
  },
  {
    questionText: "What is Event Sourcing and how does it relate to CQRS?",
    correctAnswer:
      "Event Sourcing stores all state changes as a sequence of events rather than current state. It pairs well with CQRS because events can be projected into optimized read models. It provides a complete audit trail and enables temporal queries.",
  },
  {
    questionText: "How do you handle database migrations in a .NET CI/CD pipeline?",
    correctAnswer:
      "Use Entity Framework Core migrations or a tool like DbUp/FluentMigrator. Migrations should be version-controlled, idempotent, and run as part of the deployment pipeline before the application starts. Always support rollback migrations.",
  },
  {
    questionText: "What is the Strangler Fig pattern and when would you apply it?",
    correctAnswer:
      "The Strangler Fig pattern incrementally replaces a legacy system by routing specific functionality to new services while the old system continues to handle the rest. Apply it when rewriting a monolith to microservices to reduce risk.",
  },
  {
    questionText: "Explain the difference between vertical and horizontal scaling in the context of .NET services.",
    correctAnswer:
      "Vertical scaling adds more resources (CPU/RAM) to a single server. Horizontal scaling adds more instances behind a load balancer. .NET services should be stateless for horizontal scaling, using distributed caching and external session stores.",
  },
  {
    questionText: "How do you implement health checks in ASP.NET Core?",
    correctAnswer:
      "ASP.NET Core provides a health checks middleware via AddHealthChecks() and MapHealthChecks(). You can add checks for database connectivity, external services, and custom logic. These endpoints are used by load balancers and orchestrators for service health monitoring.",
  },
  {
    questionText: "What is the difference between IHost, IHostBuilder, and WebApplication in .NET 6+?",
    correctAnswer:
      "IHostBuilder configures the host with services and configuration. IHost is the running host. WebApplication (introduced in .NET 6) is a simplified API that combines IHostBuilder and IApplicationBuilder into a minimal hosting model with less boilerplate.",
  },
  {
    questionText: "How would you implement distributed caching in a .NET application?",
    correctAnswer:
      "Use IDistributedCache with providers like Redis (AddStackExchangeRedisCache) or SQL Server. Configure cache expiration policies, handle cache invalidation strategies, and ensure serialization is efficient. Consider cache-aside, write-through, or write-behind patterns.",
  },
  {
    questionText: "Explain the Circuit Breaker pattern and how to implement it in .NET.",
    correctAnswer:
      "The Circuit Breaker pattern prevents cascading failures by stopping calls to a failing service after a threshold. In .NET, use Polly library to configure circuit breaker policies with failure thresholds, break durations, and half-open states for recovery testing.",
  },
  {
    questionText: "What are the key considerations when designing a microservices architecture in .NET?",
    correctAnswer:
      "Key considerations include: service boundaries (bounded contexts), inter-service communication (sync vs async), data ownership per service, distributed transactions (Saga pattern), service discovery, centralized logging/tracing, API gateway, resilience patterns, and deployment independence.",
  },
  {
    questionText: "How do you implement structured logging in .NET applications?",
    correctAnswer:
      "Use Serilog or the built-in ILogger with structured logging. Log properties as named values rather than interpolated strings. Configure sinks for different outputs (console, file, Elasticsearch). Use correlation IDs for distributed tracing across services.",
  },
  {
    questionText: "What is the difference between gRPC and REST and when would you choose each in .NET?",
    correctAnswer:
      "REST uses HTTP/JSON, is human-readable, and widely supported. gRPC uses HTTP/2 with Protocol Buffers for binary serialization, offering better performance and streaming. Choose gRPC for internal service-to-service communication and REST for public-facing APIs.",
  },
  {
    questionText: "How do you manage configuration and secrets in a .NET production environment?",
    correctAnswer:
      "Use the Options pattern with IOptions<T>. Store secrets in Azure Key Vault, AWS Secrets Manager, or HashiCorp Vault — never in code or appsettings.json. Use environment-specific configuration files and environment variables. Enable secret rotation.",
  },
  {
    questionText: "Explain the Saga pattern for distributed transactions.",
    correctAnswer:
      "The Saga pattern manages distributed transactions across microservices as a sequence of local transactions. Each step has a compensating action for rollback. It can be orchestrated (central coordinator) or choreographed (event-driven). It ensures eventual consistency.",
  },
  {
    questionText: "What are the best practices for exception handling in a large .NET codebase?",
    correctAnswer:
      "Use specific exception types, implement global exception middleware, never swallow exceptions silently, use Result/Either patterns for expected failures, log exceptions with context, throw early and catch late, and create custom exception types for domain-specific errors.",
  },
  {
    questionText: "How would you implement API versioning in ASP.NET Core?",
    correctAnswer:
      "Use the Asp.Versioning.Http package. Support versioning via URL path (/api/v1/), query string (?api-version=1.0), or HTTP headers. Configure default versions, deprecation policies, and version-specific controllers or minimal API endpoints.",
  },
  {
    questionText: "What is the difference between unit tests, integration tests, and end-to-end tests in .NET?",
    correctAnswer:
      "Unit tests test individual components in isolation using mocks. Integration tests verify interactions between components (e.g., with a real database using WebApplicationFactory). End-to-end tests validate the entire system from the user's perspective (e.g., using Playwright or Selenium).",
  },
  {
    questionText: "How do you set up automated testing in a CI/CD pipeline for .NET?",
    correctAnswer:
      "Configure the pipeline to run 'dotnet test' with code coverage collection. Separate fast unit tests (run on every commit) from slower integration/E2E tests (run on PR merge). Set coverage thresholds, publish test results, and fail the build on test failures.",
  },
  {
    questionText: "What is Entity Framework Core and how does it differ from Dapper?",
    correctAnswer:
      "EF Core is a full-featured ORM with change tracking, migrations, LINQ queries, and lazy loading. Dapper is a micro-ORM that maps SQL results to objects with minimal overhead. Use EF Core for complex domains with rich models; use Dapper for performance-critical, read-heavy scenarios.",
  },
  {
    questionText: "How do you handle concurrency conflicts in Entity Framework Core?",
    correctAnswer:
      "Use optimistic concurrency with a concurrency token (RowVersion/Timestamp column). EF Core includes the token in UPDATE WHERE clauses. Handle DbUpdateConcurrencyException by reloading the entity and applying merge strategies or notifying the user.",
  },
  {
    questionText: "What is the Mediator pattern and how is MediatR used in .NET?",
    correctAnswer:
      "The Mediator pattern decouples request senders from handlers. MediatR implements this in .NET, enabling CQRS by routing IRequest commands/queries to their handlers. It supports pipeline behaviors for cross-cutting concerns like validation and logging.",
  },
  {
    questionText: "Explain the concept of Domain-Driven Design (DDD) and its key building blocks.",
    correctAnswer:
      "DDD focuses on modeling software around the business domain. Key building blocks include Entities (identity-based), Value Objects (equality by value), Aggregates (consistency boundaries), Repositories (data access), Domain Events, and Bounded Contexts (logical boundaries).",
  },
  {
    questionText: "How do you secure an ASP.NET Core API with JWT authentication?",
    correctAnswer:
      "Configure AddAuthentication with JwtBearer scheme. Validate issuer, audience, signing key, and token lifetime. Use [Authorize] attributes on controllers/endpoints. Implement refresh tokens for long-lived sessions. Store tokens securely on the client side.",
  },
  {
    questionText: "What are the OWASP Top 10 vulnerabilities and how does .NET mitigate them?",
    correctAnswer:
      "OWASP Top 10 includes injection, broken authentication, XSS, CSRF, etc. .NET mitigates these through parameterized queries, built-in Identity framework, Razor auto-encoding, anti-forgery tokens, HTTPS enforcement, CORS policies, and data protection APIs.",
  },
  {
    questionText: "How would you implement rate limiting in ASP.NET Core?",
    correctAnswer:
      "Use the built-in rate limiting middleware (AddRateLimiter) in .NET 7+. Configure policies like fixed window, sliding window, token bucket, or concurrency limiter. Apply policies globally or per-endpoint. Return 429 Too Many Requests with Retry-After headers.",
  },
  {
    questionText: "What is the difference between IEnumerable, IQueryable, and ICollection in C#?",
    correctAnswer:
      "IEnumerable supports in-memory forward-only iteration. IQueryable extends IEnumerable with expression tree support for remote query translation (e.g., LINQ to SQL). ICollection adds count, add, remove, and contains operations on top of IEnumerable.",
  },
  {
    questionText: "Explain the concept of middleware in a CI/CD pipeline and how artifacts flow through stages.",
    correctAnswer:
      "CI/CD pipelines consist of stages (build, test, deploy) connected by artifacts. Build stage produces deployable artifacts. These flow to test stages for validation, then to deployment stages. Each stage can gate promotion based on quality checks, approvals, or automated tests.",
  },
  {
    questionText: "How do you implement feature flags in a .NET application?",
    correctAnswer:
      "Use Microsoft.FeatureManagement library. Define features in configuration, use IFeatureManager to check flags in code, and apply [FeatureGate] attributes on controllers. Integrate with Azure App Configuration or LaunchDarkly for dynamic flag management without redeployment.",
  },
  {
    questionText: "What is the role of an API Gateway in a microservices architecture?",
    correctAnswer:
      "An API Gateway acts as a single entry point for clients, routing requests to appropriate microservices. It handles cross-cutting concerns like authentication, rate limiting, SSL termination, request aggregation, and load balancing. YARP or Ocelot are .NET options.",
  },
  {
    questionText: "How do you monitor and observe a .NET application in production?",
    correctAnswer:
      "Implement the three pillars of observability: metrics (Prometheus/Grafana), logs (structured logging with Serilog to centralized systems), and traces (OpenTelemetry for distributed tracing). Use health check endpoints, dashboards, and alerting for proactive monitoring.",
  },
  {
    questionText: "What is the difference between containers and virtual machines, and how does Docker work with .NET?",
    correctAnswer:
      "VMs virtualize hardware with full OS; containers share the host OS kernel and are lightweight. .NET provides official Docker images (sdk and runtime). Multi-stage Dockerfiles use the SDK image to build and the runtime image for the final container, minimizing size.",
  },
  {
    questionText: "How would you implement a message queue-based architecture with .NET?",
    correctAnswer:
      "Use message brokers like RabbitMQ (with MassTransit), Azure Service Bus, or Kafka. Implement publisher/subscriber patterns for async communication between services. Handle message idempotency, dead-letter queues, retry policies, and message ordering guarantees.",
  },
  {
    questionText: "Explain the concept of Technical Debt and how you manage it as a lead.",
    correctAnswer:
      "Technical debt is the implied cost of future rework caused by choosing expedient solutions. As a lead, manage it by: tracking it visibly (backlog items), allocating regular time for reduction, making informed trade-offs, establishing code quality standards, and using automated tooling to prevent accumulation.",
  },
  {
    questionText: "How do you conduct effective code reviews as a senior engineering lead?",
    correctAnswer:
      "Focus on architecture, correctness, and maintainability rather than style (automate that). Provide constructive feedback with explanations, suggest alternatives, ensure tests are included, check for security issues, and use reviews as mentoring opportunities. Keep reviews timely and reasonably sized.",
  },
  {
    questionText: "What is Infrastructure as Code (IaC) and how does it relate to CI/CD?",
    correctAnswer:
      "IaC manages infrastructure through version-controlled code/configuration files (Terraform, Pulumi, Bicep). It integrates with CI/CD pipelines to automatically provision and configure infrastructure alongside application deployments, ensuring consistency and reproducibility across environments.",
  },
  {
    questionText: "How do you handle backward compatibility when evolving APIs?",
    correctAnswer:
      "Use API versioning, maintain old versions during deprecation periods, use additive-only changes (new fields are optional), implement content negotiation, provide migration guides, monitor old version usage, and communicate deprecation timelines clearly to consumers.",
  },
  {
    questionText: "What is the Actor model and how does it apply to .NET with frameworks like Akka.NET or Orleans?",
    correctAnswer:
      "The Actor model treats 'actors' as the fundamental unit of computation. Each actor has state, receives messages, and processes them sequentially. Akka.NET and Microsoft Orleans implement this for building distributed, concurrent systems with fault tolerance and location transparency.",
  },
  {
    questionText: "Explain the concept of Eventual Consistency and how you handle it in distributed systems.",
    correctAnswer:
      "Eventual consistency means that given enough time without new updates, all replicas will converge to the same state. Handle it by designing UIs for optimistic updates, using idempotent operations, implementing conflict resolution strategies, and communicating data freshness to users.",
  },
  {
    questionText: "How do you approach performance profiling and optimization in a .NET application?",
    correctAnswer:
      "Measure first using BenchmarkDotNet, dotnet-trace, dotnet-counters, and Application Insights. Identify bottlenecks (CPU, memory, I/O). Optimize hot paths, reduce allocations, use caching strategically, optimize database queries, and implement async I/O. Always profile before and after changes.",
  },
  {
    questionText: "What is the role of SonarQube or similar tools in a CI/CD pipeline?",
    correctAnswer:
      "SonarQube performs static code analysis to detect bugs, vulnerabilities, code smells, and technical debt. In CI/CD, it runs as a quality gate — failing the build if code doesn't meet defined thresholds for coverage, duplication, or security issues.",
  },
  {
    questionText: "How do you design a multi-tenant SaaS application in .NET?",
    correctAnswer:
      "Choose a tenancy model: separate databases per tenant (strongest isolation), shared database with tenant ID column (most efficient), or schema-per-tenant. Implement tenant resolution middleware, data isolation at the query level, tenant-specific configuration, and per-tenant resource limits.",
  },
  {
    questionText: "What is the purpose of containerized CI/CD runners and how do they improve pipeline reliability?",
    correctAnswer:
      "Containerized runners ensure consistent build environments by packaging all dependencies in Docker images. This eliminates 'works on my machine' issues, enables parallel execution, provides isolation between jobs, and allows easy scaling of CI/CD infrastructure.",
  },
];

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function seed() {
  console.log("🌱 Seeding .NET Lead category and questions...\n");

  // 1. Upsert category
  let categoryId: string;

  const { data: existing } = await supabase
    .from("categories")
    .select("id")
    .eq("name", CATEGORY_NAME)
    .single();

  if (existing) {
    categoryId = existing.id;
    console.log(`✅ Category "${CATEGORY_NAME}" already exists (${categoryId})`);
  } else {
    const { data: inserted, error } = await supabase
      .from("categories")
      .insert({ name: CATEGORY_NAME })
      .select("id")
      .single();

    if (error) {
      console.error("❌ Failed to insert category:", error.message);
      process.exit(1);
    }
    categoryId = inserted!.id;
    console.log(`✅ Created category "${CATEGORY_NAME}" (${categoryId})`);
  }

  // 2. Fetch existing questions for this category to avoid duplicates
  const { data: existingQuestions } = await supabase
    .from("questions")
    .select("question_text")
    .eq("category_id", categoryId);

  const existingTexts = new Set(
    (existingQuestions ?? []).map((q: { question_text: string }) => q.question_text)
  );

  const newQuestions = questions.filter((q) => !existingTexts.has(q.questionText));

  if (newQuestions.length === 0) {
    console.log("✅ All questions already exist — nothing to insert.");
    return;
  }

  // 3. Insert new questions
  const rows = newQuestions.map((q) => ({
    category_id: categoryId,
    question_text: q.questionText,
    correct_answer: q.correctAnswer,
  }));

  const { error: insertError } = await supabase.from("questions").insert(rows);

  if (insertError) {
    console.error("❌ Failed to insert questions:", insertError.message);
    process.exit(1);
  }

  console.log(`✅ Inserted ${newQuestions.length} new questions for "${CATEGORY_NAME}".`);
  console.log(`   Total questions for category: ${existingTexts.size + newQuestions.length}`);
}

seed()
  .then(() => {
    console.log("\n🎉 Seed complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
