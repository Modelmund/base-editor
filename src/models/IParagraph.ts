import { generateNodeId } from '../utils/utils';
import { INode } from './INode';
import { ISegment } from './ISegment';
import { IStyle } from './IStyle';

export class IParagraph extends INode {
  public static create(json: any) {
    const { id, style, segments } = json;
    return new IParagraph(id, style, segments.map(ISegment.create));
  }

  public style: React.CSSProperties;
  public segments: ISegment[];
  constructor(id = generateNodeId(), iStyle = {}, segments = []) {
    super(id, 'paragraph');
    this.style = iStyle;
    this.segments = segments;
  }
}
