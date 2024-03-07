// handles all grid operations 
function grid(size)
{
// stores played moves
let playedArr=[];
let locked=false;

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
const arr=gridGen();

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

return {getGrid,play,won,played,locked};
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
const grid3= grid(3);

const container= document.querySelector('#container');
const result= document.querySelector('#result');

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
            // finding index of the element 
            if(!grid3.locked){
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

            if(grid3.won()!=-1)
            { // lock the grid to not play further on winning or draw
                grid3.locked=true;
                switch (grid3.won()) {
                    case 1:
                        result.textContent='player 1 has won';
                        break;
                    case 2: 
                        result.textContent='player 2 has won';
                        break;
                    default:
                        result.textContent='game draw';
                        break;
                }

            }
            }

            }
            );
        
            row.appendChild(item);
        }
        container.appendChild(row);
    }
}


generateGuiGrid(3);