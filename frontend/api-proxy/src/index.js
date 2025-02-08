/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request) {
	  const url = new URL(request.url);
  
	  // Handle CORS Preflight (OPTIONS request)
	  if (request.method === "OPTIONS") {
		return new Response(null, {
		  status: 204, // No content
		  headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "*",
		  },
		});
	  }
  
	  // Rewrite the URL to the actual API endpoint
	  const apiUrl = "https://api.apollo.io" + url.pathname.replace(/^\/api_apollo/, "");
  
	  // Forward the request to the actual API
	  const response = await fetch(apiUrl, {
		method: request.method,
		headers: request.headers,
		body: request.body,
	  });
  
	  // Clone the response and add CORS headers
	  const modifiedResponse = new Response(response.body, response);
	  modifiedResponse.headers.set("Access-Control-Allow-Origin", "*");
	  modifiedResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	  modifiedResponse.headers.set("Access-Control-Allow-Headers", "*");
  
	  return modifiedResponse;
	}
  };
