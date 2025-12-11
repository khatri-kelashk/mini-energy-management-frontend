import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// Start worker in both dev and production
if (typeof window !== 'undefined') {
  worker.start()
}