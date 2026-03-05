const output = document.getElementById('password-output');
const btnCopier = document.getElementById('btn-copier');
const longueur = document.getElementById('longueur');
const valeurLongueur = document.getElementById('valeur-longueur');
const cbMajuscules = document.getElementById('majuscules');
const cbMinuscules = document.getElementById('minuscules');
const cbChiffres = document.getElementById('chiffres');
const cbSymboles = document.getElementById('symboles');
const forceTexte = document.getElementById('force-texte');
const btnGenerer = document.getElementById('btn-generer');

longueur.addEventListener('input', function() {
  valeurLongueur.textContent = longueur.value;
});

function genererMotDePasse() {
    let pool = '';
    
    if (cbMajuscules.checked) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (cbMinuscules.checked) pool += 'abcdefghijklmnopqrstuvwxyz';
    if (cbChiffres.checked) pool += '0123456789';
    if (cbSymboles.checked) pool += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let motDePasse = '';
  for (let i = 0; i < longueur.value; i++) {
    const index = Math.floor(Math.random() * pool.length);
    motDePasse += pool[index];
  }
  output.value = motDePasse;
  calculerForce(motDePasse);
}

btnGenerer.addEventListener('click', function() {
  genererMotDePasse();
});

btnCopier.addEventListener('click', function() {
  if (output.value === '') return;
  navigator.clipboard.writeText(output.value);
  btnCopier.textContent = 'Copié !';
  setTimeout(function() {
    btnCopier.textContent = 'Copier';
  }, 2000);
});

function calculerForce(motDePasse) {
  let score = 0;

  if (cbMajuscules.checked) score++;
  if (cbMinuscules.checked) score++;
  if (cbChiffres.checked) score++;
  if (cbSymboles.checked) score++;
  if (motDePasse.length >= 16) score++;

  if (score <= 1) {
    forceTexte.textContent = 'Faible';
    forceTexte.style.color = '#e74c3c';
  } else if (score === 2) {
    forceTexte.textContent = 'Moyen';
    forceTexte.style.color = '#f39c12';
  } else if (score === 3) {
    forceTexte.textContent = 'Fort';
    forceTexte.style.color = '#51be7e';
  } else {
    forceTexte.textContent = 'Très fort';
    forceTexte.style.color = '#00a2ffd7';
  }
}

genererMotDePasse();