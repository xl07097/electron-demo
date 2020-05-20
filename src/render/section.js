let main = document.querySelectorAll('link[rel="import"]');

let body = document.body;
Array.prototype.map.call(main, data => {
    let template = data.import.querySelector('.haha');
    let clone = document.importNode(template.content, true);
    body.appendChild(clone);
})
