<template>
  <div id="editor">
    <textarea :value="input" @input="update"></textarea>

    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script type="es6">
  import marked from 'marked' // 引入markdown模块
  import highlight from 'highlight.js' // 引入highlight
  export default {
    data() {
      return {
        input: '# hello'
      }
    },
    created() {
      highlight.initHighlightingOnLoad()
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      });
      marked.setOptions({
        highlight: function (code) {
          return highlight.highlightAuto(code).value;
        }
      });

    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, {sanitize: true})
      }
    },
    methods: {
      update(e) {
        this.throttle(function () {
          this.input = e.target.value
        }, this)
      },
      throttle(method, context) { // 节流
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
          method.call(context);
        }, 300);
      },
    }
  }
</script>

<style>
  @import '../../common/style/github.css';

  html, body, #editor {
    margin: 0;
    height: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }

  textarea, #editor div {
    display: inline-block;
    width: 49%;
    min-height: 100vh;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }

  pre {
    background-color: #ccc;
  }
</style>
