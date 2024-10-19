import Quill from 'quill';

const Inline = Quill.import('blots/inline');

class Icon extends Inline {
    static create(value:any){
        let node = super.create(value);
        if(value){
            node.setAttribute('class', value);
            node.innerHTML = value;
            node.setAttribute('contenteditable', 'false');
        }

        return node;
    }

    static formats(domNode:any){
        return domNode.getAttribute("class");  
    }

    format(name:any,value:any){
        if (name !== this.statics.blotName || !value) return super.format(name, value);
        if (value){
          this.domNode.setAttribute('class', value);
         
        }
    }
}

Icon.blotName = 'icon';
Icon.tagName = 'button';

Quill.register(Icon);