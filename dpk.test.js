const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partition key when given a partition key no longer than 256 chars", () => {
    const array = new Array(256);
    array.fill('A');
    const PARTITION_KEY = array.join("");
    const event = {partitionKey: PARTITION_KEY}
    const key = deterministicPartitionKey(event);
    expect(key).toBe(PARTITION_KEY);
  });

  it("returns JSON when passed partition key is not string", () => {
    const PARTITION_KEY = {foo: 42};
    const event = {partitionKey: PARTITION_KEY}
    const key = deterministicPartitionKey(event);
    expect(key).toBe('{"foo":42}');
  });

  it("returns the literal '0' when passed object is not JSON-able", () => {
    const event = null;
    const key = deterministicPartitionKey(event);
    expect(key).toBe("0");
  });

  it("returns shorter hash when passed partition key is longer than 256 chars", () => {
    const array = new Array(257);
    array.fill('A');
    const PARTITION_KEY = array.join("");
    const event = {partitionKey: PARTITION_KEY}
    const key = deterministicPartitionKey(event);
    expect(key.length).toBe(128);
  });

  it("returns hashed value when not passed partition key", () => {
    const event = 42;
    const key = deterministicPartitionKey(event);
    expect(key).toBe("4e94ccd8d7dc0381681ba14408f5a4f7a9834d0101b1e21db1396f9bf431c852a5a3eabd3aeb6195ff3d490625a6ea75d0a7fc3761b20e1fdbc57bd0758286dc");
  });
});
