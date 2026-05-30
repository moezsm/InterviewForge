/**
 * Seed script for the "OpenShift .NET Lead" category and its questions.
 *
 * Usage:
 *   npx tsx scripts/seed-openshift-dotnet-lead.ts
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set
 *     in the environment (or in a .env.local file loaded beforehand).
 *
 * The script is idempotent: it checks whether the "OpenShift .NET Lead" category already
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

const CATEGORY_NAME = "OpenShift .NET Lead";

const questions: { questionText: string; correctAnswer: string }[] = [
  {
    questionText: "What is OpenShift and how does it differ from vanilla Kubernetes?",
    correctAnswer:
      "OpenShift is Red Hat's enterprise Kubernetes platform that adds developer-friendly features on top of Kubernetes, including a built-in container registry, CI/CD pipelines (Tekton/OpenShift Pipelines), a web console, integrated monitoring and logging (Prometheus, Grafana, EFK), stricter security defaults (SCCs), and the oc CLI. It simplifies enterprise adoption with opinionated defaults and commercial support.",
  },
  {
    questionText: "How do you deploy a .NET application on OpenShift?",
    correctAnswer:
      "You can deploy a .NET application on OpenShift using Source-to-Image (S2I) with the official .NET S2I builder images, by building a Docker/container image with a Dockerfile and pushing it to the integrated registry, or by using Helm charts or OpenShift Templates. The oc new-app command can create deployments from source code, Docker images, or templates.",
  },
  {
    questionText: "What are OpenShift Projects and how do they relate to Kubernetes Namespaces?",
    correctAnswer:
      "OpenShift Projects are a thin wrapper around Kubernetes Namespaces that add additional metadata, RBAC defaults, and resource quota capabilities. Each project isolates resources and provides role-based access. Projects can have display names, descriptions, and node selectors. They enable multi-tenancy with network policies and resource limits.",
  },
  {
    questionText: "Explain the concept of Source-to-Image (S2I) in OpenShift and its benefits for .NET applications.",
    correctAnswer:
      "S2I is a framework for building reproducible container images from source code. For .NET, Red Hat provides official S2I builder images that automatically detect the project type, restore NuGet packages, build the application, and create a runtime image. Benefits include no need to write Dockerfiles, consistent builds, and layered image optimization.",
  },
  {
    questionText: "What are OpenShift Routes and how do they differ from Kubernetes Ingress?",
    correctAnswer:
      "Routes are OpenShift's native way to expose services externally with a hostname. They use HAProxy as the default router and support TLS termination (edge, passthrough, re-encrypt), sticky sessions, and traffic splitting. While Kubernetes Ingress is also supported, Routes predate Ingress and offer tighter integration with OpenShift's security model and certificate management.",
  },
  {
    questionText: "What are Security Context Constraints (SCCs) in OpenShift and how do they affect .NET deployments?",
    correctAnswer:
      "SCCs are OpenShift-specific policies that control what pods can do, such as running as root, using host networking, or mounting volumes. By default, OpenShift uses the restricted SCC, which prevents containers from running as root. .NET applications must be configured to run as non-root users, and the container image must support arbitrary user IDs assigned by OpenShift.",
  },
  {
    questionText: "How do you configure health checks for a .NET application in OpenShift?",
    correctAnswer:
      "Configure liveness, readiness, and startup probes in the DeploymentConfig or Deployment spec. For ASP.NET Core, use the built-in health checks middleware (MapHealthChecks) and configure HTTP probes pointing to /health or /ready endpoints. Readiness probes prevent traffic to unready pods, and liveness probes restart unhealthy containers.",
  },
  {
    questionText: "Explain the difference between DeploymentConfig and Deployment in OpenShift.",
    correctAnswer:
      "DeploymentConfig is OpenShift's original deployment resource with features like image change triggers, config change triggers, and lifecycle hooks. Deployment is the standard Kubernetes resource. OpenShift 4.x recommends using Deployment as it supports rolling updates, scales better, and integrates with the broader Kubernetes ecosystem. DeploymentConfig is considered legacy.",
  },
  {
    questionText: "How do you manage configuration and secrets for a .NET application in OpenShift?",
    correctAnswer:
      "Use ConfigMaps for non-sensitive configuration and Secrets for sensitive data. Mount them as environment variables or volumes in the pod spec. ASP.NET Core can read these via environment variables or mounted configuration files using the configuration provider pattern. OpenShift also supports sealed secrets and external secret operators for enhanced security.",
  },
  {
    questionText: "What are OpenShift BuildConfigs and what build strategies are available?",
    correctAnswer:
      "BuildConfigs define how to build container images in OpenShift. Available strategies include: Source (S2I) for building from source code, Docker for using a Dockerfile, Custom for fully custom build logic, and Pipeline (deprecated in favor of Tekton). BuildConfigs support triggers (webhook, image change, config change) and can output images to the internal registry or external registries.",
  },
  {
    questionText: "How do you implement CI/CD for .NET applications using OpenShift Pipelines (Tekton)?",
    correctAnswer:
      "OpenShift Pipelines is based on Tekton. Create Tasks for individual steps (build, test, deploy), assemble them into a Pipeline, and trigger runs with TriggerTemplates and EventListeners for webhook integration. For .NET, use tasks that run dotnet build, dotnet test, build the container image with Buildah, and deploy using oc or kubectl apply.",
  },
  {
    questionText: "How do you handle persistent storage for .NET applications in OpenShift?",
    correctAnswer:
      "Use PersistentVolumeClaims (PVCs) to request storage from available StorageClasses. OpenShift supports various storage backends (NFS, Ceph, iSCSI, cloud provider volumes). For .NET applications that need file storage, mount PVCs as volumes. Consider access modes (ReadWriteOnce, ReadWriteMany) based on scaling needs. Use StatefulSets for stateful workloads like databases.",
  },
  {
    questionText: "What is the OpenShift integrated container registry and how do you use it with .NET builds?",
    correctAnswer:
      "The OpenShift internal registry stores container images built within the cluster. It is accessible via image-registry.openshift-image-registry.svc:5000. BuildConfigs push images to it using ImageStreams. .NET S2I builds automatically push to the internal registry. ImageStreams track image updates and can trigger redeployments when a new image is pushed.",
  },
  {
    questionText: "How do you scale .NET applications in OpenShift?",
    correctAnswer:
      "Use the HorizontalPodAutoscaler (HPA) to auto-scale based on CPU/memory metrics or custom metrics from Prometheus. Manually scale with oc scale or by editing the replica count. For event-driven scaling, use KEDA (Kubernetes Event-Driven Autoscaling). Ensure .NET applications are stateless or use distributed caching (Redis) for session state to scale horizontally.",
  },
  {
    questionText: "How do you configure network policies in OpenShift for microservices?",
    correctAnswer:
      "Use Kubernetes NetworkPolicy resources to control pod-to-pod traffic. Define ingress and egress rules based on pod labels, namespace selectors, and IP blocks. OpenShift uses the OVN-Kubernetes or OpenShift SDN plugin for network policy enforcement. For .NET microservices, restrict traffic so each service only accepts connections from its known consumers.",
  },
  {
    questionText: "Explain how OpenShift Operators work and their relevance to .NET applications.",
    correctAnswer:
      "Operators are Kubernetes controllers that encode operational knowledge for managing complex applications. They use Custom Resource Definitions (CRDs) to extend the API. For .NET applications, you can use existing operators for databases (e.g., Crunchy PostgreSQL), messaging (e.g., Strimzi Kafka), or build custom operators using the Operator SDK with .NET (using KubeOps).",
  },
  {
    questionText: "How do you implement logging and monitoring for .NET applications on OpenShift?",
    correctAnswer:
      "OpenShift includes a built-in monitoring stack (Prometheus, Alertmanager, Grafana) and logging stack (Elasticsearch, Fluentd/Vector, Kibana). .NET applications should log to stdout/stderr for Fluentd to collect. Use structured logging (Serilog) with JSON format. Expose Prometheus metrics using the prometheus-net library. Create custom dashboards and alerts in Grafana.",
  },
  {
    questionText: "What are ImageStreams in OpenShift and how do they benefit .NET deployments?",
    correctAnswer:
      "ImageStreams are OpenShift resources that provide an abstraction over container image references. They track image tags and can trigger automated redeployments when a new image is pushed. For .NET, an ImageStream can reference the .NET S2I builder image and automatically rebuild applications when the base image is updated with security patches.",
  },
  {
    questionText: "How do you perform blue-green and canary deployments for .NET applications on OpenShift?",
    correctAnswer:
      "For blue-green deployments, create two DeploymentConfigs (blue and green), switch the Route to point to the new version after verification. For canary deployments, use Route traffic splitting to send a percentage of traffic to the new version. OpenShift also supports using Service Mesh (Istio) for more advanced traffic management and A/B testing.",
  },
  {
    questionText: "How do you troubleshoot a failing .NET application pod in OpenShift?",
    correctAnswer:
      "Use oc logs <pod> to view application logs, oc describe pod <pod> to check events and status, oc rsh <pod> to open a shell in the container, and oc debug to start a debug pod with the same configuration. Check resource limits, liveness/readiness probe failures, image pull errors, SCC violations, and CrashLoopBackOff reasons.",
  },
  {
    questionText: "How do you manage TLS certificates for .NET services in OpenShift?",
    correctAnswer:
      "Use OpenShift Routes with TLS termination (edge, passthrough, or re-encrypt). For edge termination, the router handles TLS and forwards HTTP to the pod. For passthrough, the .NET application handles TLS using Kestrel with certificates mounted via Secrets. Use cert-manager operator for automatic certificate provisioning and renewal from Let's Encrypt or internal CAs.",
  },
  {
    questionText: "What are OpenShift Templates and how do they compare to Helm charts for .NET deployments?",
    correctAnswer:
      "OpenShift Templates are parameterized resource definitions processed by oc process. They are simpler but less powerful than Helm charts. Helm charts offer dependency management, conditionals, loops, and a rich ecosystem. For .NET deployments, Helm is generally preferred for complex applications, while Templates work well for simpler standardized deployments.",
  },
  {
    questionText: "How do you configure resource limits and quotas for .NET applications in OpenShift?",
    correctAnswer:
      "Set resource requests and limits (CPU, memory) in the container spec. Use LimitRanges to enforce default and maximum resource constraints per container. Use ResourceQuotas to limit total resource usage per project. For .NET applications, monitor memory usage carefully as the GC may not respect container memory limits without proper configuration (use DOTNET_GCHeapHardLimit).",
  },
  {
    questionText: "Explain how OpenShift Service Mesh (Istio) benefits .NET microservice architectures.",
    correctAnswer:
      "OpenShift Service Mesh adds sidecar proxies (Envoy) to pods for transparent traffic management, mutual TLS between services, traffic policies (retries, circuit breaking, timeouts), observability (distributed tracing with Jaeger, metrics), and canary releases. .NET microservices benefit without code changes, as the mesh handles cross-cutting concerns at the infrastructure level.",
  },
  {
    questionText: "How do you handle database migrations for .NET applications deployed on OpenShift?",
    correctAnswer:
      "Run EF Core migrations as an init container or a Kubernetes Job before the application starts. Alternatively, use a pre-deployment hook in a DeploymentConfig. Ensure migrations are idempotent and backward-compatible for rolling deployments. Store the connection string in a Secret and mount it into the migration job. Use Flyway or DbUp for non-EF projects.",
  },
  {
    questionText: "What is the oc CLI and what are the most important commands for managing .NET deployments?",
    correctAnswer:
      "The oc CLI extends kubectl with OpenShift-specific commands. Key commands include: oc new-app (create applications), oc start-build (trigger builds), oc rollout (manage deployments), oc expose (create routes), oc logs/describe/rsh (debugging), oc set env (manage environment variables), oc adm (cluster administration), and oc project (switch projects).",
  },
  {
    questionText: "How do you implement GitOps for .NET applications on OpenShift using ArgoCD?",
    correctAnswer:
      "Install the OpenShift GitOps operator which provides ArgoCD. Store Kubernetes manifests or Helm charts in a Git repository. Create ArgoCD Applications pointing to the Git repo and target OpenShift project. ArgoCD continuously syncs the desired state from Git to the cluster, automatically deploying .NET application updates when manifests change.",
  },
  {
    questionText: "How do you ensure .NET container images are secure and compliant on OpenShift?",
    correctAnswer:
      "Use Red Hat certified base images (ubi8/ubi9) for .NET runtime. Scan images with Quay/Clair or StackRox for vulnerabilities. Run containers as non-root (required by default SCC). Minimize image layers and remove unnecessary tools. Use multi-stage builds to exclude SDK from runtime images. Apply image signing and enforce image policies with admission controllers.",
  },
  {
    questionText: "What are OpenShift Serverless (Knative) capabilities and how do they apply to .NET?",
    correctAnswer:
      "OpenShift Serverless is based on Knative and provides scale-to-zero, event-driven, and request-driven workloads. For .NET, deploy Knative Services that automatically scale based on HTTP traffic, including scaling to zero when idle. Use Knative Eventing for event-driven architectures with CloudEvents. Ideal for APIs with variable traffic patterns to optimize resource usage.",
  },
  {
    questionText: "How do you manage multi-cluster .NET deployments with OpenShift?",
    correctAnswer:
      "Use Red Hat Advanced Cluster Management (ACM) to manage multiple OpenShift clusters from a single console. Define placement policies to deploy .NET applications across clusters based on labels, regions, or compliance requirements. Use Submariner for cross-cluster networking. Implement GitOps with ArgoCD ApplicationSets for consistent deployments across all clusters.",
  },
];

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function seed() {
  console.log("🌱 Seeding OpenShift .NET Lead category and questions...\n");

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
