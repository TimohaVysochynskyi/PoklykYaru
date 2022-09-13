/*$(document).ready(function(){
    // Добавить плавную прокрутку до всех ссылок
    $('#gototop').on('click', function(event) {
  
      if (this.hash !== "") {

        event.preventDefault();
  
        var hash = this.hash;

        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
          window.location.hash = hash;
        });
      }
    });
  });
*/
if(window.screen.width > 968){
    $('.whoarewe').hover( function(){
        function textAnimate(){
            document.getElementById('whoarewe-text').innerHTML = "Мета «Поклик Яру» - виховання відповідальної молоді. <br><br>Ми переконані, що це найкоротший шлях до процвітання і розвитку нашої Держави. <br><br>Наша команда — це свідома українська молодь, об'єднана цінностями Побратимства, Дисципліни та Патріотизму."
            document.getElementById('whoarewe-text').style.fontSize = "26px";
            document.getElementById('whoarewe-text').style.fontWeight = "600";
            document.getElementById('whoarewe-text').style.textAlign = "left";
            document.getElementById('whoarewe-text').style.transform = "translateX(-25vw)";
            document.getElementById('whoarewe-text').style.width = "85%";
        }
        setTimeout(textAnimate, 400);
        document.getElementById('whoarewe-img').style.transform = "translateX(60vw) scale(1.3)";
        document.getElementById('whoarewe-img').style.transition = "2s";
        document.getElementById('whoarewe-img').style.transitionTimingFunction = "ease";
        if(window.screen.width <= 968){
            document.getElementById('whoarewe-text').style.padding = "0px";
            document.getElementById('whoarewe-text').style.transform = "translateX(0vw)";
        }
    });
    $('.whatarewedoing').hover( function(){
        function textAnimate(){
            document.getElementById('whatarewedoing-text').innerHTML = "Наша модель виховання — це систематична і регулярна робота з молоддю протягом років. <br><br>Ми організовуємо:<br>Табори національно-патріотичного виховання. <br>Освітні, виховні, вишкільні, культурні, туристичні заходи.<br>Популяризуємо історичний регіон Холодний Яр.<br>Волонтерські заходи на підтримку Збройних Сил України"
            document.getElementById('whatarewedoing-text').style.fontSize = "26px";
            document.getElementById('whatarewedoing-text').style.fontWeight = "600";
            document.getElementById('whatarewedoing-text').style.textAlign = "left";
            document.getElementById('whatarewedoing-text').style.transform = "translateX(22vw)";
            document.getElementById('whatarewedoing-text').style.width = "80%";
        }
        setTimeout(textAnimate, 400);
        document.getElementById('whatarewedoing-img').style.transform = "translateX(-60vw) scale(1.3)";
        document.getElementById('whatarewedoing-img').style.transition = "2s";
        document.getElementById('whatarewedoing-img').style.transitionTimingFunction = "ease";
        if(window.screen.width <= 968){
            document.getElementById('whatarewedoing-text').style.padding = "0px";
            document.getElementById('whatarewedoing-text').style.transform = "translateX(0vw)";
        }
    });
}

function whoAreWe() {
    if (window.screen.width < 968) {
        document.getElementById('whoarewe-text').innerHTML = "Мета «Поклик Яру» - виховання відповідальної молоді. <br>Ми переконані, що це найкоротший шлях до процвітання і розвитку нашої Держави. <br>Наша команда — це свідома українська молодь, об'єднана цінностями Побратимства, Дисципліни та Патріотизму."
        document.getElementById('whoarewe-text').style.fontSize = "16px";
        document.getElementById('whoarewe-text').style.fontWeight = "600";
        document.getElementById('whoarewe-text').style.lineHeight = "20px";
        document.getElementById('whoarewe-text').style.textAlign = "left";
    }
}
function whatAreWeDoing() {
    if (window.screen.width < 968) {
        document.getElementById('whatarewedoing-text').innerHTML = "Наша модель виховання — це систематична і регулярна робота з молоддю протягом років. <br>Ми організовуємо:<br>Табори національно-патріотичного виховання. <br>Освітні, виховні, вишкільні, культурні, туристичні заходи.<br>Популяризуємо історичний регіон Холодний Яр.<br>Волонтерські заходи на підтримку Збройних Сил України"
        document.getElementById('whatarewedoing-text').style.fontSize = "16px";
        document.getElementById('whatarewedoing-text').style.fontWeight = "600";
        document.getElementById('whatarewedoing-text').style.lineHeight = "20px";
        document.getElementById('whatarewedoing-text').style.textAlign = "left";
    }
}
function showBorder(){
    document.getElementById('aboutusheader').style.borderColor = "#293C43";
    document.getElementById('aboutusheader').style.borderBottom = "2px solid #293C43";
}
function hideBorder(){
    document.getElementById('aboutusheader').style.borderColor = "rgba(0, 0, 0, 0)";
}
function aboutUsHeader(){
    if(window.screen.width > 968){
        if(document.getElementById('aboutusheader2').style.display == "block"){
            document.getElementById('aboutusheader').style.borderRadius = "24.5px";
            document.getElementById('aboutusheader').style.borderColor = "rgba(0, 0, 0, 0)";
            document.getElementById('aboutusheader2').style.display = "none";
            document.getElementById('aboutusheader3').style.display = "none";
        }else{
            document.getElementById('aboutusheader').style.borderRadius = "20px 20px 0px 0px";
            document.getElementById('aboutusheader').style.borderBottom = "none";
            document.getElementById('aboutusheader').style.borderColor = "#293C43";
            document.getElementById('aboutusheader2').style.display = "block";
            document.getElementById('aboutusheader3').style.display = "block";
        }
    }
}
function eventHeader(){
    if(window.screen.width > 968){
        if(document.getElementById('eventheader2').style.display == "block"){
            document.getElementById('eventheader').style.borderRadius = "24.5px";
            document.getElementById('eventheader').style.borderColor = "rgba(0, 0, 0, 0)";
            document.getElementById('eventheader2').style.display = "none";
            document.getElementById('eventheader3').style.display = "none";
            document.getElementById('eventheader4').style.display = "none";
            document.getElementById('eventheader5').style.display = "none";
            document.getElementById('eventheader6').style.display = "none";
            document.getElementById('eventheader7').style.display = "none";
        } else {
            document.getElementById('eventheader').style.borderRadius = "20px 20px 0px 0px";
            document.getElementById('eventheader').style.borderBottom = "none";
            document.getElementById('eventheader').style.borderColor = "#293C43";
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
            document.getElementById('merchheader').style.borderColor = "rgba(0, 0, 0, 0)";
            document.getElementById('merchheader2').style.display = "none";
            document.getElementById('merchheader3').style.display = "none";
            document.getElementById('merchheader4').style.display = "none";
        } else {
            document.getElementById('merchheader').style.borderRadius = "20px 20px 0px 0px";
            document.getElementById('merchheader').style.borderBottom = "none";
            document.getElementById('merchheader').style.borderColor = "#293C43";
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
        $('.feedback__gradient').fadeOut();
    } else{
        document.getElementById('showfeedbackbtn').innerText = "БІЛЬШЕ ВІДГУКІВ";
        document.getElementById('feedback__item4').style.display = "none";
        document.getElementById('feedback__item5').style.display = "none";
        document.getElementById('feedback__item6').style.display = "none";
        document.getElementById('feedback__item7').style.display = "none";
        document.getElementById('feedback__item8').style.display = "none";
        document.getElementById('feedback__item9').style.display = "none";
        $('.feedback__gradient').fadeIn();
        if(window.screen.width <= 968){
            document.getElementById('feedback__item').style.display = "none";
            document.getElementById('feedback__item2').style.display = "none";
            document.getElementById('feedback__item3').style.display = "none";
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const deadline = new Date(2023, 06, 01);
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      $days.textContent = days < 10 ? '0' + days : days;
      $hours.textContent = hours < 10 ? '0' + hours : hours;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    }
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelector('#days');
    const $hours = document.querySelector('#hours');
    const $minutes = document.querySelector('#minutes');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
});
