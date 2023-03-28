export default class Pokemon{
    #name
    #atk
    #def
    #hp
    #moves
    #type 
    
    constructor(name , atk , def , hp , type){
        this.#name = name
        this.#atk = atk
        this.#def = def
        this.#hp = hp
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

    set moves(value){
        this.#moves.push(value) // Needs further implementation
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