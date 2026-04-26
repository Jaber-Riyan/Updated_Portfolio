import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * RTK Query API placeholder for future backend integration.
 *
 * Currently uses fakeBaseQuery because content is managed via Redux + localStorage.
 * When a real backend API is ready:
 *   1. Replace `fakeBaseQuery` with `fetchBaseQuery({ baseUrl: '/api' })`
 *   2. Uncomment and implement each endpoint
 *   3. Remove localStorage persistence middleware
 *   4. Add authentication headers via prepareHeaders
 *
 * Example with real backend:
 *
 *   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 *
 *   export const portfolioApi = createApi({
 *     reducerPath: "portfolioApi",
 *     baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
 *     tagTypes: ["Portfolio"],
 *     endpoints: (build) => ({
 *       getPortfolio: build.query<PortfolioContent, void>({
 *         query: () => "portfolio",
 *         providesTags: ["Portfolio"],
 *       }),
 *       updateHero: build.mutation<PortfolioContent, Partial<PortfolioContent["hero"]>>({
 *         query: (body) => ({ url: "portfolio/hero", method: "PUT", body }),
 *         invalidatesTags: ["Portfolio"],
 *       }),
 *       // ...
 *     }),
 *   });
 */

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Portfolio"],
  endpoints: () => ({}),
});

export default portfolioApi;
