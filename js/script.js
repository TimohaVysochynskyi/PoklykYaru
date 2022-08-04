window.onload = setTimeout(function(){
    $("#preloader").slideUp("slow");
}, 2000);

$('.whoarewe').hover( function(){
    function textAnimate(){
        document.getElementById('whoarewe-text').innerHTML = "Мета «Поклик Яру» - виховання відповідальної молоді. <br>Ми переконані, що це найкоротший шлях до процвітання і розвитку нашої Держави. <br>Наша команда — це свідома українська молодь, об'єднана цінностями Побратимства, Дисципліни та Патріотизму."
        document.getElementById('whoarewe-text').style.fontSize = "16px";
        document.getElementById('whoarewe-text').style.fontWeight = "600";
        document.getElementById('whoarewe-text').style.lineHeight = "20px";
        document.getElementById('whoarewe-text').style.textAlign = "left";
        document.getElementById('whoarewe-text').style.paddingLeft = "15vh";
        document.getElementById('whoarewe-text').style.paddingRight= "5vh";
        document.getElementById('whoarewe-text').style.transform = "translateX(-16vw)";
    }
    setTimeout(textAnimate, 400);
    document.getElementById('whoarewe-img').style.transform = "translateX(66vw) scale(1.3)";
    document.getElementById('whoarewe-img').style.transition = "2s";
    document.getElementById('whoarewe-img').style.transitionTimingFunction = "ease";
    if(window.screen.width <= 1000){
        document.getElementById('whoarewe-text').style.padding = "0px";
        document.getElementById('whoarewe-text').style.transform = "translateX(0vw)";
    }
});
$('.whatarewedoing').hover( function(){
    function textAnimate(){
        document.getElementById('whatarewedoing-text').innerHTML = "Наша модель виховання — це систематична і регулярна робота з молоддю протягом років. <br>Ми організовуємо:<br>Табори національно-патріотичного виховання. <br>Освітні, виховні, вишкільні, культурні, туристичні заходи.<br>Популяризуємо історичний регіон Холодний Яр.<br>Волонтерські заходи на підтримку Збройних Сил України"
        document.getElementById('whatarewedoing-text').style.fontSize = "16px";
        document.getElementById('whatarewedoing-text').style.fontWeight = "600";
        document.getElementById('whatarewedoing-text').style.textAlign = "left";
        document.getElementById('whatarewedoing-text').style.lineHeight = "20px";
        document.getElementById('whatarewedoing-text').style.paddingLeft = "10vh";
        document.getElementById('whatarewedoing-text').style.paddingRight= "5vh";
        document.getElementById('whatarewedoing-text').style.transform = "translateX(16vw)";
    }
    setTimeout(textAnimate, 400);
    document.getElementById('whatarewedoing-img').style.transform = "translateX(-68vw) scale(1.3)";
    document.getElementById('whatarewedoing-img').style.transition = "2s";
    document.getElementById('whatarewedoing-img').style.transitionTimingFunction = "ease";
    if(window.screen.width <= 1000){
        document.getElementById('whatarewedoing-text').style.padding = "0px";
        document.getElementById('whatarewedoing-text').style.transform = "translateX(0vw)";
    }
});
function aboutUsHeader(){
    if(window.screen.width > 968){
        if(document.getElementById('aboutusheader2').style.display == "block"){
            document.getElementById('aboutusheader').style.borderRadius = "24.5px";
            document.getElementById('aboutusheader2').style.display = "none";
            document.getElementById('aboutusheader3').style.display = "none";
        }else{
            document.getElementById('aboutusheader').style.borderRadius = "20px 20px 0px 0px";
            document.getElementById('aboutusheader2').style.display = "block";
            document.getElementById('aboutusheader3').style.display = "block";
        }
    }
}
function eventHeader(){
    if(window.screen.width > 968){
        if(document.getElementById('eventheader2').style.display == "block"){
            document.getElementById('eventheader2').style.display = "none";
            document.getElementById('eventheader3').style.display = "none";
            document.getElementById('eventheader4').style.display = "none";
            document.getElementById('eventheader5').style.display = "none";
            document.getElementById('eventheader6').style.display = "none";
            document.getElementById('eventheader7').style.display = "none";
            document.getElementById('eventheader').style.borderRadius = "24.5px";
        } else {
            document.getElementById('eventheader').style.borderRadius = "20px 20px 0px 0px";
            document.getElementById('eventheader2').style.display = "block";
            document.getElementById('eventheader3').style.display = "block";
            document.getElementById('eventheader4').style.display = "block";
            document.getElementById('eventheader5').style.display = "block";
            document.getElementById('eventheader6').style.display = "block";
            document.getElementById('eventheader7').style.display = "block";
        }
    }
}
function merchHeader(){
    if(window.screen.width > 968){
        if(document.getElementById('merchheader2').style.display == "block"){
            document.getElementById('merchheader').style.borderRadius = "24.5px";
            document.getElementById('merchheader2').style.display = "none";
            document.getElementById('merchheader3').style.display = "none";
            document.getElementById('merchheader4').style.display = "none";
        } else {
            document.getElementById('merchheader').style.borderRadius = "20px 20px 0px 0px";
            document.getElementById('merchheader2').style.display = "block";
            document.getElementById('merchheader3').style.display = "block";
            document.getElementById('merchheader4').style.display = "block";
        }
    }
}
function showFeedback(){
    if(document.getElementById('showfeedbackbtn').innerText == "БІЛЬШЕ ВІДГУКІВ"){
        document.getElementById('showfeedbackbtn').innerText = "МЕНШЕ ВІДГУКІВ";
        document.getElementById('feedback__item').style.display = "flex";
        document.getElementById('feedback__item2').style.display = "flex";
        document.getElementById('feedback__item3').style.display = "flex";
        document.getElementById('feedback__item4').style.display = "flex";
        document.getElementById('feedback__item5').style.display = "flex";
        document.getElementById('feedback__item6').style.display = "flex";
        document.getElementById('feedback__item7').style.display = "flex";
        document.getElementById('feedback__item8').style.display = "flex";
        document.getElementById('feedback__item9').style.display = "flex";
    } else{
        document.getElementById('showfeedbackbtn').innerText = "БІЛЬШЕ ВІДГУКІВ";
        document.getElementById('feedback__item4').style.display = "none";
        document.getElementById('feedback__item5').style.display = "none";
        document.getElementById('feedback__item6').style.display = "none";
        document.getElementById('feedback__item7').style.display = "none";
        document.getElementById('feedback__item8').style.display = "none";
        document.getElementById('feedback__item9').style.display = "none";
        if(window.screen.width <= 968){
            document.getElementById('feedback__item').style.display = "none";
            document.getElementById('feedback__item2').style.display = "none";
            document.getElementById('feedback__item3').style.display = "none";
        }
    }
}