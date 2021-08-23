import { nodes as basicNodes, marks } from 'ngx-editor';
import { Schema, NodeSpec, DOMOutputSpec } from 'prosemirror-model';
import { mentionNode, tagNode } from './plugins/mentions';

const codeMirror: NodeSpec = {
  content: 'text*',
  marks: '',
  group: 'block',
  code: true,
  defining: true,
  isolating: true,
  parseDOM: [
    {
      tag: 'pre',
      preserveWhitespace: 'full'
    }
  ],
  toDOM(): DOMOutputSpec {
    return ['pre', ['code', 0]];
  },
};

const nodes = {
  ...basicNodes,
  code_mirror: codeMirror,
  mention:mentionNode,
  tag:tagNode,

};

const schema = new Schema({
  nodes,
  marks
});

export default schema;
