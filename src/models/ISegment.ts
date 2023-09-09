import { generateNodeId } from '../utils/utils';
import { INode } from './INode';
// import { IStyle } from './IStyle';

export class ISegment extends INode {
  public text: string;
  public style: React.CSSProperties;

  constructor(id = generateNodeId(), text = '', style = {}) {
    super(id, 'segment');
    this.text = text;
    this.style = style;
  }

  public static create(json: any) {
    const { id, text, style } = json;
    return new ISegment(id, text, style);
  }

  public insertText(offset: number, text: string) {
    if (offset < 0 || offset > this.text.length) {
      return;
    }
    if (!text) return;
    this.text = this.text.slice(0, offset) + text + this.text.slice(offset);
  }

  public deleteText(offset: number, length: number) {
    if (offset < 0 || offset > this.text.length) {
      return;
    }
    this.text = this.text.slice(0, offset) + this.text.slice(offset + length);
  }
}
