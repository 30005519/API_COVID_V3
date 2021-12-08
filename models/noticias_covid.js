const axios = require('axios')
const cheerio = require('cheerio')

const newspapers = [
    {
        "name": "Ponto de Situação Actual em Portugal",
        "adress": "https://covid19.min-saude.pt/ponto-de-situacao-atual-em-portugal/",
        "base" : "https://covid19.min-saude.pt"
    },
    {
        "name": "Em caso de isolamento",
        "adress": "https://covid19.min-saude.pt/wp-content/uploads/2020/03/Folheto-isolamento.pdf",
        "base": "https://covid19.min-saude.pt"
    },
    {
        "name": "FAQs",
        "adress": "https://covid19.min-saude.pt/category/perguntas-frequentes/",
        "base": "https://covid19.min-saude.pt"
    },
    {
        "name": "Sapo",
        "adress": "https://www.sapo.pt/noticias/covid19/",
        "base": "https://www.sapo.pt/noticias/covid19"
    },
    {
        "name": "Público",
        "adress": "https://www.publico.pt/2021/11/13/sociedade/noticia",
        "base": "https://www.publico.pt"
    },
    {
        "name": "DN",
        "adress": "https://www.dn.pt/tag/coronavirus.html",
        "base": "https://www.dn.pt"
    }
]
const articles =[]

newspapers.forEach(newspaper => {
    axios.get(newspaper.adress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            
            $('a:contains("COVID")', html).each(function (){
                const tittle = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    tittle,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
                
        })    

    }).catch((err) => console.log(err))
})

exports.getNews= (req, res) => {
    res.json(articles);
}