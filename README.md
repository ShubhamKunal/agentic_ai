### Constants needed in .env file:

```
PORT
GEMINI_API_KEY
WEB_SEARCH_API_KEY
WEB_SEARCH_API_URL
WEB_SEARCH_CX

```

### To test the server:

```
curl -N -H "Content-Type: application/json" \\
   -X POST \\
   -d '{"query”:”State of AI in 2025?"}’ \\
   <http://localhost:3000/chat>

```
