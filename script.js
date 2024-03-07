// handles all grid operations 
function grid(size)
{
let playedArr=[];// stores played moves 
let locked=false;// checks if the grid has been locked

//generates a grid
function gridGen()
{
let arr=[];
for(let i=0;i<size;i++)
{ arr[i]=[];
    for(let j=0;j<size;j++)
    {
        arr[i][j]=0;
    }
}
return arr;
}

// created the array 
let arr=gridGen();

// prints the array 
const getGrid= ()=>arr;

// play your chance at [row, col]
const play=(val,row,col)=>{
    console.log();
    if(played(row,col))
     {return false;}
else {
    playedArr.push(`${row}${col}`);
    arr[row][col]=val;
    return true;
}
};

//checks if a move has been played
const played=(row,col)=>{
return playedArr.includes(`${row}${col}`);
}

// checks if won or draw
const won = ()=>{
    let rowInitial=0,colInitial=0;
    let rowflag=false, colflag=false;
    //check for each column
    for(let i=0;i<size;i++)
    {
        colInitial=arr[0][i];

        for(let j=0;j<size;j++)
        {
            if(colInitial==arr[j][i])
            {
                colflag=true;
            }
            else{
                colflag=false;
                break;
            }
        }
        if(colflag && colInitial!=0)
        return colInitial;
    }
    
    //check for each row
    for(let i=0;i<size;i++)
    { rowInitial=arr[i][0];
        for(let j=0;j<size;j++)
        {
            if(rowInitial==arr[i][j])
            {
                rowflag=true;
            }
            else{
                rowflag=false;
                break;
            }
        }
        if(rowflag && rowInitial!=0)
        return rowInitial;
    }

    //check diagonally
    let diagflag1=true, diagflag2=true;
    let j=size-1;
    for(let i=0;i<size;i++)
    {   
        if(!(arr[i][i]==arr[0][0]))
        {
        diagflag1=false;
        }
        if(!(arr[i][j--]==arr[0][size-1]))
        {
        diagflag2=false;
        }
    }
    if(diagflag1 && arr[0][0]!=0)
    return arr[0][0];
    if(diagflag2 && arr[0][size-1]!=0)
    return arr[0][size-1];
    if(playedArr.length==size**2)
    return -2;
    return -1;
}

return {getGrid,play,won,played,locked,reset,playedArr};
}

// creates a player profile
function createPlayer(name='', sign=0){
    let score = 0;
    
    function win(){
        score++;
    }
    const playerScore=()=>score;
    return {name,sign,win,playerScore};
}

//
let currPlayer=true;


// gui operations start
const player1= createPlayer('player1',1);
const player2=createPlayer('player2',2);
let size=3;
let grid3= grid(size);

const container= document.querySelector('#container');

function generateGuiGrid(size){
    for(let i=0;i<size;i++)
    { const row=document.createElement('div');
        row.className='cont-row';
        for(let j=0;j<size;j++)
        {
            const item= document.createElement('div');
            item.className='item';
            item.setAttribute('data-index',`${i},${j}`);

            item.addEventListener('click',()=>{
            // if grid3 is locked, return the process
            if(grid3.locked)
            {return;}

                const indexarr= item.getAttribute('data-index').split(',');
                console.log(indexarr);

            // only runs if the field is unmarked
            if(!grid3.played(+indexarr[0],+indexarr[1])){
                if(currPlayer)
                { 
                  item.textContent='X';
                  grid3.play(player1.sign,+indexarr[0],+indexarr[1]);
                }
                else{
                    item.textContent='O';
                    grid3.play(player2.sign, +indexarr[0],+indexarr[1]);
                }
                currPlayer=!currPlayer;
            }
            showRes(grid3);
            });

            row.appendChild(item);
        }
        container.appendChild(row);
    }
}

function showRes(grd=grid())
{
if(grd.won()!=-1)
            { // lock the grid to not play further on winning or draw
                grd.locked=true;
                const result=document.createElement('li');
                
            // then display the result
                switch (grd.won()) {
                    case 1:
                        result.textContent='player 1 won';
                        player1.win();
                        break;
                    case 2: 
                        result.textContent+='player 2 won';
                        player2.win();
                        break;
                    default:
                        result.textContent+='game draw';
                        break;
                }
                document.querySelector('#result > ul').appendChild(result);
                document.querySelector('#plr1-scr').textContent=player1.playerScore();
                document.querySelector('#plr2-scr').textContent=player2.playerScore();
                document.getElementById('reset').setAttribute('class','button2');
            }
}

document.querySelector('#reset').addEventListener('click',()=>{
    currPlayer=true;
    container.textContent='';
    generateGuiGrid(size);
    grid3=grid(size);
    document.getElementById('reset').setAttribute('class','button1');
});

const slider = document.querySelector('#slider-size');
const output= document.querySelector('#slider-val');
output.textContent=slider.value;
slider.addEventListener('input',()=>{
output.textContent=slider.value;
});

document.querySelector('#create-grd').addEventListener('click',()=>{
    size=+slider.value;
    container.textContent='';
    generateGuiGrid(size);
    grid3=grid(size);
    currPlayer=true;

});
generateGuiGrid(size);