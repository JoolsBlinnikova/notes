<template>
	<div class="markdown-editor">
		<textarea />
	</div>
</template>
<script>

import EasyMDE from 'easymde'

export default {
	name: 'EditorEasyMDE',

	props: {
		value: {
			type: String,
			required: true,
		},
	},

	data: function() {
		return {
			config: {
				spellChecker: false,
				autoDownloadFontAwesome: false,
				toolbar: false,
				status: false,
				forceSync: true,
			},
			mde: null,
		}
	},

	watch: {
		value(val) {
			if (val !== this.mde.value()) {
				this.mde.value(val)
			}
		},
	},

	mounted() {
		this.initialize()
		this.mde.codemirror.focus()
	},

	destroyed() {
		this.mde = null
	},

	methods: {
		initialize() {
			const config = Object.assign({
				element: this.$el.firstElementChild,
				initialValue: this.value,
				renderingConfig: {},
			}, this.config)

			this.mde = new EasyMDE(config)

			this.mde.codemirror.on('change', () => {
				this.$emit('input', this.mde.value())
			})
			this.initializeCheckboxes()
		},

		initializeCheckboxes() {
			// TODO move the following from jQuery to plain JS
			$('.CodeMirror-code').on('mousedown.checkbox touchstart.checkbox', '.cm-formatting-task', event => {
				event.preventDefault()
				event.stopImmediatePropagation()
				this.toggleCheckbox(event.target)
			})
		},

		toggleCheckbox(el) {
			// TODO move the following from jQuery to plain JS
			const $el = $(el)
			const doc = this.mde.codemirror.getDoc()
			const index = $el.parents('.CodeMirror-line').index()
			const line = doc.getLineHandle(index)

			const newvalue = ($el.text() === '[x]') ? '[ ]' : '[x]'

			// + 1 for some reason... not sure why
			doc.replaceRange(newvalue,
				{ line: index, ch: line.text.indexOf('[') },
				{ line: index, ch: line.text.indexOf(']') + 1 }
			)
		},

	},
}
</script>
<style>
@import '~easymde/dist/easymde.min.css';

.markdown-editor {
	min-height: 100%;
}

.CodeMirror {
	min-height: 100%;
	line-height: 1.5em;
	border: none;
	color: inherit;
	background-color: inherit;
}

.CodeMirror-cursor {
	border-color: var(--color-main-text);
}

/* text selection */
.CodeMirror .CodeMirror-selectedtext {
	background-color: var(--color-primary-element) !important;
	color: var(--color-primary-text) !important;
	opacity: 1 !important;
}

.CodeMirror .CodeMirror-selected {
	background: inherit !important;
}

/* fix for mobile */
.CodeMirror-code {
	width: 100% !important;
	border: none !important;
	background-color: inherit !important;
}

/* Markdown markup */
.CodeMirror .cm-formatting {
	opacity: 0.3;
}

.CodeMirror .cm-formatting-task,
.CodeMirror .cm-formatting-list {
	opacity: inherit;
}

/* Headlines */
.cm-s-easymde .cm-header-1 {
	font-size: 165%;
}

.cm-s-easymde .cm-header-2 {
	font-size: 140%;
}

.cm-s-easymde .cm-header-3 {
	font-size: 120%;
}

.cm-s-easymde .cm-header-4 {
	font-size: 110%;
}

.CodeMirror .cm-link {
	color: var(--color-primary-element);
	text-decoration: none;
}

/* horizontal line */
.CodeMirror .cm-hr {
	display: inline-block;
	width: 100%;
	line-height: 0.25;
	background-color: var(--color-border-dark);
}

/* Code */
.CodeMirror .cm-comment {
	font-family: MONOSPACE;
	font-size: 90%;
}

/* Quotes */
.cm-s-easymde .cm-quote {
	color: inherit;
}

/* Checkboxes */
.CodeMirror .cm-formatting-task {
	position: relative;
	display: inline-block;
	width: 1.5em;
	color: var(--color-main-background);
}

.CodeMirror .cm-formatting-task.cm-meta::before,
.CodeMirror .cm-formatting-task.cm-property::before {
	content: '';
	width: 14px;
	height: 14px;
	position: absolute;
	background-color: var(--color-main-background);
	border: 1px solid #878787;
	border-radius: 1px;
	background-position: center;
	margin-top: 3px;
	margin-left: 2px;
}

.CodeMirror .cm-formatting-task.cm-property::before {
	background-image: var(--icon-checkmark-fff);
	background-color: var(--color-primary-element);
	border-color: var(--color-primary-element);
}

.CodeMirror .cm-formatting-task.cm-property + span {
	opacity: 0.5;
	text-decoration: line-through;
}
</style>
