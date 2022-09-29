
//inicia os items
const items = [
    {   
        id:0,
        nome:'Camiseta',
        preco: 39.90,
        codigo:'0',
        embalagem:'emb',
        multiplo: 1,
        ipi: 1,
        quantidade: 0

    },
    {
        id:1,
        nome:'Short',
        preco:19.90,
        codigo:'1',
        embalagem:'emb',
        multiplo: 1,
        ipi: 1,
        quantidade: 0

    },
    {
        id:2,
        nome:'Calça',
        preco:99.90,
        codigo:'3',
        embalagem:'emb',
        multiplo: 1,
        ipi: 2,
        quantidade: 0

    },
    {
        id:3,
        nome:'Casaco',
        preco:120.00,
        codigo:'4',
        embalagem:'emb',
        multiplo: 1,
        ipi: 3,
        quantidade: 0

    },
    {
        id:4,
        nome:'Chinelo',
        preco:15.50,
        codigo:'5',
        embalagem:'emb',
        multiplo: 1,
        ipi: 4,
        quantidade: 0

    },
    {
        id:5,
        nome:'Tênis',
        preco:129.99,
        codigo:'6',
        embalagem:'emb',
        multiplo: 1,
        ipi: 5,
        quantidade: 0

    },
    {
        id:6,
        nome:'Carteira',
        preco:29.99,
        codigo:'7',
        embalagem:'emb',
        multiplo: 1,
        ipi: 6,
        quantidade: 0

    },
    {
        id:7,
        nome:'Relógio',
        preco:219.90,
        codigo:'8',
        embalagem:'emb',
        multiplo: 1,
        ipi: 7,
        quantidade: 0

    },
    {
        id:8,
        nome:'Bolsa',
        preco:189.00,
        codigo:'9',
        embalagem:'emb',
        multiplo: 1,
        ipi: 8,
        quantidade: 0

    },
    {
        id:9,
        nome:'Perfume',
        preco:180.50,
        codigo:'10',
        embalagem:'emb',
        multiplo: 3,
        ipi: 9,
        quantidade: 0

    },
    {
        id:10,
        nome:'Jaqueta de couro',
        preco:250.00,
        codigo:'11',
        embalagem:'emb',
        multiplo: 2,
        ipi: 10,
        quantidade: 0,

    },

]


//inicia a "loja" com os produtos
inicializarLoja = () => {
    var containerProdutos = document.getElementById('produtos');
    items.map((val)=>{
        containerProdutos.innerHTML+= `
        
        <div class="produto-single, linha">
            <div class="coluna-nomes">`+val.nome+`</div>
            <div class="coluna-nomes">`+val.preco+`</div>
            <div class="coluna-nomes">`+val.codigo+`</div>
            <div class="coluna-nomes">`+val.embalagem+`</div>
            <div class="coluna-10">`+val.multiplo+`</div>
            <div class="coluna-10">`+val.ipi+`</div>
            <a Key="`+val.id+`" href="#"  class="icone" style="text-decoration: none; margin-top: 10px; margin-left:2%;"><img  src="shopping-cart.png" style="width:20px; height:20px;"></a>

        </div>
        
        `;
    })
}

inicializarLoja();



// Atualiza o carrinho de acordo com as adições, calcula o preço total e chama atualizaCarrinho()
atualizarCarrinho = (items) =>{
    var containerCarrinho = document.getElementById('carrinho');
    var totalgeral = 0

    containerCarrinho.innerHTML = ""
    containerCarrinho.innerHTML+= `
    <h2 style="margin-top: 25px;">Carrinho</h2>`
    
    items.map((val)=>{
        var quantidadetotal = (val.quantidade*val.multiplo)
        var totalsemtaxa = (val.preco * quantidadetotal)
        var total = (val.preco  + (val.preco * (val.ipi/100)))  * quantidadetotal
        totalgeral+=total
        if(val.quantidade > 0){
        containerCarrinho.innerHTML+= `

        <div class="produto-single, linha">
            <div class="coluna-10">`+val.nome+`:</div>
            <div class="coluna-10" style="margin-left:20px;">Qtd: `+quantidadetotal+`</div>
            <div class="coluna-20"> R$ `+val.preco+`  x  `+quantidadetotal+`</div>
            <div class="coluna-20">Total sem Ipi: R$ `+totalsemtaxa.toFixed(2)+`</div>
            <div class="coluna-20">Total com Ipi: R$ `+total.toFixed(2)+`</div>
        </div>
        `;
        precototal(totalgeral)

        }

    })

    return true
}

//Mostra o preço total recebendo da função Atualiza carrinho, e o botão de finalizar
precototal = (total) => {
    var containerCarrinho = document.getElementById('totalgeral');
    containerCarrinho.innerHTML = ""

    containerCarrinho.innerHTML+= `
    <div class="teste">
        <div style="text-align:center; padding-top:20px; width:50%;">
            Total dos Produtos: R$ `+total.toFixed(2)+` 
        </div>  
        <div style="width:50%; padding-top:10px;text-align:center;">
        <button class="button"><a href="">Finalizar</a></button>
        </div>
    </div>
    
    
    `;
}

var links = document.getElementsByTagName('a');

for(var i = 0; i < links.length; i++){
    links[i].addEventListener("click", function(){
        let key = this.getAttribute('key');
        items[key].quantidade++;
        atualizarCarrinho(items);
        console.log('entrou')

        return false;
    })
}


//===================================================
// Controle de paginação (não finalizado)(funciona se o valor "data" abaixo for setado
//                                         mas não chama os items e seus dados)


//const data = Array.from({length: items.length})
let perPage = 10
const state = {
    page: 1,
    perPage: 10,
    totalPage: Math.ceil(data.length/ perPage),
    maxVisibleButtons: 3
}


const html = {
    get(element){
        return document.querySelector(element)
    }
}


const controls = {
    next() {
        state.page++

        const lastPage = state.page > state.totalPage

        if(lastPage){
            state.page--
        }
    },

    prev() {
        state.page--

        if(state.page < 1){
            state.page++
        }
    },

    goTo(page) {

        if(page < 1){
            page = 1
        }

        state.page = +page

        if(page > state.totalPage){
            state.page = state.totalPage
        }
    },

    createListeners(){
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            update()
        })
        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage)
            update()
        })
        html.get('.next').addEventListener('click', () => {
            controls.next()
            update()
        })
        html.get('.prev').addEventListener('click', () => {
            controls.prev()
            update()
        })
    }
}

const list ={
    create(items){
        const div = document.createElement('div')
        div.classList.add('item')
        div.innerHTML = items

        html.get('.produtos').appendChild(div)
    },
    update(){
        html.get('.produtos').innerHTML = ""

        let page = state.page -1

        let start = page * state.perPage
        let end = start + state.perPage

        const paginatedItems = data.slice(start, end)

        paginatedItems.forEach(list.create)
    }
}

const buttons = {
    element: html.get('.numbers')
,
    create(number){
        const button = document.createElement('div')

        button.innerHTML = number;

        if(state.page == number){
            button.classList.add('active')
        }

        button.addEventListener('click',(event)=>{
            const page = event.target.innerText

            controls.goTo(page)
            update()
        })

        buttons.element.appendChild(button)

    },
    update(){
        buttons.element.innerHTML = ""
        const {maxleft, maxright} = buttons.calculatemaxvisible()

        for(let page = maxleft; page <= maxright; page ++){
            buttons.create(page)
        }
    },
    calculatemaxvisible(){
        const {maxVisibleButtons} = state
        let maxleft = (state.page - Math.floor(maxVisibleButtons/2))
        let maxright = (state.page + Math.floor(maxVisibleButtons/2))

        if (maxleft < 1){
            maxleft = 1
            maxright = maxVisibleButtons
        }
        if(maxright > state.totalPage){
            maxleft = state.totalPage - (maxVisibleButtons - 1)
            maxright = state.totalPage

            if(maxleft < 1) maxleft = 1
        }
        return {maxleft, maxright}
    }
    
}


function update(){
    list.update()
    buttons.update()

}

function init(){
    update()
    controls.createListeners()

}

init()


