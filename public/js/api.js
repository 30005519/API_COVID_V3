
async function getArticles(){
    var selected = '';
    var ele = document.getElementsByName('btnradio');
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
        selected = ele[i].getAttribute("value")
        }
    }
    const urlBase = "http://localhost:9090/api";
    const listarticles = document.getElementById("articles");
    let texto = "";
    var myHeaders = new Headers();

    var myInit = { methor: "GET", headers: myHeaders };

    var myRequest = new Request(`${urlBase}/noticias_covid`, myInit);
    
    await fetch(myRequest).then(async function (response) {
        if (!response.ok) {
            listarticles.innerHTML =
                "Não posso mostrar noticias de momento!";
        } else {
            articles = await response.json();
            listarticles.innerHTML = "";
            for (const article of articles) {
                texto += `
                <div class="card">
                <div class="card-header">                   
                <h6 class="card-title">${article.tittle}</h6>
                <a href=${article.url}><button style="btn-primary: 20px; padding: 7px; font-size: 16px;">
                Ver noticia</button></a>

                  </div>
             </div>`;
            }
            listarticles.innerHTML = texto;
        }
    });
};
