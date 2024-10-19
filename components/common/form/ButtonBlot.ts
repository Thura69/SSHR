// utils/InsertButton.ts
import Quill from 'quill';

const ButtonBlot = Quill.import('blots/block');
ButtonBlot.tagName = 'button';
ButtonBlot.className = 'ql-button';
Quill.register(ButtonBlot);

class InsertButton {
  quill: any;

  constructor(quill: any) {
    this.quill = quill;
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('insertButton', this.insertButton);
  }

  insertButton = () => {
    const range = this.quill.getSelection();
    if (range) {
      this.quill.insertEmbed(range.index, 'button', 'Click Me', 'user');
    }
  };
}

Quill.register('modules/insertButton', InsertButton);

export default InsertButton;
