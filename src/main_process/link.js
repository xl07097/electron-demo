const shell = require('electron').shell;

const alink = $attr("a[href]");

Array.prototype.forEach.call(alink, link => {
    const url = link.getAttribute('href');
    console.log(url.startsWith("http"))
    if (url.startsWith("http")){
        link.addEventListener('click', (e) =>{
            e.preventDefault();
            shell.openExternal(url); // 使用外部应用打开链接
        })
    }
})