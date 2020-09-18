const btnNav = document.querySelector(".bottom-nav-btn button");
const navBottom = document.querySelector('.bottom-nav');
const fleche = document.querySelector('.bottom-nav-btn button img');
console.log(btnNav,navBottom);

btnNav.addEventListener('click',function(){
    navBottom.classList.toggle('expanded');
    fleche.classList.toggle('expanded-nav');
});


const uvNb = document.querySelector('.uv-nb');
const conseil = document.querySelector('.conseil');
const risque = document.querySelector('.risque');






window.addEventListener('load', ()=>{
    if(navigator.geolocation){
        let lat;
        let long;
        navigator.geolocation.getCurrentPosition(position =>{
            lat = position.coords.latitude;
            long = position.coords.longitude;
            let appid = '7fda794403407c9f7b0721487d612b34';
            const url = `http://api.openweathermap.org/data/2.5/uvi?appid=${appid}&lat=${lat}&lon=${long}`; 
            fetch(url)
            .then(response =>{
                return response.json();
            }).then(data =>{
                console.log(data);
                const uv = Math.round(data.value);
                uvNb.textContent = uv;
                if(uv <= 2){
                    risque.textContent = 'Faible';
                    conseil.textContent = 'Protection non nécessaire :)';
                }else if(uv>2 & uv<=5){
                    risque.textContent = 'Moyen';
                    conseil.textContent = 'Protection nécessaire ! ( chapeau, t-shirt ... )';
                }else if(uv>5 & uv<=6){
                    risque.textContent = "Elevée";
                    conseil.textContent = "Crème solaire et lunette de soleil ! :^)"
                }else{
                    risque.textContent = "Extreme";
                    conseil.textContent = "Eviter les séjours en plein air :("
                }
                
            })
    });
    }else{
        alert("Vous devez activer votre localisation");
    }
});

window.addEventListener('load', function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
           let lat,long;
           lat = position.coords.latitude;
           long = position.coords.longitude;
           const urlGeo = `https://geo.api.gouv.fr/communes?lat=${lat}&lon=${long}&fields=nom'`
           fetch(urlGeo)
           .then(response =>{
               return response.json();
           }).then((data) =>{
               let ville = data[0].nom;
                console.log(data);
                const localisation = document.querySelector('.location');
                localisation.textContent = ville;
           });
        });
    }else{
        alert("Vous devez activer votre localisation");
    }
});


