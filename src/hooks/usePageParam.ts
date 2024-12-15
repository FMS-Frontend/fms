import { useSearchParams } from "react-router-dom";

function usePageParam() {
  const [searchParams] = useSearchParams();
  const page = !Number(searchParams.get("page"))
    ? 1
    : Number(searchParams.get("page"));

  return { page };
}

export default usePageParam;
