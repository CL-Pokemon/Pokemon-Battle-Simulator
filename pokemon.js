export default class Pokemon{
    #typeColor
    #name
    #atk
    #def
    #hp
    #possibleMoves
    #moves
    #type
    #speed
    #backSprite
    constructor(name , hp , atk , def , speed , type , backSprite){
        this.#typeColor = {"normal" : [168 , 168 , 120] , "fighting" :  [192 , 48 , 40] , "flying" : [168 , 144 , 240] , "poison" : [160 , 64 , 160] , "ground" : [224 , 192 , 104] , "rock" : [184 , 160 , 56] , "bug" : [168 , 184 , 32] , "ghost" : [112 , 88 , 152] , "steel" : [184 , 184 , 208] , "fire" : [240 , 128 , 48] , "water" : [104 , 144 , 240] , "grass" : [120 , 200 , 80] , "electric" : [248 , 208 , 48] , "psychic" : [248 , 88 , 136] , "ice" : [152 , 216 , 216] , "dragon" : [112 , 56 , 248] , "dark" : [112 , 88 , 72] , "fairy" : [238 , 153 , 172]}
        this.#name = name
        this.#atk = atk
        this.#def = def
        this.#hp = hp
        this.#speed  = speed
        this.#type = type
        this.#possibleMoves = []
        this.#moves = []
        this.#backSprite = backSprite
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
        return this.#moves
    }
    get possibleMoves(){
        return this.#possibleMoves
    }
    get type(){
        return this.#type
    }
    get colors(){
        return this.#typeColor
    }
    get backSprite(){
        return this.#backSprite
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
    setMoves(){
        let limit =  this.#possibleMoves.length
        while(this.#moves.length < 4){
            let position = Math.floor(limit * Math.random())
            //if(!this.#moves.includes(this.#possibleMoves[position])){
            this.moves.push(this.#possibleMoves[position])
            //}
        }
    }

    

}