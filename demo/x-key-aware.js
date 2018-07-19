/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';

import '../iron-a11y-keys.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        position: relative;
      }

      pre {
        color: #3367d6;
      }

      .keys {
        line-height: 25px;
      }

      .keys span {
        cursor: default;
        background-color: #f5f5f5;
        border: 1px solid #e0e0e0;
        padding: 1px 5px;
        border-radius: 5px;
      }
    </style>

    <h4>Press any of these keys</h4>
    <span class="keys">
      <template is="dom-repeat" items="[[boundKeys]]">
        <span>{{item}}</span>
      </template>
    </span>
    <iron-a11y-keys id="keys" keys="* pageup pagedown left right down up shift+a alt+a home end space enter" target="[[target]]" on-keys-pressed="_updatePressed">
    </iron-a11y-keys>
    <pre id="output">[[pressed]]</pre>
`,

  is: 'x-key-aware',

  properties: {
    pressed: {type: String, readOnly: true, value: ''},

    boundKeys: {type: Array},

    target: {
      type: Object,
      value: function() {
        return document.body;
      }
    }
  },

  ready: function() {
    this.boundKeys = this.$.keys.keys.split(' ');
  },

  _updatePressed: function(event) {
    console.log(event.detail);

    this._setPressed(this.pressed + event.detail.combo + ' pressed!\n');
  }
});
