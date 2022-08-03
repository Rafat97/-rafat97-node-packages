interface ProxyHeader {
  "x-forwarded-host": string;
  "x-forwarded-proto": string;
  "x-forwarded-port": string | number | undefined;
  "x-forwarded-path": string;
  "x-forwarded-prefix": string | undefined;
  "x-real-ip": string | undefined;
}

export const getProxyHostName = (header: ProxyHeader): string | undefined => {
  const {
    "x-forwarded-host": host,
    "x-forwarded-path": path,
    "x-forwarded-port": port,
  } = header;
  const hostName = `${host}:${port}${path}`;
  return hostName || undefined;
};
