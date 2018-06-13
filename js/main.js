'use strict'
console.log('Starting up');

var gProjs = [

  {
    id: 'book-shop',
    name: 'book-shop',
    title: 'easy-buy',
    desc: 'lorem ipsum',
    publishedAt: Date.now(),
    labels: ['html-5'],
    url: 'projs/book-shop/index.html',
    img: "img/about/book-shop.png"
  },
  {
    id: 'packman',
    name: 'packman',
    title: 'game',
    desc: 'lorem ipsum',
    publishedAt: Date.now(),
    labels: ['html-5'],
    url: 'projs/pacman/pacman-starter/index.html',
    img: "img/about/packman.png"
  },
  {
    id: 'touch-nums',
    name: 'touch-nums',
    title: 'good-game',
    desc: 'lorem ipsum',
    publishedAt: Date.now(),
    labels: ['css'],
    url: 'projs/touch-nums/index.html',
    img: "img/about/touch-nums.png"
  }

];



function renderProjs() {

  var strHTMLs = gProjs.map(function (proj) {
    return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a  onclick = 'openModal("${proj.id}")' class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid img-game" src=${proj.img} alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.desc}</p>
        </div>
      </div>
        `
  })
  document.querySelector('.proj').innerHTML = strHTMLs.join('')
}
renderProjs()

function openModal(projId) {
  console.log('popopopo', projId);

  var modal = $('.modal-body')
  var projs = gProjs.filter(function (proj) {
    return projId === proj.id
  })
  var cuurentProj = projs[0]
  console.log(cuurentProj);

  var str = `
  <h2>${cuurentProj.name}</h2>
  <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
  <img class="img-fluid d-block mx-auto" src="${cuurentProj.img}" alt="">
  <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis
    dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate,
    maiores repudiandae, nostrum, reiciendis facere nemo!</p>
  <ul class="list-inline">
    <li>Date: ${cuurentProj.publishedAt}</li>
    <li>labels: ${cuurentProj.labels}</li>
    <li>name: ${cuurentProj.name}</li>
  </ul>
  <button class="btn btn-primary" data-dismiss="modal" type="button">
    <i class="fa fa-times"></i>
    Close Project</button>

  `
  // modal.show().html(str)
  document.querySelector('.modal-body').innerHTML = str
  console.log(cuurentProj.name);

  // console.log('ooooooooooooooooo',projId)


}

function openEmail() {
  // console.log('baba');
  var su = $('#materialFormContactSubjectEx').val();
  var body = $('#materialFormContactMessageEx').val();
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=naormordechaix@gmail.com&su=${su}&body=${body}`)
}
