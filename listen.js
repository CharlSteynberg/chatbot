const fsys = require("fs");
const root = process.cwd();
const path = "/Temp/draft/chatBot";
const data = JSON.parse( fsys.readFileSync(root+path+"/memory.json") );
const chat = require("readline").createInterface
({
  input: process.stdin,
  output: process.stdout
});

const person = {memory: data.memory};

const random = function random(what)
{
    return what[Math.floor(Math.random()*what.length)];
};



person.listen = function(what)
{
    let text = what.trim();
    let isay = [];

    if (text.length > 0)
    {
        text = text.split(" ");
        Object.keys(person.memory.speech).forEach((cat)=>
        {
            if (isay.length > 0){ return }; // we have found a context, no need to keep searching

            text.forEach((word)=> // go through each word that was said
            {
                let idx = person.memory.speech[cat].input.indexOf(word); // get array index of existing word in lexicon
                if (idx > -1) // found something, else indexOf returns less-than 0
                {
                    isay = person.memory.speech[cat].output;
                };
            });
        });
    };


    if (isay.length < 1)
    {
        isay = person.memory.speech.awkward.output;
    };

    isay = random(isay);
    console.log(isay);
};

chat.on("line",person.listen);
