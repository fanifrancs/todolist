const img = document.querySelector('img')!;
const memeCaption = document.querySelector('.card-text') as HTMLParagraphElement;
// thanks to our id generator function
const memeCountStorageKey: string = '1721324376743-bgbxg33';
// using a meme count to keep track of the meme so that reloading the page
// wont start displaying memes from the beginning. Maybe this is not
// really important but just felt like a cool feature to add : )
let memeCount: number = retrieveMemeCount(memeCountStorageKey);
const url: string = 'https://api.imgflip.com/get_memes';

// necessary to define the structure of meme object returned by the api
// cos you know 'typescript' : )
interface Meme {
    id: string,
    name: string,
    url: string,
    width: number,
    height: number,
    box_count: number,
    captions: number;
}

let memes: Meme[];

// async function makes a get request to the api
async function fetchMemes(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// fetches the memes
fetchMemes(url).then(data => {
    memes = data.data.memes as Meme[];
    // changes the current meme by calling the changememe function
    // after every 7 seconds
    setInterval(changeMeme, 7000);
})

// retrieves meme count
function retrieveMemeCount(storageKey: string): number {
    if (localStorage.getItem(memeCountStorageKey)) {
        const memeCount = localStorage.getItem(storageKey) as string;
        return JSON.parse(memeCount) as number;
    }
    return 0;
}

// stores meme count
function storeMemeCount(storageKey: string, memecount: number): void {
    const memeCount = JSON.stringify(memecount);
    localStorage.setItem(storageKey, memeCount);
}

// changes the meme
function changeMeme(): void {
    if (memeCount === memes.length) {
        memeCount = 0;
    } else {
        memeCount++;
    }
    img.src = memes[memeCount].url;
    memeCaption.innerText = memes[memeCount].name;
    storeMemeCount(memeCountStorageKey, memeCount);
}
