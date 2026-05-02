// WooCommerce REST API proxy
// Keeps consumer key/secret server-side. Client calls this function instead of WooCommerce directly.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

const ALLOWED_METHODS = new Set(["GET", "POST", "PUT", "DELETE"]);

// Allowlist of WooCommerce REST resources the client may hit through the proxy.
// Add more as needed (e.g. "orders", "customers"). Keep it tight.
const ALLOWED_PREFIXES = [
  "products",
  "products/categories",
  "products/tags",
  "products/attributes",
  "products/reviews",
];

function isAllowedResource(resource: string): boolean {
  return ALLOWED_PREFIXES.some(
    (p) => resource === p || resource.startsWith(p + "/"),
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!ALLOWED_METHODS.has(req.method)) {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const storeUrl = Deno.env.get("WC_STORE_URL");
  const ck = Deno.env.get("WC_CONSUMER_KEY");
  const cs = Deno.env.get("WC_CONSUMER_SECRET");

  if (!storeUrl || !ck || !cs) {
    return new Response(
      JSON.stringify({ error: "WooCommerce credentials not configured" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    const url = new URL(req.url);
    // Path after the function name: /functions/v1/wc-proxy/<resource...>
    const parts = url.pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("wc-proxy");
    const resource = idx >= 0 ? parts.slice(idx + 1).join("/") : "";

    if (!resource || !isAllowedResource(resource)) {
      return new Response(
        JSON.stringify({ error: "Resource not allowed", resource }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const base = storeUrl.replace(/\/+$/, "");
    const target = new URL(`${base}/wp-json/wc/v3/${resource}`);

    // Forward query params (filters, pagination, etc.)
    url.searchParams.forEach((v, k) => target.searchParams.append(k, v));

    const auth = "Basic " + btoa(`${ck}:${cs}`);
    const init: RequestInit = {
      method: req.method,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    if (req.method !== "GET" && req.method !== "DELETE") {
      const text = await req.text();
      if (text) init.body = text;
    }

    const wcRes = await fetch(target.toString(), init);
    const body = await wcRes.text();

    return new Response(body, {
      status: wcRes.status,
      headers: {
        ...corsHeaders,
        "Content-Type":
          wcRes.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Proxy error", detail: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
