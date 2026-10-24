import type { Raw } from '../lib/exam'

// Texts as printed in Discover Canada (oath p. 3, anthem p. 84).
export const TEXTS: { title: string; page: number; body: string }[] = [
  { title: 'The Oath of Citizenship', page: 3, body: `I swear (or affirm)
That I will be faithful
And bear true allegiance
To His Majesty
King Charles the Third
King of Canada
His Heirs and Successors
And that I will faithfully observe
The laws of Canada
Including the Constitution
Which recognizes and affirms
The Aboriginal and treaty rights of
First Nations, Inuit and Métis peoples
And fulfil my duties
As a Canadian citizen.

(Updated for the current Sovereign. The printed guide still names Queen Elizabeth the Second.)` },
  { title: 'Le serment de citoyenneté', page: 3, body: `Je jure (ou j'affirme solennellement)
Que je serai fidèle
Et porterai sincère allégeance
À Sa Majesté
Le roi Charles Trois
Roi du Canada
À ses héritiers et successeurs
Que j'observerai fidèlement
Les lois du Canada
Y compris la Constitution
Qui reconnaît et confirme les droits
Ancestraux ou issus de traités
Des Premières Nations, des Inuits et des Métis
Et que je remplirai loyalement
Mes obligations
De citoyen canadien.` },
  { title: 'O Canada', page: 84, body: `O Canada! Our home and native land!
True patriot love in all thy sons command
With glowing hearts we see thee rise
The true North strong and free!
From far and wide, O Canada
We stand on guard for thee
God keep our land glorious and free!
O Canada, we stand on guard for thee
O Canada, we stand on guard for thee` },
  { title: 'Ô Canada', page: 84, body: `Ô Canada! Terre de nos aïeux,
Ton front est ceint de fleurons glorieux!
Car ton bras sait porter l'épée,
Il sait porter la croix!
Ton histoire est une épopée
Des plus brillants exploits.
Et ta valeur, de foi trempée,
Protégera nos foyers et nos droits.
Protégera nos foyers et nos droits.` },
]

export const oath: Raw[] = [
  ['Which words begin the Oath of Citizenship?', ['I swear (or affirm) that I will be faithful', 'I promise to defend Canada', 'I solemnly declare my loyalty', 'I pledge allegiance to the flag'], 0, 'The oath begins "I swear (or affirm) that I will be faithful and bear true allegiance..."', 3],
  ['In the Oath, you bear true what?', ['Allegiance', 'Courage', 'Witness', 'Loyalty tax'], 0, '"...and bear true allegiance to His Majesty King Charles the Third, King of Canada, His Heirs and Successors."', 3],
  ['To whom do you swear allegiance in the Oath?', ['The Sovereign (King of Canada) and his heirs and successors', 'The Prime Minister', 'The Canadian flag', 'The Constitution'], 0, 'Loyalty is professed to a person who represents all Canadians.', 3],
  ['In the Oath you promise to faithfully observe what?', ['The laws of Canada', 'The orders of the Prime Minister', 'All religious customs', 'Military regulations'], 0, '"...faithfully observe the laws of Canada including the Constitution."', 3],
  ['The Oath says the Constitution recognizes and affirms the rights of which peoples?', ['First Nations, Inuit and Métis peoples', 'English and French peoples', 'All immigrants', 'Provincial governments'], 0, 'Aboriginal and treaty rights.', 3],
  ['What do you promise to fulfil at the end of the Oath?', ['My duties as a Canadian citizen', 'My military service', 'My tax return', 'My promise to vote'], 0, 'The last line: "And fulfil my duties as a Canadian citizen."', 3],
  ['You may either swear or affirm the Oath of Citizenship.', ['True', 'False'], 0, 'The text says "I swear (or affirm)".', 3],
  ['Where do you take the Oath of Citizenship?', ['At the citizenship ceremony', 'At the airport', 'At the Supreme Court', 'At the polling station'], 0, 'You also sign the oath form and receive your certificate.', 10],
  ['In Canada, we profess our loyalty to what?', ['A person who represents all Canadians (the Sovereign)', 'A constitution', 'A flag', 'A country'], 0, 'Not a document, a banner such as a flag, or a geopolitical entity.', 4],
  ['"Canada is personified by the Sovereign just as the Sovereign is personified by Canada." This explains?', ['The principle behind the Oath', 'The role of the Senate', 'How a bill becomes law', 'Federalism'], 0, 'It is described as a remarkably simple yet powerful principle.', 4],
  ['Where was "O Canada" first sung?', ['Quebec City', 'Ottawa', 'Montreal', 'Halifax'], 0, 'It was first sung in Quebec City in 1880 and proclaimed the anthem in 1980.', 84],
  ['Complete the anthem: "True patriot love in all thy sons ___"', ['command', 'demand', 'defend', 'declare'], 0, '"True patriot love in all thy sons command".', 84],
  ['Complete the anthem: "The true North strong and ___"', ['free', 'proud', 'wide', 'bold'], 0, '"The true North strong and free!"', 84],
  ['Complete the anthem: "From far and wide, O Canada, we stand on ___ for thee"', ['guard', 'watch', 'duty', 'call'], 0, '"We stand on guard for thee".', 84],
  ['Complete the anthem: "God keep our land glorious and ___"', ['free', 'strong', 'true', 'great'], 0, '"God keep our land glorious and free!"', 84],
  ['Complete the anthem: "With glowing hearts we see thee ___"', ['rise', 'shine', 'stand', 'grow'], 0, '"With glowing hearts we see thee rise".', 84],
  ['How does the first line of the anthem begin?', ['O Canada! Our home and native land!', 'O Canada! Our land of freedom!', 'O Canada! The true North!', 'O Canada! From sea to sea!'], 0, 'The first line.', 84],
  ['Complete the French anthem: "Ô Canada! Terre de nos ___"', ['aïeux', 'amis', 'rois', 'hommes'], 0, '"Terre de nos aïeux".', 84],
  ['According to the French words, "Ton bras sait porter l\'épée, il sait porter ___"', ['la croix', 'le drapeau', 'la paix', 'la loi'], 0, '"Il sait porter la croix!"', 84],
  ['French and English Canadians sing the same words to "O Canada".', ['True', 'False'], 1, 'They sing different words.', 84],
]
