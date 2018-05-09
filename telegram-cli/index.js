var cp = require('child_process'),
    emitter = require('events').EventEmitter;

module.exports = function (tgPath, keyPath) {

    var instance = new emitter(),
        proc = cp.spawn(tgPath, ['-W', '-R', '-k', keyPath, '--json', '-P', '9009']),
        initialized = false;

    setTimeout(function () { // TODO: check output from telegram-cli
        initialized = true;
        instance.emit('ready');
    }, 5000);

    proc.on('error', function () {
        instance.emit('error', new Error('process killed')); // TODO: add reinit method
    });

    proc.stdout.setEncoding('utf8');

    proc.stdout.on('data', function (data) {
        //console.log(data);

        try {
            data=JSON.parse(data);
            //console.log(data);
            if (data.event==="message"){
                console.log({name: data.from.print_name, message: data.text.toUpperCase()});
                instance.emit('message', {name: data.from.peer_id, message: data.text.toUpperCase()});
            }
        } catch (e) {
            //console.log(data);
        }

        /*data = data.replace(/\r|\n/g, '').trim();
        console.log(data);
        data = data.split('\u001b[K').join('');
        if (data.startsWith("\u001b[34;1m [")) {
            //console.log(data);
            data = data.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ' ').trim();

            data = data.replace(/  +/g, ' ');
            console.log(data + ".");
            var from = data.indexOf(">>>");
            var name = data.substring(8, from - 1).split(" ").join('_');
            proc.stdin.write("mark_read " + name + '\n');
            var message = data.substring(from + 4).toUpperCase();
            console.log(name);
            console.log(message);
            instance.emit('message', {name: name, message: message});
        }*/
    });

    instance.sendRAW = function (msg) {
        if (initialized) {
            proc.stdin.write(msg + '\n');
        } else {
            instance.emit('error', new Error('unitialized'));
        }
    };

    instance.msg = function (to, message) {
        this.sendRAW('msg ' + to + ' ' + message);
    };

    instance.close = function () {
        this.sendRAW('safe_quit');
    };

    var courses = [
        {id: 251405709, abbr: "HST381/SOC319", title: "AIDS_and_Society"},
        {id: 264610862, abbr: "KAZ212", title: "Academic_Kazakh"},
        {id: 228517473, abbr: "MATH423", title: "Actuarial_Mathematics_"},
        {id: 226780877, abbr: "PLS451", title: "Advanced_Topics_in_International_Relations"},
        {id: 278688578, abbr: "TUR412", title: "Advanced_Turkish_in_Media_and_Politics"},
        {id: 319795952, abbr: "PLS325", title: "Ancient_Political_Theory"},
        {id: 267916607, abbr: "ANT306", title: "Anthropology_of_Performance"},
        {id: 267916607, abbr: "MATH477", title: "Applied_Finite_Element_Methods"},
        {id: 274142519, abbr: "CHEM451", title: "Applied_Homogenous_Catalysis"},
        {id: 285549665, abbr: "MATH310", title: "Applied_Statistical_Methods"},
        {id: 311323808, abbr: "PLS195/SOC120", title: "Asian_Community:_Development_in_Asia"},
        {id: 291638218, abbr: "KAZ101", title: "Basic_Kazakh_I"},
        {id: 297372099, abbr: "CHN102", title: "Beginning_Mandarin_II"},
        {id: 305705336, abbr: "SPA102", title: "Beginning_Spanish_II"},
        {id: 313185218, abbr: "BIOL341", title: "Biochemistry_I"},
        {id: 310475686, abbr: "CHEM442", title: "Biochemistry_II_with_Lab-Metabolic_Biochemistry"},
        {id: 277685737, abbr: "BIOL420", title: "Bioethics"},
        {id: 297821516, abbr: "BIOL101", title: "Biology_for_non-Science_majors"},
        {id: 280806135, abbr: "REL212", title: "Buddhist_Religious_Traditions"},
        {id: 292502878, abbr: "KAZ263", title: "Business_Etiquette"},
        {id: 280735795, abbr: "MATH161", title: "Calculus_I"},
        {id: 314043461, abbr: "MATH162", title: "Calculus_II"},
        {id: 311739077, abbr: "MATH263", title: "Calculus_III"},
        {id: 319556002, abbr: "HST223/ANT287", title: "Cannibalism_and_Civilization"},
        {id: 286290941, abbr: "MATH499", title: "Capstone_Project"},
        {id: 187522255, abbr: "SOC499", title: "Capstone_Seminar_II"},
        {id: 270696003, abbr: "ANT499", title: "Capstone_Seminar_II"},
        {id: 256883746, abbr: "PLS365/SOC365", title: "Civil-Military_Relations"},
        {id: 216781169, abbr: "PHYS362", title: "Classical_Electrodynamics_II"},
        {id: 269680897, abbr: "PHYS222", title: "Classical_Mechanics_II"},
        {id: 275439795, abbr: "COMM102", title: "Communication_Foundations_II"},
        {id: 234421683, abbr: "PLS447", title: "Comparative_Political_Parties"},
        {id: 259691714, abbr: "MATH480", title: "Complex_Analysis"},
        {id: 274098212, abbr: "PHYS270", title: "Computational_Physics_with_Laboratory"},
        {id: 266803078, abbr: "CSCI233", title: "Computer_Networks"},
        {id: 309260224, abbr: "COMM325", title: "Computer-Mediated_Communication"},
        {id: 276187431, abbr: "PLS328/REL328", title: "Confucianism_and_the_Development_of_Chinese_Politics"},
        {id: 287274303, abbr: "FRE322", title: "Contemporary_French_Civilization_"},
        {id: 226729436, abbr: "KAZ371", title: "Contemporary_Kazakh_Literature"},
        {id: 303663599, abbr: "KAZ362", title: "Creative_Writing_in_Kazakh_Language"},
        {id: 259753958, abbr: "SHSS260/WLL235", title: "Creative_Writing:_Introduction_to_Fiction_Writing_I"},
        {id: 252560268, abbr: "MATH417", title: "Cryptography"},
        {id: 243200196, abbr: "WLL313", title: "Dante's_Inferno_and_Friends"},
        {id: 318480586, abbr: "CSCI345", title: "Data_Visualization"},
        {id: 241765681, abbr: "SOC302", title: "Decolonizing_Social_Theory:_Can_Women_and_Non-Europeans_Think?"},
        {id: 296129731, abbr: "CSCI398", title: "Directed_Study"},
        {id: 314763897, abbr: "PHYS491", title: "Directed_Study_of_Advanced_Physics_Topics_"},
        {id: 307479706, abbr: "BIOL492", title: "Directed_study_in_Biology"},
        {id: 236773963, abbr: "MATH251", title: "Discrete_Mathematics"},
        {id: 295029402, abbr: "ECON301", title: "Econometrics_I"},
        {id: 300614302, abbr: "ECON413", title: "Econometrics_II"},
        {id: 253518812, abbr: "ECON321", title: "Economic_Growth"},
        {id: 284823501, abbr: "ECON341", title: "Economic_Simulation_Modeling"},
        {id: 283734974, abbr: "ECON211", title: "Economic_Statistics"},
        {id: 315691189, abbr: "SOC227", title: "Economy_and_Society"},
        {id: 292748585, abbr: "ROBT204", title: "Electrical_and_Electronic_Circuits_II_with_Lab"},
        {id: 316758563, abbr: "ROBT304", title: "Electromechanical_Systems_with_lab"},
        {id: 270726254, abbr: "PHIL210", title: "Ethics"},
        {id: 257203643, abbr: "HST132", title: "European_History_II_(from_1700)"},
        {id: 251978872, abbr: "PLS355", title: "European_Union:_Institutions_and_Policies_"},
        {id: 190036358, abbr: "SOC212/ANT285", title: "Food_and_Society"},
        {id: 287276338, abbr: "PHIL240", title: "Formal_Logic"},
        {id: 261392769, abbr: "MATH482", title: "Fourier_Analysis"},
        {id: 280472417, abbr: "CHEM101", title: "General_Chemistry_I"},
        {id: 289955253, abbr: "CHEM102", title: "General_Chemistry_II"},
        {id: 232531066, abbr: "CHEM102L", title: "General_Chemistry_II_lab"},
        {id: 276988965, abbr: "BIOL370", title: "Genetics"},
        {id: 307433992, abbr: "HST424", title: "Global_Histories"},
        {id: 251541768, abbr: "PHYS499", title: "Graduation_Project"},
        {id: 295228727, abbr: "ROBT491", title: "Graduation_Project"},
        {id: 292803250, abbr: "MATH407", title: "Graph_Theory"},
        {id: 228257297, abbr: "COMM240", title: "Health_Communication"},
        {id: 311923863, abbr: "BIOL430", title: "Histology"},
        {id: 279399924, abbr: "HST100", title: "History_of_Kazakhstan"},
        {id: 254294645, abbr: "BIOL231", title: "Human_Anatomy_and_Physiology_II"},
        {id: 294898184, abbr: "ANT361", title: "Human_Evolution:_Bones,_Stones_and_Genomes"},
        {id: 254682689, abbr: "ROBT414", title: "Human-Robot_Interaction"},
        {id: 184407815, abbr: "ROBT310", title: "Image_Processing"},
        {id: 295568840, abbr: "ROBT308", title: "Industrial_Automation"},
        {id: 268169823, abbr: "CHEM320", title: "Instrumental_Analysis_with_Labs"},
        {id: 227956149, abbr: "FRE202", title: "Intermediate_French_II"},
        {id: 319214882, abbr: "GER201", title: "Intermediate_German_I"},
        {id: 299945418, abbr: "GER202", title: "Intermediate_German_II"},
        {id: 261599206, abbr: "KAZ111", title: "Intermediate_Kazakh_I"},
        {id: 219801405, abbr: "ECON202", title: "Intermediate_Macroeconomics"},
        {id: 248162650, abbr: "CHN202", title: "Intermediate_Mandarin_II"},
        {id: 301855255, abbr: "ECON201", title: "Intermediate_Microeconomics"},
        {id: 285982305, abbr: "SPA202", title: "Intermediate_Spanish_II"},
        {id: 266507375, abbr: "PLS391", title: "Intermediate_Special_Topics_in_Comparative_Politics"},
        {id: 257130746, abbr: "PLS458", title: "International_Organization"},
        {id: 281072447, abbr: "PLS351", title: "International_Political_Economy"},
        {id: 278571913, abbr: "PLS352", title: "International_Relations_Theory"},
        {id: 287427490, abbr: "PLS457", title: "International_Security_and_Conflict"},
        {id: 276781347, abbr: "ANT160", title: "Introduction_to_Biological_Anthropology"},
        {id: 255226487, abbr: "PLS140", title: "Introduction_to_Comparative_Politics"},
        {id: 312625848, abbr: "PHIL131", title: "Introduction_to_Contemporary_Political_Philosophy"},
        {id: 306233812, abbr: "WLL121", title: "Introduction_to_Cultural_Studies"},
        {id: 286099330, abbr: "MATH274", title: "Introduction_to_Differential_Equations"},
        {id: 258838484, abbr: "PLS354", title: "Introduction_to_International_Law"},
        {id: 255829552, abbr: "WLL130", title: "Introduction_to_Language_and_Communication"},
        {id: 276220354, abbr: "WLL131", title: "Introduction_to_Linguistics"},
        {id: 272114720, abbr: "WLL110", title: "Introduction_to_Literary_Studies"},
        {id: 311860705, abbr: "ECON102", title: "Introduction_to_Macroeconomics"},
        {id: 254903420, abbr: "ECON101", title: "Introduction_to_Microeconomics"},
        {id: 254397265, abbr: "PHIL205", title: "Introduction_to_Modern_Philosophy"},
        {id: 302935372, abbr: "PHIL101", title: "Introduction_to_Philosophy"},
        {id: 275096773, abbr: "PLS101", title: "Introduction_to_Political_Science"},
        {id: 242357015, abbr: "PLS120", title: "Introduction_to_Political_Theory"},
        {id: 214242783, abbr: "ANT101", title: "Introduction_to_Sociocultural_Anthropology"},
        {id: 261138427, abbr: "SOC101", title: "Introduction_to_Sociology"},
        {id: 279798934, abbr: "WLL155", title: "Introduction_to_the_Comic_Book"},
        {id: 268764895, abbr: "WLL240", title: "Introduction_to_the_Novel"},
        {id: 207804846, abbr: "PHYS202", title: "Introductory_Astrophysics"},
        {id: 290760387, abbr: "ANT313/PLS332/REL332", title: "Islam_and_Politics_in_Eurasia"},
        {id: 259110444, abbr: "BIOL356", title: "Junior_Research"},
        {id: 290285404, abbr: "KAZ230", title: "Kazakh_Culture_through_Ethnography,_Literature,_and_Film"},
        {id: 267737227, abbr: "KAZ225", title: "Kazakh_Diplomacy"},
        {id: 260067787, abbr: "KAZ354", title: "Kazakh_Drama"},
        {id: 271967524, abbr: "KAZ366", title: "Kazakh_Language_for_Engineers_"},
        {id: 309860805, abbr: "KAZ356", title: "Kazakh_Music_History"},
        {id: 213937220, abbr: "KAZ211", title: "Kazakh_Rhetoric"},
        {id: 271412273, abbr: "KAZ351", title: "Kazakh_Short_Stories"},
        {id: 291968255, abbr: "KAZ213", title: "Kazakh_Terminology_"},
        {id: 310571742, abbr: "KAZ313", title: "Kazakh_for_Business"},
        {id: 259048273, abbr: "KAZ370", title: "Kazakh_for_Career_Development"},
        {id: 298881775, abbr: "KAZ364", title: "Kazakh_for_Civil_Service"},
        {id: 287121600, abbr: "KAZ226", title: "Kazakh_for_Medical_School"},
        {id: 260383150, abbr: "PHIL124", title: "Knowledge_and_Reality"},
        {id: 251508977, abbr: "KAZ264", title: "Language_and_ethnicity"},
        {id: 263042284, abbr: "WLL272", title: "Language_and_the_Mind"},
        {id: 258234544, abbr: "WLL102/PHIL102", title: "Language,_Experience,_Culture"},
        {id: 318449372, abbr: "WLL270", title: "Languages_of_Eurasia"},
        {id: 178445185, abbr: "MATH273", title: "Linear_Algebra_with_Applications"},
        {id: 280497887, abbr: "KAZ357", title: "Literature_of_Alash"},
        {id: 294834137, abbr: "TUR230", title: "Literatures_of_Central_Asia"},
        {id: 205284123, abbr: "ANT216", title: "Marriage_and_Kinship"},
        {id: 290646759, abbr: "MATH322", title: "Mathematical_Statistics"},
        {id: 274457164, abbr: "ROBT302", title: "Mechanical_Design_II"},
        {id: 303728089, abbr: "ROBT206", title: "Microcontrollers_with_Lab"},
        {id: 240580774, abbr: "CSCI330", title: "Mobile_Computing"},
        {id: 247211704, abbr: "BIOL110", title: "Modern_Biology_I_with_Lab"},
        {id: 287971883, abbr: "BIOL120", title: "Modern_Biology_II_with_Lab"},
        {id: 207374846, abbr: "HST272", title: "Modern_Turkey:_from_the_Ottoman_Empire_to_the_Turkish_Republic"},
        {id: 275009174, abbr: "HST239", title: "Modernizing_the_Periphery:_Crime,_Community_and_Culture_in_Central_Europe,_1790_-_1990"},
        {id: 304026475, abbr: "BIOL220", title: "Molecular_Biology_of_Cell_with_Lab"},
        {id: 250368322, abbr: "CHEM490", title: "Nanochemistry"},
        {id: 302929662, abbr: "PLS331", title: "Nationalism_and_Multi-Ethnic_Governance"},
        {id: 285203393, abbr: "BIOL440", title: "Neuroscience"},
        {id: 313298138, abbr: "ANT286", title: "Nomads:_Around_the_world_and_through_time"},
        {id: 310936131, abbr: "MATH412", title: "Nonlinear_Optimization"},
        {id: 306494418, abbr: "MATH351", title: "Numerical_Methods_with_Applications"},
        {id: 301857193, abbr: "KAZ368", title: "Onomastics:_History_and_Function_of_Names"},
        {id: 299953313, abbr: "CSCI462", title: "Open_Source_Software"},
        {id: 211899329, abbr: "CSCI232", title: "Operating_Systems"},
        {id: 282656257, abbr: "PHYS370", title: "Optics_with_Laboratory"},
        {id: 288869533, abbr: "WLL440", title: "Oral_Epic_in_Central_Asia_"},
        {id: 255932299, abbr: "CHEM211", title: "Organic_Chemistry_I"},
        {id: 283130617, abbr: "CHEM211L", title: "Organic_Chemistry_I_Lab"},
        {id: 252581671, abbr: "CHEM212", title: "Organic_Chemistry_II"},
        {id: 278570919, abbr: "CHEM212L", title: "Organic_Chemistry_II_Lab"},
        {id: 252410902, abbr: "CSCI152", title: "Performance_and_Data_Structures"},
        {id: 296750117, abbr: "PHIL223", title: "Philosophy_of_Science"},
        {id: 264512876, abbr: "CHEM332", title: "Physical_Chemistry_II"},
        {id: 290427305, abbr: "CHEM332L", title: "Physical_Chemistry_II_Lab"},
        {id: 311043669, abbr: "PHYS161", title: "Physics_I_for_Scientists_and_Engineers_with_Laboratory"},
        {id: 226164420, abbr: "PHYS162", title: "Physics_II_for_Scientists_and_Engineers_with_Laboratory_"},
        {id: 267297974, abbr: "PLS210", title: "Political_Science_Research_Methods"},
        {id: 315197605, abbr: "PLS330", title: "Politics_and_Governance_of_Eurasia"},
        {id: 151978886, abbr: "PLS431", title: "Politics_and_Governance_of_the_Russian_Federation"},
        {id: 303550535, abbr: "ANT314/PLS335", title: "Politics_of_Identity_in_Eurasia"},
        {id: 272073552, abbr: "MATH321", title: "Probability"},
        {id: 270059150, abbr: "CSCI353", title: "Programming_Paradigms"},
        {id: 299542926, abbr: "CSCI151", title: "Programming_for_Scientists_and_Engineers"},
        {id: 252107255, abbr: "WLL375", title: "Psychology_of_Language"},
        {id: 300359086, abbr: "PLS211", title: "Quantitative_Methods_in_Political_Science"},
        {id: 313560377, abbr: "PHYS451", title: "Quantum_Mechanics_I"},
        {id: 299036445, abbr: "MATH361", title: "Real_Analysis_I"},
        {id: 316292584, abbr: "CHEM380", title: "Research_Methods"},
        {id: 223415423, abbr: "PHYS395", title: "Research_Methods"},
        {id: 213515850, abbr: "PLS495", title: "Research_Practicum_in_PSIR_"},
        {id: 249637544, abbr: "SHSS230", title: "Rhetoric_&_Style_in_Academic_Writing"},
        {id: 240478787, abbr: "SHSS150", title: "Rhetoric_and_Composition"},
        {id: 270627447, abbr: "ROBT402", title: "Robotic/Mechatronic_System_Design"},
        {id: 264666659, abbr: "HST232", title: "Russian_History_from_Riurik_to_Catherine_the_Great"},
        {id: 273479640, abbr: "HST342/WLL342/PLS322", title: "Russian_Intellectual_History_(1762_-_1905)"},
        {id: 266206322, abbr: "SOC220", title: "Science,_Technology,_and_Society"},
        {id: 170130595, abbr: "CSCI408", title: "Senior_Project_I"},
        {id: 284927271, abbr: "CSCI409", title: "Senior_Project_II"},
        {id: 261763301, abbr: "BIOL491", title: "Senior_Thesis_2"},
        {id: 268386504, abbr: "PHIL352", title: "Sex,_Life,_and_Death:_The_Philosophy_of_Biology"},
        {id: 278507771, abbr: "PHIL321/PLS321", title: "Social_Contract_Theory"},
        {id: 310947860, abbr: "SOC223", title: "Social_Movements:_How_People_Make_Change"},
        {id: 308613414, abbr: "SOC201", title: "Social_Science_Research_Methods"},
        {id: 268846113, abbr: "SOC215", title: "Sociology_of_Race_and_Ethnicity"},
        {id: 263572723, abbr: "CSCI361", title: "Software_Engineering_"},
        {id: 300616470, abbr: "WLL278", title: "Sounds_of_the_World’s_Languages"},
        {id: 309727315, abbr: "CHEM491", title: "Special_Topics_in_Chemistry"},
        {id: 257160889, abbr: "MATH490", title: "Special_Topics_in_Mathematics"},
        {id: 234134575, abbr: "KAZ314", title: "Speech_Culture_in_Business"},
        {id: 311132896, abbr: "CHEM092", title: "Survey_of_Environmental_Sciences_for_Non-Science_Majors"},
        {id: 319667824, abbr: "CSCI245", title: "System_Analysis_and_Design"},
        {id: 293339365, abbr: "ROBT202", title: "System_Dynamics_and_Modeling"},
        {id: 265786593, abbr: "KAZ358", title: "Technique_of_Translation"},
        {id: 195154451, abbr: "ECON345", title: "The_Economics_of_Family"},
        {id: 301681291, abbr: "HST331", title: "The_Eurasian_Enlightenment"},
        {id: 304967049, abbr: "SPA320", title: "The_Hispanic_Short_Story"},
        {id: 254107108, abbr: "REL263/HST263", title: "The_History_of_Islam_II:_Islam_in_the_Modern_World"},
        {id: 318204973, abbr: "PLS455", title: "The_Politics_of_Arms_in_International_Relations"},
        {id: 313775958, abbr: "TUR451", title: "The_Turkish_Novel"},
        {id: 308090629, abbr: "PHYS280", title: "Thermodynamics_and_Statistical_Physics"},
        {id: 264389286, abbr: "PHYS483", title: "Topics_in_Statistical_Physics"},
        {id: 270390518, abbr: "MATH460", title: "Topology"},
        {id: 267296975, abbr: "PHIL220", title: "Truth,_Knowledge_and_Belief"},
        {id: 273670278, abbr: "HST152", title: "US_History_II_(from_1877)"},
        {id: 281733247, abbr: "CSCI336", title: "Ubiquity_and_Sensing"},
        {id: 232086961, abbr: "CHN301", title: "Upper_Intermediate_Chinese_I"},
        {id: 307618066, abbr: "KAZ121", title: "Upper-Intermediate_Kazakh"},
        {id: 315627969, abbr: "ECON428", title: "Wages_and_the_Labor_Market"},
        {id: 254093595, abbr: "WLL211", title: "World_Literature_II:_from_the_18th_to_the_20th_century"},
        {id: 299133496, abbr: "ANT140", title: "World_Prehistory"},
        {id: 200571385, abbr: "SHSS331", title: "Writing_Fellows_–_Practicum_in_Composition_&_Collaboration_II"}
    ];


    // lines for creating new groups
     // var i = 0;                     //  set your counter to 1
     // function myLoop () {           //  create a loop function
     //     setTimeout(function () {    //  call a 3s setTimeout when the loop is called
     //         var str="chat_info "+new_courses[i].abbr+"_"+new_courses[i].title+"\n";
     //         proc.stdin.write(str);
     //         //console.log(i);
     //         i++;                     //  increment the counter
     //         if (i < new_courses.length) {            //  if the counter < 10, call the loop function
     //             myLoop();             //  ..  again which will trigger another
     //         }                        //  ..  setTimeout()
     //     }, 5000)
     // }

    return instance;
};
