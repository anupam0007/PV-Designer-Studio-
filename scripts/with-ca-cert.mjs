// Runs the given command with NODE_EXTRA_CA_CERTS set, if certs/avast-root-ca.pem
// (or any .pem file in certs/) exists. Some antivirus/firewall tools intercept
// HTTPS with their own certificate, which Node only trusts if NODE_EXTRA_CA_CERTS
// is set *before* the process starts (setting it later, e.g. via .env.local, is
// too late for Node's TLS module).
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const certsDir = path.resolve("certs");
const env = { ...process.env };

if (existsSync(certsDir)) {
  const pemFile = readdirSync(certsDir).find((f) => f.endsWith(".pem"));
  if (pemFile) {
    env.NODE_EXTRA_CA_CERTS = path.join(certsDir, pemFile);
  }
}

const [command, ...args] = process.argv.slice(2);
const result = spawnSync(command, args, { stdio: "inherit", env, shell: true });
process.exit(result.status ?? 0);
