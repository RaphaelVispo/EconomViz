from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title = "Economics",
    version = "0.0.1",
    debug = False
)

@app.get("/", include_in_schema = False)
def root():
    return "Healthcheck!"

import route

app.include_router(
    route.router,
    tags = ['Linear Regression'],
    prefix= '/api'
)

origins = [
    "https://prompt-flame-production.up.railway.app/"
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
if __name__ == '__main__':
    uvicorn.run("main:app", reload=True, host = '0.0.0.0', port=5000)
