function facts(type) {
    let responce = '';
    switch (type) {
        case 'FACT':
            responce = 'ФАКТ'
            break;
        case 'BLOOPER':
            responce= "КИНОЛЯП"
        break;
    
    }
    return responce;
}

function random(min, max) {

    return min + Math.random() * (max + 1 - min);
}
module.exports = facts, random