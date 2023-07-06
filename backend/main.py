from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, dotenv_values

load_dotenv()

config = dotenv_values(".env") 

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
    config["ORIGIN"]
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
