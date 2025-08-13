// Central API base. Change here (or set VITE_API_BASE) to retarget all API requests.
type ViteEnv = { [key: string]: string | undefined };
const viteEnv: ViteEnv = (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: ViteEnv }).env) || {};
export const apiDomain: string = viteEnv.VITE_API_BASE ?? "http://localhost:3000/api";

// Optional helper to build URLs safely
export const apiUrl = (path: string) =>
    `${apiDomain}${path.startsWith('/') ? '' : '/'}${path}`;