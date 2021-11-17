/*  abre e fecha o menu quando clicar no icone: hamburguer e x */
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

/* mudar o header da página quando der scroll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    // menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* Testimonials carousel slider swiper */
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
})

/* ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* Botão voltar para o topo */
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/* Menu ativo conforme a seção visível na página */
const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/* When Scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})

/*  */
var requestURL = 'https://api.hgbrasil.com/weather?format=json-cors&key=117a00a3'; //Faz requisição da URL da API

var request = new XMLHttpRequest();
request.open('GET', requestURL); //Get dos dados da API
request.responseType = 'json';
request.send(); //Envia resposta JSON

request.onload = function() { //Função executada ao carregar

    var clima = request.response; //Dados do clima em Json
    var resultados = clima.results //Resultados do clima em Json
    var semana = resultados.forecast //Resultados da semana em Json


    document.getElementById("cidade").innerText = resultados.city //Pega nome da cidade
   document.getElementById("descricao").innerText = resultados.description //Pega descrição do clima
    document.getElementById("data").innerText = resultados.date //Data da previsão
    document.getElementById("temperatura").innerText = resultados.temp + '° C' //temperatura no momento
    document.getElementById("humidity").innerText = 'Umidade: ' + resultados.humidity +'%' //Umidade no momento
    document.getElementById("wind_speedy").innerText = 'Velocidade do Vento: ' + resultados.wind_speedy //velocidade do vento
    document.getElementById("sunrise").innerText = 'Nascer do Sol: ' + resultados.sunrise //horario que o sol nasce
    document.getElementById("sunset").innerText = "Por do sol: " + resultados.sunset //horario em que o sol dorme

    var newRow = document.createElement('tr'); //cria tabela
    newRow.insertCell(0).innerHTML = 'Data';
    newRow.insertCell(1).innerHTML = 'Dia da semana';
    newRow.insertCell(2).innerHTML = 'Temp. Max';
    newRow.insertCell(3).innerHTML = 'Temp. Min';
    newRow.insertCell(4).innerHTML = 'Condição';
    document.getElementById('semana').appendChild(newRow); //insere a tabela na pagina html
for(i=0; i < 6; i++){ //repeticao que extrai os dados da semana e coloca em uma table no html
    var newColum = document.createElement('tr');
    newColum.insertCell(0).innerHTML = semana[i].date
    newColum.insertCell(1).innerHTML = semana[i].weekday
    newColum.insertCell(2).innerHTML = semana[i].max + '° C'
    newColum.insertCell(3).innerHTML = semana[i].min + '° C'
    newColum.insertCell(4).innerHTML = semana[i].description
    document.getElementById('semana').appendChild(newColum)
}
}