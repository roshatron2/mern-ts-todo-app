export const client = (
  endpoint: string,
  { body, ...customConfig }: { body?: any; customConfig?: string[] }
) => {
  const token: string | null = localStorage.getItem("token");
  const headers: any = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(`http://localhost:5000/api/v1${endpoint}`, config).then(async (res) => {
    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
