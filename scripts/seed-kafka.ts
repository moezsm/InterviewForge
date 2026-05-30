/**
 * Seed script for the "Kafka" category and its questions.
 *
 * Usage:
 *   npx tsx scripts/seed-kafka.ts
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set
 *     in the environment (or in a .env.local file loaded beforehand).
 *
 * The script is idempotent: it checks whether the "Kafka" category already
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

const CATEGORY_NAME = "Kafka";

const questions: { questionText: string; correctAnswer: string }[] = [
  {
    questionText: "What is Apache Kafka and what are its primary use cases?",
    correctAnswer:
      "Apache Kafka is a distributed event streaming platform for high-throughput, fault-tolerant, real-time data pipelines and streaming applications. Primary use cases include event-driven architectures, log aggregation, real-time analytics, change data capture (CDC), messaging between microservices, and stream processing.",
  },
  {
    questionText: "Explain the core concepts of Kafka: topics, partitions, and offsets.",
    correctAnswer:
      "A topic is a named feed of messages organized by category. Each topic is split into partitions, which are ordered, immutable sequences of records that enable parallelism. Each record within a partition has a unique offset (sequential ID) used by consumers to track their position. Partitions are distributed across brokers for scalability.",
  },
  {
    questionText: "What are Kafka brokers and how does a Kafka cluster work?",
    correctAnswer:
      "A broker is a Kafka server that stores data and serves clients. A Kafka cluster consists of multiple brokers that share the workload. Each broker handles a set of partitions. One broker acts as the controller, managing partition leader election and cluster metadata. Brokers coordinate through ZooKeeper (legacy) or KRaft (Kafka Raft) for consensus.",
  },
  {
    questionText: "Explain the role of producers and consumers in Kafka.",
    correctAnswer:
      "Producers publish records to Kafka topics, choosing which partition to send to via a partitioning strategy (round-robin, key-based, or custom). Consumers read records from topics by subscribing and polling. Consumers track their position using offsets. Producers can configure acknowledgment levels (acks=0, 1, all) to balance between throughput and durability.",
  },
  {
    questionText: "What are consumer groups in Kafka and how do they enable scalability?",
    correctAnswer:
      "A consumer group is a set of consumers that cooperate to consume a topic. Each partition is assigned to exactly one consumer in the group, enabling parallel processing. If a consumer fails, its partitions are reassigned (rebalancing). Multiple consumer groups can independently consume the same topic, each maintaining their own offsets.",
  },
  {
    questionText: "How do you integrate Kafka with .NET applications using Confluent's Kafka client?",
    correctAnswer:
      "Use the Confluent.Kafka NuGet package, which provides ProducerBuilder<TKey, TValue> and ConsumerBuilder<TKey, TValue>. Configure bootstrap servers, serializers (e.g., JSON, Avro), and consumer group ID. Produce messages with ProduceAsync() and consume with Consume() in a polling loop. Handle delivery reports for producer acknowledgments and commit offsets for consumers.",
  },
  {
    questionText: "What is the difference between at-most-once, at-least-once, and exactly-once delivery semantics in Kafka?",
    correctAnswer:
      "At-most-once: consumer commits offset before processing; messages may be lost. At-least-once: consumer commits offset after processing; messages may be duplicated. Exactly-once: achieved using idempotent producers (enable.idempotence=true) and transactional APIs, ensuring each message is processed exactly once even across failures.",
  },
  {
    questionText: "Explain Kafka's replication mechanism and the concept of ISR (In-Sync Replicas).",
    correctAnswer:
      "Each partition has a configurable replication factor. One replica is the leader (handles reads/writes), and others are followers that replicate data. ISR is the set of replicas that are fully caught up with the leader. If the leader fails, a new leader is elected from the ISR. The min.insync.replicas setting ensures durability by requiring a minimum number of ISR acknowledgments.",
  },
  {
    questionText: "How do you handle message serialization and deserialization in Kafka with .NET?",
    correctAnswer:
      "Use built-in serializers for primitive types (string, int, byte[]). For complex objects, use JSON serialization (System.Text.Json or Newtonsoft.Json) with custom ISerializer<T>/IDeserializer<T> implementations, or use Confluent's Avro/Protobuf serializers with Schema Registry for schema evolution and compatibility enforcement.",
  },
  {
    questionText: "What is the Confluent Schema Registry and why is it important?",
    correctAnswer:
      "Schema Registry is a centralized service that stores and manages Avro, JSON Schema, and Protobuf schemas for Kafka topics. It enforces schema compatibility (backward, forward, full) to prevent breaking changes. Producers register schemas when sending messages, and consumers fetch schemas for deserialization. It enables safe schema evolution in distributed systems.",
  },
  {
    questionText: "How do you implement error handling and dead letter queues in Kafka with .NET?",
    correctAnswer:
      "Implement try-catch around message processing. On failure, publish the failed message to a dead letter topic (DLQ) with error metadata (exception, timestamp, original topic). Configure retry policies with exponential backoff before sending to DLQ. Monitor DLQ for manual review and reprocessing. Use Polly library in .NET for structured retry policies.",
  },
  {
    questionText: "What are Kafka Connect and Kafka Streams, and how do they complement a .NET architecture?",
    correctAnswer:
      "Kafka Connect is a framework for streaming data between Kafka and external systems (databases, file systems, search indexes) using pre-built connectors. Kafka Streams is a Java library for stream processing. In .NET architectures, Kafka Connect handles data integration while .NET services consume/produce via Confluent.Kafka. For stream processing in .NET, use libraries like Streamiz.",
  },
  {
    questionText: "How do you configure Kafka topic retention and compaction policies?",
    correctAnswer:
      "Retention is configured per topic: retention.ms (time-based, default 7 days) and retention.bytes (size-based). Cleanup policy can be 'delete' (remove old segments) or 'compact' (keep only the latest value per key). Log compaction is useful for changelog topics where you need the latest state. Configure segment.ms and segment.bytes to control log segment rotation.",
  },
  {
    questionText: "Explain how Kafka partitioning strategies affect .NET consumer performance.",
    correctAnswer:
      "The number of partitions determines the maximum parallelism for consumers in a group. Key-based partitioning ensures ordering per key but can cause hot partitions with skewed keys. Round-robin distributes load evenly but loses key ordering. Custom partitioners can implement business logic. In .NET, set the Partitioner property on ProducerConfig or provide a custom partition function.",
  },
  {
    questionText: "How do you monitor Kafka and .NET Kafka applications in production?",
    correctAnswer:
      "Monitor Kafka broker metrics (under-replicated partitions, request latency, ISR shrinks) via JMX exported to Prometheus/Grafana. Monitor consumer lag using Burrow or Kafka Lag Exporter. In .NET, track producer delivery failures, consumer processing latency, and commit errors. Use OpenTelemetry for distributed tracing across Kafka-based microservices.",
  },
  {
    questionText: "What is consumer lag in Kafka and how do you address it?",
    correctAnswer:
      "Consumer lag is the difference between the latest offset in a partition and the consumer's committed offset. High lag means the consumer is falling behind. Address it by adding more consumers (up to partition count), increasing consumer throughput (batching, async processing), optimizing message processing logic, or increasing partition count for higher parallelism.",
  },
  {
    questionText: "How do you implement the Outbox pattern with Kafka in a .NET application?",
    correctAnswer:
      "The Outbox pattern ensures reliable event publishing alongside database transactions. Write events to an 'outbox' table in the same database transaction as business data. A separate process (outbox publisher) polls the table or uses CDC (Debezium) to publish events to Kafka. This guarantees at-least-once delivery without distributed transactions. Libraries like MassTransit support this pattern in .NET.",
  },
  {
    questionText: "Explain Kafka transactions and how to use them in .NET.",
    correctAnswer:
      "Kafka transactions enable atomic writes across multiple partitions and topics. Initialize with InitTransactions(), begin with BeginTransaction(), produce messages, and commit with CommitTransaction() or abort with AbortTransaction(). Consumers use IsolationLevel.ReadCommitted to only read committed messages. In .NET, set transactional.id on the ProducerConfig to enable transactions.",
  },
  {
    questionText: "What is KRaft mode in Kafka and why is it replacing ZooKeeper?",
    correctAnswer:
      "KRaft (Kafka Raft) is Kafka's built-in consensus protocol that replaces ZooKeeper for metadata management. It simplifies Kafka's architecture by removing the ZooKeeper dependency, reduces operational complexity, improves scalability (supports millions of partitions), and provides faster controller failover. KRaft became production-ready in Kafka 3.3 and ZooKeeper is deprecated.",
  },
  {
    questionText: "How do you handle message ordering guarantees in Kafka with .NET?",
    correctAnswer:
      "Kafka guarantees ordering within a partition. Use a consistent partition key to ensure related messages go to the same partition. Set max.in.flight.requests.per.connection=1 (or enable idempotence) to prevent out-of-order delivery on retries. In .NET, specify the message key in ProduceAsync() to control partitioning. Note: ordering is not guaranteed across partitions.",
  },
  {
    questionText: "What are the best practices for configuring Kafka producers in .NET for high throughput?",
    correctAnswer:
      "Enable batching with linger.ms (small delay to batch messages), set batch.size appropriately, use compression (gzip, snappy, lz4, zstd), increase buffer.memory for large bursts, enable idempotence for safety, and use async ProduceAsync with proper backpressure handling. Monitor delivery reports for errors. Use multiple producer instances for CPU-bound serialization.",
  },
  {
    questionText: "How do you implement event-driven microservices with Kafka in .NET?",
    correctAnswer:
      "Each microservice publishes domain events to Kafka topics and subscribes to relevant topics from other services. Use MassTransit or custom Confluent.Kafka wrappers for abstraction. Implement the Inbox pattern to handle duplicate messages idempotently. Use consumer groups for scaling. Define clear event schemas with Schema Registry. Handle eventual consistency in the application layer.",
  },
  {
    questionText: "What is Kafka's consumer rebalancing and how does it impact .NET consumers?",
    correctAnswer:
      "Rebalancing occurs when consumers join/leave a group or partitions change. During rebalancing, consumers stop processing, causing latency spikes. Use the CooperativeSticky assignor (partition.assignment.strategy) to minimize partition movements. Handle partition revocation callbacks to commit offsets. Set session.timeout.ms and heartbeat.interval.ms appropriately to avoid unnecessary rebalances.",
  },
  {
    questionText: "How do you secure Kafka communications in a .NET application?",
    correctAnswer:
      "Configure SSL/TLS for encryption in transit (SecurityProtocol=SslPlaintext or SaslSsl). Use SASL mechanisms (PLAIN, SCRAM-SHA-256/512, OAUTHBEARER) for authentication. Configure ACLs on the broker for authorization (topic-level read/write permissions). In .NET, set SslCaLocation, SaslMechanism, SaslUsername, and SaslPassword on the client configuration.",
  },
  {
    questionText: "Explain the concept of Kafka headers and how they are used in .NET.",
    correctAnswer:
      "Kafka headers are key-value metadata attached to messages without affecting the message body. Use them for correlation IDs, message types, source identifiers, tracing context (W3C trace-parent), content type, or routing information. In .NET Confluent.Kafka, set headers via the Headers property on the Message<TKey, TValue> object before producing.",
  },
  {
    questionText: "How do you handle schema evolution in Kafka-based .NET systems?",
    correctAnswer:
      "Use Schema Registry with compatibility rules: BACKWARD (new schema can read old data), FORWARD (old schema can read new data), or FULL (both). Add optional fields with defaults for backward compatibility. Never remove required fields or change field types. In .NET, use Avro or Protobuf serializers with Schema Registry for automatic compatibility checking at produce time.",
  },
  {
    questionText: "What is MassTransit and how does it simplify Kafka usage in .NET?",
    correctAnswer:
      "MassTransit is an open-source distributed application framework for .NET that abstracts message broker interactions. It provides a unified API for Kafka (and RabbitMQ, Azure Service Bus, etc.), supports message routing, sagas/state machines, retry policies, outbox pattern, and consumer pipelines. Configure Kafka as a transport with AddRider() and map topics to message types.",
  },
  {
    questionText: "How do you perform Kafka topic administration programmatically in .NET?",
    correctAnswer:
      "Use the AdminClientBuilder from Confluent.Kafka to create an IAdminClient. Use CreateTopicsAsync() to create topics with partition count and replication factor. Use DescribeTopicsAsync() and GetMetadata() for topic information. Use CreatePartitionsAsync() to add partitions. Use AlterConfigsAsync() to modify topic configurations. Always handle Kafka exceptions for duplicate topics or authorization failures.",
  },
  {
    questionText: "What strategies do you use for testing Kafka-based .NET applications?",
    correctAnswer:
      "Use Testcontainers to spin up Kafka in Docker for integration tests. Mock IProducer and IConsumer interfaces for unit tests. Use an in-memory test harness (e.g., MassTransit InMemoryTestHarness) for consumer logic testing. Test serialization/deserialization separately. Verify idempotency by replaying messages. Use embedded Kafka for CI/CD pipelines.",
  },
  {
    questionText: "How does Kafka compare to other messaging systems like RabbitMQ and Azure Service Bus for .NET applications?",
    correctAnswer:
      "Kafka excels at high-throughput event streaming, log-based retention, and replay capability. RabbitMQ is better for traditional message queuing with complex routing (exchanges, bindings) and lower latency for small messages. Azure Service Bus is a managed cloud service with enterprise features (sessions, dead-lettering, scheduled messages). Choose Kafka for event sourcing and streaming; RabbitMQ/Service Bus for request-reply and task distribution.",
  },
];

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function seed() {
  console.log("🌱 Seeding Kafka category and questions...\n");

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
