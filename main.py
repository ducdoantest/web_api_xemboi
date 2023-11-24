from fastapi import FastAPI, Request, Response, Body, Form, Header, Cookie
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import json
import uvicorn
from fastapi import FastAPI
import zodiac

app = FastAPI()
app.mount("/static",StaticFiles(directory="static"),name="static")

templates = Jinja2Templates(directory="templates")

origins = ["https://ducdoantest.000webhostapp.com/"]
app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)

@app.get("/")
async def root(request: Request, response: Response):
    return templates.TemplateResponse("index.html",{'request':request})

@app.post("/astro_getdata")
async def astro_getdata(request: Request, response: Response):
    payload = await request.body()
    data = json.loads(payload)
    zd = zodiac.zodiac_astro(data['year'],data['month'],data['day'],data['hour'],data['minute'])
    zd.multi_work()
    return(zd.data_planet)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0",port=8000)

