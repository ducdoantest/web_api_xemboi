import requests
import re
import threading
from time import sleep

class zodiac_astro:

	def __init__(self, year,month,day,hour=12,minute=0):
		# -------- Sun; Moon; Mercury; Venus; Mars; Jupiter; Saturn; Uranus; Neptune; Pluto
		self.data_planet = {'Sun':{'id_planet':10}, 'Moon':{'id_planet':301}, 'Mercury':{'id_planet':199}, 
		'Venus':{'id_planet':299}, 'Mars':{'id_planet':499}, 'Jupiter':{'id_planet':599}, 'Saturn':{'id_planet':699}, 
		'Uranus':{'id_planet':799}, 'Neptune':{'id_planet':899}, 'Pluto':{'id_planet':999}}

		# self.data_planet = {'Sun':{'id_planet':10}}
		self.zodiacs = ["Bạch Dương","Kim Ngưu","Song Tử","Cự Giải","Sư Tử","Xử Nữ","Thiên Bình",
		"Bọ Cạp","Nhân Mã","Ma Kết","Bảo Bình","Song Ngư"]

		self.year = year
		self.month = month
		self.day = day
		self.hour = hour
		self.minute = minute
		
	def get_astro_nasa_data(self,planet):
		url = 'https://ssd.jpl.nasa.gov/api/horizons.api'
		url += "?format=text"
		url += "&COMMAND='{}'".format(self.data_planet[planet]['id_planet'])
		url += "&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='500@399'"
		url += "&TLIST='{}-{}-{} {}:{}:00.0'".format(self.year,self.month,self.day,self.hour,self.minute)
		url += "&QUANTITIES='1'"

		response = requests.get(url)
		patten = '\$\$SOE([\s\S]*)\$\$EOE'
		rs = re.findall(patten, response.text)
		rs_fnl = rs[0].strip().split("     ")[1].split(" ")

		gio = float(rs_fnl[0])+float(rs_fnl[1])/60+float(rs_fnl[2])/3600
		self.data_planet[planet]['zodiac'] = self.zodiacs[int(gio//2)]
		self.data_planet[planet]['position'] = round((gio%2)*15,2)
	def multi_work(self):
		worker={}
		for planet in self.data_planet:
			worker['worker-{}'.format(planet)] = threading.Thread(target=self.get_astro_nasa_data,args=(planet,))
		for w in worker:
			worker[w].start()
			sleep(0.08)
			while threading.active_count() >=6:
				sleep(0.01)
				# print(threading.active_count())
		for w in worker:
			worker[w].join()

if __name__ == '__main__':
	# zodiac = zodiac_astro
	zodiac = zodiac_astro(2023,11,23,8,30)
	# zodiac.get_astro_nasa_data()
	zodiac.multi_work()
	print(zodiac.data_planet)


# rs =requests.get("http://34.124.248.69:8000")
# print(rs)


