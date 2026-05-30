/**
 * Seed script for the "Sql" category and its questions.
 *
 * Usage:
 *   npx tsx scripts/seed-sql.ts
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set
 *     in the environment (or in a .env.local file loaded beforehand).
 *
 * The script is idempotent: it checks whether the "Sql" category already
 * exists before inserting, and only inserts questions that do not already exist.
 */

import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Supabase client
// ---------------------------------------------------------------------------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.log(
    "⏭️  Skipping seed: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set."
  );
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

const CATEGORY_NAME = "Sql";

const questions: { questionText: string; correctAnswer: string }[] = [
  // ── SQL Server questions ──────────────────────────────────────────────
  {
    questionText: "What are the differences between clustered and non-clustered indexes in SQL Server?",
    correctAnswer:
      "A clustered index determines the physical order of data in a table — there can only be one per table. A non-clustered index is a separate structure with pointers back to the data rows; a table can have multiple non-clustered indexes. Clustered indexes are faster for range queries, while non-clustered indexes are better for selective lookups.",
  },
  {
    questionText: "Explain the different transaction isolation levels in SQL Server.",
    correctAnswer:
      "SQL Server supports Read Uncommitted (allows dirty reads), Read Committed (default — prevents dirty reads), Repeatable Read (prevents non-repeatable reads), Serializable (full isolation — prevents phantom reads), and Snapshot (uses row versioning for optimistic concurrency). Each level trades off between data consistency and concurrency/performance.",
  },
  {
    questionText: "What is the difference between a stored procedure and a function in SQL Server?",
    correctAnswer:
      "Stored procedures can perform DML operations, return multiple result sets, use output parameters, and cannot be used in SELECT statements. Functions must return a value (scalar or table), can be used in SELECT/WHERE clauses, cannot modify database state (no INSERT/UPDATE/DELETE on permanent tables), and support inline usage in queries.",
  },
  {
    questionText: "How does SQL Server handle deadlocks and how can you prevent them?",
    correctAnswer:
      "SQL Server automatically detects deadlocks using a background thread and terminates the least costly transaction as the deadlock victim. Prevention strategies include: consistent lock ordering, keeping transactions short, using appropriate isolation levels (Snapshot), using NOLOCK hints where safe, and indexing to reduce lock contention.",
  },
  {
    questionText: "Explain execution plans in SQL Server and how you use them for query optimization.",
    correctAnswer:
      "Execution plans show how SQL Server processes a query: which indexes are used, join types (nested loop, hash, merge), sort operations, and estimated vs actual row counts. Use SET SHOWPLAN_XML, the graphical plan in SSMS, or Query Store. Look for table scans, key lookups, implicit conversions, and high-cost operators to optimize queries.",
  },
  {
    questionText: "What are Common Table Expressions (CTEs) and when would you use them in SQL Server?",
    correctAnswer:
      "CTEs are temporary named result sets defined with the WITH keyword that exist for the scope of a single statement. Use them for recursive queries (hierarchical data), simplifying complex joins, improving readability, and referencing the same subquery multiple times. Unlike temp tables, CTEs are not materialized and are re-evaluated each time they are referenced.",
  },
  {
    questionText: "How do you configure and use SQL Server Always On Availability Groups?",
    correctAnswer:
      "Always On Availability Groups provide high availability and disaster recovery by replicating databases across multiple SQL Server instances (replicas). Configure a primary replica for read-write and one or more secondary replicas for failover and optionally read-only workloads. Data is synchronized via log shipping. .NET connection strings use the Listener DNS name for automatic failover.",
  },
  {
    questionText: "What is TempDB in SQL Server and what are best practices for managing it?",
    correctAnswer:
      "TempDB is a system database used for temporary tables, table variables, cursors, sort operations, and row versioning. Best practices: create multiple data files equal to the number of CPU cores (up to 8), pre-size files to avoid auto-growth, place on fast SSD storage, enable trace flag 1118 (uniform extents) on older versions, and monitor for contention on PFS/GAM pages.",
  },
  {
    questionText: "Explain window functions in SQL Server with examples.",
    correctAnswer:
      "Window functions perform calculations across a set of rows related to the current row without collapsing them. ROW_NUMBER() assigns sequential numbers, RANK()/DENSE_RANK() handle ties, LAG()/LEAD() access previous/next rows, SUM()/AVG() OVER() compute running aggregates. Use PARTITION BY to group and ORDER BY to define the window frame. Essential for reporting and analytics queries.",
  },
  {
    questionText: "How does SQL Server Query Store work and why is it important?",
    correctAnswer:
      "Query Store captures and retains query execution plans, runtime statistics, and wait stats over time. It helps identify plan regressions by comparing historical vs current plans. You can force a specific plan for a query. It is enabled per database and is essential for troubleshooting performance degradation after upgrades, index changes, or statistics updates.",
  },
  {
    questionText: "What are the best practices for using Entity Framework Core with SQL Server?",
    correctAnswer:
      "Use AsNoTracking() for read-only queries, avoid N+1 queries with Include()/ThenInclude(), use projections (Select) to limit columns, use raw SQL or FromSqlRaw for complex queries, configure indexes via Fluent API, use migrations for schema management, batch operations with ExecuteUpdate/ExecuteDelete (EF Core 7+), and implement connection resiliency with EnableRetryOnFailure().",
  },
  {
    questionText: "Explain the differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, and CROSS JOIN.",
    correctAnswer:
      "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table plus matching rows from the right (NULLs for non-matches). RIGHT JOIN is the opposite. FULL OUTER JOIN returns all rows from both tables with NULLs where there are no matches. CROSS JOIN produces the Cartesian product of both tables.",
  },
  {
    questionText: "What is SQL Server Temporal Tables and how do you use them in .NET?",
    correctAnswer:
      "Temporal tables (system-versioned tables) automatically maintain a history of data changes with ValidFrom and ValidTo period columns. SQL Server tracks INSERT, UPDATE, DELETE history in a linked history table. Query historical data with FOR SYSTEM_TIME AS OF, BETWEEN, or CONTAINED IN. EF Core 6+ supports temporal tables via HasPeriodStart/HasPeriodEnd configuration.",
  },
  {
    questionText: "How do you handle SQL injection prevention in .NET applications?",
    correctAnswer:
      "Always use parameterized queries (SqlParameter), stored procedures with parameters, or ORMs like Entity Framework Core which parameterize by default. Never concatenate user input into SQL strings. Use FromSqlInterpolated() instead of FromSqlRaw() with string interpolation. Apply input validation and the principle of least privilege for database accounts.",
  },
  {
    questionText: "What are SQL Server columnstore indexes and when should you use them?",
    correctAnswer:
      "Columnstore indexes store data column-by-column instead of row-by-row, providing high compression and fast analytical queries. Clustered columnstore indexes convert the entire table to columnar storage. Use them for large fact tables in data warehousing, reporting queries with aggregations, and tables where reads far outnumber writes. They can achieve 10x+ query performance improvement for analytical workloads.",
  },
  // ── PostgreSQL questions ──────────────────────────────────────────────
  {
    questionText: "What are the key differences between PostgreSQL and SQL Server from a .NET developer's perspective?",
    correctAnswer:
      "PostgreSQL is open-source, uses Npgsql as the .NET data provider, supports advanced types (JSONB, arrays, hstore), has a different identity column syntax (GENERATED ALWAYS AS IDENTITY or SERIAL), uses schemas differently (public default), has richer extension ecosystem (PostGIS, pg_trgm), and uses MVCC with VACUUM instead of lock-based concurrency. EF Core supports both via different provider packages.",
  },
  {
    questionText: "Explain PostgreSQL's MVCC (Multi-Version Concurrency Control) and how it differs from SQL Server's locking.",
    correctAnswer:
      "PostgreSQL uses MVCC where each transaction sees a snapshot of data. Writers don't block readers and readers don't block writers. Dead tuples (old versions) accumulate and are cleaned by VACUUM. SQL Server primarily uses locking (though it also supports SNAPSHOT isolation via row versioning in TempDB). PostgreSQL's approach generally provides better read concurrency but requires VACUUM maintenance.",
  },
  {
    questionText: "How do you use PostgreSQL's JSONB data type effectively with .NET?",
    correctAnswer:
      "JSONB stores JSON in a binary format with indexing support (GIN indexes). In .NET with Npgsql, map JSONB columns to .NET objects or JsonDocument. EF Core's Npgsql provider supports owned entity mapping to JSONB via ToJson(). Use JSONB operators (@>, ?, ?|, ?&) for querying. JSONB is ideal for semi-structured data, avoiding excessive normalization while maintaining query performance.",
  },
  {
    questionText: "What is PostgreSQL's VACUUM process and why is it important?",
    correctAnswer:
      "VACUUM reclaims storage occupied by dead tuples (rows marked as deleted or superseded by updates in MVCC). VACUUM marks space as reusable while VACUUM FULL rewrites the entire table to reclaim disk space. Autovacuum runs automatically based on configurable thresholds. Without VACUUM, tables bloat, indexes grow, and transaction ID wraparound can cause data loss. Monitor pg_stat_user_tables for dead tuple counts.",
  },
  {
    questionText: "How do you configure and use PostgreSQL connection pooling with .NET applications?",
    correctAnswer:
      "Npgsql includes built-in connection pooling (enabled by default). Configure via connection string: Max Pool Size, Min Pool Size, Connection Idle Lifetime, Connection Pruning Interval. For high-scale applications, use PgBouncer as an external connection pooler in transaction or session mode. In Kubernetes, deploy PgBouncer as a sidecar. Monitor pool usage with NpgsqlConnection.GlobalStatistics.",
  },
  {
    questionText: "Explain PostgreSQL partitioning strategies and when to use them.",
    correctAnswer:
      "PostgreSQL supports declarative partitioning: Range (date ranges, numeric ranges), List (discrete values like regions or statuses), and Hash (even distribution). Partitioning improves query performance by partition pruning, simplifies data lifecycle management (DROP PARTITION vs DELETE), and enables parallel query execution. Use for large tables (millions+ rows) where queries consistently filter on the partition key.",
  },
  {
    questionText: "What are PostgreSQL extensions and which ones are most useful for .NET developers?",
    correctAnswer:
      "Extensions add functionality to PostgreSQL. Key extensions: uuid-ossp/pgcrypto (UUID generation), pg_trgm (trigram similarity search), PostGIS (geospatial data), hstore (key-value pairs), citext (case-insensitive text), pg_stat_statements (query performance monitoring), pgvector (vector similarity search for AI). Install with CREATE EXTENSION. Npgsql and EF Core support mapping many extension types natively.",
  },
  {
    questionText: "How do you implement full-text search in PostgreSQL and compare it to SQL Server's full-text search?",
    correctAnswer:
      "PostgreSQL uses tsvector (document) and tsquery (search query) types with GIN indexes. Use to_tsvector() and to_tsquery() functions. It supports multiple languages, ranking (ts_rank), and phrase search. Compared to SQL Server's Full-Text Search which uses a separate FTS engine, PostgreSQL's is built-in, simpler to set up, and integrates natively with regular queries. EF Core Npgsql supports FTS via EF.Functions.ToTsVector().",
  },
  {
    questionText: "What are PostgreSQL's LISTEN/NOTIFY features and how can you use them in .NET?",
    correctAnswer:
      "LISTEN/NOTIFY is a pub/sub mechanism built into PostgreSQL. A client issues LISTEN channel_name and receives notifications sent via NOTIFY channel_name, 'payload'. In .NET, use NpgsqlConnection.Notification event and NpgsqlConnection.Wait() or WaitAsync(). Useful for real-time cache invalidation, event notifications, and lightweight messaging without external infrastructure like Redis or RabbitMQ.",
  },
  {
    questionText: "How do you handle database migrations for PostgreSQL in a .NET project?",
    correctAnswer:
      "Use EF Core Migrations with the Npgsql provider (dotnet ef migrations add/update). For more control, use FluentMigrator or DbUp with PostgreSQL support. Ensure migrations are idempotent and backward-compatible for zero-downtime deployments. Use CREATE INDEX CONCURRENTLY to avoid table locks. Test migrations against a staging database. Consider using pg_dump for backup before major migrations.",
  },
  {
    questionText: "Explain PostgreSQL's role-based access control and how it differs from SQL Server's security model.",
    correctAnswer:
      "PostgreSQL uses roles (which can be login roles or group roles) with GRANT/REVOKE on objects (tables, schemas, functions). It uses pg_hba.conf for client authentication rules. SQL Server uses logins (server-level) mapped to users (database-level) with more granular permission sets. PostgreSQL lacks SQL Server's built-in column-level encryption and dynamic data masking but supports row-level security (RLS) similarly.",
  },
  {
    questionText: "What are the differences between PostgreSQL sequences, SERIAL, and IDENTITY columns?",
    correctAnswer:
      "Sequences are standalone objects generating sequential numbers. SERIAL is a legacy shorthand that creates a sequence and sets a default — the column owns the sequence. IDENTITY (SQL standard, PostgreSQL 10+) uses GENERATED ALWAYS or GENERATED BY DEFAULT AS IDENTITY. IDENTITY is preferred: it prevents accidental manual inserts (ALWAYS), is standard SQL, and has cleaner ownership semantics. EF Core maps to IDENTITY by default with Npgsql.",
  },
  // ── Cross-platform / general SQL questions ────────────────────────────
  {
    questionText: "How do you use Dapper with SQL Server and PostgreSQL in .NET?",
    correctAnswer:
      "Dapper is a lightweight micro-ORM that maps query results to .NET objects. Use SqlConnection for SQL Server and NpgsqlConnection for PostgreSQL. Call connection.QueryAsync<T>() for queries and connection.ExecuteAsync() for commands. Use parameterized queries (@param for SQL Server, @param or $1 for PostgreSQL). Dapper supports multi-mapping, stored procedures, and dynamic parameters. It's ideal for performance-critical scenarios.",
  },
  {
    questionText: "What are the best practices for database connection management in .NET applications?",
    correctAnswer:
      "Use connection pooling (enabled by default in both SqlClient and Npgsql). Open connections late and close them early using 'using' statements or IDisposable. In ASP.NET Core, register DbContext as Scoped. Use connection resiliency (EnableRetryOnFailure for SQL Server, EnableRetryOnFailure for Npgsql). Monitor pool exhaustion. Never store connection strings with passwords in code — use Azure Key Vault, user secrets, or environment variables.",
  },
  {
    questionText: "Explain the differences between optimistic and pessimistic concurrency control in database applications.",
    correctAnswer:
      "Optimistic concurrency assumes conflicts are rare: read data with a version/timestamp, attempt the update, and handle conflicts if the version changed (EF Core uses concurrency tokens/RowVersion). Pessimistic concurrency locks rows during read with SELECT FOR UPDATE (PostgreSQL) or WITH (UPDLOCK) hints (SQL Server). Optimistic is better for web applications with high read-to-write ratios; pessimistic for high-contention scenarios.",
  },
  {
    questionText: "How do you implement database unit testing and integration testing in .NET?",
    correctAnswer:
      "For unit tests, mock IDbConnection or DbContext using in-memory providers (EF Core InMemory — limited) or SQLite in-memory mode. For integration tests, use Testcontainers to spin up real SQL Server or PostgreSQL in Docker. Use Respawn to reset database state between tests. Test migrations, stored procedures, and complex queries against real databases. Use xUnit fixtures for shared database instances.",
  },
  {
    questionText: "What are the key considerations when designing a database schema for a .NET microservices architecture?",
    correctAnswer:
      "Each microservice should own its database (Database-per-Service pattern). Avoid cross-service joins — use API composition or event-driven data replication. Design for eventual consistency. Use domain-driven design to define bounded contexts. Implement the Outbox pattern for reliable event publishing. Consider CQRS with separate read/write models. Use database-agnostic abstractions (Repository pattern) to allow switching between SQL Server and PostgreSQL.",
  },
];

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function seed() {
  console.log("🌱 Seeding Sql category and questions...\n");

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
