
(function(oG){//checked
	var tArr=[];
	var pArr=[];
	function getTextLoc($var){
		return tArr[$var];
	}

	function getPinLoc($var){
		return pArr[$var];
	}

	function getSectionLoc($var){
		var bs=$var*30;
		var t0=bs+1;
		var t1=bs+30;
		var out=t0+"-"+t1;
		return out;
	}

	tArr[0]=["eight","no","big","two","to open","to go","people","three","water","one","to eat",
"o clock","to read","many/much","good/nice","very","to come back","home","nine","cold","hot",
"on/above","ten","to be","book","four","too","I/me","below","small"];
	pArr[0]=["bā","bù","dà","èr","kāi","qù","rén","sān","shuǐ","yī","chī","diǎn","dú","duō","hǎo",
"hěn","huí","jiā","jiǔ","lěng","rè","shàng","shí","shì","shū","sì","tài","wǒ","xià","xiǎo"];

	tArr[1]=["to love","food","all","(quantifier)","dog","to drink","to look at","piece","inside","six","(question marker)","you","seven","he/him","to think","five","a few","to have","at","this","(belongs to)","can (ability)","how many","years/age","to call","to come","to buy","cat","not","to be able to"];
	pArr[1]=["ài","cài","dōu","gè","gǒu","hē","kàn","kuài","lǐ","liù","ma","nǐ","qī","tā","xiǎng","wǔ","xiē","yǒu","zài","zhè","de","huì","jǐ","sui","jiào","lái","mǎi","māo","méi","néng"];

	tArr[2]=["year","day","few, little","who","to listen","she/her","to write","month","to live","to do","father","edition/volume","computer","thing","happy","and","today","teacher","mother","rice","that","you (plural)","money","to know","what","fruit","classmate","to like","thanks","student"];
	pArr[2]=["nián","rì","shǎo","shuí","tīng","tā","xiě","yuè","zhù","zuò","bà ba","běn","diàn nǎo","dōng xi","gāo xìng","hé","jīn tiān","lǎo shī","mā ma","mǐ fàn","nà","nǐ men","qián","rèn shi","shén me","shuǐ guǒ","tóng xué","xǐ huan","xiè xie","xué shēng"];

	tArr[3]=["Beijing","tea","television","how many/much","son","restaurant","to work","name","friend","morning","to say","we, us","now","to study","chair","China","to sit","cup","to phone someone","movie","airplane","to see","zero","tomorrow","where","(suggestion)","apple","shop","time, when","they, them"];
	pArr[3]=["Běi jīng","chá","diàn shì","duō shao","ér zi","fàn diàn","gōng zuò","míng zi","péng you","shàng wǔ","shuō huà","wǒ men","xiàn zài","xué xí","yǐ zi","zhōng guó","zuò","bēi zi","dǎ diàn huà","diàn yǐng","fēi jī","kàn jiàn","líng","míng tiān","nǎ r","ne","píng guǒ","shāng diàn","shí hòu","tā men"];

	tArr[4]=["they/them (female)","afternoon","mister","week","school","clothing","doctor","good-bye","how","noon","Chinese character","yesterday","you\"re welcome","taxi","sorry","Chinese language","back","railway station","(past tense)","it doesn\"t matter","daughter","front","please","to sleep","weather","to rain","miss","hospital","how about","table"];
	pArr[4]=["tā men","xià wǔ","xiān sheng","xīng qī","xué xiào","yī fu","yī shēng","zài jiàn","zěn me","zhōng wǔ","zì","zuó tiān","bú kè qi","chū zū chē","duì bu qǐ","hàn yǔ","hòu miàn","huǒ chē zhàn","le","méi guān xi","nǚ ér","qián miàn","qǐng","shuì jiào","tiān qì","xià yǔ","xiǎo jiě","yī yuàn","zěn me yàng","zhuō zi"];


	tArr[5]=["(suggestion)","everyone","to tell","to reply","can (permission)","milk","to get sick","hey","eye","sport","do not","to wait","company","older sister","from","ticket","to give/send","to hope","already","to look for","boat","room","delicious","to think","busy","sunny","to dance","new","to swim","to prepare"];
	pArr[5]=["ba","dà jiā","gào su","huí dá","kě yǐ","niú nǎi","shēng bìng","wèi","yǎn jing","yùn dòng","bié","děng","gōng sī","jiě jie","lí","piào","sòng","xī wàng","yǐ jīng","zhǎo","chuán","fáng jiān","hǎo chī","jué de","máng","qíng","tiào wǔ","xīn","yóu yǒng","zhǔn bèi"];

	tArr[6]=["white","but","older brother","airport","lesson/class","woman","birthday","why?","lamb","again","long","younger brother","expensive","to introduce","pair/two of","beautiful","so","to wash","together","(continuing tense)","(quantifier - times)","very","number","coffee","every","last year","outside","family name","right side","bicycle"];
	pArr[6]=["bái","dàn shì","gē ge","jī chǎng","kè","nǚ rén","shēng rì","wèi shén me","yáng ròu","zài","cháng","dì di","guì","jiè shào","liǎng","piào liang","suǒ yǐ","xǐ","yī qǐ","zhe","cì","fēi cháng","hào","kā fēi","měi","qù nián","wài","xìng","yòu bian","zì xíng chē"];

	tArr[7]=["hundred","to arrive","to give","egg","quick","side","time","to ask","medicine","morning","to sing","first","(perfect tense)","to enter","road","wife","it","towards","meaning","really","from","minute","black","to begin","younger sister","to let/allow","to play","to rest","fish","to walk"];
	pArr[7]=["bǎi","dào","gěi","jī dàn","kuài","páng biān","shí jiān","wèn","yào","zǎo shang","chàng gē","dì yī","guò","jìn","lù","qī zi","tā","xiàng","yì si","zhēn","cóng","fēn zhōng","hēi","kāi shǐ","mèi mei","ràng","wán","xiū xi","yú","zǒu"];

	tArr[8]=["to help","(adverbial particle)","bus","(quantifier - clothes)","happy","to run","matter","question","to want, will","piece","to go out","right/correct","still","close/near","to travel","to get up","to play football","hour","cloudy","currently","wrong","waiter","red","exam","man","to go to work","to finish","snow","yuan (rmb)","most"];
	pArr[8]=["bāng zhù","de","gōng gòng qì chē","jiàn","kuài lè","pǎo bù","shì qing","wèn tí","yào","zhāng","chū","duì","hái","jìn","lǚ yóu","qǐ chuáng","tī zú qiú","xiǎo shí","yīn","zhèng zài","cuò","fú wù yuán","hóng","kǎo shì","nán rén","shàng bān","wán","xuě","yuán","zuì"];

	tArr[9]=["to compare with","(adverbial particle)","kilogram","classroom","tired","cheap","watch","watermelon","also","husband","to wear","towards","child","only/just","slow","thousand","question","to smile","because","to know","to play basketball","tall","to welcome","to be possible","you (formal)","body, health","evening","color","far","left side"];
	pArr[9]=["bǐ","de","gōng jīn","jiào shì","lèi","pián yi","shǒu biǎo","xī guā","yě","zhàng fu","chuān","duì","hái zi","jiù","màn","qiān","tí","xiào","yīn wèi","zhī dào","dǎ lán qiú","gāo","huān yíng","kě néng","nín","shēn tǐ","wǎn shang","yán sè","yuǎn","zuǒ bian"];


	tArr[10]=["maid/auntie","grass","animal","nation","foot","gift","fat","pair","banana","influence","office","except for","convenience","painting","to pass","at once","autumn","PE/sports","suitcase","to stand","must","light/lamp","to follow","badly/excessively","guest","south","voice","for","definitely","important"];
	pArr[10]=["ā yí","cǎo","dòng wù","guó jiā","jiǎo","lǐ wù","pàng","shuāng","xiāng jiāo","yǐng xiǎng","bàn gōng shì","chú le","fāng biàn","huà","jīng guò","mǎ shàng","qiū","tǐ yù","xíng li xiāng","zhàn","bì xū","dēng","gēn","jí","kè rén","nán","shēng yīn","wèi","yī dìng","zhòng yào"];

	tArr[11]=["short","bad (quality)","passage of text","past (time)","street","face","grape","driver","to believe","game","bag","word","to relax","to return","long (time)","satisfied","afterwards","hair","panda","to worry","to express/signify","place/location","more","season","mouth","to be sad","world","for","soon/a moment","mainly"];
	pArr[11]=["ǎi","chà","duàn","guò qù","jiē dào","liǎn","pú tao","sī jī","xiāng xìn","yóu xì","bāo","cí yǔ","fàng xīn","huán","jiǔ","mǎn yì","rán hòu","tóu fà","xióng māo","zháo jí","biǎo shì","dì fāng","gèng","jì jié","kǒu","nán guò","shì jiè","wèi  le","yī huì r","zhǔ yào"];

	tArr[12]=["quiet","shirt","how","to be scared","program","(quantifier - cars)","to ride","despite","to be careful","again","newspaper","to clean","nearby","to change","to hold/carry out","door/gate","serious","library","to choose","photo","other people","map","story/tale","simple","pants","grade/year in school","thin","west","constantly","attention"];
	pArr[12]=["ān jìng","chèn shān","duō me","hài pà","jié mù","liàng","qī","suī rán","xiǎo xīn","yòu","bào zhǐ","dǎ sǎo","fù jìn","huàn","jǔ xíng","mén","rèn zhēn","tú shū guán","xuǎn zé","zhào piàn","bié rén","dì tú","gù shi","jiǎn dān","kù zi","nián jí","shòu","xī","yī zhí","zhù yì"];

	tArr[13]=["to move","city","moreover","blackboard","to finish","neighbor","actually","sugar","shoe","would like to","by/be acted on","to bring","clean","meeting","to decide","bread","if","to finish","to require","only","refrigerator","email","to shut","to meet","chopsticks","bird","uncle","washroom","before","oneself"];
	pArr[13]=["bān","chéng shì","ér qiě","hēi bǎn","jié shù","lín jū","qí shí","táng","xié","yuàn yì","bèi","dài","gān jìng","huì yì","jué dìng","miàn bāo","rú guǒ","wán chéng","yāo qiú","zhǐ","bīng xiāng","diàn zǐ yóu jiàn","guān","jiàn miàn","kuài zi","niǎo","shū shu","xǐ shǒu jiān","yǐ qián","zì jǐ"];

	tArr[14]=["half","to appear","fever","flower","to borrow","green","pencil","pain","fresh","moon","to compare","cake","cold","nearly","lovely","clear","to get online","ten thousand","generally","finally","menu","winter","to concern","to teach","old","to climb up","math","summer","bank","recently"];
	pArr[14]=["bàn","chū xiàn","fā shāo","huā","jiè","lǜ","qiān bǐ","téng","xīn xiān","yuè liàng","bǐ jiào","dàn gāo","gǎn mào","jī hū","kě ài","míng bai","shàng wǎng","wàn","yī bān","zhōng yú","cài dān","dōng","guān xīn","jiāo","lǎo","pá shāng","shù xué","xià","yín háng","zuì jìn"];


	tArr[15]=["ah","story/layer","short/brief","juice","to connect","history","beer","to brush teeth","as/like","to use","to help","spring","to put","bad","manager","to sell","skirt","colleague","interesting","to grow","change","low","basis/root","chance","air conditioning","difficult","to be angry","(quantifier - people)","altogether","weekend"];
	pArr[15]=["a","céng","duǎn","guǒ zhī","jiē","lì shǐ","pí jiǔ","shuā yá","xiàng","yòng","bāng máng","chūn","fàng","huài","jīng lǐ","mài","qún zi","tóng shì","xìng qǔ","zhǎng","biàn huà","dī","gēn jù","jī huì","kōng tiáo","nán","shēng qì","wèi","yī gòng","zhōu mò"];

	tArr[16]=["hobby","supermarket","to exercise","still","to marry","to practice","Mandarin","level of ability","same","famous","full","clever","to divide","environment","old","hat","enthusiasm","suddenly","to need","to look after","to perform","subway","park","to examine","to cry","music","to make","culture","after","to wish"];
	pArr[16]=["ài hào","chāo shì","duàn liàn","hái shì","jié hūn","liàn xí","pǔ tōng huà","shuǐ píng","xiāng tóng","yǒu míng","bǎo","cōng ming","fēn","huán jìng","jiù","mào zǐ","rè qíng","tū rán","xū yào","zhào gù","biǎo yǎn","dì tiě","gōng yuán","jiǎn chá","kū","yīn yuè","shǐ","wén huà","yǐ hòu","zhù"];

	tArr[17]=["handle/act upon","score/grade","to be hungry","river","to solve","to know/understand","strange","sun","headmaster","to meet","north","plan","to review/revise","yellow","sentence","rice","to think","leg","glasses","camera","hotel","elevator","to blow","healthly","piece","youth","mobile phone","custom/tradition to","to think (wrongly)","dictionary"];
	pArr[17]=["bǎ","chéng jì","è","hé","jiě jué","liáo jiě","qí guài","tài yang","xiào zhǎng","yù dào","běi fāng","dǎ suàn","fù xí","huáng","jù zǐ","mǐ","rèn wéi","tuǐ","yǎn jìng","zhào xiàng jī","bīn guǎn","diàn tī","guā fēng","jiàn kāng","kuài","nián qīng","shǒu jī","xí guàn","yǐ wéi","zì diǎn"];

	tArr[18]=["class/group","to be late","ear","passport","festival","building","else/another","special","letter","more/to get over","match","to worry","to dare","or","to carve","noodle","easy","bowl","grandfather","kind","just","to understand","connection/relation","to speak","blue","to try hard","tree","to bathe","same","always"];
	pArr[18]=["bān","chí dào","ěr duo","hù zhào","jié rì","lóu","qí tā","tè bié","xìn","yuè","bǐ sài","dān xīn","gǎn","huò zhě","kè","miàn tiáo","róng yi","wǎn","yé ye","zhǒng","cái","dǒng","guān xì","jiǎng","lán","nǔ lì","shù","xǐ zǎo","yī yàng","zǒng shì"];

	tArr[19]=["method","kitchen","to discover","garden","often","horse","clear","to improve","news","cloud","nose","surely","just now","to remember","thirsty","grandmother","umbrella","to forget","at the same time","middle","to attend","east","regarding","corner","to leave","plate","comfortable","first","should","homework"];
	pArr[19]=["bàn fǎ","chú fáng","fā xiàn","huā yuán","jīng cháng","mǎ","qīng chǔ","tí gāo","xīn wén","yún","bí zi","dāng rán","gāng cái","jì de","kě","nǎi nǎi","sǎn","wàng jì","yī biān","zhōng jiān","cān jiā","dōng","guān yú","jiǎo","lí kāi","pán zi","shū fu","xiān","yīng gāi","zuò yè"];


	tArr[20]=["messy","to give","bright","a hundred million","two","fake","light","inside","to ring out","tired","field","enough","when","to get","lazy","to wear","to put up","to rub","sweat","soup","full","pig","salt","hard","while","to take off","to agree","to earn","sour","page"];
	pArr[20]=["luàn","jiāo","liàng","yì","liǎ","jiǎ","guāng","nèi","xiǎng","kùn","chǎng","gòu","dāng","dé","lǎn","dài","guà","cā","hàn","tāng","mǎn","zhū","yán","yìng","ér","tuō","xíng","zhuàn","suān","yè"];

	tArr[21]=["to lose","… times","thick","take","salty","wall","to taste","to do","to throw","to embrace","to hit","not to have","(tree measure word)","to die","deep","to guess","broken","narrow","to calculate","dirty","to lie","soft","hot","to connect","to wake up","fragrant","with","part","to repair","to send"];
	pArr[21]=["diū","bèi","hòu","qǔ","xián","qiáng","cháng","nòng","rēng","bào","zhuàng","wú","kē","sǐ","shēn","cāi","pò","zhǎi","suàn","zāng","tǎng","ruǎn","là","lián","xǐng","xiāng","yǔ","fèn","xiū","fā"];

	tArr[22]=["platform, table","each","to quarrel","mouth","to send","very","to drop","to push","to knock","by","province","and so on","piece","bitter","blood","to try","to talk","a trip","light","all over","to accompany","meal","of","according  to","knife","bottom","but","ah","circle","wide"];
	pArr[22]=["tái","gè","chǎo","zuǐ","jì","tǐng","diào","tuī","qiāo","yóu","shěng","děng","piān","kǔ","xuè","shì","tán","tàng","qīng","biàn","péi","dùn","zhī","yǐ","dāo","dǐ","què","ya","yuán","kuān"];

	tArr[23]=["rich","handsome","to do","surplus","seat","past","to raise","to pull","to point","to collect","dark","bouquet (flowers)","bridge","dream","fire","to stay","to rent","poor","stupid","crowd","to win","to lose","to pass time","to stroll","to deceive","here","there","all","Chinese language","just now"];
	pArr[23]=["fù","shuài","gàn","shèng","zuò","wǎng","tái","lā","zhǐ","shōu","àn","duǒ","qiáo","mèng","huǒ","liú","zū","qióng","bèn","qún","yíng","shū","guò","guàng","piàn","zhè r","nà r","yī qiè","zhōng wén","gāng gāng"];

	tArr[24]=["careful","task","to ensure","to stop","entrance","the last","countryside","calm","to reduce","to set out","difference","pressure","original","to oppose","to develop","have to","pitiful","number","to be surprised","taste","quality","recall","the earth","to increase","to lose","grandson","real","password","tour guide","tool"];
	pArr[24]=["zǐ xì","rèn wù","bǎo zhèng","tíng zhǐ","rù kǒu","zuì hòu","nóng cūn","lěng jìng","jiǎn shǎo","chū fā","qū bié","yā lì","yuán lái","fǎn duì","fā zhǎn","zhǐ hǎo","kě lián","hào mǎ","chī jīng","wèi dao","pǐn zhì","huí yì","dì qiú","zēng zhǎng","shī bài","sūn zi","shí zài","mì mǎ","dǎo yóu","gōng jù"];


	tArr[25]=["besides","happiness","humorous","mood","suddenly","attitude","condition","happy","feeling","to dress up","to get an injection","to be sorry","to be on time","to arrange","to remind","to support","income","change","effect","to clear up","aspect","general","temporarily","appearance","a plant","to pollute","sofa","to weep","performance","however"];
	pArr[25]=["bìng qiě","xìng fú","yōu mò","xīn qíng","hū rán","tài du","qíng kuàng","yú kuài","gǎn jué","dǎ bàn","dǎ zhēn","bào qiàn","àn shí","pái liè","tí xǐng","zhī chí","shōu rù","gǎi biàn","xiào guǒ","zhěng lǐ","fāng miàn","pǔ biàn","zàn shí","yàng zi","zhí wù","wū rǎn","shā fā","liú lèi","yǎn chū","rán ér"];

	tArr[26]=["to be familiar with","love","father","lion","monkey","ideal","life","because of","skin","purpose","master (post-grad)","society","to congratulate","air","visa","nervous","to constitute","economy","experience","result","shortcoming","tennis","to consider","belly","to achieve","to express","rule","plan","to hate","journalist"];
	pArr[26]=["shú xi","ài qíng","fù qin","shī zi","hóu zi","lǐ xiǎng","shēng huó","yóu yú","pí fū","mù di","shuò shì","shè huì","zhù hè","kōng qì","qiān zhèng","jǐn zhāng","zǔ chéng","jīng jì","jīng yàn","jié guǒ","quē diǎn","wǎng qiú","kǎo lǜ","dù zi","huò dé","biǎo dá","guī dìng","jì huà","tǎo yàn","jì zhě"];

	tArr[27]=["to prove","dictionary","honest","to misunderstand","to take off","distance","process","to suit","to notify","part","mirror","to read","to limit","to assemble","in passing","scenery","drink","dumplings","to encourage","children","regardless of …","century","strict","therefore","Beijing opera","relative","always","representative","price","excellence"];
	pArr[27]=["zhèng míng","cí diǎn","chéng shí","wù hui","qǐ fēi","jù lí","guò chéng","shì hé","tōng zhī","bù fèn","jìng zi","yuè dú","xiàn zhi","jí hé","shùn biàn","fēng jǐng","yǐn liào","jiǎo zi","gǔ lì","ér tóng","bù guǎn","shì jì","yán gé","yú shì","jīng jù","qīn qi","cóng lái","dài biǎo","jià gé","yōu xiù"];

	tArr[28]=["to use","to trust","to allow","free of charge","kilometer","essential","birth","to judge","everywhere","to work overtime","brave","very","doctor (Ph.D.)","formidable","to forgive","friendly","to reflect","to receive","so long as","It's a pity","leaf","qualified","to sympathize","otherwise","to discuss","difficulty","international","address","foundation","to fill a vacancy"];
	pArr[28]=["shǐ yòng","xìn rèn","yǔn xǔ","miǎn fèi","gōng lí","guān jiàn","chū shēng","pàn duàn","dào chù","jiā bān","yǒng gǎn","shí fēn","bó shì","lì hài","yuán liàng","yǒu hǎo","fǎn yìng","shòu dào","zhǐ yào","kě xī","yè zi","hé gé","tóng qíng","fǒu zé","shāng liang","kùn nan","guó jì","dì zhǐ","jī chǔ","tián kòng"];

	tArr[29]=["to copy","general idea","to arrange","dialogue","opposite","future","master","cheers","broadcast","a place to sit","to cause","at once","often","lawyer","to be proud","character","afraid","opinion","emotion","ripe","all","to disturb","nurse","according to","to tidy","professor","quantity","neat and tidy","direction","since"];
	pArr[29]=["fù yìn","dà gài","ān pái","duì huà","duì miàn","jiāng lái","shī fu","gān bēi","guǎng bō","zuò wèi","yǐn qǐ","dàng shí","wǎng wǎng","lǜ shī","dé yì","xìng gé","kǒng pà","yì jian","gǎn qíng","chéng shú","suǒ yǒu","dǎ rǎo","hù shi","àn zhào","shōu shí","jiào shòu","shù liàng","zhěng qí","fāng xiàng","jì rán"];


	tArr[30]=["condition","extremely","correct","to graduate","towel","law","activity","fluency","waste","ocean","temperature","actor","busy","toothpaste","characteristic","haircut","life","knowledge","exactly","joke","organization","to continue","to lack","patient","to chat","occupation","ability","temper","natural","scheduled flight"];
	pArr[30]=["tiáo jiàn","jí qí","zhèng què","bì yè","máo jīn","fǎ lǜ","huó dòng","liú lì","làng fèi","hǎi yáng","wēn dù","yǎn yuán","rè nao","yá gāo","tè diǎn","lǐ fà","shēng mìng","zhī shi","jiū jìng","xiào hua","zǔ zhī","jì xù","quē shǎo","nài xīn","liáo tiān","zhí yè","néng lì","pí qi","zì rán","háng bān"];

	tArr[31]=["to economize","famous","form","socks","police","language","to ask for time off","shopping","to stand up","to exceed","to be in progress","gradually","to invite","again","emphasis","smoothly","arrogant","senior","to clap","suitable","but, only","specially","idea","to conduct","mutually","asia","communication","still","fax","sad"];
	pArr[31]=["jié yuē","zhù míng","biǎo gé","wà zi","jǐng chá","yǔ yán","qǐng jià","gòu wù","qǐ lái","chāo guò","jìn xíng","zhú jiàn","yāo qǐng","chóng xīn","zhòng diǎn","shùn lì","jiāo ào","gāo jí","gǔ zhǎng","hé shì","bù guò","zhuān mén","zhú yi","jǔ bàn","hù xiāng","yà zhōu","jiāo liú","réng rán","chuán zhēn","shāng xīn"];

	tArr[32]=["author","confidence","to be worth","whole","secondly","exact","to the end","power","action","to include","impression","reason","in time","in addition","not only","regret","to attract","to persist","complex","doctor","money award","benefit","alone","safety","completely","reality","shy","furniture","respect","salary"];
	pArr[32]=["zuò zhě","xìn xīn","zhí dé","quán bù","qī cì","zhǔn què","dào dǐ","lì qì","dòng zuò","bāo kuò","yìn xiàng","yuán yīn","jí shí","lìng wài","bù dàn","hòu huǐ","xī yǐn","jiān chí","fù zá","dài fu","jiǎng jīn","hǎo chù","gū dān","ān quán","wán quán","shí jì","hài xiū","jiā jù","zūn zhòng","gōng zī"];

	tArr[33]=["dry","ordinarily","age","advertisement","local","gender","to sum up","thank","to become","to print","to enlarge","news report","to smoke","to recruit for a job","to supply","education","to take a walk","number","article","bored","warm","interesting","originally","magazine","material","as expected","normal","official","ethnic group","climate"];
	pArr[33]=["gān zào","píng shí","nián líng","guǎng gào","dàng dì","xìng bié","zǒng jié","gǎn xiè","chéng wéi","dǎ yìn","kuò dà","bào dǎo","chōu yān","zhāo pìn","tí gōng","jiào yu","sàn bù","shù zì","wén zhāng","wú liáo","nuǎn huo","yǒu qù","běn lái","zá zhì","cái liào","guǒ rán","zhèng cháng","zhèng shì","mín zú","qì hòu"];

	tArr[34]=["forever","active","popular","romantic","message","moist","to be excited","modern","to understand","to apply for","opposite","reliable","to prohibit","science","to fit with","careless","to experience","website","beauty","to translate","contact","to be sure","at least","art","range","to praise","audience","to explain","to visit","to invite to dinner"];
	pArr[34]=["yǒng yuǎn","huó pō","liú xíng","làng màn","xiāo xi","shī rùn","jī dòng","xiàn dài","lǐ jiě","shēn qǐng","xiāng fǎn","què shí","jìn zhǐ","kē xué","fǔ hé","cū xīn","jīng lì","wǎng zhàn","měi lì","fān yi","lián xì","kěn dìng","zhì shǎo","yì shu","fàn wéi","biǎo yáng","guān zhòng","jiě shì","fǎng wèn","qǐng kè"];


	tArr[35]=["responsibility","to adapt to","speed","to take seriously","key","the Great Wall","sunshine","casual","couldn't it be","unexpectedly","order","customer","to prepare for class","capital","trouble","exciting","major (college)","serious","height","abundant","initiative","to ride","perhaps","traffic","to replace","any","advantage","estimate","action","for example"];
	pArr[35]=["zé rèn","shì ying","sù dù","zhòng shi","yào shi","cháng chéng","yáng guāng","suí biàn","nán dào","jìng rán","shùn xu","gù kè","yù xí","shǒu dū","má fan","xìng fèn","zhuān yè","yán zhòng","gè zi","fēng fù","zhǔ dòng","chéng zuò","yě xǔ","jiāo tōng","dài tì","rèn hé","yōu diǎn","gū jì","zuò yòng","lì rú"];

	tArr[36]=["to protect","once in a while","shared, common","not only","among","to cultivate","content","had better …","on time","cool","to lose weight","to go on business","to make","ten million","dangerous","even if","to visit","friendship","to happen","but","afterwards","around","we, us","cough","therefore","to be in traffic","to increase","approximately","to lose hope","to seem"];
	pArr[36]=["bǎo hù","ǒu ěr","gòng tóng","bù jǐn","qī zhōng","yǎng chéng","nèi róng","zuì hǎo","zhǔn shí","liáng kuai","jiǎn féi","chū chāi","zhì zào","qiān wàn","wēi xiǎn","jí shǐ","cān guān","yǒu yí","fā shēng","kě shì","hòu lái","zhōu wéi","zán men","ké sòu","yīn cǐ","dǔ chē","zēng jiā","dà yuē","shī wàng","hǎo xiàng"];

	tArr[37]=["winter vacation","novel","especially","although","market","doubt","to be moved","to succeed","to discount","to criticize","technology","to sign up","to refuse","to accept","to postpone","ahead of schedule","to shake hands","to give up","on purpose","method","no matter what","diary","standard","forest","just in time","mother","to be worried","bottle","...even…","to study abroad"];
	pArr[37]=["hán jià","xiǎo shuō","yóu qí","jǐn guǎn","shì chǎng","huái yí","gǎn dòng","chéng gōng","dǎ zhé","pī píng","jì shu","bào míng","jù jué","jiē shòu","tuī chí","tí qián","wò shǒu","fàng qì","gù yì","fāng fǎ","wú lùn","rì jì","biāo zhǔn","sēn lín","zhèng hǎo","mǔ qin","fán nǎo","píng zi","shēn zhì","liú xué"];

	tArr[38]=["box","direct","view","genuine","courtesy","accumulation","a little","window","to compete","answer","to manage","splendidness","spirit","date, engagement","envy","tiger","to discuss","many","specific","grammar","explanation","to investigate","responsible","relaxed","exhausting","to pass","to apologize","Changjiang River","to lower","along with"];
	pArr[38]=["hé zi","zhí jiē","kàn fǎ","zhēn zhèng","lǐ mào","jī lěi","shāo wēi","chuāng hu","jìng zhēng","dá àn","guǎn lǐ","jīng cǎi","jīng shén","yuē huì","xiàn mu","lǎo hǔ","tǎo lùn","xǔ duō","xiáng xì","yǔ fǎ","shuō míng","diào chá","fù zé","qīng sōng","xīn kǔ","tōng guò","dào qiàn","cháng jiāng","jiàng dī","suí zhe"];

	tArr[39]=["to do business","(to) can’t stand","trash-bin","chocolate","almost","summer vacation","notebook","badminton","ping-pong","tomato","RMB","shop assistant","embassy","to joke","too late to","postgraduate","have to","credit card","gas station","plastic bag","to play the piano","there's still time","washing machine","(used for fractions)","to feel sick","food","biscuit","first of all","careless","restaurant, hotel"];
	pArr[39]=["zuò shēng yì","shòu bu liǎo","lā jī tǒng","qiǎo kē lì","chà bù duō","fàng shǔ jià","bǐ jì běn","yǔ máo qiú","pīng pāng qiú","xī hóng shì","rén mín bì","shòu huò yuán","dà shǐ guǎn","kāi wán xiào","lái bù jí","yán jiū shēng","bù dé bù","xìn yòng kǎ","jiā yóu zhàn","sù liào dài","tán gāng qín","lái dě jí","xǐ yī jī","fēn zhī","nán shòu","shí pǐn","bǐng gān","shǒu xiān","mǎ hu","fàn guǎn"];


	tArr[40]=["to ride","2nd, class B","convenient","foolish","to advise","foolish","a pile","to fight over","to tear open or down","to wave","to suffer from","to contribute","askew, devious","dense","soft, mushy","flat piece or slice","sweet (taste)","lid","second (of time)","to connect to","chest, bosom","festival","poem, poetry","to fish","small bell","to lock up","pot, pan","to rush","battle formation","3rd, grade C"];
	pArr[40]=["chéng","yǐ","biàn","shǎ","quàn","dāi","duī","qiǎng","chāi","huī","āi","juān","wāi","nóng","làn","piàn","tián","gài","miǎo","xì","xiōng","jié","shī","diào","líng","suǒ","guō","chuǎng","zhèn","bǐng"];

	tArr[41]=["to frighten","to blow air","laughter","circle","pagoda, tower","to marry (women)","(quantifier – meeting)","bank, beach","curved","to help with your arm","to do or make","to touch or feel","to murder","item or article","gun, rifle","upright, exactly","clique, group","diluted, weak","wolf","to throw or fling","to itch or tickle","to chop down","to state, to name","to crouch","heavy, serious","silver","apex, roof","to float","dragon","cubes of meat or veg"];
	pArr[41]=["xià","chuī","hā","quān","tǎ","jià","jiè","àn","wān","chān","gǎo","mō","shā","tiáo","qiāng","zhèng","pài","dàn","láng","shuǎi","yǎng","kǎn","chēng","dūn","zhòng","yín","dǐng","piāo","lóng","dīng"];

	tArr[42]=["to be able to","to dash water","to lean against","to call or shout"," to blurt out","cloth, to declare","to pat or clap","to block","to arrange","shake, to rock","to fall and break","square, direction","sunbathe, file share","confused","dynasty","some","root, basis","to leak (water or info)","hot to touch","to cook or boil","first, class A","to open (eye)","blind","to look at","tight, close","stomach","vinegar","copper (chemistry)","thunder","obedient (of a child)"];
	pArr[42]=["kè","chōng","píng","hǎn","rǎng","bù","pāi","dǎng","bǎi","yáo","shuāi","fāng","shài","yūn","cháo","mǒu","gēn","lòu","tàng","zhǔ","jiǎ","zhēng","xiā","qiáo","jǐn","wèi","cù","tóng","léi","guāi"];

	tArr[43]=["to move backwards","to urge","to freeze","to cut or slice","standard","county","to vomit","to bite","to hate","to take, hold, catch","to pick up","to rescue","tree trunk, plant stem","a stick or club","to lack","to fry","basin, flower pot","straight, fair","taxes","kind, type","to wind or rotate","lung","to smell bad","snake","to step on","to escape","to hear/smell, news","dew, nectar","(measure – for bits)","clown"];
	pArr[43]=["dǎo","cuī","dòng","qiē","zé","xiàn","tǔ","yǎo","hèn","ná","jiǎn","jiù","zhū","bàng","qiàn","chǎo","pén","zhí","shuì","lèi","rào","fèi","chòu","shé","cǎi","táo","wén","lù","kē","chǒu"];

	tArr[44]=["to lift, to elect","to stretch","booklet","to be equal to","kiss","group, circular","to boast","cover","delicate","to exist, to store","government","feeble","to copy, plagiarize","to take or pick","to tear","to support","slanting","pear","horizontal","superficial","to pan fry","purple","waist, lower back","thin, weak","to dress up, play role","to hand over","to tease","youth","non-, not-, un-","to scold"];
	pArr[44]=["jǔ","shēn","cè","pǐ","wěn","tuán","kuā","tào","nèn","cún","guān","ruò","chāo","zhāi","sī","zhī","xié","lí","héng","qiǎn","jiān","zǐ","yāo","báo","zhuāng","dì","dòu","qīng","fēi","mà"];


	tArr[45]=["to raise, promote","to roll up","pot","night","to take a wife","to read or study ","to support with hand","to criticize","to hinder","to carry","to insert","to put up","to break","to rest","hair, fur","to sprinkle","to pour liquid","to rise (prices, rivers)","to roll, get lost (rude)","a drop, to drip","to pull (animal)","to break into pieces","grain, granule","the back of the body","to take advantage of","to retreat","intoxicated","clock","to get rid of","mist"];
	pArr[45]=["shēng","juǎn","hú","yè","qǔ","niàn","fú","pī","lán","tí","chā","dā","duàn","xiē","máo","sǎ","jiāo","zhǎng","gǔn","dī","qiān","suì","lì","bèi","chèn","tuì","zuì","zhōng","chú","wù"];

	tArr[46]=["to bring about","staff","to publish","outstanding","diplomacy","to hinder","paternal aunt","objective","thief","to prolong","to establish","intense","surgical operation","to hit, attack","to resit","to be crowded","volleyball","to make better","punctuation","military skil","to lose heart","to treasure","trait","to manufacture","to paste or stick","luxurious","quality (of a thing)","to improve","promptly","to confront"];
	pArr[46]=["chǎn shēng","rén yuán","chū bǎn","zhuó yuè","wài jiāo","fáng ài","gū gu","kè guān","xiǎo tōu","yán cháng","jiàn lì","qiáng liè","shǒu shù","dǎ jī","dǐ zhì","yōng jǐ","pái qiú","gǎi shàn","biāo diǎn","wǔ shù","huī xīn","ài hù","tè zhēng","shēng chǎn","zhān tiē","háo huá","zhì liàng","jìn bù","lián máng","miàn duì"];

	tArr[47]=["hostage","to store up","courage","to coordinate","it is clear …","tone, note","wantonly","curious","young woman","wedding ceremony","banquet","to look ahead","common sense","glove","to correct","scheme or plan","cotton","to cure","to cherish","substance","toy","battery","to love dearly","to hope for","to sign (signature)","CV, résumé","ever since","favorable","surface","modern times"];
	pArr[47]=["rén zhì","chǔ bèi","yǒng qì","xié tiáo","kě jiàn","shēng diào","dà sì","hào qí","gū niang","hūn lǐ","yàn huì","zhǎn wàng","cháng shí","shǒu tào","gǎi zhèng","fāng àn","mián huā","zhì liáo","ài xī","wù zhì","wán jù","diàn chí","téng ài","pàn wàng","qiān zì","jiǎn lì","zì cóng","liáng hǎo","biǎo miàn","jìn dài"];

	tArr[48]=["solemn","there is no need","envelope","busy phone line","reliable","marriage","perfect","room (in a house)","ingenious","straightforward","landlord","procedures","to inquire about","to promote","check (bank)","daily","compassion","vivid","use (noun)","transmitter-receiver","cereals","urgent","share (stock market)","automatic","to state clearly","to compensate","keyboard","long distance","only if","surface area"];
	pArr[48]=["yán sù","hé bì","xìn fēng","zhàn xiàn","kě kào","hūn yīn","wán měi","wū zi","qiǎo miào","gān cuì","fáng dōng","shǒu xù","dǎ ting","tí chàng","zhī piào","rì cháng","ài xīn","shēng dòng","yòng tú","diàn tái","liáng shi","jǐn jí","gǔ piào","zì dòng","biǎo míng","péi cháng","jiàn pán","cháng tú","chú fēi","miàn jī"];

	tArr[49]=["at the time needed","to seem","preferential","companion","admire","signal (phone)","primary","hardworking","to constitute","solid","staunch","elephant","to console","to make perfect","quietly","to express thanks","war","finger","to carry out","outline","schedule","reign","style","light refreshments","details","victory","facial expression","qualifications","to import","to face something"];
	pArr[49]=["lín shí","fǎng fú","yōu huì","huǒ bàn","pèi fú","xìn hào","chū jí","kè kǔ","hé chéng","gù tǐ","jiān qiáng","dà xiàng","ān wèi","wán shàn","qiāo qiāo","gǎn jī","zhàn zhēng","shóu zhǐ","zhí xíng","tí gāng","rì chéng","cháo dài","yàng shì","diǎn xin","xì jié","shèng lì","biǎo qíng","zī gé","jìn kǒu","miàn lín"];


	tArr[50]=["just in case","dear, beloved","know (from learning)","to export","awful","lawful","large scale","install","sharp-pointed","try one’s best","psychological","long-standing","drama","pattern","calendar","match (fire)","to nod","to leave out","order, sequence","to be proud","slim","to show","a bank account","hurriedly","super","to fit","balcony","leader","bone","mouse (computing)"];
	pArr[50]=["wàn yī","qīn ài","tǐ huì","chū kǒu","kě pà","hé fǎ","dà xíng","ān zhuāng","jiān ruì","jìn lì","xīn lǐ","yōu jiǔ","xì jù","fāng shì","rì lì","huǒ chái","diǎn tóu","shěng lüè","zhì xù","zì háo","miáo tiao","biǎo xiàn","zhàng hù","gán jǐn","chāo jí","pèi hé","yáng tái","líng dǎo","gǔ tou","shǔ biāo"];

	tArr[51]=["volume, bulk","... let alone …","diligent","to quarrel","to absorb","to train","to deal with","complete","regularly","living room","to the full","to construct","to grasp","to know well","to describe","to relax","date (calendar)","sign, symbol","to appreciate","active","flexible","to respond","cord, string","as for ...","vegetables","otherwise ...","funding","at once","post office","inspire"];
	pArr[51]=["tǐ jī","hé kuàng","qín fèn","chǎo jià","xī shōu","péi yǎng","chú lǐ","wán zhěng","dìng qī","kè tīng","jǐn liàng","jiàn shè","bǎ wò","zhǎng wò","miáo xiě","fàng sōng","rì qī","biāo zhì","xīn shǎng","huó yuè","líng huó","dā yìng","shéng zi","zhì yú","shū cài","yào bú","zī jīn","gǎn kuài","yóu jú","gú wǔ"];

	tArr[52]=["bookshelf","information","outstanding","to handle","industrious","rational","basic","soldier","to suggest","thorough","to go back and forth","terrible","to sense","a license","democracy","to go sight-seeing","as usual","virus","to run into","system","to be conscious of","to melt","if","cautious","tofu","a loan (money)","prevention and cure","to employ","component","topic"];
	pArr[52]=["shū jià","xìn xī","chū sè","bàn lǐ","qín láo","hé lǐ","jī běn","shì bīng","jiàn yì","chè dǐ","wáng fǎn","kǒng bù","gǎn shòu","zhí zhào","mín zhǔ","yóu lǎn","zhào cháng","bìng dú","pèng jiàn","xì tǒng","zì jué","róng huà","yào shì","jǐn shèn","dòu fu","dài kuǎn","fáng zhì","gù yōng","líng jiàn","tí mù"];

	tArr[53]=["to download","to act as an agent","considerate","invasion","to manufacture","command","peace","nonsense","pass time","heart","essential","impressions","to receive guests","to register","data, numbers","era","advantageous","liquid","prince","fatigue","space (empty)","simply","to kidnap","honored","resource","garage","metal","New Year's Eve","change (money)","hunger"];
	pArr[53]=["xià zǎi","dài lǐ","tǐ tiē","qīn lüè","zhì zuò","mìng lìng","hé píng","fèi huà","dù guò","xīn zàng","bì xū","gán xiǎng","zhāo dài","guà hào","shù jù","shí dài","yǒu lì","yè tǐ","wáng zǐ","pí láo","kōng jiān","jiǎn zhí","bǎng jià","róng xìng","zī liào","chē kù","jīn shǔ","chú xī","líng qián","jī è"];

	tArr[54]=["profession","agent","amiable","elegant","seems as if","in the evening","to attend","to pass a test","to convene (meeting)","contract (business)","famous brand","tail","to construct","to take shape","treatment, salary","to turn a corner","to question","respect and love","to seem","proficient","independent","glass","leather shoes","free time","soap","complacent","honor","carriage","steel","snack"];
	pArr[54]=["yè wù","zhōng jiè","qīn qiè","yōu měi","shì de","bàng wǎn","chū xí","jí gé","zhào kāi","hé tong","míng pái","wěi ba","jiàn zhù","xíng chéng","dài yù","guǎi wān","tí wèn","jìng'ài","xiǎn dé","shú liàn","dú lì","bō li","pí xié","kòng xián","féi zào","zì mǎn","róng yù","chē xiāng","gāng tiě","líng shí"];


	tArr[55]=["spare time","personally","superiority","to spread","to embody","to close","simple, alone","business card","to leave","how","subtitle","treasured object","to approve","to control","number","whether (or not)","maybe not","core","silence","unique","cash","catch cold","energetic","classic works","neck","action","to pay attention to","expenses","weight","domain"];
	pArr[55]=["yè yú","qīn zì","yōu shì","chuán bō","tǐ xiàn","guān bì","dān chún","míng piàn","gào bié","rú hé","zì mù","bǎo bèi","pī zhǔn","kòng zhì","shù mǎ","shì fǒu","wèi bì","hé xīn","chén mò","dú tè","xiàn jīn","zháo liáng","jī jí","jīng diǎn","bó zi","xíng dòng","jiǎng jiū","fèi yòng","zhòng liàng","lǐng yù"];

	tArr[56]=["in one day","unpeaceful","center, heart","mighty","to infect","experience for self","to maintain","to part ways","monotonous","a person’s taste","take a group photo","philosophy","nowadays","posture","truth","fortunately","to undertake","clear-cut","evident","to spread","intense","unilateral","to hesitate","text message","energy","to observe","to input","to descend","youthfulness","superior quality"];
	pArr[56]=["yí dàn","bù ān","zhōng xīn","wěi dà","chuán rǎn","tǐ yàn","bǎo chí","fēn bié","dān diào","kǒu wèi","hé yǐng","zhé xué","rú jīn","zī shì","shí huà","xìng kuī","chéng dān","míng què","xiǎn rán","liú chuán","jī liè","piàn miàn","yóu yù","duǎn xìn","jīng lì","guān chá","shū rù","jiàng luò","qīng chūn","gāo dàng"];

	tArr[57]=["middle 3rd of month","accountant","to impart","to preserve","distributed","alone","to cooperate","sky","to put into practice","contrast","vibration","clear","scenery","to deep fry","to skim over","light (of food)","reality","to move","degree, extent","selfish","cosy","a pedestrian","to replenish","point of view","to take notes","software (computer)","to violate (a law)","soy sauce","next door","TV channel"];
	pArr[57]=["zhōng xún","kuài jì","chuán shòu","bǎo cún","fēn bù","dān dú","hé zuò","tiān kōng","shí jiàn","duì bǐ","zhèn dòng","míng xiǎn","jǐng sè","yóu zhá","liú lǎn","qīng dàn","xiàn shí","yí dòng","chéng dù","zì sī","shū shì","xíng rén","bǔ chōng","guān diǎn","jì lù","ruǎn jiàn","wéi fǎn","jiàng yóu","gé bì","pín dào"];

	tArr[58]=["unceasing","individual","legend","to show care","to jeopardize","consequences","attentive","throat","to strive","to treat or handle","to belong to","to describe","circumstances","composition, part","to report (news)","to hold an office","celebrity","to show","field, open land","proficient","to note or record","confidence","a course of lectures","diagnosis","exam paper","hot pepper, chili","regret, pity","dry land","forecast","frequently"];
	pArr[58]=["bú duàn","gè bié","chuán shuō","guān huái","wēi hài","hòu guǒ","zhōu dào","sǎng zi","fèn dòu","duì dài","shǔ yú","xíng róng","qíng jǐng","chéng fen","bào dào","dān rèn","míng xīng","xiǎn shì","tián yě","jīng tōng","jì lù","zì xìn","jiǎng zuò","zhěn duàn","shì juàn","là jiāo","yí hàn","lù dì","yù bào","pín fán"];

	tArr[59]=["as well as","tradition","champion","fate","seek advice from","variety","naive","counterpart","to enroll","form, shape","achievement","to report","teaching material","moment","comb","desert","phenomenon","discipline","numerous","to operate","to safeguard","arm","candle","butterfly","to be born","request","step by step","department","to be aimed at","to place an order"];
	pArr[59]=["yǐ jí","chuán tǒng","guàn jūn","mìng yùn","zī xún","pín zhǒng","tiān zhēn","duì fāng","lù qǔ","xíng shì","chéng guǒ","bào gào","jiào cái","shí kè","shū zi","shā mò","xiàn xiàng","jì lǜ","fēn fēn","jīng yíng","wéi hù","gē bo","là zhú","hú dié","dàn shēng","qǐng qiú","zhú bù","bù mén","zhēn duì","yù dìng"];


	tArr[60]=["unavoidable","since (an event)","to transmit","workplace","bilateral","scarf","valuable","opponent","ordinary","circumstances","to ignore","in a hurry","anger","fashionable","to come from","to imitate","beach","to register","truth","to call or address as","freedom","concept","angle, point of view","naughty","to look down on","bar, pub","one after another","revolution","to prevent","bright-colored"];
	pArr[60]=["bù miǎn","yǐ lái","chuán dì","dān wèi","shuāng fāng","wéi jīn","bǎo guì","duì shǒu","píng cháng","xíng shì","hū shì","jí máng","fèn nù","shí máo","lái zì","mó fǎng","shā tān","zhù cè","zhēn lǐ","chēng hu","zì yóu","guān niàn","jiǎo dù","tiáo pí","qīng shì","jiǔ bā","lù xù","gé mìng","yù fáng","xiān yàn"];

	tArr[61]=["otherwise","individual (person)","to take charge of","to distribute","to delete","package","to have insomnia","entertainment","lonely","target","equal","to record (sound)","sentiment","accomplishment","to challenge","future","vague","crafty","to link","true, real","curtains","tube, pipe","boss","delay","to talk nonsense","voluntary","mother's brother","action, behavior","to comment","to persuade"];
	pArr[61]=["bù rán","gè rén","zhǔ chí","fēn pèi","shān chú","bāo guǒ","shī mián","yú lè","jì mò","duì xiàng","píng děng","lù yīn","qíng xù","chéng jiù","tiǎo zhàn","wèi lái","mó hu","jiǎo huá","xiāng lián","zhēn shí","chuāng lián","guǎn zi","láo bǎn","dān wu","hú shuō","zì yuàn","jiù jiu","xíng wéi","yì lùn","shuō fú"];

	tArr[62]=["not equal to","silk","to exchange","to possess","to analyze","innovation","physical labor","to include","unit, entrance number","to feel wronged","with regards to","square (foot/meter)","public square","celebrate","image, form","a period in time","pillow","especially","corn, maize","get along with","blessings, wish well","to immigrate, migrant","to commemorate","lane, alley","sincere","to adjust","natural resource","to take turns","lightning","unfamiliar"];
	pArr[62]=["bù rú","sī chóu","jiāo huàn","jù bèi","fēn xī","chuàng xīn","láo dòng","bāo hán","dān yuán","wěi qu","duì yú","píng fāng","guáng chǎng","qìng zhù","xíng xiàng","shí qī","zhěn tou","gé wài","yù mǐ","xiāng chǔ","zhù fú","yí mín","jì niàn","hú tóng","chéng kěn","tiáo zhěng","zī yuán","lún liú","shǎn diàn","mò shēng"];

	tArr[63]=["rather than…","the slightest amount","individuality","communication","still or as before","to retain","to produce","excuse me","good and honest","to tell","to revolve around","to lose","huge","balance","good fortune","vast","president (company)","to establish","machine","grade, class","step, move","cherish","soccer fan","objective","equivalent to","muddled","thesis","sarcasm","to hide oneself","usual"];
	pArr[63]=["yǔ qí","sī háo","gè xìng","jiāo jì","yī rán","bǎo liú","chuàng zào","láo jià","shàn liáng","zhǔ fu","wéi rǎo","shī qù","jù dà","píng héng","xìng yùn","guǎng dà","zǒng cái","chéng lì","jī qì","dàng cì","bù zhòu","zhēn xī","qiú mí","mù biāo","xiāng dāng","hú tu","lùn wén","fěng cì","duǒ cáng","tōng cháng"];

	tArr[64]=["insufficient","subjective","apparently","insurance","to pass away","to breathe","to be good at","thanks to","to entrust","mother's mother","extensive","the present age","nature, character","altogether","unexpected","to admit, concede","to make money","instructor","fashion","suffering","catalog, list","relatively, opposite","pure, honest","party, gathering","muscle","fall behind, backward","to evaluate","tone, mood","style","pigeon, dove"];
	pArr[64]=["bù zú","zhǔ guān","sì hū","báo xiǎn","qù shì","hū xī","shàn yú","duō kuī","wěi tuō","lǎo lao","guǎng fàn","dāng dài","xìng zhì","zǒng gòng","yì wài","chéng rèn","zhèng qián","jiào liàn","shí shàng","tòng kǔ","mù lù","xiāng duì","chún jié","jù huì","jī ròu","luò hòu","píng jià","yǔ qì","fēng gé","gē zi"];


	tArr[65]=["to be fooled","need not","master, host","a fact","glossy","to arrive","steamed bun","superfluous","universe, cosmos","unexpectedly","tranquil","form, shape","smile","to think deeply","to bear, to support","policy","fundamental","a question","frenzied","overjoyed","at the moment","interrelated","magnetic tape","to synthesize","honest","beard","to calculate","trend","logic","suburbs"];
	pArr[65]=["shàng dàng","bù bì","zhǔ rén","shì shí","guāng huá","dào dá","bāo zi","duō yú","yǔ zhòu","jū rán","píng jìng","xíng zhuàng","wēi xiào","sī kǎo","chéng shòu","zhèng cè","gēn běn","yí wèn","fēng kuáng","tòng kuài","mù qián","xiāng guān","cí dài","zōng hé","lǎo shi","hú xū","jì suàn","qū shì","luó jí","jiāo qū"];

	tArr[66]=["duty","theme","New Year's Day","brothers","welcome!","to announce","to provoke","to cancel","at the same time","commodity","to threaten","temple","average","vile","pessimistic","effect, result","it is said that","government","slow-witted ","stone","pier","in length and breadth","rat or mouse","glue","peanut","property","ethics","collective, social","necklace","social custom"];
	pArr[66]=["yì wù","zhǔ tí","yuán dàn","xiōng di","guāng lín","gōng bù","cì jī","qǔ xiāo","tóng shí","shāng pǐn","wēi xié","sì miào","píng jūn","è liè","bēi guān","chéng xiào","jù shuō","zhèng fǔ","mù tou","shí tou","mǎ tou","zòng héng","láo shǔ","jiāo shuǐ","huā shēng","cái chǎn","dào dé","jí tǐ","xiàng liàn","fēng sú"];

	tArr[67]=["chairperson","optimistic","illumination","concrete, specific","to publish","even if","only, sole","business","religion","factory","meaning","a lesson, a moral","whole, entire","authority","furthermore","to go bankrupt","private citizen","procedure","rice crops","reason, cause","background, context","remember","topic","communications","to gather news","imposing","item, project","hazard","food","steamed bread"];
	pArr[67]=["zhǔ xí","lè guān","guāng míng","jù tǐ","fā biǎo","nǎ pà","wéi yī","shāng yè","zōng jiào","gōng chǎng","yì yì","jiào xùn","zhěng gè","quán lì","cǐ wài","pò chǎn","sī rén","chéng xù","dào gǔ","yuán gù","bèi jǐng","jì yì","huà tí","tōng xùn","cái fǎng","xióng wěi","xiàng mù","fēng xiǎn","shí wù","mán tou"];

	tArr[68]=["unanimous","thing, object","position, place","to amend","CD or DVD","skill, art, kung fu","ladle","chemistry","raw material","to be anxious","to agree","to negate","rainbow","thought, idea","prime minister","to miss, long to see","proverb","to touch, contact","right, privilege","tangerine","less important","satisfied","destruction","cube","quilt","credentials","reason, sense","no wonder that…","to concentrate","to garrison"];
	pArr[68]=["yí zhì","shì wù","wèi zhi","xiū gǎi","guāng pán","gōng fu","sháo zi","huà xué","yuán liào","fā chóu","tóng yì","fǒu dìng","cǎi hóng","sī xiǎng","zóng lǐ","xiǎng niàn","chéng yǔ","jiē chù","quán lì","jú zǐ","cì yào","mǎn zú","pò huài","lì fāng","bèi zi","zhèng jiàn","dào lǐ","nán guài","jí zhōng","zhù zhā"];

	tArr[69]=["to advocate","relaxation","to have bad luck","honor and glory","overall","open, public","overseas Chinese","developed (country)","to deny","honored guest","therefore","to practice (of trainee)","dormitory","at long last","desire","to receive (a visitor)","undergraduate course","rubber, eraser","shortcomings","to divorce","to praise","steady","absolute","to unify","equipment","proof","to resign","urgent","to adopt","ugly"];
	pArr[69]=["zhǔ zhāng","xiū xián","dǎo méi","guāng róng","quán miàn","gōng kāi","huá yì","fā dá","fǒu rèn","jiā bīn","yīn ér","shí xí","sù shè","zǒng suàn","yuàn wàng","jiē dài","běn kē","xiàng pí","máo bìng","lí hūn","chēng zàn","wěn dìng","jué duì","tǒng yī","shè bèi","zhèng jù","cí zhí","pò qiè","cái qǔ","nán kàn"];


	tArr[70]=["to argue","from now on","if, for example","finals (contest)","capability","principle","shiver","to tell or talk about","element, factor","to achieve","direct (film)","president (country)","to mature","to comply","ability","plain","handicapped","to skate","contradiction","definite","immediately","bamboo","to govern","head, brains","norms or customs","plan, to design","Chinese chess","to give one's respects","stage, section","at any time"];
	pArr[70]=["zhēng lùn","cóng cǐ","jiǎ rú","jué sài","gōng néng","yuán zé","fā dǒu","xù shù","yīn sù","shí xiàn","dáo yǎn","zóng tǒng","chéng zhǎng","fú cóng","bén lǐng","pǔ sù","cán jí","huá bīng","máo dùn","què dìng","lì jí","zhú zi","tǒng zhì","nǎo dai","guī ju","shè jì","xiàng qí","wèn hòu","jiē duàn","suí shí"];

	tArr[71]=["in advance","to enjoy","thus","fair","medicine (internal)","to take risks","to row a boat","to consult","to bring into play","to lead to","to shoot (gun)","to solicit","in a word, in short","to grasp firmly","damage","document, file","to look forward to","essence","a coin","right away","shortage","wing","modest","rule (science)","character (story)","to liberate","to coach, tutor","luck","transparent","to drive"];
	pArr[71]=["shì xiān","xiǎng shòu","cóng ér","gōng píng","nèi kē","mào xiǎn","huá chuán","cān kǎo","fā huī","dǎo zhì","shè jī","zhēng qiú","zǒng zhī","zhuā jǐn","sǔn shī","wén jiàn","qī dài","běn zhì","yìng bì","lì kè","quē fá","chì bǎng","xū xīn","guī lǜ","jué sè","jiě fàng","fú dǎo","yùn qi","tòu míng","jià shǐ"];

	tArr[72]=["to strive for","to pay","determination","physical strength","hasty","to suffer losses","to enlighten","to implement","to declare","household","workman","to deal with","each other","to reminice","ashamed","to invest","stationery","to resemble","to confirm","ancestral land","to wait for","structure","to shorten","impose a fine","capable","scale, extent","facilities","trade","to change, transform","transport"];
	pArr[72]=["zhēng qǔ","fù kuǎn","jué xīn","lì liàng","cōng máng","chī kuī","qǐ fā","shí xíng","xuān bù","jiā tíng","gōng rén","yìng fù","bí cǐ","huái niàn","cán kuì","tóu zī","wén jù","xiāng sì","què rèn","zǔ guó","děng dài","jié gòu","suō duǎn","fá kuǎn","néng gàn","guī mó","shè shī","mào yì","zhuǎn biàn","yùn shū"];

	tArr[73]=["formerly","military affairs","to invent","woman","to experiment","propaganda","housework","to imagine","to persist","whole entity","civilized","sales counter","after all","atmosphere, mood","to burn","theory","computer hardware","prominent","waiting","to constitute","to combine","to alleviate","to reduce","energy source","tongue","to contribute","to communicate","to put to use","dining-hall","charm"];
	pArr[73]=["cóng qián","jūn shì","fā míng","fù nǚ","shí yàn","xuān chuán","jiā wù","xiǎng xiàng","chí xù","zhéng tǐ","wén míng","guì tái","bì jìng","qì fēn","rán shāo","lǐ lùn","yìng jiàn","tū chū","děng hòu","zǔ hé","jié hé","huǎn jiě","suō xiǎo","néng yuán","shé tou","gòng xiàn","zhuǎn gào","yùn yòng","cān tīng","mèi lì"];

	tArr[74]=["expert","to engage in","centimeter","to participate in","receipt","territory","well-distributed","to copy, duplicate","unemployment","miracle","hometown","ruler (stationery)","industry","decade","delusion","what is known as","near, close to","to take a photograph","politics","proportion","warm","disaster","to adore","to register ","eyebrow","ancestor","rule","to symbolize","to meet, welcome","to elect"];
	pArr[74]=["zhuān jiā","cóng shì","lí mǐ","cān yù","fā piào","tǔ dì","jūn yún","fù zhì","shī yè","qí jì","jiā xiāng","chǐ zi","gōng yè","nián dài","huàn xiǎng","suǒ wèi","jiē jìn","shè yǐng","zhèng zhì","bǐ lì","wēn nuǎn","zāi hài","rè ài","dēng jì","méi mao","zǔ xiān","guī zé","xiàng zhēng","yíng jiē","xuán jǔ"];


	tArr[75]=["special topic","value, worth","to promote (an idea)","to use as an excuse","apartment building","over and over again","profits","truck","statement","flight of steps","potato","practical","to swear an oath","snack","age","quota","playground","clothing","period of time","pond","gentle","warm (welcome)","to equal","art","talented","stature, build","excessive","to avert","to prevent","cucumber"];
	pArr[75]=["zhuān tí","jià zhí","cù jìn","jiè kǒu","gōng yù","zài sān","lì rùn","kǎ chē","fā yán","tái jiē","tǔ dòu","shí yòng","xuān shì","xiǎo chī","nián jì","zhǐ biāo","cāo chǎng","fú zhuāng","qī jiān","chí zi","wēn róu","rè liè","děng yú","měi shù","yīng jùn","shēn cái","guò fèn","bì miǎn","zǔ zhǐ","huáng guā"];

	tArr[76]=["to concentrate","attempt","to induce","to pretend","abundant","rabbit","CE, AD, common era","initial","interest (on a loan)","nationality","geography","married woman","from beginning to end","term, semester","preferably","to accept a job offer","to develop, open up","inevitable","to guide, coach","to worry about","literature","even more","court of law","to consume","enthusiasm","coal","emperor","conclusion","approve","identity, status"];
	pArr[76]=["zhuān xīn","qǐ tú","cù shǐ","jiǎ zhuāng","chōng fēn","tù zi","gōng yuán","zuì chū","lì xī","guó jí","dì lǐ","tài tai","shǐ zhōng","xué qī","nìng kě","yìng pìn","kāi fā","bì rán","zhí dǎo","cāo xīn","wén xué","gèng jiā","fǎ yuàn","xiāo fèi","rè xīn","méi tàn","huáng dì","jié lùn","zàn chéng","shēn fèn"];

	tArr[77]=["talented person","company, enterprise","princess","peasant","benefit","to draw up","bedroom","toilet","on the contrary","region","spectacular","clip or folder","to exist","learning, science","to lift a ban","handwork, by hand","for example","to digest (food)","empress, consort","myth","jar, can","criminal","to economize","hero","bee","to negotiate","to praise","to be allergic","to lag behind","to repeat"];
	pArr[77]=["rén cái","qǐ yè","gōng zhǔ","nóng mín","lì yì","zhì dìng","wò shì","cè suǒ","fǎn ér","dì qū","zhuàng guān","jiā zi","cún zài","xué shù","kāi fàng","shǒu gōng","bǐ rú","xiāo huà","huáng hòu","shén huà","guàn tóu","zuì fàn","jié shěng","yīng xióng","mì fēng","tán pàn","zàn měi","guò mǐn","tuì bù","chóng fù"];

	tArr[78]=["population","full of","agriculture","make use of","system, institution","repeatedly","ancient","blunt, candid","learning","to guard","to respect","to feel happy","necessary","decline an invitation","measure, step to take","efficiency","to have no way to do","to constitute","gasoline","test","condition, state","indeed","nerve","sturdy","shoulder","nutrition","to be overdue","to lose the way","to bring about","gold"];
	pArr[78]=["rén kǒu","chōng mǎn","nóng yè","lì yòng","zhì dù","fǎn fù","gǔ lǎo","tǎn shuài","xué wen","shǒu hù","zūn jìng","kāi xīn","bì yào","tuī cí","cuò shī","xiào lǜ","wú cóng","gòu chéng","qì yóu","cè yàn","zhuàng kuàng","dí què","shén jīng","jiē shi","jiān bǎng","yíng yǎng","guò qī","mí lù","zào chéng","huáng jīn"];

	tArr[79]=["mankind","the others","scissors","madam","house pet","wheat","confused","protest","to extend","benefit","to reform","enemy","wisdom","once, already","fruit, gains","to link up","profound","physics","justification","secret","too bad","prosperous","to pay the bill","to edit","to do business","to decorate","to train, to drill","to escape","to comply with","mistake"];
	pArr[79]=["rén lèi","qí yú","jiǎn dāo","nǚ shì","chǒng wù","xiǎo mài","huāng zhāng","kàng yì","tuī guǎng","shōu huò","gǎi gé","dí rén","zhì huì","céng jīng","guǒ shí","gōu tōng","shēn kè","wù lǐ","lǐ yóu","mì mì","zāo gāo","fán róng","jié zhàng","biān jí","yíng yè","zhuāng shì","xùn liàn","táo bì","zūn shǒu","cuò wù"];


	tArr[80]=["human life","work (of art)","accidentaly","adequate","every","prospects","to work hard for","ancient times","carpet","intimate","difference","to apply or use","to conduct","to catch and hold on","to recommend","receipt","to improve","cannot help but","customs (border)","to die out","dust","roast duck","special","state, condition","mysterious","difficult (task)","to blame (someone)","debate","to reach","rapid"];
	pArr[80]=["rén shēng","zuò pǐn","ǒu rán","chōng zú","fán shì","qián tú","lì zhēng","gǔ dài","dì tǎn","mì qiè","chā bié","yìng yòng","zhǐ huī","jiē zhe","tuī jiàn","shōu jù","gǎi jìn","wú nài","hǎi guān","xiāo miè","huī chén","kǎo yā","tè dìng","zhuàng tài","shén mì","jiān jù","zé bèi","biàn lùn","dá dào","xùn sù"];

	tArr[81]=["human affairs","one's conduct","fork (for eating)","response","classical","position, status","determined","expert","life expectancy","to spread out","shadow, reflection","romantic love","to resume","ring (for finger)","drawer","to summarize","weapon, arms","seafood","to disappear","to permeate","to climb a mountain","particular","secretary","until now","to load or unload","to inquire","course (education)","modest","to retire","firecrackers"];
	pArr[81]=["rén shì","zuò wéi","chā zi","fǎn yìng","gú diǎn","dì wèi","jiān jué","dà fāng","shòu mìng","zhǎn kāi","yǐng zi","liàn ài","huī fù","jiè zhi","chōu ti","gài kuò","wǔ qì","hǎi xiān","xiāo shī","shèn tòu","pá shān","tè shū","mì shū","zhì jīn","zhuāng xiè","xún wèn","kè chéng","qiān xū","tuì xiū","biān pào"];

	tArr[82]=["product","a character (novel)","to write an essay","note (paper) ","to overcome","in any case","to sustain injuries","fixed, regular","earthquake","to seek","to exhibit","to emphasize","cautious","to give up smoking","to do manual labor","abstract","to hub","to line up","countless","intelligence","concept","exchange rate","specially","to combine","to break away from","difficult","industry","riddle","to pursue","to sell, sales"];
	pArr[82]=["chán pǐn","rén wù","zuò wén","biàn tiáo","kè fú","fǎn zhèng","shòu shāng","gù dìng","dì zhèn","xún zhǎo","zhán lǎn","qiáng diào","shèn zhòng","jiè yān","dǎ gōng","chōu xiàng","yōng bào","pái duì","wú shù","zhì lì","gài niàn","huì lǜ","tè yì","lián hé","tuō lí","jiān kǔ","háng yè","mí yǔ","zhuī qiú","xiāo shòu"];

	tArr[83]=["a lifetime","no end of trouble","impatience","it doesn’t matter","not necessarily","amazing","to try one’s hardest","club (group or place)","museum","bathroom","PRC National Day","tai chi","young fellow","kindergarten","opening ceremony","cannot bear","to have dealings with","motorbike","ambulance","articles for daily use","jeans","to look down upon","mineral spring water","Sunday","wear a necktie","ordinary people","to hate to part with","can't say for sure","an adolescent","microphone"];
	pArr[83]=["yí bèi zi","bù dé liǎo","bú nài fán","bú yào jǐn","bú jiàn dé","liǎo bù qǐ","shǐ jìn ér","jù lè bù","bó wù guǎn","wèi shēng jiān","guó qìng jié","tài jí quán","xiǎo huǒ zi","yòu ér yuán","kāi mù shì","rěn bú zhù","dǎ jiāo dào","mó tuō chē","jiù hù chē","rì yòng pǐn","niú zǎi kù","kàn bù qǐ","kuàng quán shuǐ","lǐ bài tiān","xì lǐng dài","lǎo bǎi xìng","shě bù dé","shuō bú dìng","qīng shào nián","mài kè fēng"];

	tArr[84]=["ton","(grunt of agreement)","island","width of cloth, size","equal","place, office","to wrap around","peach","cave, hole","ash","to fear","gym","battery charger","cartoon","engineer","manual labor","volunteer","no wonder!","to sneeze","to say hello","postcard","home room teacher","boarding pass","coward","commentator","drama series","bon voyage","sorry, embarrassed","historical/scenic spot","highway"];
	pArr[84]=["dūn","āi","dǎo","fú","píng","suǒ","pī","táo","dòng","huī","wèi","jiàn shēn fáng","chōng diàn qì","dòng huà piàn","gōng chéng shī","gàn huó ér","zhì yuàn zhě","guài bù dé","dǎ pēn tì","dǎ zhāo hu","míng xìn piàn","bān zhǔ rèn","dēng jī pái","dǎn xiáo guǐ","jiě shuō yuán","lián xù jù","yī lù píng'ān","bù hǎo yì si","míng shèng gǔ jì","gāo sù gōng lù"];


	oG.textContent={getSection:getSectionLoc,getText:getTextLoc,getPin:getPinLoc};
}(opdGame));
