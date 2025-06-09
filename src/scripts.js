        // function loadData() {
        //     alert("Test");
        //     console.log("test");
        // }


async function getDataItems() {
    const response = await fetch("../data/countries.json");

    if (response.ok) {
        return await response.json();
    }
    return JSON.parse("{[]}");
    //return {};
}

async function getDataItems2() {
    // Replace ./data.json with your JSON feed
fetch('../data/countries.json').then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  console.log(data);
}).catch(err => {
    console.log(err);
  // Do something for an error here
});
}