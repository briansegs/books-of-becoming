/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as _utils from "../_utils.js";
import type * as entries from "../entries.js";
import type * as entry from "../entry.js";
import type * as http from "../http.js";
import type * as journal from "../journal.js";
import type * as journals from "../journals.js";
import type * as lib_journalSchema from "../lib/journalSchema.js";
import type * as user from "../user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  _utils: typeof _utils;
  entries: typeof entries;
  entry: typeof entry;
  http: typeof http;
  journal: typeof journal;
  journals: typeof journals;
  "lib/journalSchema": typeof lib_journalSchema;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
