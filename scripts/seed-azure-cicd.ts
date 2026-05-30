/**
 * Seed script for the "Azure CI/CD" category and its questions.
 *
 * Usage:
 *   npx tsx scripts/seed-azure-cicd.ts
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set
 *     in the environment (or in a .env.local file loaded beforehand).
 *
 * The script is idempotent: it checks whether the "Azure CI/CD" category already
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

const CATEGORY_NAME = "Azure CI/CD";

const questions: { questionText: string; correctAnswer: string }[] = [
  {
    questionText: "What is Azure DevOps and what are its main components?",
    correctAnswer:
      "Azure DevOps is a set of development tools and services for software teams. Its main components are Azure Boards (work tracking), Azure Repos (source control), Azure Pipelines (CI/CD), Azure Test Plans (testing), and Azure Artifacts (package management).",
  },
  {
    questionText: "Explain the difference between Azure DevOps Services and Azure DevOps Server.",
    correctAnswer:
      "Azure DevOps Services is a cloud-hosted SaaS offering managed by Microsoft with automatic updates and global availability. Azure DevOps Server (formerly TFS) is an on-premises version that organizations host and manage themselves, suitable for strict data residency or compliance requirements.",
  },
  {
    questionText: "What are YAML pipelines in Azure DevOps and why are they preferred over classic pipelines?",
    correctAnswer:
      "YAML pipelines define CI/CD configuration as code in a YAML file stored in the repository. They are preferred because they support version control, code review via pull requests, branching strategies, reusability through templates, and provide a single source of truth for pipeline definitions.",
  },
  {
    questionText: "Explain the concepts of stages, jobs, and steps in an Azure DevOps YAML pipeline.",
    correctAnswer:
      "Stages are logical divisions of a pipeline (e.g., Build, Test, Deploy). Each stage contains one or more jobs that run on an agent. Each job contains steps, which are individual tasks or scripts. Stages can have dependencies and approval gates between them.",
  },
  {
    questionText: "What are Azure DevOps pipeline triggers and how do you configure them?",
    correctAnswer:
      "Pipeline triggers define when a pipeline runs. CI triggers fire on code pushes to specified branches. PR triggers fire on pull request creation/updates. Scheduled triggers run at defined times. They are configured in the YAML file using trigger, pr, and schedules keywords, supporting branch filters and path filters.",
  },
  {
    questionText: "How do you manage secrets and variables in Azure DevOps Pipelines?",
    correctAnswer:
      "Use pipeline variables for non-sensitive values, variable groups for shared variables across pipelines, and Azure Key Vault integration for secrets. Mark sensitive variables as secret to mask them in logs. Variable groups can be linked to Key Vault for automatic secret retrieval.",
  },
  {
    questionText: "What are service connections in Azure DevOps and how are they used?",
    correctAnswer:
      "Service connections are secure, authenticated connections to external services like Azure subscriptions, Docker registries, NuGet feeds, or Kubernetes clusters. They store credentials securely and are managed at the project level with role-based access control for pipeline usage.",
  },
  {
    questionText: "Explain the concept of pipeline templates in Azure DevOps.",
    correctAnswer:
      "Pipeline templates are reusable YAML files that define stages, jobs, or steps. They support parameters for customization and can be stored in the same repo or a separate template repository. Templates promote DRY principles, standardization across teams, and centralized pipeline governance.",
  },
  {
    questionText: "How do you implement multi-stage deployment pipelines in Azure DevOps?",
    correctAnswer:
      "Define multiple stages in YAML (e.g., Dev, QA, Staging, Production) with dependsOn for ordering. Use environment resources with approval gates and checks. Configure deployment jobs with strategies like runOnce, rolling, or canary. Each stage deploys to its target environment with appropriate validations.",
  },
  {
    questionText: "What are Azure DevOps Environments and how do they support deployment governance?",
    correctAnswer:
      "Environments represent deployment targets (e.g., production Kubernetes cluster). They support approval gates (manual approvals before deployment), checks (business hours, branch control, required template), resource targeting (VMs, Kubernetes), and deployment history tracking for auditing.",
  },
  {
    questionText: "How do you set up a CI pipeline for a .NET application in Azure DevOps?",
    correctAnswer:
      "Create a YAML pipeline with DotNetCoreCLI tasks: restore NuGet packages, build the solution, run unit tests with code coverage, and publish build artifacts. Configure triggers on the main branch and PR validation. Use Microsoft-hosted agents with the appropriate .NET SDK version.",
  },
  {
    questionText: "What are Azure DevOps Artifacts and how do you use them for .NET package management?",
    correctAnswer:
      "Azure Artifacts hosts NuGet, npm, Maven, and Python package feeds. For .NET, create a NuGet feed, configure nuget.config to use it, publish packages via dotnet nuget push in pipelines, and consume them with dotnet restore. Supports upstream sources from nuget.org and scoped feed permissions.",
  },
  {
    questionText: "Explain how branch policies work in Azure Repos and their role in CI/CD.",
    correctAnswer:
      "Branch policies protect important branches by requiring build validation (CI must pass), minimum number of reviewers, linked work items, comment resolution, and merge strategy enforcement. They ensure code quality gates are met before merging and integrate directly with the CI pipeline.",
  },
  {
    questionText: "How do you implement Infrastructure as Code (IaC) deployments using Azure DevOps?",
    correctAnswer:
      "Store IaC templates (ARM, Bicep, Terraform) in Azure Repos. Create pipeline stages that validate templates (what-if/plan), require approval, then deploy (apply). Use service connections for Azure authentication, variable groups for environment-specific values, and state management for Terraform.",
  },
  {
    questionText: "What is the difference between Microsoft-hosted and self-hosted agents in Azure Pipelines?",
    correctAnswer:
      "Microsoft-hosted agents are managed VMs provisioned per job with pre-installed tools, requiring no maintenance but offering less customization. Self-hosted agents run on your infrastructure, allow custom software installation, can access on-premises resources, and persist between jobs for faster builds.",
  },
  {
    questionText: "How do you implement container-based CI/CD pipelines in Azure DevOps?",
    correctAnswer:
      "Use container jobs to run pipeline steps inside Docker containers for consistent environments. Build Docker images with multi-stage Dockerfiles, push to Azure Container Registry (ACR), and deploy to Azure Container Apps, AKS, or App Service. Use Docker@2 and AzureWebAppContainer tasks.",
  },
  {
    questionText: "Explain Azure DevOps release gates and how they improve deployment safety.",
    correctAnswer:
      "Release gates are automated checks between pipeline stages that must pass before deployment proceeds. Examples include Azure Monitor alerts (no active incidents), work item query (no blocking bugs), REST API health checks, and Azure Policy compliance. They prevent deploying to unhealthy environments.",
  },
  {
    questionText: "How do you configure parallel testing in Azure DevOps for .NET projects?",
    correctAnswer:
      "Use test slicing to distribute tests across multiple agents using the VSTest@2 task with parallel execution. Configure the strategy matrix for multiple configurations (OS, .NET version). Set maxParallel to control concurrency. Use test impact analysis to run only affected tests on PRs.",
  },
  {
    questionText: "What are deployment strategies available in Azure DevOps and when would you use each?",
    correctAnswer:
      "RunOnce deploys to all targets at once (simple apps). Rolling deploys in batches to minimize downtime. Canary deploys to a small subset first for validation before full rollout. Blue-green uses deployment slots in Azure App Service for zero-downtime swaps with instant rollback capability.",
  },
  {
    questionText: "How do you integrate Azure DevOps with Azure Key Vault for secret management?",
    correctAnswer:
      "Create a variable group linked to an Azure Key Vault via a service connection. Secrets are fetched at pipeline runtime and available as variables. Use the AzureKeyVault@2 task for direct access in steps. Ensure the service principal has Get/List permissions on the vault. Secrets are automatically masked in logs.",
  },
  {
    questionText: "Explain how you would set up a GitOps workflow with Azure DevOps.",
    correctAnswer:
      "Store application and infrastructure configuration in Git. Pipeline triggers on config changes automatically sync desired state to the target environment. For Kubernetes, use Flux or ArgoCD with Azure DevOps repos. The pipeline validates manifests, updates image tags, and the GitOps operator reconciles the cluster state.",
  },
  {
    questionText: "How do you implement code quality gates in Azure DevOps pipelines?",
    correctAnswer:
      "Integrate SonarQube/SonarCloud with SonarQubePrepare, build, and SonarQubeAnalyze tasks. Configure quality gate thresholds for code coverage, duplications, bugs, and vulnerabilities. Fail the pipeline if the quality gate fails. Add Roslyn analyzers, StyleCop, and code coverage minimum thresholds as additional checks.",
  },
  {
    questionText: "What is Azure Boards and how does it integrate with Azure Pipelines?",
    correctAnswer:
      "Azure Boards provides work item tracking with Kanban boards, sprints, and backlogs. It integrates with Pipelines by linking commits and PRs to work items, automatically updating work item state on deployment, and providing traceability from requirement to deployment. Branch policies can require linked work items.",
  },
  {
    questionText: "How do you manage multiple environments (dev, staging, prod) in Azure DevOps pipelines?",
    correctAnswer:
      "Use pipeline environments with approval checks, variable groups per environment for configuration, stage-level conditions, and deployment jobs targeting specific environments. Store environment-specific settings in variable groups or Key Vault. Use template parameters to reuse deployment logic across environments.",
  },
  {
    questionText: "Explain how Azure DevOps supports monorepo CI/CD strategies.",
    correctAnswer:
      "Use path-based triggers to run pipelines only when specific directories change. Configure multiple pipelines per repository, each with path filters. Use pipeline templates for shared logic. Leverage changed file detection in scripts to conditionally run stages. Consider pipeline caching for faster builds.",
  },
  {
    questionText: "How do you implement rollback strategies in Azure DevOps deployments?",
    correctAnswer:
      "Use Azure App Service deployment slots for instant slot swaps back to the previous version. For Kubernetes, leverage kubectl rollout undo. Store previous build artifacts for redeployment. Implement health checks that automatically trigger rollback. Database rollback requires backward-compatible migrations.",
  },
  {
    questionText: "What are Azure DevOps pipeline decorators and how are they used?",
    correctAnswer:
      "Pipeline decorators are extensions that automatically inject steps into every pipeline in an organization. They run before or after pipeline jobs and are used for enforcing organization-wide policies like security scanning, credential scanning, compliance checks, or mandatory telemetry collection without modifying individual pipelines.",
  },
  {
    questionText: "How do you optimize Azure DevOps pipeline performance?",
    correctAnswer:
      "Use pipeline caching for NuGet packages and node_modules. Enable parallel jobs and test slicing. Use incremental builds and test impact analysis. Choose appropriate agent sizes. Minimize artifact sizes. Use Docker layer caching for container builds. Consider self-hosted agents with warm caches for frequently run pipelines.",
  },
  {
    questionText: "Explain how to implement compliance and audit controls in Azure DevOps.",
    correctAnswer:
      "Use branch policies for code review enforcement, required CI checks, and merge strategies. Configure environment approvals and gates. Enable audit logging for tracking changes. Use pipeline decorators for mandatory security scans. Implement Azure Policy for resource compliance. Use service connection restrictions and RBAC.",
  },
  {
    questionText: "How do you integrate automated security scanning into Azure DevOps pipelines?",
    correctAnswer:
      "Add SAST tools (SonarQube, Checkmarx) as pipeline tasks. Use OWASP Dependency-Check or WhiteSource for dependency scanning. Run container image scanning with Trivy or Aqua. Integrate Microsoft Defender for DevOps for unified security. Configure branch policies to block merges with critical vulnerabilities.",
  },
  {
    questionText: "What is Azure Test Plans and how does it integrate with the CI/CD workflow?",
    correctAnswer:
      "Azure Test Plans provides manual and exploratory testing tools with test case management. It integrates with pipelines by associating automated tests with test cases, tracking test results across pipeline runs, and providing test analytics. It supports requirement-based testing linked to Azure Boards work items.",
  },
  {
    questionText: "How do you implement feature flags with Azure DevOps and Azure App Configuration?",
    correctAnswer:
      "Create feature flags in Azure App Configuration. Use the Microsoft.FeatureManagement library in .NET to evaluate flags at runtime. Toggle features without redeployment. Integrate with Azure DevOps pipelines to enable flags per environment during deployment. Use targeting filters for gradual rollouts to specific user segments.",
  },
  {
    questionText: "Explain how you would migrate from classic release pipelines to YAML pipelines.",
    correctAnswer:
      "Audit existing classic pipelines for stages, tasks, variables, and approvals. Recreate the pipeline logic in YAML with equivalent tasks. Set up environments with approval gates to replace classic approvals. Migrate variable groups and service connections. Run both pipelines in parallel during transition. Use export-to-YAML preview as a starting point.",
  },
  {
    questionText: "How do you handle database deployments in Azure DevOps CI/CD?",
    correctAnswer:
      "Use DACPAC/BACPAC with SqlAzureDacpacDeployment task for SQL Database schema deployments. Alternatively, use EF Core migrations run as a pipeline step. For safer deployments, use tools like Flyway or DbUp. Always include rollback scripts, run migrations before app deployment, and test migrations against a staging database first.",
  },
  {
    questionText: "What are Azure Pipelines agent pools and how do you manage them effectively?",
    correctAnswer:
      "Agent pools are groups of agents available for running pipeline jobs. Default pools include Azure Pipelines (Microsoft-hosted) and Default (self-hosted). Create custom pools for specific workloads. Set pool permissions, configure agent capabilities for job matching, and use scale set agents for auto-scaling self-hosted agents.",
  },
  {
    questionText: "How do you implement cross-project or cross-organization pipeline dependencies in Azure DevOps?",
    correctAnswer:
      "Use pipeline resources to trigger a pipeline upon completion of another pipeline, even across projects. Share artifacts via Azure Artifacts feeds. Use service connections for cross-organization access. Leverage template repositories for shared pipeline logic. Use REST API triggers for complex orchestration scenarios.",
  },
  {
    questionText: "Explain the role of Azure Container Registry in a .NET CI/CD pipeline.",
    correctAnswer:
      "Azure Container Registry (ACR) stores and manages Docker container images. In CI/CD, the pipeline builds .NET Docker images, pushes them to ACR, and deployment stages pull from ACR. ACR supports geo-replication, image scanning, retention policies, and integrates natively with AKS and App Service for seamless deployments.",
  },
  {
    questionText: "How do you set up continuous monitoring and feedback loops in Azure DevOps?",
    correctAnswer:
      "Integrate Azure Monitor and Application Insights with pipelines. Configure release gates that check for active alerts or performance regressions. Use Azure Dashboards for pipeline analytics. Set up work item creation on deployment failures. Implement post-deployment health checks that automatically create bugs on issues.",
  },
  {
    questionText: "What are conditional insertions and expressions in Azure DevOps YAML pipelines?",
    correctAnswer:
      "YAML pipelines support compile-time expressions (${{ }}) for template logic and runtime expressions ($[ ]) for conditions. Use condition keyword to skip stages/jobs/steps based on variables, branch names, or previous stage results. Supports functions like eq(), ne(), contains(), succeeded(), and failed() for dynamic pipeline behavior.",
  },
  {
    questionText: "How do you manage and version Azure DevOps pipeline templates across multiple teams?",
    correctAnswer:
      "Store templates in a dedicated repository with semantic versioning using tags or branches. Reference templates using repository resources with ref parameter pointing to a specific version. Implement a review process for template changes. Publish release notes for template updates. Use extends templates for enforcing organizational standards.",
  },
];

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function seed() {
  console.log("🌱 Seeding Azure CI/CD category and questions...\n");

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
