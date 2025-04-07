const canvas=document.querySelector('canvas')
const c=canvas.getContext('2d')


const score=document.querySelector('#score')
canvas.width=innerWidth;
canvas.height=innerHeight;

class Player{
    constructor(){
        
        this.velocity={
            x:0,
            y:0
        }

        this.rotation=0
        this.opacity=1
        this.health=10

        const image=new Image()
        image.src='./spaceship(1).png'
        image.onload=()=>{
            this.image=image
            this.width=image.width*1
            this.height=image.height*1.2
            this.position={
                x:canvas.width/2-this.width/2,
                y:canvas.height-this.height-30
            }
        }
    }

    draw(){
        // c.fillStyle='red'
        // c.fillRect(this.position.x,this.position.y,this.width,this.height)
        c.save()
        c.globalAlpha=this.opacity
        c.translate(player.position.x+player.width/2,player.position.y+player.height/2)
        c.rotate(this.rotation)

        c.translate(-player.position.x-player.width/2,-player.position.y-player.height/2)
        
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
        c.restore()
    }

    update(){
        if(this.image){
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
    }}
}

class Projectile{
    constructor({position,velocity}){
        this.position=position
        this.velocity=velocity

        this.radius=2.5;
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
        c.fillStyle='red'
        c.fill()
        c.closePath()
    }
    update(){
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
    }
}

class Particle{
    constructor({position,velocity,radius,color,fades}){
        this.position=position
        this.velocity=velocity

        this.radius=radius;
        this.color=color;
        this.opacity=1
        this.fades=fades
    }

    draw(){
        c.save()
        c.globalAlpha=this.opacity
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
        c.fillStyle=this.color
        c.fill()
        c.closePath()
        c.restore()
    }
    update(){
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        if(this.fades)
        this.opacity-=0.01

    }
}

class InvaderProjectile{
    constructor({position,velocity}){
        this.position=position
        this.velocity=velocity
        this.width=3
        this.height=10

        this.radius=4;
    }

    draw(){
        c.fillStyle='white'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
    }
}
class Invader{
    constructor({position}){
        
        this.velocity={
            x:0,
            y:0
        }
        const image=new Image()
        image.src='./alien.png'
        image.onload=()=>{
            this.image=image
            this.width=image.width
            this.height=image.height
            this.position={
                x:position.x,
                y:position.y
            }
        }


        

    }

    draw(){
        // c.fillStyle='red'
        // c.fillRect(this.position.x,this.position.y,this.width,this.height)
       
        
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
        c.restore()
    }

    update({velocity}){
        if(this.image){
        this.draw()
        this.position.x+=velocity.x
        this.position.y+=velocity.y
    }}

    shoot(invaderProjectiles){
        invaderProjectiles.push(new InvaderProjectile({
            position:{
                x:this.position.x+this.width/2,
                y:this.position.y+this.height
            },
            velocity:{
                x:0,
                y:5
            }
})
)
}}
class Grid{
    constructor(){
     this.position={
        x:0,
        y:0
     }
     this.velocity={
        x:3,y:0
     }

     this.invaders=[]
     const rows=Math.floor(Math.random()*7+4)
     const columns=Math.floor(Math.random()*11+5)

     this.width=columns*30

     for(let i=0;i<columns;i++){
        for(let j=0;j<rows;j++){
        this.invaders.push(new Invader({position:{x:30*i,y:j*30}}))
     }}console.log(this.invaders)
    }update(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.y=0;

        if(this.position.x+this.width>=canvas.width || this.position.x<=0){
            this.velocity.x = -this.velocity.x;
            this.velocity.y=30;
        }
    }
}

// class PowerBooster {
//     constructor({ position }) {
//         // this.position = position;
//         // this.width = 20;
//         // this.height = 20;
//         // this.color = 'yellow'; // Color of the power booster
//         this.velocity={
//             x:0,
//             y:3
//         }
//         const image=new Image()
//         image.src='./flash.png'
//         image.onload=()=>{
//             this.image=image
//             this.width=image.width
//             this.height=image.height
//             this.position={
//                 x:position.x,
//                 y:position.y
//             }
//         }
//     }

//     draw() {
//         // c.fillStyle = this.color;
//         // c.fillRect(this.position.x, this.position.y, this.width, this.height);
//         c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
//         c.restore()
//     }
//     update({velocity}){
//         if(this.image){
//         this.draw()
//         this.position.x+=velocity.x
//         this.position.y+=velocity.y
//     }}

//     // update() {
//     //     this.draw();
//     // }
// }


const player=new Player()
const projectiles=[]
const grids=[]
const invaderProjectiles=[]
const particles=[]
// const invader=new Invader()

const powerBoosters = [];
let powerUpActive = false;
let powerUpTimeout;


const keys={
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
        },
    ArrowUp:{
        pressed:false
    },
    ArrowDown:{
        pressed:false
    },
    space:{
        pressed:false
    }
}
// player.draw()

let frames=0;
let randomInterval=Math.floor((Math.random()*500)+500)
let game={
    over:false,
    active:true
}
let realscore=0;

for(let i=0;i<108;i++){
    particles.push(new Particle({
        position:{x:Math.random()*canvas.width,
            y:Math.random()*canvas.height},
        velocity:{x:0,y:0.3},
        radius:Math.random()*3,
        color:'white'
        
    }))}

function createParticles({object,color,fades}){
    for(let i=0;i<15;i++){
        particles.push(new Particle({
            position:{x:object.position.x+object.width/2,
                y:object.position.y+object.height/2},
            velocity:{x:(Math.random()-0.5)*3,y:(Math.random()-0.5)*2},
            radius:Math.random()*3,
            color: color || '#BAA0DE',
            fades
            
        }))}
}

function animate(){
    if(!game.active) return
    requestAnimationFrame(animate)
    c.fillStyle='black'
    
const image=new Image()
image.src='./spaceo.jpg'
image.onload = () => {
    c.drawImage(image, 0, 0)
  }
    c.fillRect(0,0,canvas.width,canvas.height)
    
    player.update()
    particles.forEach(Particle=>{
        if(Particle.position.y-Particle.radius >= canvas.height){
            Particle.position.y = -Particle.radius
            Particle.position.x=Math.random()*canvas.width

        }

        if (Particle.opacity<=0){
            setTimeout(()=>{
            particles.splice(particles.indexOf(Particle),1)
        },0)
        }else{
            Particle.update()
        }
        
    });
    console.log(particles)
    invaderProjectiles.forEach((invaderProjectile,index)=>{
        if(invaderProjectile.position.y+invaderProjectile.height>=canvas.height){
            setTimeout(()=>{
                invaderProjectiles.splice(index,1)
            },0)
        }
        else
        invaderProjectile.update()
    //projectiles hitting my player
    if(invaderProjectile.position.y+invaderProjectile.height>=player.position.y && invaderProjectile.position.x+invaderProjectile.width>=player.position.x && invaderProjectile.position.x<=player.position.x+player.width){
        console.log("you loose");
        setTimeout(()=>{
            invaderProjectiles.splice(index,1)
            // player.health-=1
            player.opacity=0
            game.over=true
            // if(player.opacity==0) {game.over=true;return}
        },0)
        setTimeout(()=>{
           game.active=false
        },2000)
       
        
        createParticles({
            object:player,
            color:'white',
            fades:true
        })
        
    }
    })
    console.log(invaderProjectiles)
    projectiles.forEach((Projectile,index)=>{
        if(Projectile.position.y+Projectile.radius<=0)
            {
                setTimeout(()=>{
                projectiles.splice(index,1)
            },0)
        }
        else{
            Projectile.update()
        }
    })
    grids.forEach((grid,gridIndex)=>{
        grid.update()
        
    //spawning projectiles
    if(frames%100===0 && grid.invaders.length>0){
        grid.invaders[Math.floor(Math.random()*grid.invaders.length)].shoot(invaderProjectiles)
    }
        grid.invaders.forEach((invader,i)=>{
            invader.update({velocity:grid.velocity})
            //projrctiles are gonna hit teh enemy
            projectiles.forEach((Projectile,j)=>{
                if(Projectile.position.y-Projectile.radius<=invader.position.y+invader.height && Projectile.position.x+Projectile.radius>=invader.position.x && Projectile.position.x-Projectile.radius<=invader.position.x +invader.width && Projectile.position.y+Projectile.radius>=invader.position.y){
                

                    setTimeout(()=>{
                        const invaderFound=grid.invaders.find((invader2)=>invader2==invader
                        )
                        const projectileFound=projectiles.find(
                            Projectile2=>Projectile2==Projectile
                        )
                        //remove invader and projectile
                        if(invaderFound && projectileFound){
                            realscore+=100
                            score.innerHTML=realscore
                            createParticles({
                                object:invader,
                                fades:true
                            })
                        grid.invaders.splice(i,1)
                        projectiles.splice(j,1)

                        if(grid.invaders.length>0){
                            const firstInvader=grid.invaders[0]
                            const lastInvader=grid.invaders[grid.invaders.length-1]

                            grid.width=lastInvader.position.x-firstInvader.position.x+lastInvader.width
                            grid.position.x=firstInvader.position.x
                        }
                        else{
                            grids.splice(gridIndex,1)
                        }
                        }
                    },0)
                }
            })
        })
    })

    if(keys.ArrowLeft.pressed && player.position.x >=0){
        player.velocity.x=-5
        // player.velocity.y=3
        player.rotation=-0.15
    }
    else if(keys.ArrowRight.pressed && player.position.x+player.width<=canvas.width){
        player.velocity.x=5
        player.rotation=0.15
    }
    else{
        player.velocity.x=0;
        player.rotation=0;
    }
    if(keys.ArrowUp.pressed && player.position.y>=canvas.height/2){
        // player.velocity.x=0;
        player.velocity.y=-4
        player.rotation=0
    }
    else if(keys.ArrowDown.pressed && player.position.y+player.height<=canvas.height){
        player.velocity.y=4;
        player.rotation=0
    }
    else{
        player.velocity.y=0
        // player.rotation=0
    }
    console.log(frames)
    //spawning enemies
    if(frames % randomInterval === 0){
        grids.push(new Grid())
        randomInterval=Math.floor(Math.random()*1000+500)
        frames=0
        console.log(randomInterval)
    }

    frames++
}

animate()

addEventListener('keydown',({key})=>{
    if(game.over) return
    // console.log(key)
    switch (key){
    case 'ArrowLeft':
        // console.log('left');
        // player.velocity.x=-3;
        keys.ArrowLeft.pressed=true;
        break;
    case 'ArrowRight':
        // console.log('right')
        // player.velocity.x=3;
        keys.ArrowRight.pressed=true
        break;
    case 'ArrowUp':
        keys.ArrowUp.pressed=true
        break;
    case 'ArrowDown':
        keys.ArrowDown.pressed=true
        break

    case ' ':
        console.log('space')
        projectiles.push(new Projectile({
            position:{
                x:player.position.x+player.width/2,y:player.position.y
            },
            velocity:{
                x:0,y:-11
            }
        }))
        // console.log(projectiles)
        break;
        

    }
})

addEventListener('keyup',({key})=>{
    console.log(key)
    switch (key){
    case 'ArrowLeft':
        // console.log('left');
        // player.velocity.x=-3;
        keys.ArrowLeft.pressed=false
        break
    case 'ArrowRight':
        // console.log('right')
        // player.velocity.x=3;
        keys.ArrowRight.pressed=false
        break;
    case 'ArrowUp':
            console.log('Up')
            // player.velocity.x=3;
            keys.ArrowUp.pressed=false
            break; 
    case 'ArrowDown':
            // console.log('right')
                // player.velocity.x=3;
            keys.ArrowDown.pressed=false
            break;   
    // case ' ':
        // console.log('space')
        

    }
})