import { EditorState, Plugin, Selection, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { Command } from 'prosemirror-commands';
import { getMentionsPlugin } from './mentions';
import pluginConfig from './mentions/customMentionConfig';

type Dir = 'left' | 'right' | 'up' | 'down';

const arrowHandler = (dir: Dir): Command => {
  return (state: EditorState, dispatch: (tr: Transaction) => void, view: EditorView): boolean => {
    if (state.selection.empty && view.endOfTextblock(dir)) {
      const { doc } = state;
      const { $head } = state.selection;

      const side = dir === 'left' || dir === 'up' ? -1 : 1;
      const nextPos = Selection.near(doc.resolve(side > 0 ? $head.after() : $head.before()), side);

      if (nextPos.$head && nextPos.$head.parent.type.name === 'code_mirror') {
        dispatch(state.tr.setSelection(nextPos));
        return true;
      }
    }
    return false;
  };
};

const arrowHandlers = keymap({
  ArrowLeft: arrowHandler('left'),
  ArrowRight: arrowHandler('right'),
  ArrowUp: arrowHandler('up'),
  ArrowDown: arrowHandler('down')
});

const getPlugins = (): Plugin[] => {
  const plugins = [
    arrowHandlers
  ];

  return plugins;
};

export default getPlugins();
