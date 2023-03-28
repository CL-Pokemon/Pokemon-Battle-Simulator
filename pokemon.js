export default class Pokemon{
    #name
    #atk
    #def
    #hp
    #possibleMoves
    #moves
    #type
    constructor(name , atk , def , hp , type){
        this.#name = name
        this.#atk = atk
        this.#def = def
        this.#hp = hp
        this.#type = type
        this.#possibleMoves = []
        this.#moves = []
    }

    get name(){
        return this.#name
    }
    get atk(){
        return this.#atk
    }
    get def(){
        return this.#def
    }
    get hp(){
        return this.#hp
    }
    get moves(){
        return this.moves
    }
    get possibleMoves(){
        return this.#possibleMoves
    }
    get type(){
        return this.#type
    }

    
    set moves(value){
        if(this.#moves.length < 4){
            this.#moves.push(value) 
        }
    } 
    set possibleMoves(value){
        this.#possibleMoves.push(value) 
    }
    set name(value){
        this.#name = value
    }
    set atk(value){
        this.#atk = value
    }
    set def(value){
        this.#def = value
    }
    set hp(value){
        this.#hp = value
    }

}