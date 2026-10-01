'use strict';
const MAIL='info@zuik.at';
const de = {
skip:'Zum Inhalt', brand:'Integration. Kultur. Gemeinschaft.',navAbout:'Über uns',navDirections:'Schwerpunkte',navContact:'Kontakt',eyebrow:'UKRAINISCHE GEMEINSCHAFT IN ÖSTERREICH',headline:'Neue Chancen.<br>Neue Verbindungen.<br><span>Gemeinsam in Österreich.</span>',intro:'Das Zentrum für ukrainische Integration und Kultur verbindet ukrainische Wurzeln mit neuen Möglichkeiten in Österreich.',cta:'Kontakt aufnehmen <span aria-hidden="true">↗</span>',explore:'Unsere Schwerpunkte ↓',location:'In Wien gegründet · Für Menschen in ganz Österreich',panelText:'Wurzeln bewahren.<br>Gemeinsames schaffen.',p1:'Ukrainische Wurzeln',p2:'Chancen in Österreich',p3:'Gemeinsame Zukunft',aboutTag:'01 / ÜBER DEN VEREIN',aboutTitle:'Teil einer neuen<br>Gesellschaft werden.<br><span class="muted">Sich selbst treu bleiben.</span>',aboutText:'ZUIK ist ein nicht auf Gewinn gerichteter Verein zur Unterstützung und Integration ukrainischer Staatsangehöriger und Menschen ukrainischer Herkunft in Österreich.',aboutMore:'Wir bringen Menschen rund um Bildung, berufliche Entwicklung, Unternehmertum und Kultur zusammen. Unsere Ziele: Orientierung im neuen Umfeld, interkultureller Dialog und aktive gesellschaftliche Teilhabe.',factSeat:'Sitz des Vereins',factDate:'Entstehungsdatum',directionsTag:'02 / UNSERE SCHWERPUNKTE',directionsTitle:'Wo beginnt Ihr<br>nächster Schritt?',directionsIntro:'Unsere satzungsgemäßen Ziele.<br>Die konkrete Unterstützung wird mit dem Team abgestimmt.',s1:'Gründung & Selbstständigkeit',s1text:'Wirtschaftliche Integration und Informationen zur Unternehmensgründung sowie zur selbstständigen Tätigkeit in Österreich.',s2:'Dokumente & Behörden',s2text:'Orientierung bei behördlichen Anliegen und notwendigen Dokumenten. Rechtliche Fragen werden individuell eingeordnet.',s3:'Wohnen & Ankommen',s3text:'Informationen zum österreichischen Wohnungsmarkt und Orientierung bei der Wohnungssuche.',s4:'Bildung & Karriere',s4text:'Förderung von Bildung, beruflicher Weiterbildung und Karriereentwicklung im neuen Umfeld.',s5:'Kultur & Gemeinschaft',s5text:'Soziale Integration, interkultureller Dialog, Begegnungen und gesellschaftliche Teilhabe.',topicLink:'Anliegen vorbereiten →',communityTag:'VERBUNDEN IN VIELFALT',communityTitle:'Ihre Erfahrung.<br>Unsere Verbindung.<br>Gemeinsame Stärke.',communityText:'Sie haben eine Idee zur Zusammenarbeit oder möchten Mitglied werden? Beginnen wir mit einem Gespräch.',communityLink:'Mitwirken →',faqTag:'03 / GUT ZU WISSEN',faqTitle:'Das Wichtigste<br>auf einen Blick.',q1:'Für wen ist ZUIK da?',a1:'Der Verein unterstützt ukrainische Staatsangehörige und Menschen ukrainischer Herkunft in Österreich. Sein Tätigkeitsbereich umfasst das gesamte österreichische Bundesgebiet.',q2:'Wie werde ich Mitglied?',a2:'Natürliche und juristische Personen können Mitglied werden. Über die Aufnahme entscheidet der Vorstand. Die Generalversammlung legt die Mitgliedsbeiträge fest. Aktuelle Bedingungen sind mit dem Team zu klären.',q3:'Kann ich eine Rechtsberatung erhalten?',a3:'Unterstützung bei rechtlichen und behördlichen Angelegenheiten gehört zu den Vereinszielen. Ob eine Beratung oder die Einbindung einer Fachperson möglich ist und unter welchen Bedingungen, wird im Einzelfall abgestimmt.',q4:'Ist der virtuelle Telefonassistent bereits erreichbar?',a4:'Der telefonische Kontakt wird vorbereitet. Die Telefonnummer und der Zugang zum virtuellen Assistenten werden nach der Einrichtung hier veröffentlicht. Bis dahin erreichen Sie uns unter info@zuik.at.',contactTag:'04 / KONTAKT',contactTitle:'Jedes Gespräch<br>kann etwas bewegen.',contactIntro:'Erzählen Sie uns von Ihrem Anliegen oder schlagen Sie eine Zusammenarbeit mit dem Verein vor.',addressLabel:'POSTANSCHRIFT',addressNote:'Korrespondenzadresse. Persönliche Sprechstunden sind nicht bestätigt.',phoneLabel:'TELEFON',phonePending:'Die Telefonnummer wird in Kürze hier veröffentlicht.',formTitle:'Ihr Anliegen',formNotice:'Füllen Sie das Formular aus – wir bereiten eine E-Mail an info@zuik.at in Ihrem E-Mail-Programm vor. Prüfen Sie den Text und klicken Sie auf „Senden“.',nameLabel:'Ihr Name',contactLabel:'E-Mail oder Telefonnummer',topicLabel:'Thema',membership:'Mitgliedschaft & Zusammenarbeit',other:'Anderes Anliegen',messageLabel:'Wie können wir Sie unterstützen?',dataNote:'Bitte keine Pass-, Bank- oder Gesundheitsdaten eingeben.',prepare:'E-Mail schreiben ↗',noSend:'Ihr E-Mail-Programm öffnet sich mit der vorbereiteten Nachricht.',draftTitle:'E-Mail-Programm nicht geöffnet? Text kopieren und an info@zuik.at senden',copy:'Text kopieren',footerPurpose:'Ukrainische Wurzeln.<br>Gemeinsame Zukunft in Österreich.',privacyLink:'Datenschutz',legalTitle:'Vereinsangaben',legalNote:'Angaben laut Vereinsregisterauszug zum Stichtag 25.09.2026.',privacyTitle:'Datenschutz beim Formular',privacyText:'Das Formular bereitet lediglich eine E-Mail in Ihrem E-Mail-Programm vor; die Website selbst übermittelt oder speichert keine eingegebenen Daten. Anfragen, die Sie an info@zuik.at senden, verwendet der Verein ausschließlich zu deren Beantwortung. Diese Seite bindet keine externe Analyse, externen Schriftarten oder Werbe-Cookies ein. Der Hosting-Anbieter kann technische Daten verarbeiten, die für den Zugriff auf die Website erforderlich sind.',footerName:'Zentrum für ukrainische Integration und Kultur in Österreich',backTop:'Nach oben ↑'
};
const nodes = [...document.querySelectorAll('[data-i]')];
const uk = Object.fromEntries(nodes.map(n=>[n.dataset.i,n.innerHTML]));
let language='uk';
function setLanguage(lang){
 language=lang; const dict=lang==='de'?de:uk;
 nodes.forEach(n=>{if(dict[n.dataset.i]!==undefined)n.innerHTML=dict[n.dataset.i]});
 document.documentElement.lang=lang;
 document.title=lang==='de'?'ZUIK — Zentrum für ukrainische Integration und Kultur in Österreich':'ZUIK — Центр української інтеграції та культури в Австрії';
 document.querySelector('meta[name="description"]').content=lang==='de'?'ZUIK — Ukrainische Gemeinschaft in Österreich. Wirtschaftliche Integration, Bildung, Wohnen und interkultureller Dialog. Wien, ZVR 1851297522.':'ZUIK — українська спільнота в Австрії. Економічна інтеграція, освіта, житло та міжкультурний діалог. Відень, ZVR 1851297522.';
 document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
 document.getElementById('copyStatus').textContent='';
 if(!document.getElementById('draft').hidden) renderDraft();
}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
document.querySelectorAll('[data-topic]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('topic').value=a.dataset.topic}));
function buildMail(){
 const f=new FormData(document.getElementById('inquiry'));
 const labels=language==='de'?['Name','Kontakt','Thema','Anliegen']:['Ім’я','Контакт','Тема','Звернення'];
 const topic=document.getElementById('topic').selectedOptions[0].textContent;
 const name=String(f.get('name')).trim();
 const subject=`ZUIK: ${topic} — ${name}`;
 const body=`${labels[0]}: ${name}\n${labels[1]}: ${String(f.get('contact')).trim()}\n${labels[2]}: ${topic}\n\n${labels[3]}:\n${String(f.get('message')).trim()}`;
 return {subject,body};
}
function renderDraft(){
 const {subject,body}=buildMail();
 document.getElementById('draftText').textContent=`${language==='de'?'An':'Кому'}: ${MAIL}\n${language==='de'?'Betreff':'Тема листа'}: ${subject}\n\n${body}`;
}
document.getElementById('inquiry').addEventListener('submit',e=>{
 e.preventDefault();
 const {subject,body}=buildMail();
 renderDraft();
 document.getElementById('draft').hidden=false;
 document.getElementById('copyStatus').textContent='';
 window.location.href=`mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
document.getElementById('copy').addEventListener('click',async()=>{const status=document.getElementById('copyStatus');try{await navigator.clipboard.writeText(document.getElementById('draftText').textContent);status.textContent=language==='de'?'Kopiert. Bitte an info@zuik.at senden.':'Скопійовано. Надішліть на info@zuik.at.'}catch{status.textContent=language==='de'?'Bitte den Text oben markieren und manuell kopieren.':'Виділіть і скопіюйте текст вручну.'}});
function openLegal(){const target=document.getElementById(location.hash.slice(1));if(target?.tagName==='DETAILS')target.open=true;}
window.addEventListener('hashchange',openLegal);openLegal();
