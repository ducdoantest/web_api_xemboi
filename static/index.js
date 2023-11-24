// ------------------------------------------------

function gieoQue(){
    var quegoc = quebien = ''
    for(i =0;i < 6; i++){
        var hao1 = Math.random()>=0.5? 1:0
        var hao2 = Math.random()>=0.5? 1:0
        var hao3 = Math.random()>=0.5? 1:0
        switch(hao1+hao2+hao3){
            case 0:
                quegoc += '0'
                quebien += '1'
                break
            case 1:
                quegoc += '1'
                quebien += '1'
                break
            case 2:
                quegoc += '0'
                quebien += '0'
                break
            case 3:
                quegoc += '1'
                quebien += '0'
                break
        }
    }
    return [quegoc,quebien]
}        
function napGiap(que){
    var napgiap=[]
    switch(que.slice(0,3)){
        case '111':
            napgiap = napgiap.concat([0,2,4])
            break
        case '100':
            napgiap = napgiap.concat([0,2,4])
            break
        case '010':
            napgiap = napgiap.concat([2,4,6])
            break
        case '001':
            napgiap = napgiap.concat([4,6,8])
            break
        case '000':
            napgiap = napgiap.concat([7,5,3])
            break
        case '101':
            napgiap = napgiap.concat([3,1,11])
            break
        case '011':
            napgiap = napgiap.concat([1,11,9])
            break
        case '110':
            napgiap = napgiap.concat([5,3,1])
            break  
    }
    switch(que.slice(3)){
        case '111':
            napgiap = napgiap.concat([6,8,10])
            break
        case '100':
            napgiap = napgiap.concat([6,8,10])
            break
        case '010':
            napgiap = napgiap.concat([8,10,0])
            break
        case '001':
            napgiap = napgiap.concat([10,0,2])
            break
        case '000':
            napgiap = napgiap.concat([1,11,9])
            break
        case '101':
            napgiap = napgiap.concat([9,7,5])
            break
        case '011':
            napgiap = napgiap.concat([7,5,3])
            break
        case '110':
            napgiap = napgiap.concat([11,9,7])
            break  
    }
    // console.log(napgiap)
    return napgiap            
}
function anLucThan(que){
    var que1 = que
    var dem = 0
    console.log(que1)
    console.log(!quaichu.includes(que1))
    TU.T = 5
    TU.U = 2
    while(!quaichu.includes(que1)){
        dem+=1
        if(dem<6){
            var chrp = que1[dem-1]=='0'? '1':'0'
            que1 = que1.substring(0,dem-1) + chrp + que1.substring(dem)
            TU.T = dem-1
            TU.U = (dem-1+3)%6
        }    
        if(dem==6){
            var chrp = que1[3]=='0'? '1':'0'
            que1 = que1.substring(0,3) + chrp + que1.substring(4)
            TU.T = 3
            TU.U = 0
        }
        if(dem==7){
            var chrp3 = que1[2]=='0'? '1':'0'
            var chrp2 = que1[1]=='0'? '1':'0'
            var chrp1 = que1[0]=='0'? '1':'0'
            que1 = chrp1 + chrp2 + chrp3 + que1.substring(3)
            TU.T = 2
            TU.U = 5
            break
        }                               
    }
    lucthan=[]
    if(que1=="111111"||que1=="110110"){lucthan = lucthan.concat([kim,thuy,moc,hoa,tho])}
    if(que1=="010010"){lucthan = lucthan.concat([thuy,moc,hoa,tho,kim])}
    if(que1=="101101"){lucthan = lucthan.concat([hoa,tho,kim,thuy,moc])}
    if(que1=="100100"||que1=="011011"){lucthan = lucthan.concat([moc,hoa,tho,kim,thuy])}
    if(que1=="000000"||que1=="001001"){lucthan = lucthan.concat([tho,kim,thuy,moc,hoa])}
    console.log(lucthan)
}
function veQue(quegoc,quebien){
    context.font = "16px Arial"
    ngquegoc = napGiap(quegoc)
    ngquebien = napGiap(quebien)
    nhat_nguyet = Ngay_Julius()
    console.log(nhat_nguyet)
    
    context.fillStyle = "#000000"
    context.fillText(nhat_nguyet[0], col1,hqtext-35*7)
    context.fillStyle = nguhanh[diachi.indexOf(nhat_nguyet[1])]
    context.fillText(nhat_nguyet[1], col1+50,hqtext-35*7)
    context.fillStyle = nguhanh[diachi.indexOf(nhat_nguyet[2])]
    context.fillText(` /  ${nhat_nguyet[2]}`, col1+90,hqtext-35*7)
    context.fillText(`Tiết khí: ${nhat_nguyet[3]}`, col1,hqtext-35*8)

    for(i=0;i<6;i++){
        context.fillStyle = quegoc[i]==quebien[i]? "#000000": "#FF0000"
        if(quegoc[i]=='1'){
            context.fillRect(col3, hq-35*i,100, 13)
        }else{
            context.fillRect(col3, hq-35*i,40, 13)
            context.fillRect(col3+60, hq-35*i,40, 13)
        }
        context.fillStyle = "#000000"
        TU.T == i? context.fillText("T", col1,hqtext-35*i):console.log()
        TU.U == i? context.fillText("Ư", col1,hqtext-35*i):console.log()
        context.fillStyle = nguhanh[ngquegoc[i]]
        context.fillText(diachi[ngquegoc[i]], col4,hqtext-35*i)
        for(m=0;m<5;m++){
            if(lucthan[m].includes(ngquegoc[i])){
                context.fillText(lucthan0[m], col2,hqtext-35*i)
            } 
        }
        if(quegoc[i]!=quebien[i]){
            context.fillStyle = nguhanh[ngquebien[i]]
            context.fillText(diachi[ngquebien[i]], col5,hqtext-35*i)
        }                
    }         
}
// ------------------------------------------- Tính ngày tháng Can,Chi,Tiết khi ---------------------------
function Ngay_Julius(){            
    var date = new Date();
    var mo = date.getMonth() + 1;
    var dy = date.getDate();
    var yr = date.getFullYear();
    var a = Math.trunc((14-mo)/12)
    var y = yr + 4800 - a
    var m = mo + (12*a) - 3
    var JDN = dy + Math.trunc((153*m +2)/5) + 365*y + Math.trunc(y/4) - Math.trunc(y/100) + Math.trunc(y/400) - 32045
    // var JDN0 = dy + Math.trunc((153*m +2)/5) + 365*y + Math.trunc(y/4) - 32083
    var can_ngay = thiencan[(JDN + 9)%10]
    var chi_ngay = diachi[(JDN + 1)%12]

    var T, T2, dr, M, L0, DL, L;
    T = (JDN - 2451545.5 - 7/24) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
    T2 = T*T;
    dr = Math.PI/180; // degree to radian
    M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T*T2; // mean anomaly, degree
    L0 = 280.46645 + 36000.76983*T + 0.0003032*T2; // mean longitude, degree
    DL = (1.914600 - 0.004817*T - 0.000014*T2)*Math.sin(dr*M);
    DL = DL + (0.019993 - 0.000101*T)*Math.sin(dr*2*M) + 0.000290*Math.sin(dr*3*M);
    L = L0 + DL; // true longitude, degree
    L = L*dr;
    L = L - Math.PI*2*(Math.trunc(L/(Math.PI*2))); // Normalize to (0, 2*PI)
    // return INT(L / Math.PI * 6)
    degree_tietkhi = Math.trunc((L / Math.PI) * 12)        
    var tietkhi_ngay = tietkhi[degree_tietkhi]
    var chi_thang = diachi[Math.trunc(((degree_tietkhi + 7)%24)/2)]
    return [can_ngay,chi_ngay,chi_thang,tietkhi_ngay]
}

const hq = 290
const hqtext = 303
const col1 = 50
const col2 = 75
const col3 = 100
const col4 = 220
const col5 = 280
const quaichu = ["111111","010010","100100","001001","000000","011011","101101","110110"]        
const diachi = ["Tí","Sửu","Dần","Mão","Thìn","Tị","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"]
const thiencan = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"]
const nguhanh = ["#000000","#ab3d00","#00674b","#00674b","#ab3d00","#FF0000","#FF0000","#ab3d00","#b1b1b1","#b1b1b1","#ab3d00","#000000"]
const tietkhi = ['Xuân phân','Thanh minh','Cốc vũ','Lập hạ', 'Tiểu mãn', 'Mang chung', 
    'Hạ chí', 'Tiểu thử', 'Đại thử', 'Lập thu', 'Xử thử', 'Bạch lộ', 'Thu phân', 'Hàn lộ', 
    'Sương giáng', 'Lập đông', 'Tiểu tuyết', 'Đại tuyêt', 'Đông chí', 'Tiểu hàn', 'Đại hàn', 
    'Lập xuân', 'Vũ thủy', 'Kinh chập']
const hoa = [5,6]
const thuy = [0,11]
const tho = [1,4,7,10]
const kim = [8,9]
const moc = [2,3]
const lucthan0 = ["H","T","Th","Q","P"]
var lucthan = []
var TU = {}
const btn_gieoque = document.getElementById("Gieoque")
const mycanvas = document.getElementById("myCanvas")
const context = mycanvas.getContext("2d")
btn_gieoque.addEventListener("click",()=>{
    if(document.readyState != "loading"){
        que = gieoQue()
        context.clearRect(0,0,context.canvas.width,context.canvas.height)
        anLucThan(que[0])  
        veQue(que[0],que[1])                    
    }            
})

// --------------------------------------- REQUEST API ASTRO + ZODIAC ----------------------------
const zodiac_color = {"Bạch Dương":"text-red-600","Kim Ngưu":"text-green-700","Song Tử":"text-amber-500","Cự Giải":"text-blue-600",
"Sư Tử":"text-red-600","Xử Nữ":"text-green-700","Thiên Bình":"text-amber-500","Bọ Cạp":"text-blue-600","Nhân Mã":"text-red-600",
"Ma Kết":"text-green-700","Bảo Bình":"text-amber-500","Song Ngư":"text-blue-600"}
const btn_Chiemtinh_getdata = document.getElementById("Chiemtinh_getdata")
var astro_table = document.getElementById("astro_table")
var astro_day = document.getElementById("astro_day")
var astro_month = document.getElementById("astro_month")
var astro_year = document.getElementById("astro_year")
var astro_hour = document.getElementById("astro_hour")
var astro_minute = document.getElementById("astro_minute")
function input_astro_Err(){astro_table.innerHTML=`<span class="text-red-700">Nhập dữ liệu không đúng</span>`}
btn_Chiemtinh_getdata.addEventListener("click",()=>{
    if(astro_day.value<0 || astro_day.value>31 || astro_day.value=="") return input_astro_Err();
    if(astro_month.value<0 || astro_month.value>12 || astro_month.value=="") return input_astro_Err();
    if(astro_year.value=="") return input_astro_Err();
    if(astro_hour.value<0 || astro_hour.value>24 || astro_hour.value=="") return input_astro_Err();
    if(astro_minute.value<0 || astro_minute.value>59 || astro_minute.value=="") return input_astro_Err();
    astro_table.innerHTML = `<tr><svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>&nbsp;... Chờ 5 giây</tr>`
    try{
        fetch("http://localhost:8000/astro_getdata",{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({'year':astro_year.value,'month':astro_month.value,'day':astro_day.value,
                'hour': astro_hour.value,'minute':astro_minute.value})
        })
        .then(x=>x.json())
        .then(data =>{
            astro_table.innerHTML = ''
            for( let planet of Object.keys(data)){                
                astro_table.innerHTML = astro_table.innerHTML + `
                    <tr class="${zodiac_color[data[planet]['zodiac']]} drop-shadow-md"><td>${planet}</td><td>${data[planet]['zodiac']}</td><td>&nbsp;&nbsp;${data[planet]['position']}&deg;</td></tr>
                `;
            }
            astro_table.innerHTML = astro_table.innerHTML+`
            <tr class="text-xs"><td colspan="3">.</td></tr>
            <tr class="text-xs"><td colspan="3">dữ liệu từ NASA</td></tr>
            <tr class="text-xs"><td colspan="3">https://ssd.jpl.nasa.gov/horizons/tutorial.html</td></tr>`
        })
    }catch(error){
        console.log(error)
        astro_table.innerHTML = 'Hệ thống gặp sự cố, vui lòng quay lại sau.'
    }
})

// ------------------------------------------- đồng hồ online ---------------------------
function showTime(){
    var date = new Date();
    var mo = date.getMonth() + 1;
    var dy = date.getDate();
    var yr = date.getFullYear();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
                
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var dayy =dy + "-"+mo+"-"+yr;
    var time = h + ":" + m + ":" + s;
    var clocks = document.querySelectorAll('[name="clock"]');
    for (let clock of clocks){
        clock.innerHTML = `<span>${dayy}&emsp; ${time}</span>`;
    }
    // document.getElementById("MyClockDisplay").innerText = time;
    // document.getElementById("MyClockDisplay").textContent = time;            
    setTimeout(showTime, 1000);            
}
showTime();

