marked.setOptions({
  breaks: true
});

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input:
        "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n",
      hidden: ""
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  toggleFullScreen(event) {
    const icon = event.target;
    let otherBox = "editor-box";
    let targetView = "fa-expand";

    if (icon.parentElement.parentElement.id === "editor-box")
      otherBox = "preview-box";

    if (icon.classList["1"] === "fa-expand") targetView = "fa-compress";
    else otherBox = "";

    icon.classList.remove(icon.classList["1"]);
    icon.classList.add(targetView);

    this.setState({
      hidden: otherBox
    });
  }

  inputChanged(event) {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return (
      <div class="container">
        {this.state.hidden != "editor-box" && (
          <div class="box" id="editor-box">
            <div class="box-header">
              <div>
                <i class="fas fa-edit"></i>
                <span>Editor</span>
              </div>
              <i class="fas fa-expand" onClick={this.toggleFullScreen}></i>
            </div>
            <textarea
              id="editor"
              type="text"
              value={this.state.input}
              onChange={this.inputChanged}
            />
          </div>
        )}
        {this.state.hidden != "preview-box" && (
          <div class="box " id="preview-box">
            <div class="box-header">
              <div>
                <i class="fas fa-tv"></i>
                <span>Preview</span>
              </div>
              <i class="fas fa-expand" onClick={this.toggleFullScreen}></i>
            </div>
            <div
              id="preview"
              dangerouslySetInnerHTML={{ __html: marked.parse(this.state.input) }}
            ></div>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
