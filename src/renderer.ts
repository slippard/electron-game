import { clipboard, ipcRenderer } from 'electron';
import * as fs from 'fs';

class Render {
    private mainBtn: HTMLElement;
    constructor() {
        this.mainBtn = document.getElementById('mainBtn');
        this.mainBtn.addEventListener('click', () => {
            this.mainBtnClick();
        });
    }

    private mainBtnClick() {
        let congrats = new Notification('Wow congrats', { body: 'u won' })
          
        congrats.onclick = () => {
            console.log('Notification clicked')
          }
        clipboard.writeText('u copied me');
          
        // send msg to main process
        ipcRenderer.send('async-message', 'ohai from render window');

        // listen for main process reply
        ipcRenderer.on('async-reply', (event: any, arg: string) => {
          console.log(arg) // prints reply
        })
        
    }

}

new Render();