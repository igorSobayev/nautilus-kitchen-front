<template>
  <div id="text-editor">
    <div class="toolbar" v-if="editor">
      <div class="align-dropdown">
        <button class="dropbtn">Título ▼</button>
        <div class="dropdown-content">
          <a v-for="index in 6" :class="{ active: editor.isActive('heading', { level: index }) }"
            :style="{ fontSize: 20 - index + 'px' }" @click="onHeadingClick(index)" role="button">
            H{{ index }}
          </a>
        </div>
      </div>

      <button v-for="({ slug, option, active, icon }, index) in textActions" :class="{ active: editor.isActive(active) }"
        @click="onActionClick(slug, option)">
        <UIcon :name="icon" />
      </button>
    </div>

    <editor-content class="p-5" :editor="editor" />

    <div v-if="editor" class="footer">
      <span class="characters-count" :class="maxLimit ? limitWarning : ''">
        {{ charactersCount }}
        {{ maxLimit ? `/ ${maxLimit} characters` : 'characters' }}
      </span>
      |
      <span class="words-count"> {{ wordsCount }} words </span>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import CharacterCount from '@tiptap/extension-character-count';

export default {
  name: 'RickEditor',
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    maxLimit: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      editor: null,
      textActions: [
        { slug: 'bold', icon: 'i-material-symbols-format-bold', active: 'bold' },
        { slug: 'italic', icon: 'i-material-symbols-format-italic', active: 'italic' },
        { slug: 'underline', icon: 'i-material-symbols-format-underlined', active: 'underline' },
        { slug: 'strike', icon: 'i-material-symbols-format-strikethrough', active: 'strike' },
        { slug: 'align', option: 'left', icon: 'i-material-symbols-align-horizontal-left', active: { textAlign: 'left' }},
        { slug: 'align', option: 'center', icon: 'i-material-symbols-align-horizontal-center', active: { textAlign: 'center' }},
        { slug: 'align', option: 'right', icon: 'i-material-symbols-align-horizontal-right', active: { textAlign: 'right' }},
        { slug: 'align', option: 'justify', icon: 'i-material-symbols-align-justify-center', active: { textAlign: 'justify' }},
        { slug: 'bulletList', icon: 'i-material-symbols-format-list-bulleted', active: 'bulletList' },
        { slug: 'orderedList', icon: 'i-material-symbols-format-list-numbered', active: 'orderedList' },
        { slug: 'subscript', icon: 'i-material-symbols-subscript', active: 'subscript' },
        { slug: 'superscript', icon: 'i-material-symbols-superscript', active: 'superscript' },
        { slug: 'undo', icon: 'i-material-symbols-undo', active: 'undo' },
        { slug: 'redo', icon: 'i-material-symbols-redo', active: 'redo' },
        { slug: 'clear', icon: 'i-material-symbols-format-clear', active: 'clear' },
        { slug: 'code', icon: 'i-material-symbols-code-blocks-outline', active: 'code' },
      ],
    };
  },
  computed: {
    charactersCount() {
      return this.editor.storage.characterCount.characters();
    },
    wordsCount() {
      return this.editor.storage.characterCount.words();
    },
    limitWarning() {
      const isCloseToMax = this.charactersCount >= this.maxLimit - 20;
      const isMax = this.charactersCount === this.maxLimit;

      if (isCloseToMax && !isMax) return 'warning';
      if (isMax) return 'danger';

      return '';
    },
  },
  watch: {
    modelValue(value) {
      if (this.editor.getHTML() === value) return;
      this.editor.commands.setContent(this.modelValue, false);
    },
  },
  methods: {
    onActionClick(slug, option = null) {
      const vm = this.editor.chain().focus();
      const actionTriggers = {
        bold: () => vm.toggleBold().run(),
        italic: () => vm.toggleItalic().run(),
        underline: () => vm.toggleUnderline().run(),
        strike: () => vm.toggleStrike().run(),
        bulletList: () => vm.toggleBulletList().run(),
        orderedList: () => vm.toggleOrderedList().run(),
        align: () => vm.setTextAlign(option).run(),
        subscript: () => vm.toggleSubscript().run(),
        superscript: () => vm.toggleSuperscript().run(),
        undo: () => vm.undo().run(),
        redo: () => vm.redo().run(),
        clear: () => {
          vm.clearNodes().run();
          vm.unsetAllMarks().run();
        },
        code: () => vm.toggleCodeBlock().run(),
      };

      actionTriggers[slug]();
    },
    onHeadingClick(index) {
      const vm = this.editor.chain().focus();
      vm.toggleHeading({ level: index }).run();
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        StarterKit,
        Underline,
        Subscript,
        Superscript,
        CharacterCount.configure({
          limit: this.maxLimit,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML());
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
#text-editor {
  border: 1px solid rgb(59 130 246 / 0.5);
  background-color: white;
}

#text-editor .toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid rgb(59 130 246 / 0.5);
}

#text-editor .toolbar>button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 20px;
  background: #fff;
  color: #333;
  border: none;
  border-radius: 2px;
  margin: 0.5em 4px;
  -webkit-appearance: none;
  cursor: pointer;
}

#text-editor .toolbar>button.active {
  background: #333;
  color: #fff;
}

#text-editor .align-dropdown {
  position: relative;
  display: inline-block;
  margin: 0.5em 8px;
}

#text-editor .align-dropdown>button {
  height: 32px;
  background: #fff;
  color: #333;
  border: none;
  border-radius: 2px;
  -webkit-appearance: none;
  cursor: pointer;
}

#text-editor .align-dropdown .dropdown-content {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  border: 1px solid #333;
  outline: 1px solid #fff;
  border-radius: 2px;
  background-color: #fff;
  z-index: 1;
}

#text-editor .align-dropdown .dropdown-content a {
  display: block;
  padding: 6px 12px;
  text-align: center;
  cursor: pointer;
}

#text-editor .align-dropdown .dropdown-content a:hover,
#text-editor .align-dropdown .dropdown-content a.active {
  background: #333;
  color: #fff;
}

#text-editor .align-dropdown:hover .dropdown-content {
  display: block;
}

#text-editor .divider {
  width: 1px;
  height: 24px;
  background: #333;
  margin-right: 6px;
}

#text-editor .footer {
  color: rgb(59 130 246 / 0.5);
  font-size: 14px;
  text-align: right;
  padding: 6px;
}

#text-editor .footer .characters-count.warning {
  color: orange;
}

#text-editor .footer .characters-count.danger {
  color: red;
}

#text-editor .ProseMirror {
  height: 300px;
  overflow-y: auto;
  padding-left: 0.5em;
  padding-right: 0.5em;
  outline: none;
}

#text-editor .ProseMirror>p:first-child {
  margin-top: 0.5em;
}

#text-editor .ProseMirror>h1:first-child,
#text-editor .ProseMirror>h2:first-child,
#text-editor .ProseMirror>h3:first-child,
#text-editor .ProseMirror>h4:first-child,
#text-editor .ProseMirror>h5:first-child,
#text-editor .ProseMirror>h6:first-child {
  margin-top: 0.5em;
}
</style>
