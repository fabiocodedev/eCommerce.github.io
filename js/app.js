
// TYPEWRITE -------------------------------------------------------------------------------------------------------------------------

var app = document.getElementById("app");

var typewriter = new Typewriter(app, {
    loop: true,
    delay: 75
});

typewriter.typeString("C'est NOEL, je peux maintenant m'amuser avec : HTML")
.pauseFor(2500)
.deleteChars(4)
.typeString("CSS")
.pauseFor(300)
.deleteChars(3)
.typeString("JAVASCRIPT")
.pauseFor(500)
.start();

// CARDS V1 AVEC TABLEAU + JQUERY + CONCATAINATION DE VARIABLES --------------------------------------------------

var articles = [
    {
      name: "Montre N°1",
      img: "img/montre1.jfif",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.",
      price: "159 €"
    },
    {
      name: "Montre N°2",
      img: "img/montre2.jfif",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.",
      price: "139 €"
    },
    {
      name: "Montre N°3",
      img: "img/montre3.jfif",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.",
      price: "110 €" 
    },
    {
      name: "Montre N°4",
      img: "img/montre4.jfif",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.",
      price: "99 €" 
    },
    {
      name: "Montre N°5",
      img: "img/montre5.jfif",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.",
      price: "159 €" 
    },
    {
      name: "Montre N°6",
      img: "img/montre6.jfif",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.",
      price: "139 €" 
    },
    {
      name: "Montre N°7",
      img: "img/montre7.jfif",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.",
      price: "139  €"
    },
    {
      name: "Montre N°8",
      img: "img/montre8.jfif",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, laboriosam.",
      price: "169 €" 
    }
  ];


  let container = '<div id="container">';
  let ligne = '<div class="article">';
  let card = "";

  $.each(articles, function (index, value) {
  
    card += '<div class="cardArticle">';
    card += '<img class="imgCard" src="'+value.img+'">';
    card += '<div>';
    card += '<h5 class="cardName">'+value.name+'</h5>';
    card += '<p class="cardText">'+value.text+'</p>';
    card += '<div class="cardPrice">Prix: '+value.price+'</div>'
    // card += '<ul class="list-group list-group-flush">';
    // card += '<li class="list-group-item">Prix: '+value.price+'</li>';
    // card += '</ul>';
    card += '<input type="button" class="btn btn-outline-success" value="Ajouter au panier" id="'+index+'">';
    card += '</div>';
    card += '</div>'
  
  })
  
  ligne += card
  container += ligne + "</div>";

  $("body").append(container);


// CARDS V2 AVEC APPEL DE JSON VIA AJAX + CONCATAINATION DE VARIABLES --------------------------------------------------


// $.ajax({
//   url:("json/articles.json"),
//   datatype:"json",
//   success:function (data) {
      
//       // console.log(articles.data);
//       // console.log(data);

//       let container = '<div id="container">';
//       let ligne = '<div class="article">';
//       let card = "";

//       for (let i = 0; i < data.articles.length; i++) {
          
//         var img = data.articles[i].img;
//         var name = data.articles[i].name;
//         var text = data.articles[i].text;
//         var price = data.articles[i].price;

//         card += '<div class="cardArticle">';
//         card += '<img class="imgCard" src="'+img+'">';
//         card += '<div>';
//         card += '<h5 class="cardName">'+name+'</h5>';
//         card += '<p class="cardText">'+text+'</p>';
//         card += '<div class="cardPrice">Prix: '+price+'</div>'
//         card += '<input type="button" class="btn btn-outline-success ajPanier" value="Ajouter au panier" id="'+i+'">';
//         card += '</div>';
//         card += '</div>'
//       };

      
//       ligne += card
//       container += ligne + "</div>";
//       // console.log(listEleve);
      
    
//       $("#cards").html(container)
//   },
//   error:function () {
//   }
// });




// CONTINUER A PARTIR D'ICI -----------------------------------------------------------

  // PANIER ----------------------


  let panierContenu = [];

  $('input[type="button"]').click(function () {
  // $('.ajPanier').click(function () {

      alert('Le produit a été ajouté avec succès !')


     //verifie si le produit existe dans le panier

    var isExist = false;
    var nomArticles = $(this).parent().children("h5").text();
    $.each(panierContenu, function (index, valeur) {
      if (valeur.name === nomArticles) {
        isExist = true;
        valeur.quantite++;
        valeur.prixtotal = valeur.quantite * valeur.prix
      }
    })



//Ajout dans panier

    let getId = $(this).attr('id');
    if (!isExist) {
      panierContenu.push(articles[getId]);
      console.log(panierContenu);
      panierContenu[panierContenu.length - 1].quantite = 1
      panierContenu[panierContenu.length - 1].prixtotal = articles[getId].prix * panierContenu[panierContenu.length - 1].quantite
    }

  
//  //Creation de la liste des produits dans le panier

    let panier = "";
    $.each(panierContenu, function (index, valeur) {
      console.log("index " + index);
      console.log("panier " + panierContenu);
      console.log("liste " + panierContenu[index].name);
      if (panierContenu[index].name != "") {
  
        $("#offcanvas-panier").html(" <div>Voici la liste de vos produits (vous pouvez augmenter la quantité si vous le souhaitez).</div><div><br><div class='row justify-content-around' id='valid-commande'><div class='col-6'><h3 style='display: flex;'>Total :<p id='total'>0 </p>€</h3></div></div>");
  
        $('#valid-commande').append('<div class="col-6"><button id="valid" class="btn btn-primary btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample2" aria-controls="offcanvasExample2">Valider la commande</button></div>');
  
        panier += ' <li class="list-group-item" id="element_' + (index) + '">',
        panier += ' <div class="row justify-content-end">',
        panier += '<div class="col-8 designation"> Désignation : <b>' + valeur.name + '</b> </div> <div class="col-4">'
        panier += '<input type="button" value="supprimer" class="btn btn-sm btn-danger " onclick="deleteProd(\'' + (index) + '\')"></div></div><br>',
        panier += 'Quantité: <input type="number" id="qte_' + (index) + '" min="1" max="10" onchange="changeQuant(\'' + (index) + '\',\'' + valeur.price + '\')" value="' + valeur.quantite + '"><br>',
        panier += '<div style="display: flex;flex-direction: row;">Prix : <b><p id="' + valeur.name + '">' + valeur.price + ' €</p></b></div></li>';
  
  
        var ulListe = $("ul#pan li .designation b");
  
        $.each(ulListe, function (index) {
          if ($(this).text() == nomArticles) {
            $(this).parent().parent().parent().remove();
          }
        })


      // }})}) ---------------------------------------------------------

     



//         //Je vide le panier avant de rajouter la nouvelle liste
  
        $("#pan").empty()
        $("#pan").append(panier)
  


//         /** METTRE A JOUR LE NBRE ARTICLE */

        total = 0
        nbreArticle = 0
        for (let id = 0; id < panierContenu.length; id++) {
          total += panierContenu[id].prixtotal
          nbreArticle += panierContenu[id].quantite
        }
        $('#total').html(total);
        $(".nbreArticle").html(nbreArticle).css('display', 'block')
      }
    })
  })

//   // CHANGEMENT DE QUANTITE

function changeQuant(iddes, prod) {

  panierContenu[iddes].quantite = $('#qte_' + iddes).val();

  panierContenu[iddes].prixtotal = parseInt(prod) * parseInt(panierContenu[iddes].quantite);
  majNbreArticlePanier()
}

function deleteProd(id) {

  panierContenu.splice(id, 1);
  $('#element_' + id).remove()
  majNbreArticlePanier()
}

function majNbreArticlePanier() {
  total = 0
  nbreArticle = 0

  for (let j = 0; j < panierContenu.length; j++) {
    total += panierContenu[j].prixtotal
    nbreArticle += parseInt(panierContenu[j].quantite)
  }
  $('#total').html(total);
  $(".nbreArticle").html(nbreArticle).css('display', 'block')
}



// //finalisation

// function finaliser() {
//   // remplir les infos client
//   $('#final_nom').html('<b> ' + $('#nom').val() + '</b>')
//   $('#final_prenom').html('<b> ' + $('#prenom').val() + '</b>')
//   $('#final_tel').html('<b> ' + $('#tel').val() + '</b>')
//   $('#final_email').html('<b> ' + $('#email').val() + '</b>')
//   $('#final_adresse').html('<b> ' + $('#adresse').val() + '</b>')

//   // remplir le panier :
//   let derniere_liste = "";
//   $("#derniere_liste").empty()
//   panier.forEach(element => {

//     derniere_liste += '<li class="list-group-item">';
//     derniere_liste += '<div class="fw-bold">' + element.nom + '</div>';
//     derniere_liste += ' <div class="row"> <div class="col-6">Prix unitaire :';
//     derniere_liste += ' <b>' + element.prix + '€</b></div><div class="col-6"> ';
//     derniere_liste += ' Quantité : <b>' + element.quantite + '</b></div></div></li>';

//   });
//   $('#derniere_liste').append(derniere_liste)
//   $('#tot_paye').html(total + '€')
// }

// //FINALISER COMMANDE ET PAYER
// $(".finaliser").click(function () {
//   document.location.href = "redirect.html"
// })