class Validator{

  constructor(){
      this.validations = [
          'data-min-length',
          'required',  
          'valorminemax',
          'valormin',
          'obrigatoriomultiplo',
          'obrigatorioembalagem',
      ]
  }

  // iniciar a validação de todos os campos
  validate(form){

      //resgata todas as validações
      let currentvalidations = document.querySelectorAll('form .error-validation');

      if(currentvalidations.length > 0){
          this.cleanvalidations(currentvalidations);
      }

      let inputs = form.getElementsByTagName('input');

      let inputsarray = [...inputs];

      //loop nos inputs validação mediante encontrado
      inputsarray.forEach(function(input) {
      
      //loop em todas validações
      for(let i = 0; this.validations.length > i; i++){
          // verifica se a validação atual existe no input
          if(input.getAttribute(this.validations[i]) != null) {

              //limpando a string para virar método
              let method = this.validations[i].replace('data-', '').replace('-', '')

              //valor do input
              let value = input.getAttribute(this.validations[i]);

              //invocar o metodo
              this[method](input, value);


          }
      }
      }, this);
  }

//verifica se o input tem o numero minimo de caracteres
minlength(input, minvalue){

  let inputlength = input.value.length;

  let errormessage = 'o campo precisa ter pelo menos 1 caractere';

  if(inputlength < minvalue){
      this.printmessage(input, errormessage);
  }
}

//Intervalo de valor para o ipi
valorminemax(input){

  let valueipi = input.value;

  let errormessage = 'O valor precisa ser de 0 a 100';

  if(valueipi < 0 || valueipi > 100){
      this.printmessage(input, errormessage);
  }
}

//Quando tem embalagem, é obrigatório o multiplo
obrigatoriomultiplo(input){
  let valormultiplo = input.value;
  let valorembalagem = document.getElementById("embalagem");
  let valoremb = valorembalagem.value;

  let errormessage = 'O valor precisa ser definido';

  if(( valoremb != '') && (valormultiplo === '' || valormultiplo == 0)){
      this.printmessage(input, errormessage);
  }
}


//Quando tem multiplo, é obrigatório a embalagem
obrigatorioembalagem(input){
  let valorembalagem = input.value;
  let valormultiplo = document.getElementById("multiplo");
  let valormult = valormultiplo.value;

  let errormessage = 'O valor precisa ser definido';

  if((valormult > 0) && (valorembalagem === '')){
      this.printmessage(input, errormessage);
  }
}


//Valor minimo para o preço
valormin(input){

  let value = input.value;

  let errormessage = 'O valor não pode ser menor que 0';

  if(value < 0 ){
      this.printmessage(input, errormessage);
  }
}


//imprimir mensagens de erro
printmessage(input, msg){

  let template = document.querySelector('.error-validation').cloneNode(true);

  template.textContent = msg;

  let inputParent = input.parentNode;

  template.classList.remove('template');

  inputParent.appendChild(template);

}

//verifica se o input é obrigatório
required(input){

  let inputvalue = input.value;
  if(inputvalue == ''){
      let errormessage = 'Este campo é obrigatório'

      this.printmessage(input, errormessage);
  }

}



//limpa as validações da tela
cleanvalidations(validations){
  validations.forEach(el => el.remove());
}

}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator(); 


//evento que dispara as validações
submit.addEventListener('click', function(e){

  e.preventDefault();
  validator.validate(form);
});

