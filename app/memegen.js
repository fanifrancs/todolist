"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const img = document.querySelector('img');
const memeCaption = document.querySelector('.card-text');
// thanks to our id generator function
const memeCountStorageKey = '1721324376743-bgbxg33';
// using a meme count to keep track of the meme so that reloading the page
// wont start displaying memes from the beginning. Maybe this is not
// really important but just felt like a cool feature to add : )
let memeCount = retrieveMemeCount(memeCountStorageKey);
const url = 'https://api.imgflip.com/get_memes';
let memes;
// async function makes a get request to the api
function fetchMemes(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
// fetches the memes
fetchMemes(url).then(data => {
    memes = data.data.memes;
    // changes the current meme by calling the changememe function
    // after every 7 seconds
    setInterval(changeMeme, 7000);
});
// retrieves meme count
function retrieveMemeCount(storageKey) {
    if (localStorage.getItem(memeCountStorageKey)) {
        const memeCount = localStorage.getItem(storageKey);
        return JSON.parse(memeCount);
    }
    return 0;
}
// stores meme count
function storeMemeCount(storageKey, memecount) {
    const memeCount = JSON.stringify(memecount);
    localStorage.setItem(storageKey, memeCount);
}
// changes the meme
function changeMeme() {
    if (memeCount === memes.length) {
        memeCount = 0;
    }
    else {
        memeCount++;
    }
    img.src = memes[memeCount].url;
    memeCaption.innerText = memes[memeCount].name;
    storeMemeCount(memeCountStorageKey, memeCount);
}
