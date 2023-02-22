const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    if ("string" === typeof event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      candidate = JSON.stringify(event.partitionKey);
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  return candidate;
};

/**
 * Bad input should be rejected at the start. Otherwise, return should come near the end.
 * Branching should make it easy to see what the alternatives are.
 * The Hashing algortithm creates a key shorter than required, so no length check
 * is required.
 
 */
