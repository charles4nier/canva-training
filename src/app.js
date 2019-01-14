import "./assets/style/main.scss";
import AcmeExperience from "./assets/js/acme-experience-effect.js";

const demoToPlay = {
    acmeExperience: new AcmeExperience()
};

let buttonsElt = Array.from(document.querySelectorAll('button')),
    playedTest;

buttonsElt.forEach(button => {
   button.addEventListener('click', (event) => {
       if(playedTest !== undefined) {
           playedTest !==  event.target.dataset.id && demoToPlay[playedTest].cancel()

           return;
       }

       let demoName = event.target.dataset.id;
       playedTest = demoName;
       demoToPlay[demoName].init();
   });
});

console.log('Bienvenue sur le starter-kit');
