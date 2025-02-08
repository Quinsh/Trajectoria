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
	  
	  // Check if the request is to "/api"
	  if (url.pathname.startsWith("/api_apollo")) {
		// Rewrite the URL to the actual API endpoint
		const newUrl = "https://api.apollo.io" + url.pathname.replace(/^\/api_apollo/, "");
		
		// Forward the request to the actual API
		return fetch(newUrl, {
		  method: request.method,
		  headers: request.headers,
		  body: request.body,
		});
	  }
  
	  return new Response("Not found", { status: 404 });
	},
  };
