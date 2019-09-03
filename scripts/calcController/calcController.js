class CalcController{
    constructor(){
        this._display = document.querySelector('#display')
        this._data = document.querySelector('#data')
        this._hora = document.querySelector('#hora')
        this._atualdata
        this._operacao = []
        this.inicializacao()
        this.datahora()
        this.eventobuttons()
    }

    datahora(){
        this.data=this.atualdata.toLocaleDateString('pt-BR')
        this.hora=this.atualdata.toLocaleTimeString('pt-BR')
    }

    inicializacao(){
        this.datahora()
        setInterval(()=>{
            this.datahora()
        },1000)
        
    }

    addEventListenerAll(elements,events,fn){
            events.split(' ').forEach(event=>{
                elements.addEventListener(event,fn)
            })
    }
    

    eventobuttons(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g')

        buttons.forEach(btn =>{
            this.addEventListenerAll(btn,'click drag',e=>{
                let txtbtn = btn.className.baseVal.replace('btn-','')
                this.execbuttons(txtbtn)
                
            })

            this.addEventListenerAll(btn,'mouseover mouseup mousedown',e=>{
                btn.style.cursor = 'pointer'
            })
        })
    }

    eOperador(valor){
       return ['+','-','*','/','%'].indexOf(valor)!=-1
    }

    ultimaOperacao(){
         return this._operacao[this._operacao.length-1]
    }

    trocavalor(valor){
        this._operacao[this._operacao.length-1] = valor
        
    }

   validaOperacao(valor){
    this._operacao.push(valor)
       if(this._operacao.length > 3){
           
           this.calc()
        
       }
   }

   calc(){
    let ultimoitem = this._operacao.pop()
    let result = eval(this._operacao.join(''))
    this._operacao = [result, ultimoitem]
    this.mostrarDisplay()
    
   }

   mostrarDisplay(){
       let ultimonumero
       for(let c = this._operacao.length-1;c >=0;c--){
           if(!this.eOperador(this._operacao[c])){
               ultimonumero = this._operacao[c]
               break
           }
       }
       this.displaycalc = ultimonumero
   }

    addoperacao(valor){
        if(isNaN(this.ultimaOperacao())){
            //string
            if(this.eOperador(valor)){
                this.trocavalor(valor)
            }else if(isNaN(valor)){
                
               console.log(this._operacao)
            }else{
                this.validaOperacao(valor)
                this.mostrarDisplay()
            }
        }else{

            if(this.eOperador(valor)){
                this.validaOperacao(valor)
               
            }else{
                //number
            let novovalor = this.ultimaOperacao().toString() + valor.toString()
            this.trocavalor(parseInt(novovalor))
                this.mostrarDisplay()
            }
            
            
        }
        
        
       
    }

    limpaTudo(){
         this._operacao = []
         this.mostrarDisplay()
    }

    limpaEntrada(){
         this._operacao.pop()
         this.mostrarDisplay();
    }

    erro(){
        this.displaycalc = 'erro'
    }

    execbuttons(valor){
        switch (valor){
            case 'ac':
               this.limpaTudo()
            break

            case 'ce':
                this.limpaEntrada()
            break

            case 'soma':
                this.addoperacao('+')
            break

            case 'subtracao':
                this.addoperacao('-')
            break

            case 'multiplicacao':
                this.addoperacao('*')
            break

            case 'divisao':
                this.addoperacao('/')
            break

            case 'porcento':
                this.addoperacao('%')
            break

            case 'igual':
                this.addoperacao('=')
            break

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addoperacao(parseInt(valor))
            break

            default:
              this.erro()
            break
        }
    }

    get displaycalc(){
        return this._display.innerHTML
    }

    set displaycalc(valor){
        this._display.innerHTML=valor
    }

    get data(){
        return this._data.innerHTML
    }

    set data(valor){
        this._data.innerHTML=valor
    }

    get hora(){
        return this._hora.innerHTML
    }

    set hora(valor){
        this._hora.innerHTML=valor
    }

    get atualdata(){
        return new Date()
    }

    set atualdata(valor){
        this._atualdata = valor
    }
}




