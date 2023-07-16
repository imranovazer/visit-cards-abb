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

        modal.appendChild(modalContent);


        body.appendChild(modal);
    }

    unrender() {
        const body = document.querySelector('body');
        const modal = document.querySelector('.Modal');
        body.removeChild(modal);
    }

}