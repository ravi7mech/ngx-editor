import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { environment } from '../environments/environment';

import { Validators, Editor, Toolbar } from 'ngx-editor';

import jsonDoc from './doc';
import schema from './schema';
import plugins from './plugins';
import nodeViews from './nodeviews';
import { NodeType } from 'prosemirror-model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {
  isProdMode = environment.production;

  html = "";
  inHtml = "";
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  /* form = new FormGroup({
    editorContent: new FormControl({ value: jsonDoc, disabled: false }, Validators.required(schema))
  });
 */
  /* get doc(): AbstractControl {
    return this.form.get('editorContent');
  } */

  ngOnInit(): void {
    this.editor = new Editor({
      schema,
      plugins,
      nodeViews,
      history: true,
      keyboardShortcuts: true,
      inputRules: true
    });
  }

  valuechange(newValue) {
    console.log(newValue)
  }

  addLatex() {
    const nodeType: NodeType = schema.nodes.math_inline;
    nodeType.create(null, [schema.text("\sqrt{3}")]);
    this.editor.commands
      .insertMathInline(nodeType)
      .exec();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
