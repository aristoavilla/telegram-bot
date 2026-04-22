const token = "8627262249:AAGP9v_gm-muz5ppG8gZbGOZgHkjcIa9AEk"
const BASE_URL = `https://api.telegram.org/bot${token}`;

interface FetchInstance {
  get(method: string, params: Record<string, string>): Promise<unknown>;
  post(method: string, body: unknown): Promise<unknown>;
}

async function getFetchInstance(): Promise<FetchInstance> {
   return {
    async get(method: string, params: Record<string, string>) {
        const url = new URL(`${BASE_URL}/${method}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url).then(res => res.json());
        return response
    },
    async post(method: string, body: unknown) {
        const url = `${BASE_URL}/${method}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json());
        return response
      }
   }
}

export default getFetchInstance;
