var data = null;

document.addEventListener("DOMContentLoaded", function(event) {
    $.getJSON("./bingo.json", function(json) {
        data = json;
        addTours(json);
    });
});

function addTours(json){
    const tourSelect = document.getElementById('cardTourSel');

    for (var i = 0; i < Object.keys(json).length; i++){
        var opt = document.createElement('option');
        var obj = Object.keys(json)[i]
        opt.value = obj;
        opt.innerHTML = json[obj].title;
        tourSelect.appendChild(opt);
    }
}

function bingoCreate(){
    console.log("Card Created!");

    const oldCard = document.getElementById('bingoTable');
    if( oldCard !== null)
    {
        oldCard.remove();
    }
    const card = document.createElement('table');
    var cardSize = parseInt(document.querySelector('#cardSizeSel').value);
    var tourSel = document.querySelector("#cardTourSel").value;
    var cellGen = randomNoRepeats(data[tourSel].cells);

    card.setAttribute("id", "bingoTable")

    const bH =card.insertRow();
    bH.setAttribute('id', 'bingoHead');
    const bHC = bH.insertCell();
    bHC.setAttribute('colspan', cardSize);
    bHC.innerHTML = "MvM Bingo";

    const bT = card.insertRow();
    bT.setAttribute('id', 'bingoTour');
    const bTC = bT.insertCell();
    bTC.setAttribute('colspan', cardSize);
    bTC.innerHTML = data[tourSel].title;

    for (let i = 0; i < cardSize; i++){
        const tr = card.insertRow();
        for (let i = 0; i < cardSize; i++){
            const cl = tr.insertCell();
            cl.innerHTML = cellGen();
            cl.setAttribute('onclick', "cellColor(this)");
        }
    }
    document.getElementById('bingoCard').appendChild(card);
}

function cellColor(ele){
    console.log(ele.style.backgroundColor)
    if (ele.style.backgroundColor !== 'rgb(94, 209, 124)'){
        ele.style.backgroundColor = 'rgb(94, 209, 124)';
    } else {
        ele.style.backgroundColor = '#dddddd';
    }
}

function randomNoRepeats(array) {
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
}

function saveBingo(){
    html2canvas(document.querySelector("#bingoTable")).then(canvas => {
        //document.body.appendChild(canvas)
        var anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "MvMBingo.PNG";
        anchor.click(); 
    });
}