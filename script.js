// handles all grid operations 
function grid(size)
{
// stores played moves
let playedArr=[];

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
    if(playedArr.includes(`${row}${col}`))
     {return false;}
else {
    playedArr.push(`${row}${col}`);
    arr[row][col]=val;
    return true;
}
};

// checks if won or draw
const won = ()=>{
    if(playedArr.length==size**2)
    return -2;
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
        if(colflag)
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
        if(rowflag)
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
    if(diagflag1)
    return arr[0][0];
    if(diagflag2)
    return arr[0][size-1];

    return -1;
}

return {getGrid,play,won,playedArr};
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


// gui operations start