const player1 =  {
    NOME: 'Mario',
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER : 3, 
    PONTOS: 0,
};

const player2 =  {
    NOME: 'Peach',
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER : 2, 
    PONTOS: 0,
};

const player3 =  {
    NOME: 'Yoshi',
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER : 3, 
    PONTOS: 0,
};

const player4 =  {
    NOME: 'Bowser',
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER : 5, 
    PONTOS: 0,
};

const player5 =  {
    NOME: 'Luigi',
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER : 4, 
    PONTOS: 0,
};

const player6 =  {
    NOME: 'Donkey Kong',
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER : 5, 
    PONTOS: 0,
};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock(){
    let random = Math.random();
    if(random < 0.33) return 'RETA';
    if(random < 0.66) return 'CURVA';
    return 'CONFRONTO';
};

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
};

async function getRandomEvent(){
    let random = Math.random();
    if(random < 0.5) return 'TARTARUGA';  // Tartaruga: -1 ponto
    return 'BOMBA';  // Bomba: -2 pontos
};

async function playRaceEngine(character1, character2){

    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        // Sortear um bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // Rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === 'RETA'){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            // Log dos resultados de habilidade
            await logRollResult(character1.NOME, "Velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "Velocidade", diceResult2, character2.VELOCIDADE);

        } else if(block === 'CURVA'){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            // Log dos resultados de habilidade
            await logRollResult(character1.NOME, "Manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "Manobrabilidade", diceResult2, character2.MANOBRABILIDADE);

        } else if(block === 'CONFRONTO'){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

            // Log dos resultados de poder
            await logRollResult(character1.NOME, "Poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "Poder", diceResult2, character2.PODER);

            // Verificação de vitória no confronto
            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--;

                // Sorteio do bônus de Turbo
                let event = await getRandomEvent();
                if (event === 'TARTARUGA') {
                    console.log(`${character2.NOME} pegou uma Tartaruga! Perdeu 1 ponto.`);
                    character2.PONTOS--;
                } else {
                    console.log(`${character2.NOME} pegou uma Bomba! Perdeu 2 pontos.`);
                    character2.PONTOS -= 2;
                }
            } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;

                // Sorteio do bônus de Turbo
                let event = await getRandomEvent();
                if (event === 'TARTARUGA') {
                    console.log(`${character1.NOME} pegou uma Tartaruga! Perdeu 1 ponto.`);
                    character1.PONTOS--;
                } else {
                    console.log(`${character1.NOME} pegou uma Bomba! Perdeu 2 pontos.`);
                    character1.PONTOS -= 2;
                }
            } else {
                console.log('Confronto empatado! Nenhum ponto foi perdido');
            }

            // Sorteio de Turbo
            let turbo = Math.random() < 0.5;  // 50% de chance de ganhar turbo
            if(turbo){
                console.log(`${character1.PONTOS > character2.PONTOS ? character1.NOME : character2.NOME} pegou um turbo! Ganhou +1 ponto! 🚀`);
                if(character1.PONTOS > character2.PONTOS) character1.PONTOS++;
                else character2.PONTOS++;
            }

            return; // Encerrar o bloco de confronto
        }

        // Comparação de habilidades e pontuação
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
            
        } else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log("-------------------------");
    }
};

async function declareWinner(character1, character2){
    
    console.log("\nResultado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
    } else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
    } else {
        console.log(`A corrida terminou em empate...`);
    }
};

(async function main(){
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
