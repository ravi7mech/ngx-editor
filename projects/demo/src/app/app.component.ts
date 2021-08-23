import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { environment } from '../environments/environment';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import jsonDoc from './doc';
import schema from './schema';
import plugins from './plugins';
import nodeViews from './nodeviews';
import CustomMentionConfig from './plugins/mentions/customMentionConfig';
import { getMentionsPlugin } from './plugins/mentions';

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

    this.addLatex()
  }

  valuechange(newValue) {
    console.log(newValue)
  }

  addLatex() {
    let users = [
      {
        name: 'John Doe',
        id: '101',
        email: 'joe@gmail.com',
        image:'https://i.pravatar.cc/50'
      },
      {
        name: 'Joe Lewis',
        id: '102',
        image:'https://i.pravatar.cc/50',
        email: 'joe@gmail.com',
      },
      {
        name: 'John Doe',
        id: '101',
        image:'https://i.pravatar.cc/50',
        email: 'joe@gmail.com',
      },
      {
        name: 'Joe Lewis',
        id: '102',
        image:'https://i.pravatar.cc/50',
        email: 'joe@gmail.com',
      }, {
        name: 'John Doe',
        id: '101',
        image:'https://i.pravatar.cc/50',
        email: 'joe@gmail.com',
      },
      {
        name: 'Joe Lewis',
        id: '102',
        image:'https://i.pravatar.cc/50',
        email: 'joe@gmail.com',
      },
      {
        name: 'John Doe',
        id: '101',
        image:'https://i.pravatar.cc/50',
        email: 'joe@gmail.com',
      },
      {
        name: 'Joe Lewis',
        id: '102',
        image:'https://i.pravatar.cc/50',
        email: 'joe@gmail.com',
      },
      {
        name: 'John Doe',
        id: '101',
        image:'https://i.pravatar.cc/50',
        email: 'joe@gmail.com',
      },
      {
        name: 'Joe Lewis',
        id: '102',
        image:'https://i.pravatar.cc/50',
        email: 'joe@gmail.com',
      }
    ];
    this.editor.registerPlugin(getMentionsPlugin(new CustomMentionConfig(users).pluginConfig))
    // this.editor.commands.insertMathInline("\\sqrt{3}").moveToEnd().exec();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
