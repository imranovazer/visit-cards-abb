

export default class Modal {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    render() {
        const body = document.querySelector('body');
        const modal = document.createElement('div');
        modal.className = "Modal";
        modal.addEventListener('click', (event) => {
            // if(event.target.className === "Modal"){
            //     this.unrender();
            // }
            this.unrender();
        })

        //content of the modal

        const modalContent = document.createElement('div');
        modalContent.className = "Modal-content";
        modalContent.addEventListener('click', (event) => {
            event.stopPropagation();
        })
        //---------------------------------------------
        const closeButton = document.createElement('button');
        closeButton.className = "close-button";
        closeButton.textContent = "x";
        closeButton.addEventListener('click', () => {
            this.unrender();
        })
        modalContent.appendChild(closeButton);


        //---------------------------------------------
        const title = document.createElement('h2');
        title.className = "title";
        title.textContent = this.title;
        modalContent.appendChild(title);
        //---------------------------------------------
        const content = document.createElement('div');
        content.className = "content";
        content.innerHTML = this.content;
        modalContent.appendChild(content);
        //

        modal.appendChild(modalContent);
        body.appendChild(modal);
    }

    unrender() {
        const body = document.querySelector('body');
        const modal = document.querySelector('.Modal');
        body.removeChild(modal);
    }

}