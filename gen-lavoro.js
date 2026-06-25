// gen-lavoro.js — questionario "Squadra ReadBall" v2 (26/06/2026), ~50 domande.
// Team a 12 (Renis capo + 11). Ruoli che coprono cio che Renis+AI non fanno, 1 persona per ruolo.
// Competenze: CALCIO + TRASVERSALI + SOCIAL (mantenuti). App esclusa per ora.
// Riusa head/style/logo di index.html. Submit: WhatsApp a Renis.
const fs = require('fs');
const idx = fs.readFileSync('index.html', 'utf8');
const cut = idx.indexOf('</h1></div>') + '</h1></div>'.length;
let head = idx.slice(0, cut)
  .replace('<title>Quiz Pre-Partita ReadBall</title>', '<title>Squadra ReadBall — Candidatura</title>')
  .replace('<h1>Quiz Pre-Partita</h1>', '<h1>Entra nella Squadra</h1>');

const sec = (t, s) => `<div class="sec">${t}${s ? `<small>${s}</small>` : ''}</div>`;
const radio = (n, q, opts) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}" data-type="radio"><label class="ql">${n}. ${q}</label>${opts.map(o => `<label class="opt"><input type="radio" name="q${n}" value="${o.replace(/"/g, '&quot;')}"><span>${o}</span></label>`).join('')}</div>`;
const check = (n, q, opts, max) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}" data-type="check"><label class="ql">${n}. ${q}${max ? ` <small style="color:#9fb0c0;font-weight:500">(max ${max})</small>` : ''}</label>${opts.map(o => `<label class="opt"><input type="checkbox" name="q${n}" value="${o.replace(/"/g, '&quot;')}"><span>${o}</span></label>`).join('')}</div>`;
const text = (n, q) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}"><label>${n}. ${q}</label><input type="text" name="q${n}" autocomplete="off"></div>`;

const form = `<form id="f">
${sec('👤 CHI SEI')}
${radio(1, 'Quanti anni hai?', ['Meno di 18', '18–22', '23–28', 'Più di 28'])}
${text(2, 'Cosa fai nella vita (studi/lavori) e quanto tempo libero VERO hai?')}
${text(3, 'Quali lingue parli oltre all’italiano, e a che livello?')}
${radio(4, 'Quanto sei costante quando inizi una cosa?', ['Finisco sempre quello che inizio', 'Parto forte poi mollo', 'Dipende dalla motivazione'])}
${radio(5, 'In un gruppo come stai meglio?', ['Mi piace guidare e organizzare gli altri', 'Propongo e collaboro alla pari', 'Eseguo bene quello che mi dicono'])}
${radio(6, 'Te la sentiresti di prenderti una RESPONSABILITÀ (coordinare un pezzo del progetto)?', ['Sì, volentieri', 'Sì ma con una guida', 'No, preferisco solo eseguire'])}

${sec('⏰ DISPONIBILITÀ', 'Sii realista: meglio poco ma sicuro.')}
${radio(7, 'Quante ore AL GIORNO puoi dedicarci davvero?', ['Meno di 1h', '1–2h', '2–4h', 'Più di 4h'])}
${radio(8, 'Quanti giorni a settimana?', ['1–2', '3–4', '5–6', 'Tutti'])}
${radio(9, 'In che fasce sei di solito libero?', ['Mattina', 'Pomeriggio', 'Sera', 'Notte', 'Variabile'])}
${radio(10, 'Rispetti le scadenze (es. "pronto entro le 18")?', ['Sempre', 'Quasi sempre', 'Dipende', 'Faccio fatica'])}
${radio(11, 'Per quanto pensi di continuare?', ['Provo e vedo', 'Qualche mese', 'A lungo', 'Tutto il Mondiale e oltre, ci credo'])}

${sec('⚽ COMPETENZE CALCISTICHE', 'Qui voglio capire quanto VALI sul calcio vero.')}
${radio(12, 'Come guardi le partite?', ['Intere e analizzandole', 'Intere ma rilassato', 'Solo gol/highlights', 'Quasi mai'])}
${radio(13, 'Durante la partita noti i dettagli (chi è stanco, cali, mosse tattiche, chi entra in partita)?', ['Sì, sempre e li so spiegare', 'A volte', 'No'])}
${radio(14, 'Quanto capisci di TATTICA (moduli, pressing, come una squadra fa male all’altra)?', ['Molto, leggo bene una partita', 'Le basi', 'Poco'])}
${radio(15, 'Sai riconoscere i moduli e cosa cambia tra un 4-3-3 e un 3-5-2?', ['Sì tranquillamente', 'Più o meno', 'No'])}
${text(16, 'Di quali campionati/nazionali sei ESPERTO VERO? (anche calci di nicchia: Sud America, Africa, Primavera, leghe minori...)')}
${radio(17, 'Quanto conosci i singoli giocatori (caratteristiche, forma, chi è in un buon momento)?', ['Tantissimo, è la mia passione', 'Abbastanza', 'Solo i big'])}
${radio(18, 'Quanto sei bravo a pronosticare come andrà una partita?', ['Molto, ci prendo spesso', 'Nella media', 'Scarso'])}
${text(19, 'Raccontami una lettura/previsione di una partita di cui sei ORGOGLIOSO (e perché l’avevi vista così)')}
${radio(20, 'Quanto te ne intendi di quote e mercati (Over/Under, Goal, handicap, marcatori, corner...)?', ['Bene, li padroneggio', 'Le basi', 'Poco'])}
${radio(21, 'Hai un conto scommesse?', ['Sì, attivo', 'Sì ma lo uso poco', 'No, ma lo aprirei', 'No e non mi interessa'])}
${radio(22, 'Seguiresti le giocate ReadBall con PICCOLI soldi veri, documentando come va (la prova di credibilità)?', ['Sì, ci sto', 'Forse', 'No'])}

${sec('🧠 COMPETENZE TRASVERSALI', 'Cose oltre il calcio che possono servire al progetto.')}
${radio(23, 'Sai SCRIVERE bene (caption, testi che colpiscono)?', ['Sì, è una mia forza', 'Me la cavo', 'No'])}
${radio(24, 'Sei capace di VENDERE / convincere / promuovere qualcosa?', ['Sì, sono bravo', 'Abbastanza', 'No'])}
${radio(25, 'Te la cavi a CONTATTARE sconosciuti / altre pagine / possibili sponsor?', ['Sì, tranquillo', 'Con qualche sforzo', 'No, mi blocco'])}
${radio(26, 'Sei bravo a ORGANIZZARE / coordinare (tenere insieme gruppo, scadenze, compiti)?', ['Sì, è una mia dote', 'Abbastanza', 'No'])}
${radio(27, 'Sei capace nella RICERCA di informazioni (trovare dati, notizie, contatti)?', ['Sì, scavo a fondo', 'Abbastanza', 'No'])}
${radio(28, 'Quanto sei capace con AI e strumenti digitali (ChatGPT, Gemini, montaggio, fogli)?', ['Molto smanettone', 'Le basi', 'Poco'])}
${check(29, 'Hai altre competenze utili? (anche fuori dal calcio)', ['Programmazione/informatica', 'Marketing/pubblicità', 'Fotografia/video', 'Disegno/grafica', 'Public speaking', 'Contabilità/numeri', 'Contatti nel business', 'Nessuna in particolare'])}
${text(30, 'Spiega meglio le competenze fuori dal calcio che pensi possano servire')}

${sec('📱 COMPETENZE SOCIAL', 'I canali (IG, TikTok, Telegram) restano fondamentali.')}
${radio(31, 'Quale piattaforma mastichi DI PIÙ?', ['Instagram', 'TikTok', 'Telegram', 'YouTube', 'Poco social'])}
${radio(32, 'Sai MONTARE video (reel/TikTok) a livello decente?', ['Sì, bene', 'Le basi', 'No'])}
${radio(33, 'Sai fare GRAFICHE (Canva o simili)?', ['Sì, bene', 'Le basi', 'No'])}
${radio(34, 'Conosci i TREND e cosa “gira” sui social calcistici?', ['Sì, ci sto sopra', 'Abbastanza', 'No'])}
${radio(35, 'Saresti capace di FAR CRESCERE un canale (capire cosa funziona, postare con costanza)?', ['Sì', 'Forse, imparando', 'No'])}
${radio(36, 'Te la senti di gestire una COMMUNITY (rispondere, animare un gruppo Telegram)?', ['Sì', 'Forse', 'No'])}
${text(37, 'Conosci gente o pagine nel mondo calcio-social? (chi/quali)')}
${text(38, 'Hai mai creato contenuti, gestito una pagina o un progetto tuo? Racconta')}
${text(39, 'Un creator o una pagina calcistica che ammiri, e perché')}

${sec('🛠️ STRUMENTI & MEZZI')}
${check(40, 'Che dispositivi hai?', ['PC / Mac potente', 'PC normale', 'iPad / Tablet', 'Telefono buono per video', 'Microfono / luci / attrezzatura', 'Solo telefono base'])}
${radio(41, 'Hai un abbonamento per vedere le partite (DAZN, Sky...)?', ['Sì, ce l’ho già', 'No ma posso procurarmelo', 'No, mi servirebbe che lo offrite voi', 'Non mi serve per il mio ruolo'])}
${radio(42, 'Confermi di avere ChatGPT Plus e Gemini Pro?', ['Sì, entrambi', 'Solo uno dei due', 'Nessuno per ora'])}

${sec('🚀 VISIONE & FUTURO', 'La parte che pesa di più: rispondi per esteso, pensaci.')}
${text(43, 'Che STRADA dovrebbe prendere ReadBall secondo te, e come dovrebbe ESPANDERSI?')}
${radio(44, 'Saresti disposto a INVESTIRE soldi tuoi nel progetto?', ['Sì', 'Forse, dipende', 'No'])}
${text(45, 'Quali sono i PUNTI DEBOLI di ReadBall oggi e come li MIGLIORERESTI? (concreto)')}
${radio(46, 'Quanto ci credi in questo progetto?', ['Tantissimo, ci metto tutto', 'Molto', 'Abbastanza', 'Sto a guardare'])}

${sec('💪 TU & IL RUOLO', 'Ci siamo: dimmi dove ti vedi.')}
${text(47, '⭐ SPAZIO LIBERO: cosa ti piacerebbe DAVVERO fare come lavoro per ReadBall? Come ti immagini di contribuire? Scrivi tutto quello che ti viene.')}
${text(48, 'Se dovessi scegliere TU il tuo compito nella squadra, quale sarebbe? E perché pensi di essere la persona giusta per quello?')}
${text(49, 'I tuoi 2-3 PUNTI DI FORZA più grandi (perché dovremmo contare su di te)')}
${text(50, 'Perché vuoi farne parte DAVVERO? Cosa ti spinge?')}
</form>`;

const intro = `<p class="intro">Vuoi entrare nella squadra <b style="color:#15e37c">ReadBall</b> (Instagram, TikTok, Telegram e oltre)? Stiamo facendo le cose <b>sul serio</b>: siamo una squadra e ognuno avrà il ruolo giusto per lui. Rispondi sincero e per esteso — non è un test, serve a capire chi sei e cosa farti fare. Più ci metti del tuo, più conti.<br><b style="color:#15e37c">Alla fine premi "Invia" e mandami tutto su WhatsApp.</b></p>
<div class="id"><input id="nome" placeholder="Il tuo nome" autocomplete="off"></div>`;

const script = `<div class="bar"><div class="err" id="err">Scrivi il tuo nome e completa le domande a scelta 👆</div><button id="send">📲 Invia a Renis (WhatsApp)</button></div>
<script>
document.getElementById('send').onclick=function(){
  var nome=document.getElementById('nome').value.trim();
  var cards=[...document.querySelectorAll('.card')];
  var lines=[], ok=!!nome;
  for(var c of cards){
    var q=c.getAttribute('data-q'), t=c.getAttribute('data-type');
    if(t==='radio'){var sel=c.querySelector('input:checked');if(!sel){ok=false;continue}lines.push(q+' -> '+sel.value);}
    else if(t==='check'){var s=[...c.querySelectorAll('input:checked')].map(x=>x.value);if(!s.length){ok=false}lines.push(q+' -> '+(s.join(', ')||'-'));}
    else{var tx=c.querySelector('input[type=text]').value.trim();lines.push(q+' -> '+(tx||'-'));}
  }
  if(!ok){var e=document.getElementById('err');e.style.display='block';window.scrollTo(0,0);return;}
  var msg='📋 CANDIDATURA Squadra ReadBall\\n👤 '+nome+'\\n\\n'+lines.join('\\n');
  window.location.href='https://wa.me/?text='+encodeURIComponent(msg);
};
</script></body></html>`;

fs.writeFileSync('lavoro.html', head + intro + form + script);
console.log('lavoro.html scritto:', (head + intro + form + script).length, 'bytes');
