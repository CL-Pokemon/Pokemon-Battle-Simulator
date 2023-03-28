export default class Pokemon{
    #name
    #atk
    #def
    #hp
    #possibleMoves
    #moves
    #type
    #speed
    constructor(name , hp , atk , def , speed , type){
        this.#name = name
        this.#atk = atk
        this.#def = def
        this.#hp = hp
        this.#speed  = speed
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
    get speed(){
        return this.#speed
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
    set speed(value){
        this.#speed = value
    }

    addPossibleMoves(value){
        this.#possibleMoves.push(value) 
    }

}