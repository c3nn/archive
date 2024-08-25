var d = document,
    selected = 'waiting',
    turn = 'blue',
    team = ['red','blue','red','blue','selectOne'],
    handSelected = 4,
    targetHandSelected = 4,
    splitSelected = 5;

function id(targetId){
    return d.getElementById(targetId);
}

function amount(targetId){
    return parseInt(id(targetId).dataset.amount);
}

function select(num){
    if(handSelected == 4){
        if(id(num).dataset.amount > 0){
            selected = num;
        }
    }
    else{
        selected = num;
    }
    return;
}

function setAmount(targetid, num){
    id(targetid).dataset.amount = num;
    return;
}

function reset(){
    selected = 0,
    handSelected = 0,
    targetHandSelected = 0,
    turn = 'blue',
    setAmount('0', 1),
    setAmount('1', 1),
    setAmount('2', 1),
    setAmount('3', 1);
    id('wonBG').style = 'left: calc(100% * -1);';
    id('won').innerHTML = '';
    render();
    playerTurn();
    return;
}

function render(){
    for (let i = 0; i < 4; i++) {
        if(amount(i) == 0){
            id(i).innerHTML = '<div class="empty"></div>';
        }
        else{
            id(i).innerHTML = '<div class="stick"></div>'.repeat(amount(i));
        }
    }
    return;
}

function playerTurn(){ // handOneSelected & handTwoSelected are there so the program can wait on the player
    selected = 4;
    handSelected = 4;
    targetHandSelected = 4;
    if(turn == 'blue'){ // sets clolours
        id('red').style = 'background: #fc5b5b;';
        id('blue').style = 'background: blue;';
    }
    else{
        id('red').style = 'background: red;';
        id('blue').style = 'background: #6e5bfc;';
    }
    // check is player has won
    if(amount('0') == 0 && amount('2') == 0){ // red dead (redemption)
        id('won').innerHTML = 'Blue Won!';
        id('wonBG').style = 'left: 0px;';
    }
    else if(amount('1') == 0 && amount('3') == 0){ // blue dead
        id('won').innerHTML = 'Red Won!';
        id('wonBG').style = 'left: 0px;';
    }
    else{
        handOneSelected();
    }
    return;
}
function handOneSelected(){ // just loop till' they click somthing
    if(team[selected] == turn){ // if the selected
        handSelected = selected;
        if(turn == 'blue'){
            turn = 'red';
        }
        else{
            turn = 'blue';
        }
        // legacy Selection
        // id(handSelected).style = 'border: solid white 10px; background: white;'
        id(handSelected).innerHTML = '<div class="stick" style="background: white;"></div>'.repeat(amount(handSelected));
        selected = 4;
        handTwoSelected();
        return;
    }
    else{
        setTimeout(handOneSelected, 100);
        return;
    }
}
function handTwoSelected(){
    if(selected != 4 && handSelected != selected){
        if(team[handSelected] == team[selected]){ // is they choose to split it
            if(amount(handSelected) != 1 && amount(selected) < 4){
                targetHandSelected = selected;
                selected = 4;
                id(handSelected).style = '';
                splitSticks();
            }
            else{
                setTimeout(handTwoSelected, 50);
            }
        }
        else{
            targetHandSelected = selected;
            selected = 4;
            id(handSelected).style = '';
            setSticks(handSelected,targetHandSelected);
            playerTurn();
        }
    }
    else{
        setTimeout(handTwoSelected, 50);
    }
    return;
}

function setSticks(stick, stickTarget){ // if you choose the other team
    setAmount(stickTarget, amount(stick) + amount(stickTarget));
    if(amount(stickTarget) > 4){
        setAmount(stickTarget, 0);
    }
    render();
    return;
}
function splitSticks(){ // if you choose yourself
    id('split-' + team[handSelected]).style = 'display: flex;';
    splitSelected = 5;
    // all these check if the target can handle these without dieing and if the selected hand has it
    if(amount(handSelected) >= 2 && amount(targetHandSelected) <= 3){
        id('split1a').style = 'display: block;';
        id('split1b').style = 'display: block;';
    }
    if(amount(handSelected) >= 3 && amount(targetHandSelected) <= 2){
        id('split2a').style = 'display: block;';
        id('split2b').style = 'display: block;';
    }
    if(amount(handSelected) == 4 && amount(targetHandSelected) <= 1){
        id('split3a').style = 'display: block;';
        id('split3b').style = 'display: block;';
    }
    splitSticksWait();
    return;
}
function splitSticksWait(){
    if(splitSelected != 5){
        setAmount(handSelected, amount(handSelected) - splitSelected);
        setAmount(targetHandSelected, amount(targetHandSelected) + splitSelected);
        id('split-' + team[handSelected]).style = 'display: none;';
        id('split1a').style = 'display: none;';
        id('split1b').style = 'display: none;';
        id('split2a').style = 'display: none;';
        id('split2b').style = 'display: none;';
        id('split3a').style = 'display: none;';
        id('split3b').style = 'display: none;';
        render();
        playerTurn();
        return;
    }
    else{
        setTimeout(splitSticksWait, 50);
        return;
    }
}
playerTurn();