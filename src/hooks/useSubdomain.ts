import { useEffect, useState } from "react";

function useSubdomain() {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    const subdomainPart = hostname.split(".")[0];
    setSubdomain(subdomainPart);
  }, [subdomain]);

  return { subdomain };
}

export default useSubdomain;
