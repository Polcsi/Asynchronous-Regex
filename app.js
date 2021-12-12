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
    const pattern = 
    /^[a-zA-Z0-9_.-]*\@[a-zA-Z0-9-]{4,}\.[a-z]{2,}$/;

    return new Promise((resolve, reject) => {
        if(typeof str === 'string')
        {
            resolve(
                {
                    test: pattern.test(str),
                    match: str.match(pattern),
                    color: pattern.test(str) ? "lightgreen" : "red",
                }
            );
        } else {
            reject(new Error("Invalid data type"))
        }
    });
};

const matchPhone = (str) => {
    const pattern = 
    /^\+36\s[0-9]{2}\s[0-9]{3}\s[0-9]{3}$/;

    return new Promise((resolve, reject) => {
        if(typeof str === 'string')
        {
            resolve(
                {
                    test: pattern.test(str),
                    match: str.match(pattern),
                    color: pattern.test(str) ? "lightgreen" : "red",
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
        const datas = await readJSONFile("data.json");
    
        for (let i = 0; i < datas.length; i++) {
            let email = datas[i].email;
            let phone = datas[i].phone;

            let emailResult = await matchEmail(email);
            let phoneResult = await matchPhone(phone);
            
            console.log(`%c ${i+1}.Person`, 'color: cyan;');
            console.log(`%c ${emailResult.test}`,
            `color: ${emailResult.color}`, `${email}`);
            console.log(`%c ${phoneResult.test}`,
            `color: ${phoneResult.color}`, `${phone}\n\n`);
        }
    } catch(err) {
        console.log(`%c ${err}`, 'color: red;')
    }
}

analyzeData();