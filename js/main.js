'use strict'
console.log('Starting up');


var Proj = function (id, name, desc, publishedAt, url, img) {
  this.id = id;
  this.name = name;
  this.desc = desc;
  this.publishedAt = publishedAt;
  this.url = url;
  this.img = img
}

var projBookShop = new Proj('book-shop', 'book-shop', 'lorem ipsum', Date.now(), 'projs/book-shop/index.html', 'img/about/book-shop.png')
var projToucsNums = new Proj('touch-nums', 'touch-nums', 'lorem ipsum', Date.now(), 'projs/touch-nums/index.html', 'img/about/touch-nums.png')
var projMineSweeper = new Proj('minesweeper', 'minesweeper', 'lorem ipsum', Date.now(), 'projs/minesweeper/index.html', 'img/about/minesweeper.png')
var projGuessMe = new Proj('guess-me', 'guess-me', 'lorem ipsum', Date.now(), 'projs/guess-me/index.html', 'img/about/guess.png')

var gProjs = [projBookShop, projToucsNums, projMineSweeper,projGuessMe]


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
  <a href = "${cuurentProj.url}"> Click me!</a>
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
