let input = document.querySelector("input");
let imgEle = document.querySelector(".append");
let help = document.querySelector("#help");
let consecutiveMistakes = 0;
let option = false;
let btn = document.querySelector("button");

fetch('https://flagcdn.com/en/codes.json')
    .then((resolve) => { return resolve.json() })
    .then((data) => {
        showdata(data);
    });

function showdata(d) {
    let select = document.querySelector("select");
    for (let y in d) {
        let opt = document.createElement("option");
        opt.innerHTML = d[y];
        select.append(opt);
    }
    btn.onclick = () => {
        let val = select.value;
        select.selectedIndex = 0; 
        imgEle.innerHTML = "";
        if (val != "No value") {
            for (let y in d) {
                if (val == d[y]) {
                    let short_code = Object.keys(d).find(key => d[key] === d[y]);
                    let img1 = document.createElement("img");
                    img1.setAttribute("src", `https://flagcdn.com/16x12/${short_code}.png`);
                    imgEle.append(img1);
                    break;
                }
            }
        }
    }
    if (!option) {
        input.onblur = () => {
            let value = input.value.trim();
            input.value = "";
            imgEle.innerHTML = "";

            let words = value.split(" ");
            for (let i = 0; i < words.length; i++) {
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
            }
            let result = words.join(" ");

            if (result !== "") {
                let foundCountry = false;

                for (let x in d) {
                    if (result == d[x]) {
                        foundCountry = true;
                        let code = Object.keys(d).find(key => d[key] === d[x]);
                        let img = document.createElement("img");
                        img.setAttribute("src", `https://flagcdn.com/16x12/${code}.png`);
                        imgEle.append(img);
                        consecutiveMistakes = 0;
                        break;
                    }
                }

                if (!foundCountry) {
                    input.value = "";
                    imgEle.innerHTML = "";
                    let h1 = document.createElement("h1");
                    h1.innerHTML = "Type Proper Country Name";
                    imgEle.append(h1);
                    consecutiveMistakes++;

                    if (consecutiveMistakes == 3) {
                        help.classList.remove("hide");
                        alert("Helping Option Unlocked");
                        option = true;
                        input.setAttribute("disabled", "");
                    }
                }
            }
            else {
                consecutiveMistakes++;
                input.value = "";

                if (consecutiveMistakes == 3) {
                    help.classList.remove("hide");
                    alert("Helping Option Unlocked");
                    option = true;
                    input.setAttribute("disabled", "");
                }
            }
        };
    }
};