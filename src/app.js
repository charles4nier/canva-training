import "./assets/style/main.scss";
import AcmeExperience from "./assets/js/acme-experience-effect.js";
import BackgroundCoverCanvas from "./assets/js/background-cover-canvas.js";

const demoToPlay = {
    acmeExperience: new AcmeExperience(),
    backgroundCoverCanvas: new BackgroundCoverCanvas()
};

let buttonsElt = Array.from(document.querySelectorAll('button')),
    playedTest;

buttonsElt.forEach(button => {
   button.addEventListener('click', (event) => {
       let demoName = event.target.dataset.id;

       if(playedTest !== undefined) {
           playedTest !==  event.target.dataset.id && demoToPlay[playedTest].cancel()

           demoToPlay[demoName].init();
           playedTest = demoName;
           return;
       }

       demoToPlay[demoName].init();
       playedTest = demoName;
   });
});

console.log('Bienvenue sur les tests canvas');
