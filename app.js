async function readJSONFile(url)
{
    try
    {
        let response = await fetch(url);
        if(response.status == 200)
        {
            return await response.json();
        }
    } catch(err) {
        console.log(`%c ${err}`, 'color: red;');
    }
}

const matchEmail = (str) => {
    const pattern = /^[a-zA-Z0-9_.-]*\@[a-zA-Z0-9-]{4,}\.[a-z]{2,}$/;

    return new Promise((resolve, reject) => {
        if(typeof str === 'string')
        {
            resolve(
                {
                    test: pattern.test(str),
                    match: str.match(str),
                }
            );
        } else {
            reject(new Error("Invalid data type"))
        }
    });
};

async function analyzeData()
{
    try
    {
        let datas = await readJSONFile("data.json");
    
        for (let i = 0; i < datas.length; i++) {
            let email = datas[i].email;
            let result = await matchEmail(email);
    
            console.log(`%c ${result.test}`, 'color: lightgreen', `${email}`);
        }
    } catch(err) {
        console.log(`%c ${err}`, 'color: red;')
    }
}

analyzeData();