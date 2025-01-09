// mocks/browser.ts
import { setupWorker } from "msw/browser";
import { handlers } from "./mockHandlers";

export const worker = setupWorker(...handlers);
