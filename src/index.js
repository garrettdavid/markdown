import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import './normalize.css'
import './index.css';

marked.setOptions({
    breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
}

const Editor = (props) => {
    return <textarea id="editor" rows="8" value={props.text} onChange={props.onChange}>
    </textarea>
}

const Preview = (props) => {
    return <div id="preview" dangerouslySetInnerHTML={{__html: props.text}}></div>
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            text: `# Main Header

## Sub Header

\`\`\`
function foo(a, b) {
    return a + b}
\`\`\`

**Inline code:** \`<img></img>\`

>I am Groot -Groot

1. foo 
2. bar 
3. baz

![test pic](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Rendered by [marked](https://marked.js.org/).`
        }
    }

    
    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <div className="app-container">
                <h1>Markdown Previewer</h1>
                <h2>Editor</h2>
                <Editor text={this.state.text} onChange={this.handleChange}/>
                <h2>Preview</h2>
                <Preview text={marked(this.state.text)}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));