import { Command } from "prosemirror-commands";
import { EditorState, TextSelection, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export const moveToEnd = (): Command => {
    return function (state: EditorState, dispatch: ((tr: Transaction) => void), view: EditorView) {
        // Don't dispatch this command if the selection is empty
        if (state.selection.empty) return false;
        // Subtract one so that it falls within the current node
        const endPos = state.selection.$to.after() - 1;
        const selection = new TextSelection(state.doc.resolve(endPos));
        let transaction = state.tr.setSelection(selection);
        if (dispatch) dispatch(transaction.scrollIntoView());
        return true;
    }
}

export default moveToEnd;