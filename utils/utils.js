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

module.exports = facts