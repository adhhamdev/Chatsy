const ws = new WebSocket('ws://localhost:8080');

const form = document.querySelector('form');
const messages = document.querySelector('.messages');
const userMsg = document.querySelector('input');

let username;

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const msg = {
        username,
        type: 'text',
        value: userMsg.value
    }
    const sentMsg = document.createElement('div');
    const msgUsername = document.createElement('p');
    const msgContent = document.createElement('p');
    const pre = document.createElement('pre');
    sentMsg.className = 'msg sentMsg';
    msgUsername.className = 'username';
    msgUsername.textContent = username;
    msgContent.className = 'content';
    pre.textContent = userMsg.value;
    msgContent.appendChild(pre);
    sentMsg.appendChild(msgUsername);
    sentMsg.appendChild(msgContent);
    messages.appendChild(sentMsg);
    ws.send(JSON.stringify(msg));
    messages.scrollTo({top: 0, behavior: "smooth"});
    userMsg.value = '';
    userMsg.focus();
})

ws.onopen = () => {
    const uid = `@user${Math.floor(Math.random() * 1000)}`;
    const gotUsername = prompt('Type your name:', uid);
    username = gotUsername;
    console.log('Client connected to WebSocket')
};
ws.onmessage = ev => {
    ev.data.text().then(res => {
        const msgString = JSON.parse(res);
        const receivedMsg = document.createElement('div');
        const msgUsername = document.createElement('p');
        const msgContent = document.createElement('p');
        const pre = document.createElement('pre');
        receivedMsg.className = 'msg receivedMsg';
        msgUsername.className = 'username';
        msgUsername.textContent = msgString.username;
        msgContent.className = 'content';
        pre.textContent = msgString.value;
        msgContent.appendChild(pre);
        receivedMsg.appendChild(msgUsername);
        receivedMsg.appendChild(msgContent);
        messages.appendChild(receivedMsg);
        messages.scrollTo({top: 0, behavior: "smooth"});
        userMsg.focus();
    });
};
ws.onclose = ev => console.log(ev);
ws.onerror = err => console.log(err);