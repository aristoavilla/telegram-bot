const BASE_URL = (token: string) => `https://api.telegram.org/bot${token}`;

interface FetchInstance {
  get(method: string, params: Record<string, string>): Promise<unknown>;
  post(method: string, body: unknown): Promise<unknown>;
}

async function getFetchInstance(token: string): Promise<FetchInstance> {
   const baseUrl = BASE_URL(token);
   return {
    async get(method: string, params: Record<string, string>) {
        const url = new URL(`${baseUrl}/${method}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url).then(res => res.json());
        return response
    },
    async post(method: string, body: unknown) {
        const url = `${baseUrl}/${method}`;
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
