import { NodeType } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';
import { isNodeActive } from 'ngx-editor/helpers';
import { insertMathCmd } from 'ngx-editor/commands';

class InsertMath {
  insertInlineMath(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { schema } = state;

      const type: NodeType = schema.nodes.math_inline;

      if (!type) {
        return false;
      }
      
      return insertMathCmd(type)(state, dispatch);
    };
  }
}

// export default InsertMath;