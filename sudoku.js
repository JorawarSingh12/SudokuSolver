var sudoku=[[3, 0, 6, 5, 0, 8, 4, 0, 0],  
            [5, 2, 0, 0, 0, 0, 0, 0, 0],  
            [0, 8, 7, 0, 0, 0, 0, 3, 1],  
            [0, 0, 3, 0, 1, 0, 0, 8, 0],  
            [9, 0, 0, 8, 6, 3, 0, 0, 5],  
            [0, 5, 0, 0, 9, 0, 6, 0, 0],  
            [1, 3, 0, 0, 0, 0, 2, 5, 0],  
            [0, 0, 0, 0, 0, 0, 0, 7, 4],  
            [0, 0, 5, 2, 0, 6, 3, 0, 0]];

function cell(x,y,val){
    this.x = x;
    this.y = y;
    this.value=Math.floor(val);
    this.show=function(){
    rect(this.x,this.y,40,40);
    fill(255);
    textSize(24);
    text(this.value,this.x+10,this.y+25);
        fill(100, 102, 153);
    }
        
}
var cells=new Array(9);
for(var i=0;i<9;i++)
    {
        cells[i]=new Array(9);
    }
    
function setup(){

    createCanvas(800,550);

    var x=300,y=160;
    for(var i=0;i<9;i++)
        {
            for(var j=0;j<9;j++)
                {
                    cells[i][j]=new cell(x,y,sudoku[i][j]);
                    x=x+40;
                }
            y=y+40;
            x=300;
        }
    
}
function mouseClicked()
{
    i = (mouseY-160)/40;
    j = (mouseX-300)/40;
    i = Math.floor(i);
    j = Math.floor(j);
    if(i>=0 && i<9 && j>=0 && j< 9)
    {
        val = prompt("Enter the value")
        val = Number(val)
        if(val>=0 && val<=9)
            cells[i][j].value = val
    }
     
}
function draw(){
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
            {
            cells[i][j].show();                    
            }
    }
}

function solve()
{
       if( solveUntil(0,0) )
       {
        //    alert("solved");
       }
       else
       {
            alert("No solution possible ");
       }
        
}

function solveUntil(i,j){
    if(i==9)
        return true;
    if(cells[i][j].value!=0)
        {
            if(j==8){
               if(solveUntil(i+1,0))
                   return true;
            }
            else{
            if(solveUntil(i,j+1))
                return true;
            }
        }
    else
        {
            for(var t=1;t<=9;t++)
                {   
                    if(safe(i,j,t) === true)
                    {
                        cells[i][j].value=t;
                        if(j=== 8)
                        {
                            if(solveUntil(i+1,0))
                                return true;
                        }
                        else
                            {
                             if(solveUntil(i,j+1))
                                return true;   
                            }
                        cells[i][j].value=0;
                    }
                        
                }
        }
    return false;
}
function safe(i,j,t)
{
    for(var x=0;x<9;x = x+1)
        {
            if(cells[x][j].value === t )
                return false;  
        }
       for(var y=0;y<9;y++)
        {
            if(cells[i][y].value === t)
                return false;
        }
    var x=floor(i/3);
    var y=floor(j/3);
    for(var a=3*x;a<3*(x+1);a++)
        {
            for(var b=3*y;b<3*(y+1);b++)
                {   
                    
                    if(cells[a][b].value=== t ){
                        return false;
                    }
                }
        }
    return true;
}